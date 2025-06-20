// app/services/visa/page.tsx
import Breadcrumb from '@/components/services/Breadcrumb';
import ServiceHero from '@/components/services/ServiceHero';
import FeaturesGrid from '@/components/services/FeaturesGrid';
import ProcessTimeline from '@/components/services/ProcessTimeline';
import ValueProposition from '@/components/services/ValueProposition';
import ServiceCTA from '@/components/shared/CTA';
import { serviceData } from './data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Visa & Immigration Services',
    description: 'Complete visa and work permit assistance for international employees entering Laos. We navigate the complex immigration process so your team can focus on what matters most - your business.',
}

export default function VisaPage() {
    return (
        <div className="pt-20">
            <Breadcrumb pageTitle="Visa & Immigration" />
            <ServiceHero
                title={serviceData.title}
                description={serviceData.description}
                icon={serviceData.heroIcon}
                buttonText="Get Visa Assessment"
                buttonLink="/contact#consultation"
            />
            <main>
                <section className="py-20 bg-white">
                    <div className="container">
                        <h2 className="text-3xl font-bold text-center mb-12 text-brand-blue-900">Navigate Lao Immigration with Confidence</h2>
                        <FeaturesGrid features={serviceData.features} />
                    </div>
                </section>
                {/* <section className="py-20 bg-brand-gray-50">
                    <div className="container">
                        <h2 className="text-3xl font-bold text-center mb-12 text-brand-blue-900">What&apos;s Included</h2>
                        <IncludedList items={serviceData.includedItems} />
                    </div>
                </section> */}

                <section className="py-20 bg-white">
                    <div className="container">
                        <h2 className="text-3xl font-bold text-center mb-12 text-brand-blue-900">Our Visa and Immigration Process</h2>
                        <ProcessTimeline steps={serviceData.processSteps} />
                    </div>
                </section>
                <section className="py-20 bg-brand-gray-50">
                    <div className="container">
                        <ValueProposition {...serviceData.valueProposition} />
                    </div>
                </section>
            </main>
            <ServiceCTA {...serviceData.finalCTA} />
        </div>
    );
}