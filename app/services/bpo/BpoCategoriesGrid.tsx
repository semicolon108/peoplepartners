// app/services/bpo/BpoCategoriesGrid.tsx

// Define the type for a single category item
interface Category {
    icon: React.ReactNode;
    title: string;
    services: string[];
}

// Define the props for the component
interface BpoCategoriesGridProps {
    categories: Category[];
}

export default function BpoCategoriesGrid({ categories }: BpoCategoriesGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map(category => (
                <div key={category.title} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-shadow hover:shadow-lg">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-brand-blue-light text-white rounded-lg flex items-center justify-center flex-shrink-0">
                            {category.icon}
                        </div>
                        <h3 className="font-semibold text-lg text-brand-blue-dark">{category.title}</h3>
                    </div>
                    <ul className="text-brand-gray text-sm space-y-2">
                        {category.services.map(service => (
                            <li key={service} className="flex items-start gap-2">
                                <span className="text-brand-blue mt-1">▶</span>
                                <span className="mt-1">{service}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}