// components/emails/ContactEmail.tsx

import React from 'react';

interface ContactEmailProps {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
    service?: string;
    message: string;
}

export default function ContactEmail({
    firstName,
    lastName,
    email,
    phone,
    company,
    service,
    message,
}: ContactEmailProps) {
    return (
        <div>
            <h1>New Message from your Website</h1>
            <p><strong>Name:</strong> {firstName} {lastName}</p>
            <p><strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a></p>
            {phone && <p><strong>Phone:</strong> {phone}</p>}
            {company && <p><strong>Company:</strong> {company}</p>}
            {service && <p><strong>Service of Interest:</strong> {service}</p>}
            <hr />
            <h2>Message:</h2>
            <p>{message}</p>
        </div>
    );
}