//app/services/career-transitioning/data.tsx

import { TrendingUp, Target, FileText, Mic, Star } from 'lucide-react';

export const serviceData = {
    title: 'Career Transitioning Services',
    description: 'Advance your career with professional coaching, CV optimization, and interview preparation. We help talented individuals unlock new opportunities and achieve their career goals in Laos\' competitive job market.',
    heroIcon: <TrendingUp />,
    features: [
        { icon: <Target />, title: 'Personalized Career Strategy', description: 'One-on-one coaching sessions to identify your strengths, clarify career goals, and develop a strategic roadmap for success.' },
        { icon: <FileText />, title: 'Professional CV Optimization', description: 'Transform your CV into a powerful marketing tool that highlights your achievements and gets you noticed by employers.' },
        { icon: <Mic />, title: 'Interview Mastery', description: 'Comprehensive interview preparation including mock interviews, feedback, and techniques to showcase your best self.' },
        { icon: <Star />, title: 'Personal Branding', description: 'Build a compelling professional brand across LinkedIn and other platforms to attract opportunities and build your network.' },
    ],
    includedItems: [
        "Career assessment & goal setting",
        "Professional CV writing & optimization",
        "LinkedIn profile enhancement",
        "Interview coaching & practice sessions",
        "Salary negotiation strategies",
        "Job search strategy & targeting",
        "Networking guidance & introductions",
        "90-day post-placement support",
    ],
    processSteps: [
        {
            title: 'Career Assessment',
            description: 'Comprehensive evaluation of your skills, experience, values, and career aspirations to identify opportunities and gaps.'
        },
        {
            title: 'Strategic Planning',
            description: 'Develop a personalized career roadmap with clear goals, timelines, and actionable steps to achieve your objectives.'
        },
        {
            title: 'Brand Development',
            description: 'Create compelling CV, LinkedIn profile, and personal branding materials that showcase your unique value proposition.'
        },
        {
            title: 'Interview Preparation',
            description: 'Intensive interview coaching with mock sessions, feedback, and techniques to confidently present yourself to employers.'
        },
        {
            title: 'Active Job Search',
            description: 'Targeted job search execution with ongoing support, introductions, and guidance throughout the application process.'
        },
        {
            title: 'Success & Integration',
            description: 'Negotiation support and 30-day follow-up to ensure successful transition and continued career growth.'
        },
    ],

    valueProposition: {
        title: "Career Development Packages",
        description: "Choose the package that best fits your career goals and budget. All packages include ongoing support and a satisfaction guarantee.",
        items: [
            "CV & LinkedIn Package",
            "Complete Career Transition",
            "Executive Transition",
            "All packages are fully customizable",
        ]
    },

    finalCTA: {
        title: "Ready to Accelerate Your Career?",
        description: "Join hundreds of professionals who have successfully advanced their careers with our expert guidance. Book your free consultation today.",
        buttonText: "Book Free Career Consultation",
        buttonLink: "/contact#consultation",
    }
};