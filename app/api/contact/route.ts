// app/api/contact/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import ContactEmail from "@/components/emails/ContactEmail";

// Initialize Resend with your API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, phone, company, service, message } =
            body;

        // --- Server-side Data Validation ---
        if (!firstName || !lastName || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // --- Sending Email using Resend ---
        const response = await resend.emails.send({
            // IMPORTANT: Replace with your actual verified domain email
            from: "Contact Form <noreply@peoplepartnerslao.com>",

            // The destination email address
            to: ["info@peoplepartnerslao.com"],

            subject: `New Contact Form Submission from ${firstName} ${lastName}`,

            // Pass the form data as props to your React email component
            react: ContactEmail({
                firstName,
                lastName,
                email,
                phone,
                company,
                service,
                message,
            }),
        });

        // --- Handle Resend's Response ---
        // If there is an error object in the response, the email failed to send.
        if (response.error) {
            console.error({ error: response.error });
            return NextResponse.json(
                { error: "Failed to send email." },
                { status: 500 }
            );
        }

        // If there's no error, the email was sent successfully.
        // Optionally log the success ID for your records.
        console.log(`Email sent successfully! Message ID: ${response.data?.id}`);

        return NextResponse.json(
            { message: "Email sent successfully!" },
            { status: 200 }
        );
    } catch (error) {
        // This catches errors from `req.json()` or other unexpected exceptions.
        console.error("An internal error occurred:", error);
        return NextResponse.json(
            { error: "An internal server error occurred." },
            { status: 500 }
        );
    }
}
