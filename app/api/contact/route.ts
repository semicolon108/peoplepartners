// app/api/contact/route.ts

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Email configuration for peoplepartners.la domain
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'mail.peoplepartners.la', // Your 108.jobs mail server
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true', // false for 587, true for 465
        auth: {
            user: process.env.SMTP_USER, // your email@peoplepartners.la
            pass: process.env.SMTP_PASSWORD, // your email password
        },
        tls: {
            rejectUnauthorized: false // May be needed for some hosting providers
        }
    });
};

// Improved validation function
interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
    service?: string;
    message: string;
}

const validateFormData = (data: FormData) => {
    const { firstName, lastName, email, message } = data;

    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !message?.trim()) {
        return { isValid: false, error: "Missing required fields" };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, error: "Invalid email format" };
    }

    return { isValid: true };
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

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Validate form data
        const validation = validateFormData(body);
        if (!validation.isValid) {
            return NextResponse.json(
                { error: validation.error },
                { status: 400 }
            );
        }

        const { firstName, lastName, email, phone, company, service, message } = body;

        // Create transporter based on environment configuration
        const transporter = createTransporter();

        // Email options
        const mailOptions = {
            from: process.env.FROM_EMAIL || `"Contact Form" <noreply@peoplepartnerslao.com>`,
            to: process.env.TO_EMAIL || 'info@peoplepartnerslao.com',
            subject: `New Contact Form Submission from ${firstName} ${lastName}`,
            html: createEmailHTML(body),
            replyTo: email, // Allow easy reply to the form submitter
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);

        console.log(`Email sent successfully! Message ID: ${info.messageId}`);

        return NextResponse.json(
            { message: "Email sent successfully!" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Email sending error:", error);

        // More specific error handling
        if (error instanceof Error) {
            if (error.message.includes('authentication')) {
                return NextResponse.json(
                    { error: "Email authentication failed. Please check configuration." },
                    { status: 500 }
                );
            }
            if (error.message.includes('network')) {
                return NextResponse.json(
                    { error: "Network error. Please try again later." },
                    { status: 503 }
                );
            }
        }

        return NextResponse.json(
            { error: "Failed to send email. Please try again later." },
            { status: 500 }
        );
    }
}

// Optional: Add rate limiting middleware
export async function middleware(req: NextRequest) {
    // Implement rate limiting logic here if needed
    // This is just a placeholder - you'd want to use a proper rate limiting solution
    return NextResponse.next();
}