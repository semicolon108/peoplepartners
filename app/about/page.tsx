// app/about/page.tsx
import Breadcrumb from '@/components/services/Breadcrumb';
import ServiceHero from '@/components/services/ServiceHero';
import CTA from '@/components/shared/CTA';
import { serviceData } from './data';
import type { Metadata } from 'next';
import Testimonials from '@/components/shared/Testimonials';


export const metadata: Metadata = {
    title: 'About Us | People Partners Lao',
    description: 'Learn about our story, our expert team, and why People Partners Lao is the leading HR partner for businesses in Laos.',
};

export default function AboutPage() {
    return (
        <div className="pt-20">
            {" "}
            {/* Offset for fixed header */}
            <Breadcrumb pageTitle={serviceData.title} />
            <ServiceHero
                title={serviceData.hero.title}
                description={serviceData.hero.description}
                icon={serviceData.hero.icon}
                buttonText={serviceData.hero.buttonText}
                buttonLink={serviceData.hero.buttonLink}
            />
            <main>
                {/* Our Story Section */}
                <section className="py-20 bg-white">
                    <div className="container">
                        <h2 className="text-3xl font-bold text-center mb-16 text-brand-blue-900">
                            Our Story
                        </h2>
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-semibold text-brand-blue-900">
                                    Built on Trust, Driven by Excellence
                                </h3>
                                <p className="text-brand-gray-600">
                                    People Partners Lao was established as the sister company of
                                    108Jobs, Laos&apos; No. 1 job portal since 2011. Born from
                                    the vision to bridge the gap between international business
                                    needs and local HR expertise, we have been serving the Lao
                                    market for over a decade.
                                </p>
                                <p className="text-brand-gray-600">
                                    Our journey began with a simple mission: to empower
                                    businesses to thrive in Laos by handling their most complex
                                    HR challenges. Today, we are proud to be the trusted partner
                                    of multinational corporations and growing businesses across
                                    various industries.
                                </p>
                                <p className="text-brand-gray-600">
                                    What sets us apart is our unique position as both a local
                                    expert and international service provider. We understand the
                                    nuances of Lao business culture while maintaining the
                                    highest global standards in HR service delivery.
                                </p>
                            </div>
                            <div className="bg-brand-gray-50 p-8 rounded-xl border-l-4 border-brand-blue-700 space-y-6">
                                {serviceData.storyHighlights.map((highlight) => (
                                    <div
                                        key={highlight.title}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="w-12 h-12 bg-gradient-to-br from-brand-blue-700 to-brand-blue-500 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                                            {highlight.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-brand-blue-700">
                                                {highlight.title}
                                            </h4>
                                            <p className="text-sm text-brand-gray-500">
                                                {highlight.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="py-20 bg-brand-gray-50">
                    <div className="container">
                        <h2 className="text-3xl font-bold text-center mb-12 text-brand-blue-900">
                            Why Choose Us?
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {serviceData.uspCards.map((card) => (
                                <div
                                    key={card.title}
                                    className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-slate-100"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-brand-blue-700 to-brand-blue-500 text-white rounded-xl flex items-center justify-center mb-6">
                                        {card.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3 text-brand-blue-dark">
                                        {card.title}
                                    </h3>
                                    <p className="text-brand-gray-500">{card.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-20 bg-white">
                    <div className="container">
                        <h2 className="text-3xl font-bold text-center mb-12 text-brand-blue-900">
                            Meet Our Expert Team
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {serviceData.teamSections.map((team) => (
                                <div
                                    key={team.name}
                                    className="bg-white p-6 rounded-2xl shadow-lg text-center border border-slate-100"
                                >
                                    <div className="w-24 h-24 bg-gradient-to-br from-brand-blue-700 to-brand-blue-500 text-white rounded-full mx-auto flex items-center justify-center mb-4 text-4xl">
                                        {team.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold text-brand-blue-900">
                                        {team.name}
                                    </h3>
                                    <p className="text-brand-blue-400 font-medium mb-3 text-sm">
                                        {team.role}
                                    </p>
                                    <p className="text-brand-gray-500 text-xs leading-relaxed">
                                        {team.bio}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <Testimonials />
            </main>
            <CTA {...serviceData.finalCTA} theme="light" />
        </div>
    );
}