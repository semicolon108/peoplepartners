
'use client';

import { Candidate } from '@/lib/googleSheets';
import { useState } from 'react';
import ContactModal from './ContactModal';

interface CandidateCardProps {
    candidate: Candidate;
}

export default function CandidateCard({ candidate }: CandidateCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="bg-white rounded-xl shadow-soft border border-brand-gray-200 p-6 flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <span className="inline-block px-3 py-1 bg-brand-blue-50 text-brand-blue-700 text-xs font-semibold rounded-full mb-2">
                            {candidate.role}
                        </span>
                        <h3 className="text-lg font-bold text-brand-gray-900">
                            Candidate #{candidate.id}
                        </h3>
                    </div>
                    <div className="text-right">
                        <span className="block text-sm text-brand-gray-500">{candidate.location}</span>
                        <span className="block text-xs text-brand-green-600 font-medium mt-1">{candidate.availability}</span>
                    </div>
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

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full py-2.5 px-4 bg-white border-2 border-brand-blue-600 text-brand-blue-600 font-semibold rounded-lg hover:bg-brand-blue-50 transition-colors text-sm"
                    >
                        Request Interview
                    </button>
                </div>
            </div>

            <ContactModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                candidateId={candidate.id}
                candidateRole={candidate.role}
            />
        </>
    );
}
