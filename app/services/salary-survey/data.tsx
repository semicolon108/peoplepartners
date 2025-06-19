//app/services/salary-survey/data.tsx

import { BarChart3, TrendingUp, Users, Shield, DollarSign } from 'lucide-react';

export const serviceData = {
    title: 'Salary Survey Services',
    description: 'Make informed compensation decisions with comprehensive salary benchmarking data. Our third annual salary survey provides critical market intelligence to help you attract talent, retain employees, and optimize your HR budget in Laos\' competitive market.',
    heroIcon: <BarChart3 />,
    features: [
        { icon: <TrendingUp />, title: 'Market Benchmarking', description: 'Compare your compensation packages against industry standards across different sectors and job levels in Laos.' },
        { icon: <Users />, title: 'Industry-Specific Data', description: 'Access detailed salary and benefits data segmented by industry, company size, and geographic location.' },
        { icon: <Shield />, title: 'Confidential & Reliable', description: 'All data is anonymized and collected through rigorous methodology in partnership with 108Jobs and Wise Research.' },
        { icon: <DollarSign />, title: 'Total Compensation Analysis', description: 'Beyond base salary - get insights into benefits, bonuses, and complete compensation packages.' },
    ],
    includedItems: [
        "Comprehensive salary benchmarking report",
        "Industry-specific compensation data",
        "Benefits and perks analysis",
        "Market trend insights and projections",
        "Position-level salary bands",
        "Geographic compensation variations",
        "Executive summary with recommendations",
        "6-month data update access",
    ],
    processSteps: [
        {
            title: 'Data Collection',
            description: 'Gather comprehensive compensation data from organizations across various industries through confidential surveys and partnerships.'
        },
        {
            title: 'Analysis & Validation',
            description: 'Rigorous data analysis and validation process to ensure accuracy and remove outliers for reliable benchmarking.'
        },
        {
            title: 'Segmentation',
            description: 'Organize data by industry, company size, job level, and geographic location for precise comparison insights.'
        },
        {
            title: 'Report Generation',
            description: 'Create detailed reports with clear visualizations, trend analysis, and actionable recommendations for your organization.'
        },
        {
            title: 'Customization',
            description: 'Tailor reports to your specific industry, company size, and roles to provide the most relevant benchmarking data.'
        },
        {
            title: 'Delivery & Support',
            description: 'Deliver comprehensive reports with consultation sessions to help interpret data and implement compensation strategies.'
        },
    ],

    valueProposition: {
        title: "Salary Survey Packages",
        description: "Choose the package that best fits your organization's needs. All packages include detailed analysis and consultation support.",
        items: [
            "Basic Industry Report: $599",
            "Comprehensive Multi-Industry Analysis: $1,299",
            "Custom Enterprise Survey: $2,499",
            "All packages include consultation sessions",
        ]
    },

    finalCTA: {
        title: "Ready to Make Data-Driven Compensation Decisions?",
        description: "Join leading organizations in Laos who rely on our salary survey data to build competitive compensation strategies. Get your comprehensive report today.",
        buttonText: "Get Salary Survey Report",
        buttonLink: "/contact#consultation",
    }
};