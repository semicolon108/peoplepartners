// app/careers/[hash]/not-found.tsx
import Link from 'next/link';
import { Briefcase } from 'lucide-react';
import Breadcrumb from '@/components/services/Breadcrumb';

export default function NotFound() {
    return (
        <div className="pt-20">
            <Breadcrumb pageTitle="Job Not Found" />
            <main className="py-20 bg-brand-gray-50 min-h-screen">
                <div className="container max-w-2xl text-center">
                    <div className="bg-white p-12 rounded-2xl shadow-lg">
                        <div className="w-16 h-16 bg-brand-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Briefcase className="w-8 h-8 text-brand-gray-500" />
                        </div>
                        <h1 className="text-3xl font-bold text-brand-blue-900 mb-4">
                            Job Not Found
                        </h1>
                        <p className="text-brand-gray-600 mb-8">
                            The job position you&apos;re looking for doesn&apos;t exist or may have been removed.
                        </p>
                        <Link
                            href="/careers"
                            className="inline-block bg-gradient-to-r from-brand-blue-700 to-brand-blue-500 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all"
                        >
                            View All Open Positions
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}