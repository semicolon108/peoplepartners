import Breadcrumb from '@/components/services/Breadcrumb';
import ServiceHero from '@/components/services/ServiceHero';
import FeaturesGrid from '@/components/services/FeaturesGrid';
import ProcessTimeline from '@/components/services/ProcessTimeline';
import ValueProposition from '@/components/services/ValueProposition';
import ServiceCTA from '@/components/shared/CTA';
import { serviceData } from './data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'PEO / Employer of Record',
    description: 'Enter the Lao market without establishing a legal entity. We become the legal employer of your staff while you retain full operational control, enabling rapid market entry with complete compliance.',
}

export default function PEOPage() {
    return (
        <div className="pt-20">
            <Breadcrumb pageTitle={serviceData.title} />
            <ServiceHero
                title={serviceData.title}
                description={serviceData.description}
                icon={serviceData.heroIcon}
                buttonText="Explore Market Entry Options"
                buttonLink="/contact#consultation"
            />
            <main>
                <section className="py-20 bg-white">
                    <div className="container">
                        <h2 className="text-3xl font-bold text-center mb-12 text-brand-blue-dark">Fast-Track Your Entry into Laos</h2>
                        <FeaturesGrid features={serviceData.features} />
                    </div>
                </section>
                {/* <section className="py-20 bg-brand-gray-light">
                    <div className="container">
                        <h2 className="text-3xl font-bold text-center mb-12 text-brand-blue-dark">What&apos;s Included</h2>
                        <IncludedList items={serviceData.includedItems} />
                    </div>
                </section> */}

                <section className="py-20 bg-white">
                    <div className="container">
                        <h2 className="text-3xl font-bold text-center mb-12 text-brand-blue-dark">Our PEO/EOR Process</h2>
                        <ProcessTimeline steps={serviceData.processSteps} />
                    </div>
                </section>
                <section className="py-20 bg-brand-gray-light">
                    <div className="container">
                        <ValueProposition {...serviceData.valueProposition} />
                    </div>
                </section>
            </main>
            <ServiceCTA {...serviceData.finalCTA} />
        </div>
    );
}