
import PageHero from '@/components/shared/PageHero';
import Breadcrumb from '@/components/services/Breadcrumb';
import CandidateListClient from '@/components/candidates/CandidateListClient';
import { getCandidates } from '@/lib/googleSheets';

export const metadata = {
    title: 'Highlight Candidates | People Partners Lao',
    description: 'Explore our curated list of experienced professionals ready for their next opportunity.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CandidatesPage() {
    const candidates = await getCandidates();

    return (
        <div className="pt-20">
            <Breadcrumb pageTitle="Highlight Candidates" />
            <PageHero
                title="Exceptional Talent, Ready to Hire"
                subtitle="Browse our curated selection of experienced professionals who are available for immediate opportunities."
            />

            <main className="py-20 bg-brand-gray-50">
                <div className="container">
                    <div className="mb-12 max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-brand-gray-900 mb-4">
                            Featured Candidates
                        </h2>
                        <p className="text-lg text-brand-gray-600">
                            We've pre-vetted these candidates for their skills and experience. Select multiple profiles and request interviews directly.
                        </p>
                    </div>

                    <CandidateListClient initialCandidates={candidates} />
                </div>
            </main>

            {/* Optional: Add a CTA section here for employers to post jobs if they don't see what they like */}
            <section className="py-20 bg-white border-t border-brand-gray-200">
                <div className="container">
                    <div className="bg-brand-blue-600 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 pointer-events-none"></div>

                        <h3 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">
                            Looking for someone specific?
                        </h3>
                        <p className="text-blue-100 mb-8 max-w-2xl mx-auto relative z-10">
                            Our Highlight Candidates are just a glimpse of our talent pool. efficient recruitment services can help you find the perfect match for any role.
                        </p>
                        <a
                            href="/contact"
                            className="inline-block bg-white text-brand-blue-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all transform hover:-translate-y-1 relative z-10"
                        >
                            Contact Us for Custom Recruitment
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
