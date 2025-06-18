// components/shared/CTA.tsx
import Link from 'next/link';

interface CTAProps {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    theme?: 'dark' | 'light'; // Optional: for different color schemes
}

export default function CTA({ title, description, buttonText, buttonLink, theme = 'dark' }: CTAProps) {
    // Define styles based on the theme prop
    const sectionClasses = theme === 'dark'
        ? 'bg-gradient-to-br from-brand-blue-darker to-brand-blue-dark text-white'
        : 'bg-gradient-to-br from-brand-yellow-light to-brand-yellow text-white';

    const buttonClasses = theme === 'dark'
        ? 'bg-gradient-to-r from-brand-blue to-brand-blue-light text-white font-semibold'
        : 'bg-white text-brand-yellow font-bold';

    return (
        <section className={`py-16 ${sectionClasses}`}>
            <div className="container text-center">
                <h2 className="text-3xl font-bold mb-4">{title}</h2>
                <p className="text-lg text-slate-200 mb-8 max-w-2xl mx-auto">{description}</p>
                <Link
                    href={buttonLink}
                    className={`inline-block px-8 py-3 rounded-lg hover:shadow-2xl hover:-translate-y-1 transition-all ${buttonClasses}`}
                >
                    {buttonText}
                </Link>
            </div>
        </section>
    );
}