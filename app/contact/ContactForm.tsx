// app/contact/ContactForm.tsx
"use client";

import { useState } from 'react';
import { servicesOfInterest } from './data';

interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    service: string;
    message: string;
}

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus('sending');
        setErrorMessage('');

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries()) as unknown as ContactFormData;

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

            // Auto-hide success message after 5 seconds
            setTimeout(() => {
                setStatus('idle');
            }, 5000);

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
            <h2 className="text-2xl font-bold mb-6 text-brand-blue-900">Send Us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1">
                            First Name *
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            required
                            disabled={status === 'sending'}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-brand-blue-700 focus:border-brand-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1">
                            Last Name *
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            required
                            disabled={status === 'sending'}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-brand-blue-700 focus:border-brand-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>
                </div>

                {/* Email Field */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                        Email Address *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        disabled={status === 'sending'}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-brand-blue-700 focus:border-brand-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                </div>

                {/* Phone Field */}
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        disabled={status === 'sending'}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-brand-blue-700 focus:border-brand-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                </div>

                {/* Company Field */}
                <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">
                        Company
                    </label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        disabled={status === 'sending'}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-brand-blue-700 focus:border-brand-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                </div>

                {/* Service Selection */}
                <div>
                    <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-1">
                        Service of Interest
                    </label>
                    <select
                        id="service"
                        name="service"
                        disabled={status === 'sending'}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-brand-blue-700 focus:border-brand-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <option value="">Select a service</option>
                        {servicesOfInterest.map(service => (
                            <option key={service.value} value={service.value}>
                                {service.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Message Field */}
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                        Message *
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        disabled={status === 'sending'}
                        placeholder="Tell us about your HR needs and how we can help..."
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-brand-blue-700 focus:border-brand-blue-700 disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full bg-gradient-to-r from-brand-blue-700 to-brand-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none"
                >
                    {status === 'sending' ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                        </span>
                    ) : (
                        'Send Message'
                    )}
                </button>

                {/* Status Messages */}
                {status === 'success' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <p className="text-green-800 font-medium">✓ Thank you! Your message has been sent successfully.</p>
                        <p className="text-green-600 text-sm mt-1">We&apos;ll get back to you soon!</p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                        <p className="text-red-800 font-medium">✗ {errorMessage}</p>
                        <p className="text-red-600 text-sm mt-1">Please try again or contact us directly.</p>
                    </div>
                )}
            </form>
        </div>
    );
}