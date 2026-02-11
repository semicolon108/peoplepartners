import { getNewsBySlug, getAllNews } from '@/lib/news';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Breadcrumb from '@/components/services/Breadcrumb';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = getAllNews();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const post = getNewsBySlug(slug);

    if (!post) {
        return {
            title: 'Article Not Found',
        };
    }

    return {
        title: `${post.title} - People Partners Laos`,
        description: post.excerpt,
    };
}

export default async function NewsPost({ params }: PageProps) {
    const { slug } = await params;
    const post = getNewsBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="pt-20 bg-white">
            <Breadcrumb
                pageTitle={post.title}
                customPaths={[{ name: "News & Insights", href: "/news" }]}
            />

            <main className="py-16 md:py-24">
                <div className="container max-w-4xl">
                    <Link
                        href="/news"
                        className="inline-flex items-center text-sm text-brand-gray-500 hover:text-brand-blue-600 mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to News
                    </Link>

                    <article>
                        {/* Header */}
                        <header className="mb-12">
                            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                                <span className="px-3 py-1 bg-brand-blue-50 text-brand-blue-700 font-semibold rounded-full">
                                    {post.category}
                                </span>
                                <span className="flex items-center text-brand-gray-500">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {post.date}
                                </span>
                                <span className="flex items-center text-brand-gray-500">
                                    <User className="w-4 h-4 mr-2" />
                                    {post.author}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-900 mb-6 leading-tight">
                                {post.title}
                            </h1>
                            <p className="text-xl text-brand-gray-500 leading-relaxed font-light">
                                {post.excerpt}
                            </p>
                        </header>

                        <hr className="border-brand-gray-100 mb-12" />

                        {/* Content */}
                        <div className="prose prose-lg prose-blue max-w-none text-brand-gray-700">
                            <ReactMarkdown>
                                {post.content}
                            </ReactMarkdown>
                        </div>
                    </article>

                    {/* Footer CTA */}
                    <div className="mt-20 p-8 bg-brand-gray-50 rounded-2xl border border-brand-gray-100 text-center">
                        <h3 className="text-2xl font-bold text-brand-blue-900 mb-4">
                            Need Expert Advice on this Topic?
                        </h3>
                        <p className="text-brand-gray-600 mb-8 max-w-2xl mx-auto">
                            Our consultants are ready to help you navigate these regulations. Book a free consultation today.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block px-8 py-3 bg-brand-blue-600 text-white font-semibold rounded-full hover:bg-brand-blue-700 transition-colors shadow-lg hover:shadow-xl"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
