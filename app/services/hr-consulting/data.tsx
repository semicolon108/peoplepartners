//app/services/hr-consulting/data.tsx

import { BookOpen, Target, ShieldCheck, BarChart2, Wrench } from 'lucide-react';

export const serviceData = {
    title: 'HR Consulting Services',
    description: 'Strategic HR guidance to optimize your people processes, ensure compliance, and build high-performing teams. Transform your HR function with expert consulting tailored to the Lao business environment.',
    heroIcon: <BookOpen />,
    features: [
        { icon: <Target />, title: 'Strategic Focus', description: 'We align HR initiatives with your business objectives, ensuring every people decision supports your overall strategy and growth goals.' },
        { icon: <ShieldCheck />, title: 'Local Expertise', description: 'Deep understanding of Lao labor laws, cultural nuances, and local market conditions to ensure compliant and effective HR practices.' },
        { icon: <BarChart2 />, title: 'Measurable Results', description: 'A data-driven approach with clear KPIs and metrics to track the impact of HR improvements on your business performance.' },
        { icon: <Wrench />, title: 'Practical Solutions', description: 'Actionable recommendations and hands-on implementation support to ensure sustainable improvements in your HR function.' },
    ],
    processSteps: [
        { title: 'Discovery & Assessment', description: 'Comprehensive review of your current HR practices, structure, and business objectives to identify challenges.' },
        { title: 'Analysis & Gap Identification', description: 'Detailed analysis of findings with a gap assessment against best practices and regulatory requirements.' },
        { title: 'Strategy Development', description: 'Creation of a customized HR strategy and roadmap with prioritized recommendations and a clear timeline.' },
        { title: 'Implementation Support', description: 'Hands-on support for executing recommendations, including policy development and process design.' },
        { title: 'Monitoring & Optimization', description: 'Ongoing monitoring of results with regular reviews and adjustments to ensure sustained success.' },
    ],
    includedItems: [
        "Comprehensive HR audit & assessment",
        "Strategic HR roadmap development",
        "Policy & procedure documentation",
        "Process optimization recommendations",
        "Implementation support & guidance",
        "Training for internal HR team",
        "Ongoing advisory support",
        "Best practice templates & tools",
    ],

    valueProposition: {
        title: "Tailored to Your Needs",
        description: "Our consulting services are available through various engagement models - from one-time projects to ongoing advisory relationships.",
        items: [
            "Project-based consulting for specific initiatives",
            "Ongoing advisory retainer for continuous support",
            "Hourly consulting for ad-hoc requirements",
            "Virtual consulting sessions for remote guidance",
        ]
    },

    finalCTA: {
        title: "Ready to Transform Your HR Function?",
        description: "Partner with our experienced HR consultants to build a people strategy that drives business success. Schedule a consultation to discuss your unique challenges.",
        buttonText: "Schedule Strategic Consultation",
        buttonLink: "/contact#consultation",
    }
};