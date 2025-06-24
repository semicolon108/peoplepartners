// app/careers/[hash]/JobDetailPage.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Clock, Share2, Check } from 'lucide-react';
import Breadcrumb from '@/components/services/Breadcrumb';
import { Job } from '../page';

interface JobDetailPageProps {
    job: Job;
    allJobs: Job[];
}

export default function JobDetailPage({ job, allJobs }: JobDetailPageProps) {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const url = window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${job.title} - People Partners Lao`,
                    text: `Check out this job opportunity: ${job.title} in ${job.department}`,
                    url: url,
                });
            } catch {
                // Fallback to clipboard if sharing fails
                copyToClipboard(url);
            }
        } else {
            copyToClipboard(url);
        }
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
        }
    };

    // Get related jobs (same department, excluding current job)
    const relatedJobs = allJobs
        .filter(j => j.department === job.department && j.id !== job.id)
        .slice(0, 3);

    return (
        <div className="pt-20">
            <Breadcrumb
                pageTitle={job.title}
                customPaths={[
                    { name: "Careers", href: "/careers" },
                    { name: job.title, href: `/careers/${job.hash}` },
                ]}
            />

            <main className="py-12 bg-brand-gray-50 min-h-screen">
                <div className="container max-w-4xl">
                    {/* Back button */}
                    <Link
                        href="/careers"
                        className="inline-flex items-center gap-2 text-brand-blue-600 hover:text-brand-blue-700 mb-6 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Back to All Jobs
                    </Link>

                    {/* Job detail card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-brand-blue-700 to-brand-blue-500 p-6 sm:p-8 text-white">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-white">
                                        {job.icon}
                                    </div>
                                    <div>
                                        <h1 className="text-xl sm:text-2xl font-bold mb-2">
                                            {job.title}
                                        </h1>
                                        <p className="text-white/90 text-base mb-4">
                                            {job.department}
                                        </p>
                                        <div className="flex flex-wrap gap-3 text-sm">
                                            <span className="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full">
                                                <MapPin size={14} /> {job.location}
                                            </span>
                                            <span className="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full">
                                                <Clock size={14} /> {job.type}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Share button */}
                                <button
                                    onClick={handleShare}
                                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors text-sm"
                                >
                                    {copied ? <Check size={16} /> : <Share2 size={16} />}
                                    {copied ? "Copied!" : "Share"}
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 sm:p-8">
                            {/* Job description */}
                            <div
                                className="prose prose-slate max-w-none prose-p:my-4 prose-ul:my-4 prose-li:my-2 prose-h3:text-base prose-h3:font-semibold prose-h3:text-brand-blue-900 prose-h4:font-semibold prose-h4:text-brand-blue-800 prose-h4:mb-3 mb-8"
                                dangerouslySetInnerHTML={{ __html: job.description }}
                            />

                            {/* Apply button */}
                            <div className="border-t border-slate-200 pt-6">
                                <Link
                                    href={job.applyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-gradient-to-r from-brand-blue-700 to-brand-blue-500 text-white font-semibold py-4 px-8 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all text-lg"
                                >
                                    Apply for this Position
                                </Link>
                                <p className="text-sm text-brand-gray-500 mt-3">
                                    Application opens in a new window
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Related jobs */}
                    {relatedJobs.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-xl sm:text-2xl font-bold text-brand-blue-900 mb-6">
                                Other {job.department} Positions
                            </h2>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {relatedJobs.map((relatedJob) => (
                                    <Link
                                        key={relatedJob.id}
                                        href={`/careers/${relatedJob.hash}`}
                                        className="bg-white p-6 rounded-xl border border-slate-200 hover:border-brand-blue-300 hover:shadow-md transition-all group"
                                    >
                                        <div className="flex items-start gap-3 mb-4">
                                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-brand-blue-100 to-brand-blue-200 rounded-lg flex items-center justify-center text-brand-blue-700 group-hover:from-brand-blue-200 group-hover:to-brand-blue-300 transition-all">
                                                {relatedJob.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-base font-semibold text-brand-blue-900 group-hover:text-brand-blue-700 transition-colors line-clamp-2">
                                                    {relatedJob.title}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-brand-gray-500">
                                            <span className="flex items-center gap-1">
                                                <MapPin size={12} /> {relatedJob.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={12} /> {relatedJob.type}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
