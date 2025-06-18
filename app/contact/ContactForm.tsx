
// app/contact/ContactForm.tsx
"use client";

import { useState } from 'react';
import { servicesOfInterest } from './data'; // Import services from our data file

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus('sending');

        // Here you would typically send the form data to an API endpoint
        // For now, we'll simulate a network request
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Simulate a successful submission
        setStatus('success');

        // Reset form after a few seconds
        setTimeout(() => {
            (event.target as HTMLFormElement).reset();
            setStatus('idle');
        }, 3000);
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
            <h2 className="text-2xl font-bold mb-6 text-brand-blue-dark">Send Us a Message</h2>

            <form onSubmit={handleSubmit}>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
                        <input type="email" id="email" name="email" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-brand-blue focus:border-brand-blue" />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                        <input type="tel" id="phone" name="phone" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-brand-blue focus:border-brand-blue" />
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                    <input type="text" id="company" name="company" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-brand-blue focus:border-brand-blue" />
                </div>

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
            </form>
        </div>
    );
}