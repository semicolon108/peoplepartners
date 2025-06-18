// components/services/ValueProposition.tsx
import { HandCoins } from 'lucide-react';

interface ValuePropositionProps {
    title: string;
    description: string;
    items: string[];
}

export default function ValueProposition({ title, description, items }: ValuePropositionProps) {
    return (
        <div className="bg-white p-8 md:p-12 rounded-xl border-2 border-slate-200">
            <div className="text-center mb-8">
                <div className="inline-block bg-gradient-to-r from-brand-yellow-light to-brand-yellow text-white font-semibold px-4 py-1 rounded-full mb-4">
                    Competitive Pricing
                </div>
                <h3 className="text-2xl font-bold text-brand-blue-dark mb-2">{title}</h3>
                <p className="text-brand-gray max-w-2xl mx-auto">{description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-brand-gray-light rounded-lg">
                        <HandCoins className="w-5 h-5 text-brand-blue flex-shrink-0" />
                        <span className="text-slate-700">{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}