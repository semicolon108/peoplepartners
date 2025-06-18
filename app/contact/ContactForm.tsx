// app/contact/ContactForm.tsx
"use client";

import { useState } from 'react';
import { servicesOfInterest } from './data';

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus('sending');
        setErrorMessage('');

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const res = await response.json();
                throw new Error(res.error || 'Something went wrong.');
            }

            setStatus('success');
            (event.target as HTMLFormElement).reset();

        } catch (error) {
            setStatus('error');
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
        }
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
            <h2 className="text-2xl font-bold mb-6 text-brand-blue-dark">Send Us a Message</h2>

            <form onSubmit={handleSubmit}>
                {/* ... all your form-group divs remain the same ... */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1">First Name *</label>
                        <input type="text" id="firstName" name="firstName" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-brand-blue focus:border-brand-blue" />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1">Last Name *</label>
                        <input type="text" id="lastName" name="lastName" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-brand-blue focus:border-brand-blue" />
                    </div>
                </div>
                {/* ... other form fields ... */}
                <div className="mb-4">
                    <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-1">Service of Interest</label>
                    <select id="service" name="service" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-brand-blue focus:border-brand-blue">
                        <option value="">Select a service</option>
                        {servicesOfInterest.map(service => (
                            <option key={service.value} value={service.value}>{service.label}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message *</label>
                    <textarea id="message" name="message" required rows={5} placeholder="Tell us about your HR needs and how we can help..." className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-brand-blue focus:border-brand-blue"></textarea>
                </div>

                <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full bg-gradient-to-r from-brand-blue to-brand-blue-light text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
                {status === 'success' && <p className="text-green-600 mt-4 text-center">Thank you! Your message has been sent.</p>}
                {status === 'error' && <p className="text-red-600 mt-4 text-center">{errorMessage}</p>}
            </form>
        </div>
    );
}