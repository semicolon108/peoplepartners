
'use client';

import { Candidate } from '@/lib/googleSheets';
import { Check, UserRoundPlus } from 'lucide-react';

interface CandidateCardProps {
    candidate: Candidate;
    isSelected: boolean;
    onToggleSelection: () => void;
    onRequestInterview: () => void;
}

export default function CandidateCard({ candidate, isSelected, onToggleSelection, onRequestInterview }: CandidateCardProps) {
    return (
        <div
            className={`
                relative bg-white rounded-xl border p-6 flex flex-col h-full transition-all duration-300 group
                ${isSelected ? 'border-brand-blue-500 shadow-md ring-1 ring-brand-blue-500' : 'border-brand-gray-200 shadow-soft hover:shadow-lg'}
            `}
        >
            {/* Selection Checkbox Overlay */}
            <div className="absolute top-4 right-4 z-10">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleSelection();
                    }}
                    className={`
                        w-6 h-6 rounded-md border flex items-center justify-center transition-colors
                        ${isSelected
                            ? 'bg-brand-blue-600 border-brand-blue-600 text-white'
                            : 'bg-white border-brand-gray-300 text-transparent hover:border-brand-blue-400'}
                    `}
                >
                    <Check size={14} strokeWidth={3} />
                </button>
            </div>

            <div className="flex items-start justify-between mb-4 pr-10">
                <div>
                    <span className="inline-block px-3 py-1 bg-brand-blue-50 text-brand-blue-700 text-xs font-semibold rounded-full mb-2">
                        {candidate.role}
                    </span>
                    <h3 className="text-lg font-bold text-brand-gray-900">
                        Candidate #{candidate.id}
                    </h3>
                </div>
            </div>

            <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-brand-gray-500">{candidate.location}</span>
                <span className="text-brand-green-600 font-medium">{candidate.availability}</span>
            </div>

            <div className="mb-4 flex-grow">
                <p className="text-brand-gray-600 text-sm line-clamp-3 mb-4">
                    {candidate.bio}
                </p>

                <div className="space-y-2">
                    <div className="flex items-center text-sm text-brand-gray-700">
                        <span className="font-semibold w-24">Experience:</span>
                        <span>{candidate.experience}</span>
                    </div>
                    <div className="flex items-center text-sm text-brand-gray-700">
                        <span className="font-semibold w-24">Type:</span>
                        <span>{candidate.contractType}</span>
                    </div>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-brand-gray-100">
                <div className="flex flex-wrap gap-2 mb-4">
                    {candidate.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-brand-gray-100 text-brand-gray-600 text-xs rounded-md">
                            {skill}
                        </span>
                    ))}
                    {candidate.skills.length > 3 && (
                        <span className="px-2 py-1 bg-brand-gray-50 text-brand-gray-500 text-xs rounded-md">
                            +{candidate.skills.length - 3}
                        </span>
                    )}
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={onRequestInterview}
                        className="flex-1 py-2.5 px-4 bg-white border-2 border-brand-blue-600 text-brand-blue-600 font-semibold rounded-lg hover:bg-brand-blue-50 transition-colors text-sm"
                    >
                        Request Interview
                    </button>
                    <button
                        onClick={onToggleSelection}
                        className={`
                            px-3 py-2.5 rounded-lg border-2 transition-colors
                            ${isSelected
                                ? 'bg-brand-blue-100 border-brand-blue-100 text-brand-blue-700'
                                : 'bg-white border-brand-gray-200 text-brand-gray-400 hover:border-brand-blue-300 hover:text-brand-blue-500'}
                        `}
                        title={isSelected ? "Remove from selection" : "Add to selection"}
                    >
                        <UserRoundPlus size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
