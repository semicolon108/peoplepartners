import Link from 'next/link';
import PageHero from '@/components/shared/PageHero';
import Breadcrumb from '@/components/services/Breadcrumb';
import { getAllNews } from '@/lib/news';
import { Calendar, ChevronRight } from 'lucide-react';

export const metadata = {
    title: 'News & Insights - People Partners Lao',
    description: 'Latest updates on Lao Labor Law, Social Security, and HR compliance.',
};

export default function NewsPage() {
    const allNews = getAllNews();
    const pageTitle = "Insights & Legal Updates";

    return (
        <div className="pt-20">
            <Breadcrumb pageTitle={pageTitle} />
            <PageHero
                title={pageTitle}
                subtitle="Stay informed with the latest updates on Lao Labor Law, Social Security, and HR best practices."
            />

            <section className="py-20 bg-brand-gray-50">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {allNews.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/news/${post.slug}`}
                                className="group bg-white rounded-2xl overflow-hidden border border-brand-gray-200 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 block"
                            >
                                <div className="p-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="px-3 py-1 bg-brand-blue-50 text-brand-blue-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                                            {post.category}
                                        </span>
                                        <span className="flex items-center text-sm text-brand-gray-400">
                                            <Calendar className="w-3 h-3 mr-1" />
                                            {post.date}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-brand-gray-900 mb-3 group-hover:text-brand-blue-600 transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-brand-gray-500 mb-6 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center text-brand-blue-600 font-medium">
                                        Read Article <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {allNews.length === 0 && (
                        <div className="text-center py-20 text-brand-gray-400">
                            <p>No updates available at the moment.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-20 bg-white border-t border-brand-gray-100">
                <div className="container max-w-4xl text-center">
                    <h2 className="text-3xl font-bold text-brand-blue-900 mb-4">
                        Don&apos;t Miss Important Legal Changes
                    </h2>
                    <p className="text-brand-gray-500 mb-8">
                        Subscribe to get critical Lao Labor Law updates delivered directly to your inbox.
                    </p>
                    <form className="max-w-md mx-auto flex gap-3">
                        <input
                            type="email"
                            placeholder="Enter your work email"
                            className="flex-1 px-4 py-3 rounded-lg border border-brand-gray-300 focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent outline-none"
                            required
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 bg-brand-blue-600 text-white font-semibold rounded-lg hover:bg-brand-blue-700 transition-colors"
                        >
                            Subscribe
                        </button>
                    </form>
                    <p className="mt-4 text-xs text-brand-gray-400">
                        We respect your inbox. Unsubscribe at any time.
                    </p>
                </div>
            </section>
        </div>
    );
}
