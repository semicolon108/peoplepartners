// app/services/bpo/page.tsx
import Breadcrumb from '@/components/services/Breadcrumb';
import ServiceHero from '@/components/services/ServiceHero';
import FeaturesGrid from '@/components/services/FeaturesGrid';
import ProcessTimeline from '@/components/services/ProcessTimeline';
import IncludedList from '@/components/services/IncludedList';
import ValueProposition from '@/components/services/ValueProposition';
import ServiceCTA from '@/components/shared/CTA';
import { serviceData } from './data';
import BpoCategoriesGrid from './BpoCategoriesGrid';

export default function BPOPage() {
    return (
        <div className="pt-20">
            <Breadcrumb pageTitle={serviceData.title} />
            <ServiceHero
                title={serviceData.title}
                description={serviceData.description}
                icon={serviceData.heroIcon}
                buttonText="Get BPO Assessment"
                buttonLink="/contact#consultation"
            />
            <main>
                <section className="py-20 bg-white">
                    <div className="container">
                        <h2 className="text-3xl font-bold text-center mb-12 text-brand-blue-dark">Transform Your Business Operations</h2>
                        <FeaturesGrid features={serviceData.features} />
                    </div>
                </section>
                <section className="py-20 bg-brand-gray-light">
                    <div className="container">
                        <h2 className="text-3xl font-bold text-center mb-12 text-brand-blue-dark">Our BPO Service Categories</h2>
                        <BpoCategoriesGrid categories={serviceData.bpoCategories} />
                    </div>
                </section>
                <section className="py-20 bg-brand-gray-light">
                    <div className="container">
                        <h2 className="text-3xl font-bold text-center mb-12 text-brand-blue-dark">What&apos;s Included</h2>
                        <IncludedList items={serviceData.includedItems} />
                    </div>
                </section>
                <section className="py-20 bg-white">
                    <div className="container">
                        <h2 className="text-3xl font-bold text-center mb-12 text-brand-blue-dark">Our BPO Implementation Process</h2>
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