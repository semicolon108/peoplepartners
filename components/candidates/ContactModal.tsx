
'use client';

import { X } from 'lucide-react';
import { useState } from 'react';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    candidateId: string;
    candidateRole: string;
}

export default function ContactModal({ isOpen, onClose, candidateId, candidateRole }: ContactModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        const formData = new FormData(e.currentTarget);

        try {
            const payload = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                company: formData.get('company'),
                message: formData.get('message'),
                service: `Candidate Inquiry: ${candidateRole} (ID: ${candidateId})`,
            };

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const res = await response.json();
                throw new Error(res.error || 'Failed to send request.');
            }

            setSubmitted(true);
        } catch (error) {
            console.error(error);
            setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-brand-gray-400 hover:text-brand-gray-600 hover:bg-brand-gray-100 rounded-full transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-8">
                    {submitted ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-brand-gray-900 mb-2">Request Sent!</h3>
                            <p className="text-brand-gray-600 mb-6">
                                Thank you for your interest in <strong>Candidate #{candidateId}</strong>. <br />
                                Our team will contact you shortly.
                            </p>
                            <button
                                onClick={onClose}
                                className="px-6 py-2 bg-brand-blue-600 text-white font-semibold rounded-lg hover:bg-brand-blue-700 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold text-brand-gray-900 mb-1">Request Interview</h2>
                            <p className="text-brand-gray-600 mb-6 text-sm">
                                Inquiring about: <span className="font-semibold text-brand-blue-600">{candidateRole} (ID: #{candidateId})</span>
                            </p>

                            {errorMessage && (
                                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                                    {errorMessage}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-brand-gray-700 mb-1">First Name</label>
                                        <input
                                            name="firstName"
                                            type="text"
                                            required
                                            disabled={isSubmitting}
                                            className="w-full px-4 py-2 border border-brand-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 outline-none"
                                            placeholder="First Name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-brand-gray-700 mb-1">Last Name</label>
                                        <input
                                            name="lastName"
                                            type="text"
                                            required
                                            disabled={isSubmitting}
                                            className="w-full px-4 py-2 border border-brand-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 outline-none"
                                            placeholder="Last Name"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-brand-gray-700 mb-1">Email</label>
                                        <input
                                            name="email"
                                            type="email"
                                            required
                                            disabled={isSubmitting}
                                            className="w-full px-4 py-2 border border-brand-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 outline-none"
                                            placeholder="you@company.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-brand-gray-700 mb-1">Company</label>
                                        <input
                                            name="company"
                                            type="text"
                                            disabled={isSubmitting}
                                            className="w-full px-4 py-2 border border-brand-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 outline-none"
                                            placeholder="Company Name"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-brand-gray-700 mb-1">Message</label>
                                    <textarea
                                        name="message"
                                        rows={3}
                                        required
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-2 border border-brand-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 outline-none resize-none"
                                        placeholder={`I'm interested in interviewing Candidate #${candidateId}...`}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-3 px-4 bg-brand-blue-600 text-white font-semibold rounded-lg hover:bg-brand-blue-700 transition-colors shadow-md ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? 'Sending Request...' : 'Send Request'}
                                </button>

                                <p className="text-xs text-center text-brand-gray-500 mt-2">
                                    This request will be sent to our recruitment team.
                                </p>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
