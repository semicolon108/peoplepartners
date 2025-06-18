
import { Search, Globe, Target, Zap, CheckCircle } from 'lucide-react';

export const serviceData = {
    title: 'Recruitment Services',
    description: 'Access top talent in Laos through our extensive network and proven recruitment methodologies. Leverage 108Jobs\' platform and our deep local expertise to find quality candidates faster.',
    heroIcon: <Search />,
    features: [
        { icon: <Globe />, title: '108Jobs Network', description: 'Exclusive access to Laos\' largest job portal with thousands of active candidates across all industries and experience levels.' },
        { icon: <Target />, title: 'Targeted Sourcing', description: 'Advanced candidate matching using AI-powered algorithms and human expertise to identify the perfect fit for your roles.' },
        { icon: <Zap />, title: 'Faster Hiring', description: 'Our streamlined recruitment process reduces time-to-hire by an average of 40% while maintaining quality standards.' },
        { icon: <CheckCircle />, title: 'Quality Guarantee', description: 'Rigorous screening process with a replacement guarantee to ensure the long-term success of your new hires.' },
    ],
    processSteps: [
        { title: 'Requirements Analysis', description: 'In-depth consultation to understand role requirements, company culture, and ideal candidate profile.' },
        { title: 'Candidate Sourcing', description: 'Multi-channel sourcing using the 108Jobs database, social media, and our extensive professional network.' },
        { title: 'Screening & Assessment', description: 'Comprehensive screening including interviews, skills testing, and cultural fit assessment.' },
        { title: 'Client Presentation', description: 'A shortlist presentation with detailed candidate profiles and our professional recommendation rationale.' },
        { title: 'Interview & Offer Support', description: 'Full coordination of interviews, feedback collection, and offer negotiation to ensure a successful placement.' },
        { title: 'Post-Placement Follow-up', description: 'Ongoing support and regular check-ins to ensure successful integration and long-term satisfaction.' },
    ],
    includedItems: [
        "Job posting on 108Jobs platform",
        "Active candidate sourcing & headhunting",
        "CV screening & initial interviews",
        "Skills assessment & testing",
        "Reference & background checks",
        "Interview coordination & scheduling",
        "Salary negotiation support",
        "60-day replacement guarantee",
    ],

    valueProposition: {
        title: "Transparent Fee Structure",
        description: "Our recruitment fees are competitive and based on successful placements. No upfront costs for contingency recruitment. Volume discounts are available.",
        items: [
            "Junior Roles: 15-18% of annual salary",
            "Mid-Level Roles: 18-22% of annual salary",
            "Senior/Executive: 22-25% of annual salary",
            "Specialized & Niche Roles: Custom pricing",
        ]
    },

    finalCTA: {
        title: "Ready to Find Your Next Great Hire?",
        description: "Access Laos' top talent through our proven recruitment process. Let's discuss your hiring needs and how we can help you build a winning team.",
        buttonText: "Start Your Search Today",
        buttonLink: "/contact#consultation",
    }
};