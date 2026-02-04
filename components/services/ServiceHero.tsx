// components/services/ServiceHero.tsx
import Link from 'next/link';

interface ServiceHeroProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    buttonText: string;
    buttonLink: string;
    secondaryButtonText?: string;
    onSecondaryButtonClick?: () => void;
    secondaryButtonLink?: string;
}

export default function ServiceHero({
    title,
    description,
    icon,
    buttonText,
    buttonLink,
    secondaryButtonText,
    onSecondaryButtonClick,
    secondaryButtonLink
}: ServiceHeroProps) {
    return (
        <section className="relative bg-gradient-to-br from-brand-blue-700 to-brand-blue-500 text-white py-16 md:py-20 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
            <div className="container relative z-10 grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2 text-center md:text-left">
                    <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-4">{title}</h1>
                    <p className="text-lg lg:text-xl text-slate-200 mb-8 max-w-3xl mx-auto md:mx-0">{description}</p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <Link href={buttonLink} className="inline-block bg-white text-brand-blue-600 font-bold px-8 py-3 rounded-lg hover:bg-slate-100 transition-colors">
                            {buttonText}
                        </Link>
                        {secondaryButtonText && (buttonLink || onSecondaryButtonClick || secondaryButtonLink) && (
                            secondaryButtonLink ? (
                                <Link
                                    href={secondaryButtonLink}
                                    className="inline-block bg-transparent border-2 border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    {secondaryButtonText}
                                </Link>
                            ) : (
                                <button
                                    onClick={onSecondaryButtonClick}
                                    className="inline-block bg-transparent border-2 border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    {secondaryButtonText}
                                </button>
                            )
                        )}
                    </div>
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