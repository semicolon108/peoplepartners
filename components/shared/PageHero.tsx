// components/shared/PageHero.tsx

interface PageHeroProps {
    title: string;
    subtitle: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
    return (
        <section className="relative bg-gradient-to-br from-brand-blue-700 to-brand-blue-500 text-white py-16 md:py-20 overflow-hidden text-center">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
            <div className="container relative z-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 py-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    {title}
                </h1>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                    {subtitle}
                </p>
            </div>
        </section>
    );
}