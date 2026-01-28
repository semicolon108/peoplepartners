import { Award, Briefcase, UserPlus } from 'lucide-react';
import Breadcrumb from '@/components/services/Breadcrumb';
import PageHero from '@/components/shared/PageHero';
import Link from 'next/link';

interface SelectionCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    href: string;
    colorClass: string;
}

const SelectionCard = ({ title, description, icon, href, colorClass }: SelectionCardProps) => (
    <Link
        href={href}
        className="group relative flex flex-col items-center p-8 bg-white rounded-2xl shadow-soft hover:shadow-hard border border-brand-gray-100 hover:border-brand-blue-200 transition-all duration-300 transform hover:-translate-y-2"
    >
        <div className={`p-4 rounded-full ${colorClass} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
            {icon}
        </div>
        <h3 className="text-xl font-bold text-brand-gray-900 mb-3 text-center group-hover:text-brand-blue-700 transition-colors">
            {title}
        </h3>
        <p className="text-brand-gray-600 text-center leading-relaxed">
            {description}
        </p>
        <div className="mt-6 flex items-center text-brand-blue-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Apply Now <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </div>
    </Link>
);

export default function ApplyPage() {
    const cards = [
        {
            title: "Executive & C-Level",
            description: "Leadership roles for experienced executives driving business strategy and growth.",
            icon: <Award size={32} />,
            href: "#", // Placeholder
            colorClass: "bg-gradient-to-br from-amber-500 to-amber-600",
        },
        {
            title: "Mid & Senior Level",
            description: "Specialized positions for professionals ready to take the next step in their career.",
            icon: <Briefcase size={32} />,
            href: "#", // Placeholder
            colorClass: "bg-gradient-to-br from-brand-blue-500 to-brand-blue-600",
        },

        {
            title: "Entry Level & Operations",
            description: "Start your journey with us. No English language requirement for these roles.",
            icon: <UserPlus size={32} />,
            href: "#", // Placeholder
            colorClass: "bg-gradient-to-br from-emerald-500 to-emerald-600",
        },
    ];

    return (
        <div className="pt-20">
            <Breadcrumb pageTitle="Apply" />
            <PageHero
                title="Start Your Journey"
                subtitle="Select the path that best matches your experience and career goals."
            />

            <main className="py-20 bg-brand-gray-50">
                <div className="container px-4 md:px-6">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                        {cards.map((card, index) => (
                            <SelectionCard key={index} {...card} />
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <p className="text-brand-gray-500">
                            Not sure which path to choose?{' '}
                            <Link href="/careers" className="text-brand-blue-600 hover:text-brand-blue-700 font-medium underline">
                                View all open positions
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
