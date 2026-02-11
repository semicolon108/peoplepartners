
import { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
    title: 'Contact Us | People Partners Lao',
    description: 'Get in touch for a free consultation about your HR, recruitment, or payroll needs in Laos. Find our location and contact details here.',
};

export default function ContactPage() {
    return <ContactContent />;
}