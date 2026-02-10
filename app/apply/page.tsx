import { Award, Briefcase, UserPlus } from 'lucide-react';
import Breadcrumb from '@/components/services/Breadcrumb';
import PageHero from '@/components/shared/PageHero';
import Link from 'next/link';
import Image from 'next/image';

interface SelectionCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    href: string;
    colorClass: string;
    target?: string | undefined;
    imageSrc?: string;
}

const SelectionCard = ({ title, description, icon, href, colorClass, target, imageSrc }: SelectionCardProps) => (
    <Link
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className="group relative flex flex-col items-center p-8 bg-white rounded-2xl shadow-soft hover:shadow-hard border border-brand-gray-100 hover:border-brand-blue-200 transition-all duration-300 transform hover:-translate-y-2 h-full"
    >
        {imageSrc ? (
            <div className="relative w-40 h-40 mb-6 group-hover:scale-105 transition-transform duration-300 rounded-full overflow-hidden border-4 border-brand-blue-50">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>
        ) : (
            <div className={`p-4 rounded-full ${colorClass} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {icon}
            </div>
        )}

        <h3 className="text-xl font-bold text-brand-gray-900 mb-3 text-center group-hover:text-brand-blue-700 transition-colors">
            {title}
        </h3>
        <p className="text-brand-gray-600 text-center leading-relaxed mb-auto">
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
            href: "https://www.careers-page.com/ppl/job/8X3Y878V/apply",
            colorClass: "bg-gradient-to-br from-amber-500 to-amber-600",
            imageSrc: "/images/careers_3D/executive.png",
        },
        {
            title: "Mid & Senior Level",
            description: "Specialized positions for professionals ready to take the next step in their career.",
            icon: <Briefcase size={32} />,
            href: "https://www.careers-page.com/ppl/job/5WYVX473/apply",
            colorClass: "bg-gradient-to-br from-brand-blue-500 to-brand-blue-600",
            imageSrc: "/images/careers_3D/mid-level.png",
        },

        {
            title: "ວຽກໃຊ້ທັກສະຝີມື ແລະ ແຮງງານ",
            description: "ເລີ່ມຕົ້ນການເດີນທາງຂອງທ່ານກັບພວກເຮົາ. ບໍ່ຈຳເປັນຕ້ອງໃຊ້ພາສາອັງກິດສຳລັບວຽກເຫຼົ່ານີ້.",
            icon: <UserPlus size={32} />,
            href: "https://www.careers-page.com/ppl/job/L79W8YW5/apply",
            colorClass: "bg-gradient-to-br from-emerald-500 to-emerald-600",
            imageSrc: "/images/careers_3D/entry-level.png",
        },
    ];

    return (
        <div className="pt-20">
            <Breadcrumb pageTitle="Apply" />
            <PageHero
                title="ເລີ່ມຕົ້ນການເດີນທາງຂອງທ່ານ"
                subtitle="ເລືອກເສັ້ນທາງທີ່ດີທີ່ສຸດໃຫ້ເໝາະສົມກັບປະສົບການ ແລະ ເປົ້າໝາຍໃນອາຊີບຂອງທ່ານ."
            />

            <main className="py-20 bg-brand-gray-50">
                <div className="container px-4 md:px-6">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                        {cards.map((card, index) => (
                            <SelectionCard key={index} {...card} target={card.href.startsWith('http') ? "_blank" : undefined} />
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
