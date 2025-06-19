// components/services/Breadcrumb.tsx
import Link from 'next/link';

interface BreadcrumbProps {
    pageTitle: string;
}

export default function Breadcrumb({ pageTitle }: BreadcrumbProps) {
    return (
        <section className="bg-brand-gray-light py-10 border-b border-slate-200">
            <div className="container text-sm text-brand-gray">
                <Link href="/" className="text-brand-blue-600 hover:underline">
                    Home
                </Link>
                <span className="mx-2">&gt;</span>
                <Link href="/#services" className="text-brand-blue-600 hover:underline">
                    Services
                </Link>
                <span className="mx-2">&gt;</span>
                <span className="text-slate-500">{pageTitle}</span>
            </div>
        </section>
    );
}