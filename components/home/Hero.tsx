// components/home/Hero.tsx
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative bg-gradient-to-br from-brand-blue via-brand-blue to-brand-blue-light text-white pt-40 pb-20 overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>

            <div className="container relative z-10 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    Your Expert HR Partner in Laos
                </h1>
                <p className="max-w-3xl mx-auto text-lg text-slate-300 mb-8">
                    Compliant. Efficient. Reliable. We combine unmatched local expertise with international service standards to power your business growth in Laos.
                </p>
                <Link
                    href="/contact#consultation"
                    className="inline-block bg-gradient-to-r from-brand-blue to-brand-blue-light text-white font-semibold px-8 py-3 rounded-lg text-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                    Request a Free Proposal
                </Link>
                <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 mt-16">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-blue-100">2011</div>
                        <div className="text-sm text-slate-100 opacity-80">Established</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-blue-100">20+</div>
                        <div className="text-sm text-slate-100 opacity-80">Trusted Clients</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-blue-100">250+</div>
                        <div className="text-sm text-slate-100 opacity-80">Payslips/Month</div>
                    </div>
                </div>
            </div>
        </section>
    );
}