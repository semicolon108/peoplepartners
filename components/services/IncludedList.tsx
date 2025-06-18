// components/services/IncludedList.tsx
import { Check } from 'lucide-react';

interface IncludedListProps {
    items: string[];
}

export default function IncludedList({ items }: IncludedListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-brand-gray">{item}</span>
                </div>
            ))}
        </div>
    );
}