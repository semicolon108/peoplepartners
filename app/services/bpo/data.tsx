// app/services/bpo/data.tsx
import { Settings, HandCoins, Focus, Zap, Gauge, Users, Phone, FileText } from 'lucide-react';

export const serviceData = {
    title: 'Business Process Outsourcing',
    description: 'Streamline your operations and reduce costs by outsourcing non-core business processes to our expert team. Focus on what you do best while we handle the rest with efficiency and precision.',
    heroIcon: <Settings />,
    features: [
        { icon: <HandCoins />, title: 'Cost Reduction', description: 'Reduce operational costs by up to 40% while maintaining quality. No infrastructure investment or staff training required.' },
        { icon: <Focus />, title: 'Core Focus', description: 'Free up internal resources to concentrate on strategic activities that drive business growth and competitive advantage.' },
        { icon: <Zap />, title: 'Scalability', description: 'Easily scale operations up or down based on business needs without the complexity of hiring or downsizing.' },
        { icon: <Gauge />, title: 'Quality & Expertise', description: 'Access to skilled professionals and best practices without the overhead of recruitment and training.' },
    ],
    bpoCategories: [
        { icon: <Users />, title: 'Finance & Accounting', services: ['Accounts Payable/Receivable', 'Bookkeeping', 'Financial Reporting', 'Expense Management'] },
        { icon: <Users />, title: 'Human Resources', services: ['Employee Onboarding', 'Benefits Administration', 'HR Documentation', 'Training & Development'] },
        { icon: <Phone />, title: 'Customer Support', services: ['Call Center Operations', 'Email & Chat Support', 'Technical Support', 'Help Desk Services'] },
        { icon: <FileText />, title: 'Admin Support', services: ['Data Entry & Processing', 'Document Management', 'Virtual Assistant Services', 'Scheduling & Coordination'] },
    ],
    processSteps: [
        { title: 'Business Analysis', description: 'Comprehensive assessment of your current processes, pain points, and outsourcing objectives.' },
        { title: 'Solution Design', description: 'Custom BPO solution development with clear scope, deliverables, KPIs, and service level agreements.' },
        { title: 'Team Setup & Training', description: 'Dedicated team assembly, training on your processes, and systems integration.' },
        { title: 'Pilot Launch', description: 'Controlled pilot program to test processes, refine workflows, and ensure quality standards.' },
        { title: 'Full Deployment & Monitoring', description: 'Complete service rollout with ongoing monitoring, regular reporting, and continuous improvement.' },
    ],
    includedItems: [
        "Bilingual capabilities (Lao, English, Thai)",
        "Proven track record with 20+ satisfied clients",
        "ISO-compliant quality management systems",
        "Advanced security and data protection protocols",
        "Flexible engagement models and scalability",
        "Dedicated account management and support",
        "Competitive pricing with transparent fee structure",
        "Quick setup and seamless integration",
    ],

    //reuse the ValueProposition component, but the data represents metrics instead of savings.
    valueProposition: {
        title: "Measurable Business Impact",
        description: "Our BPO clients typically experience significant improvements across key business metrics.",
        items: [
            "Up to 40% Cost Reduction",
            "Up to 60% Faster Processing Times",
            "Over 99.5% Accuracy Rate",
            "Optional 24/7 Support Coverage",
        ]
    },

    finalCTA: {
        title: "Ready to Optimize Your Operations?",
        description: "Discover how our BPO services can streamline your processes, reduce costs, and accelerate your business growth. Schedule a free consultation today.",
        buttonText: "Get Free BPO Assessment",
        buttonLink: "/contact#consultation",
    }
};