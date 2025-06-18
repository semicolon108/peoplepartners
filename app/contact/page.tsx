// app/contact/page.tsx

import { contactDetails } from './data';
import ContactForm from './ContactForm';
import Link from 'next/link';

// 1. Import the shared components
import Breadcrumb from '@/components/services/Breadcrumb';
import PageHero from '@/components/shared/PageHero';

export default function ContactPage() {
    return (
        <div className="pt-20"> {/* Offset for fixed header */}
            <Breadcrumb pageTitle="Contact Us" />
            <PageHero
                title="Get In Touch"
                subtitle="Ready to partner with Laos' leading HR experts? We're here to help you succeed."
            />

            <main>
                <section className="py-20 bg-white">
                    <div className="container">
                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            {/* Left Side: Contact Information */}
                            <div className="bg-brand-gray-light p-8 rounded-2xl">
                                <h2 className="text-2xl font-bold mb-6 text-brand-blue-dark">Contact Information</h2>
                                <div className="space-y-6">
                                    {contactDetails.map(item => (
                                        <div key={item.title} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                                            <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-brand-blue-light text-white rounded-lg flex items-center justify-center flex-shrink-0">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-brand-blue-dark mb-1">{item.title}</h3>
                                                {item.lines.map((line, index) => (
                                                    <p key={index} className="text-sm text-brand-gray">
                                                        {line.href ? (
                                                            <Link href={line.href} target={line.target || '_self'} className="text-brand-blue hover:underline">
                                                                {line.text}
                                                            </Link>
                                                        ) : (
                                                            line.text
                                                        )}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Side: Contact Form */}
                            <div id="consultation"> {/* Anchor for "Get Consultation" button */}
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-brand-gray-light">
                    <div className="container">
                        <h2 className="text-3xl font-bold text-center mb-8 text-brand-blue-dark">Our Location</h2>
                        <div className="w-full h-96 bg-slate-200 rounded-2xl shadow-md overflow-hidden border border-slate-300">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.7554900000003!2d102.6375!3d17.9625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x312468a5202a0a25%3A0x5a2a2a2a2a2a2a25!2s108%20Jobs!5e0!3m2!1sen!2sla"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}