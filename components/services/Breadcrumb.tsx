// components/services/Breadcrumb.tsx
import Link from 'next/link';

interface BreadcrumbPath {
    name: string;
    href: string;
}
interface BreadcrumbProps {
    pageTitle: string;
    customPaths?: BreadcrumbPath[];
}

export default function Breadcrumb({ pageTitle, customPaths = [] }: BreadcrumbProps) {
    return (
        <section className="bg-brand-gray-50 py-10 border-b border-slate-200">
            <div className="container text-sm text-brand-gray-500 flex items-center flex-wrap">
                <Link href="/" className="text-brand-blue-600 hover:underline">
                    Home
                </Link>

                {customPaths.map((path, index) => (
                    <div key={index} className="flex items-center">
                        <span className="mx-2">&gt;</span>
                        <Link href={path.href} className="text-brand-blue-600 hover:underline">
                            {path.name}
                        </Link>
                    </div>
                ))}

                <span className="mx-2">&gt;</span>
                <span className="text-slate-500 font-medium">{pageTitle}</span>
            </div>
        </section>
    );
}