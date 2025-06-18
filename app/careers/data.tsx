
// app/careers/data.tsx
import { Briefcase, Building, BookOpen } from 'lucide-react';

// Define the type for a single job
export interface Job {
    id: string;
    title: string;
    department: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Contract';
    description: string;
    responsibilities: string[];
    qualifications: string[];
    icon: React.ReactNode;
}

// Array of open positions
export const jobListings: Job[] = [
    {
        id: 'hr-consultant-01',
        title: 'HR Consultant',
        department: 'Consulting',
        location: 'Vientiane, Laos',
        type: 'Full-time',
        description: 'Join our team of expert HR consultants to provide strategic guidance and practical solutions to our diverse portfolio of clients in Laos.',
        responsibilities: [
            'Conducting HR audits and assessments for clients.',
            'Developing and implementing HR policies and procedures.',
            'Advising on Lao labor law and compliance.',
            'Managing employee relations and performance management projects.',
        ],
        qualifications: [
            'Bachelor\'s degree in Human Resources, Business, or related field.',
            '5+ years of experience in an HR generalist or consulting role.',
            'In-depth knowledge of Lao labor laws and regulations.',
            'Excellent communication and client management skills.',
            'Fluency in both Lao and English is required.',
        ],
        icon: <BookOpen />
    },
    {
        id: 'payroll-specialist-01',
        title: 'Payroll Specialist',
        department: 'Payroll & PEO Services',
        location: 'Vientiane, Laos',
        type: 'Full-time',
        description: 'We are seeking a meticulous and experienced Payroll Specialist to manage payroll processing for our clients, ensuring accuracy and full compliance.',
        responsibilities: [
            'Processing monthly payroll for multiple clients.',
            'Calculating taxes, social security, and other deductions.',
            'Preparing and distributing payslips and payroll reports.',
            'Staying up-to-date with changes in Lao tax and labor laws.',
        ],
        qualifications: [
            '3+ years of experience in payroll processing.',
            'Strong understanding of Lao tax and social security systems.',
            'High proficiency in MS Excel and payroll software.',
            'Exceptional attention to detail and organizational skills.',
        ],
        icon: <Briefcase />
    },
    {
        id: 'bpo-team-lead-01',
        title: 'BPO Team Lead',
        department: 'Business Process Outsourcing',
        location: 'Vientiane, Laos',
        type: 'Full-time',
        description: 'Lead a dynamic team providing BPO services to international clients. This role requires strong leadership and a commitment to operational excellence.',
        responsibilities: [
            'Managing day-to-day operations of a BPO team.',
            'Ensuring service level agreements (SLAs) are met.',
            'Training, coaching, and motivating team members.',
            'Acting as the main point of contact for client escalations.',
        ],
        qualifications: [
            'Proven experience in a team leadership or supervisory role, preferably in a BPO environment.',
            'Excellent command of English (both written and spoken).',
            'Strong problem-solving and decision-making abilities.',
            'Familiarity with CRM and help desk software.',
        ],
        icon: <Building />
    },
];