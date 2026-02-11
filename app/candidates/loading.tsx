
import PageHero from '@/components/shared/PageHero';
import Breadcrumb from '@/components/services/Breadcrumb';

export default function Loading() {
    return (
        <div className="pt-20">
            <Breadcrumb pageTitle="InstaTalent" />
            <PageHero
                title="Exceptional Talent, Ready to Hire"
                subtitle="Browse our curated InstaTalent pool of experienced professionals who are available for immediate opportunities."
            />

            <main className="py-20 bg-brand-gray-50">
                <div className="container">
                    <div className="mb-12 max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-200 bg-gray-200 animate-pulse rounded-md mb-4 w-1/2 mx-auto">
                            &nbsp;
                        </h2>
                        <div className="h-4 bg-gray-200 animate-pulse rounded max-w-lg mx-auto mb-2"></div>
                        <div className="h-4 bg-gray-200 animate-pulse rounded max-w-md mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white rounded-xl shadow-soft border border-brand-gray-200 p-6 h-full">
                                <div className="flex justify-between mb-4">
                                    <div className="h-4 bg-gray-100 rounded w-1/3 animate-pulse"></div>
                                    <div className="h-4 bg-gray-100 rounded w-1/4 animate-pulse"></div>
                                </div>
                                <div className="h-6 bg-gray-100 rounded w-2/3 mb-4 animate-pulse"></div>
                                <div className="space-y-2 mb-6">
                                    <div className="h-3 bg-gray-50 rounded w-full animate-pulse"></div>
                                    <div className="h-3 bg-gray-50 rounded w-full animate-pulse"></div>
                                    <div className="h-3 bg-gray-50 rounded w-2/3 animate-pulse"></div>
                                </div>
                                <div className="h-10 bg-gray-100 rounded w-full animate-pulse mt-auto"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
