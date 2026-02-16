
import { NextRequest, NextResponse } from "next/server";
import { sendEmailGraph } from "@/lib/microsoftGraph";
import crypto from "crypto";

// Secret key for signing the OTPs. 
// In production, this should be in .env.local
const OTP_SECRET = process.env.OTP_SECRET || "ppl-stateless-otp-secret-key-change-me";

function signOTP(email: string, code: string, expires: number) {
    return crypto
        .createHmac("sha256", OTP_SECRET)
        .update(`${email}.${code}.${expires}`)
        .digest("hex");
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { action, email, code, hash, expires } = body;

        // ---------------------------------------------------------
        // ACTION: SEND OTP
        // ---------------------------------------------------------
        if (action === "send") {
            if (!email || !email.endsWith("@peoplepartners.la")) {
                return NextResponse.json(
                    { error: "Access restricted to @peoplepartners.la emails only." },
                    { status: 403 }
                );
            }

            // Generate 6-digit code
            const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
            // Expires in 5 minutes
            const expiresTimestamp = Date.now() + 2 * 60 * 1000;
            // Create signature
            const signature = signOTP(email, generatedCode, expiresTimestamp);

            // Send Email
            try {
                await sendEmailGraph({
                    to: email,
                    subject: `Your Access Code: ${generatedCode}`,
                    body: `
                        <div style="font-family: Arial, sans-serif; padding: 20px;">
                            <h2>People Partners Recruiter Access</h2>
                            <p>Here is your one-time access code:</p>
                            <h1 style="color: #2563eb; font-size: 32px; letter-spacing: 5px;">${generatedCode}</h1>
                            <p>This code expires in 2 minutes.</p>
                            <p>If you did not request this, please ignore this email.</p>
                        </div>
                    `,
                });

                // Return the "Lock" to the client (but NOT the code)
                return NextResponse.json({
                    success: true,
                    hash: signature,
                    expires: expiresTimestamp,
                    email: email // Echo back
                });

            } catch (emailError) {
                console.error("Failed to send OTP email:", emailError);
                return NextResponse.json(
                    { error: "Failed to send email. Please try again." },
                    { status: 500 }
                );
            }
        }

        // ---------------------------------------------------------
        // ACTION: VERIFY OTP
        // ---------------------------------------------------------
        if (action === "verify") {
            if (!email || !code || !hash || !expires) {
                return NextResponse.json({ error: "Missing verification data." }, { status: 400 });
            }

            // 1. Check Expiry
            if (Date.now() > expires) {
                return NextResponse.json({ error: "Code has expired. Please request a new one." }, { status: 400 });
            }

            // 2. Verify Signature
            const expectedHash = signOTP(email, code, expires);

            // Constant-time comparison to prevent timing attacks
            const hashBuffer = Buffer.from(hash);
            const expectedHashBuffer = Buffer.from(expectedHash);

            // Ensure buffers are same length before comparison (though minimal risk here)
            if (hashBuffer.length !== expectedHashBuffer.length || !crypto.timingSafeEqual(hashBuffer, expectedHashBuffer)) {
                return NextResponse.json({ error: "Invalid code." }, { status: 400 });
            }

            // Success!
            const response = NextResponse.json({ success: true });

            // Optional: Set a cookie to persist "logged in" state if we wanted
            // but for now, we'll just return success and let the client unlock the UI.

            return response;
        }

        return NextResponse.json({ error: "Invalid action" }, { status: 400 });

    } catch (error) {
        console.error("OTP API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
