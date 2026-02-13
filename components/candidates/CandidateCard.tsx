
import { Candidate } from '@/lib/googleSheets';
import { Check, ArrowRight } from 'lucide-react';

interface CandidateCardProps {
    candidate: Candidate;
    isSelected: boolean;
    onToggleSelection: () => void;
    onRequestInterview: () => void;
    onViewProfile: () => void;
}

export default function CandidateCard({ candidate, isSelected, onToggleSelection, onRequestInterview, onViewProfile }: CandidateCardProps) {
    return (
        <div
            className={`
                relative bg-white rounded-2xl border flex flex-col h-full transition-all duration-300 group overflow-hidden
                ${isSelected
                    ? 'border-brand-blue-500 shadow-xl ring-2 ring-brand-blue-500/20 translate-y-[-2px]'
                    : 'border-gray-100 shadow-sm hover:shadow-xl hover:translate-y-[-4px] hover:border-brand-blue-100'}
            `}
        >
            {/* Selection Checkbox - Top Right */}
            <div className="absolute top-4 right-4 z-10">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleSelection();
                    }}
                    className={`
                        w-8 h-8 rounded-full border items-center justify-center transition-all duration-200 flex
                        ${isSelected
                            ? 'bg-brand-blue-600 border-brand-blue-600 text-white scale-110'
                            : 'bg-white/80 backdrop-blur-sm border-gray-200 text-gray-300 hover:border-brand-blue-400 hover:text-brand-blue-400'}
                    `}
                    title={isSelected ? "Unselect" : "Select Candidate"}
                >
                    <Check size={16} strokeWidth={3} />
                </button>
            </div>

            {/* Content Container */}
            <div className="p-6 flex flex-col flex-grow">

                {/* Header */}
                <div className="mb-4 pr-8">
                    <span className="inline-block px-3 py-1 bg-brand-blue-50 text-brand-blue-700 text-xs font-bold rounded-lg mb-3 tracking-wide">
                        {candidate.role}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                        Candidate #{candidate.id}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                        {candidate.location} • <span className="text-brand-green-600 font-medium">{candidate.availability}</span>
                    </p>
                    {candidate.createdAt && (
                        <p className="text-xs text-gray-400 mt-1">
                            Added: {candidate.createdAt.split(',')[0]}
                        </p>
                    )}
                </div>

                {/* Tags (Age/Gender) */}
                <div className="flex gap-2 mb-4">
                    {candidate.gender && (
                        <span className="px-2.5 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-md border border-purple-100">
                            {candidate.gender}
                        </span>
                    )}
                    {candidate.age && (
                        <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md border border-blue-100">
                            {candidate.age} Years Old
                        </span>
                    )}
                </div>

                {/* Bio Preview */}
                <div className="mb-5 flex-grow relative">
                    <div className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {candidate.bio}
                    </div>
                </div>

                {/* Key Info Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-0.5">Experience</p>
                        <p className="text-sm font-bold text-gray-800 truncate">{candidate.experience}</p>
                    </div>
                    {candidate.salary && (
                        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-0.5">Expectation</p>
                            <p className="text-sm font-bold text-brand-green-700 truncate">{candidate.salary}</p>
                        </div>
                    )}
                </div>

                {/* Skills Preview */}
                <div className="flex flex-wrap gap-1.5 mb-6 opacity-80">
                    {candidate.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-white border border-gray-200 text-gray-500 text-[11px] font-medium rounded-md">
                            {skill}
                        </span>
                    ))}
                    {candidate.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-50 text-gray-400 text-[11px] font-medium rounded-md">
                            +{candidate.skills.length - 3}
                        </span>
                    )}
                </div>

            </div>

            {/* Actions Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex gap-3">
                <button
                    onClick={onViewProfile}
                    className="flex-1 py-2.5 px-4 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors text-sm flex items-center justify-center gap-2 group/btn"
                >
                    View Details <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
                <button
                    onClick={onRequestInterview}
                    className="flex-[1.5] py-2.5 px-4 bg-brand-blue-600 text-white font-semibold rounded-xl hover:bg-brand-blue-700 transition-all shadow-md shadow-brand-blue-200 text-sm flex items-center justify-center gap-2"
                >
                    Request Interview
                </button>
            </div>
        </div>
    );
}
