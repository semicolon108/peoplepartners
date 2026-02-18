// app/api/contact/route.ts

import { NextRequest, NextResponse } from "next/server";
import { contactFormRateLimit } from "@/lib/rate-limit";

// Email configuration removed (using Microsoft Graph)

// Improved validation function with sanitization
interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
    service?: string;
    message: string;
}

// Simple HTML sanitization function
const sanitizeInput = (input: string): string => {
    return input
        .replace(/[<>]/g, '') // Remove < and > characters
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+=/gi, '') // Remove event handlers
        .trim();
};

const validateFormData = (data: FormData) => {
    const { firstName, lastName, email, message } = data;

    // Sanitize inputs
    const sanitizedData = {
        firstName: sanitizeInput(firstName || ''),
        lastName: sanitizeInput(lastName || ''),
        email: sanitizeInput(email || ''),
        message: sanitizeInput(message || ''),
        phone: data.phone ? sanitizeInput(data.phone) : '',
        company: data.company ? sanitizeInput(data.company) : '',
        service: data.service ? sanitizeInput(data.service) : '',
    };

    if (!sanitizedData.firstName || !sanitizedData.lastName || !sanitizedData.email || !sanitizedData.message) {
        return { isValid: false, error: "Missing required fields" };
    }

    // Enhanced email validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(sanitizedData.email)) {
        return { isValid: false, error: "Invalid email format" };
    }

    // Length validation
    if (sanitizedData.firstName.length > 50 || sanitizedData.lastName.length > 50) {
        return { isValid: false, error: "Name fields too long" };
    }

    if (sanitizedData.message.length > 2000) {
        return { isValid: false, error: "Message too long (max 2000 characters)" };
    }

    return { isValid: true, data: sanitizedData };
};

// Create HTML email template
const createEmailHTML = (formData: FormData) => {
    const { firstName, lastName, email, phone, company, service, message } = formData;

    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">New Contact Form Submission</h2>
      <div style="background: #f9f9f9; padding: 20px; border-radius: 5px;">
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        ${service ? `<p><strong>Service:</strong> ${service}</p>` : ''}
        <div style="margin-top: 20px;">
          <strong>Message:</strong>
          <p style="background: white; padding: 15px; border-left: 3px solid #007bff;">
            ${message.replace(/\n/g, '<br>')}
          </p>
        </div>
      </div>
    </div>
  `;
};

// ... (imports)
import { sendEmailGraph } from "@/lib/microsoftGraph";
import { appendRequest } from "@/lib/googleSheets";

// ... (helper functions for validation and sanitization remain the same)

export async function POST(req: NextRequest) {
    try {
        // Apply rate limiting
        const rateLimitResult = contactFormRateLimit(req);
        if (!rateLimitResult.success) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                {
                    status: 429,
                    headers: {
                        'Retry-After': Math.ceil((rateLimitResult.resetTime! - Date.now()) / 1000).toString()
                    }
                }
            );
        }

        const body = await req.json();

        // Validate form data
        const validation = validateFormData(body);
        if (!validation.isValid) {
            return NextResponse.json(
                { error: validation.error },
                { status: 400 }
            );
        }

        // Use sanitized data
        const sanitizedData = validation.data!;
        const { firstName, lastName, email, service, message, company } = sanitizedData;
        // 1. Send Notification Email to Admin (info@peoplepartners.la)
        const recipientEmail = process.env.TO_EMAIL || 'info@peoplepartners.la';
        const bccEmail = 'ppl@peoplepartners.la';
        const adminEmailData = {
            to: recipientEmail,
            bcc: bccEmail,
            subject: `New Contact Form Submission from ${firstName} ${lastName}`,
            body: createEmailHTML(sanitizedData),
            replyTo: email,
        };
        await sendEmailGraph(adminEmailData);

        // 2. Send Auto-Reply Email to Client
        const clientEmailData = {
            to: email, // The client's email
            subject: `We received your inquiry: ${service || 'Contact Request'}`,
            body: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Thank you for contacting People Partners Laos!</h2>
                    <p>Dear ${firstName},</p>
                    <p>We have received your inquiry regarding <strong>${service || 'our services'}</strong>.</p>
                    <p>Our team will review your request and get back to you shortly.</p>
                    <br>
                    <p><strong>Your Message:</strong></p>
                    <p style="background: #f9f9f9; padding: 15px; border-left: 3px solid #007bff; font-style: italic;">
                        ${message.replace(/\n/g, '<br>')}
                    </p>
                    <br>
                    <p>Best Regards,</p>
                    <p><strong>People Partners Team</strong></p>
                </div>
            `,
        };
        // We send this asynchronously and don't block the response if it fails (fire and forget)
        sendEmailGraph(clientEmailData).catch(err => console.error("Failed to send auto-reply:", err));

        // 3. Save to Google Sheets "Requests" tab
        // Also fire-and-forget so we don't block the UI response
        appendRequest({
            name: `${firstName} ${lastName}`,
            email: email,
            phone: sanitizedData.phone || 'N/A',
            company: company || 'N/A',
            service: service || 'Contact Request',
            message: message
        }).catch(err => console.error("Failed to append to Google Sheets:", err));

        return NextResponse.json(
            { message: "Emails sent successfully!" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Email sending error:", error);

        // Fallback for simulation if credentials are completely missing in dev
        if (process.env.NODE_ENV === 'development' && (!process.env.AZURE_CLIENT_ID || !process.env.AZURE_CLIENT_SECRET)) {
            console.warn("DEV MODE: Azure credentials missing. Simulating success.");
            return NextResponse.json({ message: "Email simulation successful" }, { status: 200 });
        }

        return NextResponse.json(
            { error: "Failed to send email. Please try again later." },
            { status: 500 }
        );
    }
}

// Optional: Add rate limiting middleware
// export async function middleware(req: NextRequest) {
//     // Implement rate limiting logic here if needed
//     // This is just a placeholder - you'd want to use a proper rate limiting solution
//     return NextResponse.next();
// }