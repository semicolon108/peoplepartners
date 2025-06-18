
import { Building, Rocket, ShieldCheck, HandCoins, Target } from 'lucide-react';

export const serviceData = {
    title: 'PEO / Employer of Record',
    description: 'Enter the Lao market without establishing a legal entity. We become the legal employer of your staff while you retain full operational control, enabling rapid market entry with complete compliance.',
    heroIcon: <Building />,
    features: [
        { icon: <Rocket />, title: 'Rapid Market Entry', description: 'Start operations in Laos within weeks, not months. No need to establish a local entity.' },
        { icon: <ShieldCheck />, title: 'Full Legal Compliance', description: 'We ensure 100% compliance with Lao employment laws, tax regulations, and labor standards.' },
        { icon: <HandCoins />, title: 'Cost-Effective Solution', description: 'Avoid the high costs of entity setup, legal fees, and ongoing administrative overhead.' },
        { icon: <Target />, title: 'Maintain Control', description: 'You retain full operational control over your employees\' day-to-day activities and performance.' },
    ],
    processSteps: [
        { title: 'Partnership Agreement', description: 'We establish a comprehensive PEO agreement outlining responsibilities and boundaries.' },
        { title: 'Employee Onboarding', description: 'We legally hire your chosen employees under our entity while they work for you.' },
        { title: 'Ongoing Management', description: 'We handle payroll, benefits, and HR admin while you manage day-to-day operations.' },
        { title: 'Compliance & Reporting', description: 'Regular monitoring, statutory filings, and transparent reporting to keep you protected.' },
        { title: 'Transition Support', description: 'When ready, we assist with transitioning employees to your own legal entity seamlessly.' },
    ],
    includedItems: [
        "Legal employer responsibilities",
        "Employment contract management",
        "Payroll processing & tax compliance",
        "Social security administration",
        "Work permit & visa support",
        "HR policy development",
        "Employee benefits administration",
        "Regulatory compliance monitoring",
        "Risk management & liability protection",
        "Dedicated account management",
    ],

    valueProposition: {
        title: "Transparent, Scalable Investment",
        description: "Our PEO pricing is based on the number of employees and services required, with no hidden setup fees or long-term commitments.",
        items: [
            "Entity setup costs ($5,000-$15,000+)",
            "Legal and consulting fees",
            "Ongoing compliance and admin costs",
            "Time to market (3-6 months)",
            "Risk of non-compliance penalties",
        ]
    },

    finalCTA: {
        title: "Ready to Enter the Lao Market?",
        description: "Start your operations in Laos within weeks, not months. Get a free consultation to explore how our PEO service can accelerate your market entry.",
        buttonText: "Schedule Free Market Entry Consultation",
        buttonLink: "/contact#consultation",
    }
};