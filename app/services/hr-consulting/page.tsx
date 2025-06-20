// app/services/hr-consulting/page.tsx
import Breadcrumb from '@/components/services/Breadcrumb';
import ServiceHero from '@/components/services/ServiceHero';
import FeaturesGrid from '@/components/services/FeaturesGrid';
import ProcessTimeline from '@/components/services/ProcessTimeline';
import ValueProposition from '@/components/services/ValueProposition';
import ServiceCTA from '@/components/shared/CTA';
import { serviceData } from './data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'HR Consulting Services',
    description: 'Strategic HR guidance to optimize your people processes, ensure compliance, and build high-performing teams. Transform your HR function with expert consulting tailored to the Lao business environment.',
}

export default function HRConsultingPage() {
    return (
        <div className="pt-20">
            <Breadcrumb pageTitle="HR Consulting" />
            <ServiceHero
                title={serviceData.title}
                description={serviceData.description}
                icon={serviceData.heroIcon}
                buttonText="Get Strategic HR Assessment"
                buttonLink="/contact#consultation"
            />
            <main>
                <section className="py-20 bg-white">
                    <div className="container">
                        <h2 className="text-3xl font-bold text-center mb-12 text-brand-blue-900">Why Choose Our HR Consulting?</h2>
                        <FeaturesGrid features={serviceData.features} />
                    </div>
                </section>
                <section className="py-20 bg-brand-gray-50">
                    <div className="container">
                        <h2 className="text-3xl font-bold text-center mb-12 text-brand-blue-900">Our Consulting Process</h2>
                        <ProcessTimeline steps={serviceData.processSteps} />
                    </div>
                </section>
                {/* <section className="py-20 bg-brand-gray-50">
                    <div className="container">
                        <h2 className="text-3xl font-bold text-center mb-12 text-brand-blue-900">What&apos;s Included</h2>
                        <IncludedList items={serviceData.includedItems} />
                    </div>
                </section> */}
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