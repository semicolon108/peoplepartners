// app/services/payroll/data.tsx
import { Briefcase, ShieldCheck, Lock, BarChart2, Clock } from 'lucide-react';

// Centralized data for the entire page
export const serviceData = {
    title: 'Payroll Services',
    description: 'Complete payroll management with full compliance to Lao labor laws. We handle monthly processing, tax filings, and social security administration so you can focus on growing your business.',
    heroIcon: <Briefcase />,
    features: [
        { icon: <ShieldCheck />, title: '100% Compliance', description: 'Full adherence to Lao labor laws, tax regulations, and social security requirements. We stay updated on all regulatory changes.' },
        { icon: <Lock />, title: 'Data Security', description: 'Bank-level security protocols protect your sensitive payroll data with encrypted storage and secure processing systems.' },
        { icon: <BarChart2 />, title: 'Detailed Reporting', description: 'Comprehensive payroll reports, analytics, and insights to help you make informed decisions about your workforce costs.' },
        { icon: <Clock />, title: 'Timely Processing', description: 'Guaranteed on-time payroll processing with built-in redundancies to ensure your employees are always paid punctually.' },
    ],
    includedItems: [
        "Monthly payroll processing",
        "Income tax calculations & filings",
        "Social security administration",
        "Annual leave calculations",
        "Overtime & bonus processing",
        "Payslip generation & distribution",
        "Year-end tax reporting",
        "Dedicated payroll specialist",
    ],
    processSteps: [
        { title: 'Data Collection', description: 'Secure collection of employee hours, attendance, bonuses, and deductions.' },
        { title: 'Calculation & Review', description: 'Accurate calculation of wages, taxes, and social security with multi-level quality checks.' },
        { title: 'Client Approval', description: 'Payroll summary provided for your review and approval before final processing.' },
        { title: 'Processing & Distribution', description: 'Bank transfers processed, payslips distributed, and all statutory filings completed on schedule.' },
        { title: 'Reporting & Support', description: 'Comprehensive reports delivered with ongoing support for any payroll-related queries.' },
    ],
    valueProposition: {
        title: "Transparent, Scalable Pricing",
        description: "Our payroll services are priced per employee per month, with no hidden fees or setup costs. Volume discounts available for larger teams.",
        items: [
            "No need to hire dedicated payroll staff",
            "No expensive payroll software licenses",
            "Reduced compliance risk and potential penalties",
            "Lower operational overhead and admin costs",
        ]
    },
    finalCTA: {
        title: "Ready to Streamline Your Payroll?",
        description: "Join 20+ companies who trust us with their payroll processing. Get a free consultation and see how much you can save.",
        buttonText: "Schedule Free Consultation",
        buttonLink: "/contact#consultation",
    }
};