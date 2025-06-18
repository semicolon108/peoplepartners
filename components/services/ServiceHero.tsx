// components/services/ServiceHero.tsx
import Link from 'next/link';

interface ServiceHeroProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    buttonText: string;
    buttonLink: string;
}

export default function ServiceHero({ title, description, icon, buttonText, buttonLink }: ServiceHeroProps) {
    return (
        <section className="relative bg-gradient-to-br from-brand-blue to-brand-blue-light text-white py-16 md:py-20 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
            <div className="container relative z-10 grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                    <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-4">{title}</h1>
                    <p className="text-lg lg:text-xl text-slate-200 mb-8 max-w-3xl">{description}</p>
                    <Link href={buttonLink} className="inline-block bg-white text-brand-blue font-bold px-8 py-3 rounded-lg hover:bg-slate-100 transition-colors">
                        {buttonText}
                    </Link>
                </div>
                <div className="hidden md:flex justify-center items-center">
                    <div className="w-32 h-32 bg-white/20 backdrop-blur-lg rounded-3xl flex items-center justify-center text-6xl border border-white/30">
                        {icon}
                    </div>
                </div>
            </div>
        </section>
    );
}