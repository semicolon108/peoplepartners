
import { TramFront, LandPlot, FileText, Zap, CheckCircle } from 'lucide-react';

export const serviceData = {
    title: 'Visa & Immigration Services',
    description: 'Complete visa and work permit assistance for international employees entering Laos. We navigate the complex immigration process so your team can focus on what matters most - your business.',
    heroIcon: <TramFront />,
    features: [
        { icon: <LandPlot />, title: 'Government Relations', description: 'Strong relationships with immigration authorities ensure efficient processing and reliable communication.' },
        { icon: <FileText />, title: 'Complete Documentation', description: 'We handle all paperwork, documentation, and application submissions with meticulous attention to detail.' },
        { icon: <Zap />, title: 'Fast Processing', description: 'Our streamlined processes and agency relationships enable faster than average processing times.' },
        { icon: <CheckCircle />, title: 'High Success Rate', description: 'Our thorough preparation and deep understanding of requirements result in exceptionally high approval rates.' },
    ],
    processSteps: [
        { title: 'Initial Consultation', description: 'We assess your specific needs, determine the correct visa type, and provide a detailed timeline and checklist.' },
        { title: 'Document Preparation', description: 'Our team guides you through document collection, handling translations and certifications to meet official requirements.' },
        { title: 'Application Submission', description: 'We submit your complete application to the appropriate government agencies and provide tracking information.' },
        { title: 'Follow-up & Monitoring', description: 'Regular status updates and direct communication with immigration officers to ensure smooth processing.' },
        { title: 'Approval & Collection', description: 'Once approved, we coordinate visa collection and provide guidance on entry procedures and ongoing compliance.' },
    ],
    includedItems: [
        "Work permit applications and renewals",
        "Labor quota assessments & applications",
        "Ministry of Labor liaison",
        "Annual reporting compliance",
        "Mandatory residence registration",
        "Bank account opening support",
        "Driving license application assistance",
        "Ongoing compliance & renewal reminders",
    ],

    valueProposition: {
        title: "We Handle All Requirements",
        description: "Navigating Lao bureaucracy is complex. We manage all required documentation across personal, professional, company, and financial categories.",
        items: [
            "Personal Docs (Passports, Photos, Certificates)",
            "Professional Docs (Contracts, CVs, Qualifications)",
            "Company Docs (Licenses, Tax, Sponsorship)",
            "Financial Docs (Bank Statements, Guarantees)",
        ]
    },

    finalCTA: {
        title: "Ready to Start Your Visa Application?",
        description: "Our immigration experts are ready to guide you through every step of the process. Get started with a free consultation today.",
        buttonText: "Schedule Free Consultation",
        buttonLink: "/contact#consultation",
    }
};