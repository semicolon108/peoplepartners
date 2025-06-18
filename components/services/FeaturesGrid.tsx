// components/services/FeaturesGrid.tsx

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
}

interface FeaturesGridProps {
    features: Feature[];
}

export default function FeaturesGrid({ features }: FeaturesGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-brand-blue-light text-white rounded-lg flex items-center justify-center mb-4">
                        {feature.icon}
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-brand-blue-dark">{feature.title}</h3>
                    <p className="text-brand-gray text-sm">{feature.description}</p>
                </div>
            ))}
        </div>
    );
}