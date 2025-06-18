// components/home/Services.tsx
import Link from 'next/link';
import { Briefcase, Building, Settings, Search, TrendingUp, BookOpen, TramFront } from 'lucide-react';

const servicesData = [
    { icon: <Briefcase size={28} />, title: 'Payroll Services', desc: 'Complete payroll management with full compliance to Lao labor laws. Monthly processing, tax filings, and social security administration.', href: '/services/payroll' },
    { icon: <Building size={28} />, title: 'PEO / Employer of Record', desc: 'Enter the Lao market without establishing a legal entity. We handle all employment responsibilities while you focus on business growth.', href: '/services/peo' },
    { icon: <Settings size={28} />, title: 'Business Process Outsourcing', desc: 'Streamline your operations by outsourcing non-core HR functions to our expert team, reducing costs and improving efficiency.', href: '/services/bpo' },
    { icon: <Search size={28} />, title: 'Recruitment Services', desc: 'Access top talent in Laos through our extensive network and proven recruitment methodologies. Quality candidates, faster hiring.', href: '/services/recruitment' },
    { icon: <TrendingUp size={28} />, title: 'Career Transitioning', desc: 'Professional career coaching, CV optimization, and interview preparation to help individuals advance their careers in Laos.', href: '/services/career-transitioning' },
    { icon: <BookOpen size={28} />, title: 'HR Consulting', desc: 'Strategic HR guidance to optimize your people processes, ensure compliance, and build high-performing teams.', href: '/services/hr-consulting' },
    { icon: <TramFront size={28} />, title: 'Visa & Immigration', desc: 'Complete visa and work permit assistance for international employees, ensuring smooth and compliant entry into Laos.', href: '/services/visa' },
];

export default function Services() {
    return (
        <section id="services" className="py-20 bg-brand-gray-light">
            <div className="container">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-blue-dark">
                    Our Comprehensive HR Solutions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesData.map((service) => (
                        <div key={service.title} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-slate-100 flex flex-col">
                            <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-blue-light text-white rounded-xl flex items-center justify-center mb-6">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-brand-blue-dark">{service.title}</h3>
                            <p className="text-brand-gray mb-6 flex-grow">{service.desc}</p>
                            <Link href={service.href} className="text-brand-blue font-semibold hover:underline mt-auto self-start">
                                Learn more →
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}