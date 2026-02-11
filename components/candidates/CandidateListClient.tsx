
'use client';

import { useState, useRef } from 'react';
import { Candidate } from '@/lib/googleSheets';
import CandidateCard from './CandidateCard';
import ContactModal from './ContactModal';
import CandidateDetailModal from './CandidateDetailModal';
import { Send } from 'lucide-react';

interface CandidateListClientProps {
    initialCandidates: Candidate[];
}

export default function CandidateListClient({ initialCandidates }: CandidateListClientProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const listTopRef = useRef<HTMLDivElement>(null);

    // Request Modal State
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [contactModalCandidates, setContactModalCandidates] = useState<Candidate[]>([]);

    // Detail Modal State
    const [viewCandidate, setViewCandidate] = useState<Candidate | null>(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 9;

    const totalPages = Math.ceil(initialCandidates.length / ITEMS_PER_PAGE);
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentCandidates = initialCandidates.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        listTopRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Toggle selection for a single candidate
    const toggleSelection = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(cId => cId !== id)
                : [...prev, id]
        );
    };

    // Handle "Request Interview" click from a single card
    const handleSingleRequest = (candidate: Candidate) => {
        if (!selectedIds.includes(candidate.id)) {
            setSelectedIds(prev => [...prev, candidate.id]);
        }
        setContactModalCandidates([candidate]);
        setIsContactModalOpen(true);
    };

    // Open modal for ALL selected candidates
    const handleBulkRequest = () => {
        const selected = initialCandidates.filter(c => selectedIds.includes(c.id));
        setContactModalCandidates(selected);
        setIsContactModalOpen(true);
    };

    const handleRemoveFromModal = (id: string) => {
        setContactModalCandidates(prev => prev.filter(c => c.id !== id));
        setSelectedIds(prev => prev.filter(cId => cId !== id));
        if (selectedIds.length <= 1) { // If it was the last one
            setIsContactModalOpen(false);
        }
    };

    return (
        <div className="relative scroll-mt-24" ref={listTopRef}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
                {currentCandidates.map((candidate) => (
                    <CandidateCard
                        key={candidate.id}
                        candidate={candidate}
                        isSelected={selectedIds.includes(candidate.id)}
                        onToggleSelection={() => toggleSelection(candidate.id)}
                        onRequestInterview={() => handleSingleRequest(candidate)}
                        onViewProfile={() => setViewCandidate(candidate)}
                    />
                ))}

                {initialCandidates.length === 0 && (
                    <div className="col-span-full text-center py-20 bg-brand-gray-50 rounded-xl border border-dashed border-brand-gray-300">
                        <p className="text-brand-gray-500">No InstaTalent professionals available at the moment.</p>
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mb-24">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-brand-gray-300 rounded-lg text-sm font-medium text-brand-gray-700 hover:bg-brand-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Previous
                    </button>

                    <div className="flex gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`
                                    w-10 h-10 rounded-lg text-sm font-medium transition-colors
                                    ${currentPage === page
                                        ? 'bg-brand-blue-600 text-white'
                                        : 'text-brand-gray-700 hover:bg-brand-gray-50 border border-transparent'}
                                `}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-brand-gray-300 rounded-lg text-sm font-medium text-brand-gray-700 hover:bg-brand-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Floating Selection Bar */}
            {selectedIds.length > 0 && (
                <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 bg-brand-gray-900 text-white rounded-full shadow-2xl px-6 py-3 flex items-center gap-4 animate-in slide-in-from-bottom-5 duration-300">
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <span className="bg-brand-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                            {selectedIds.length}
                        </span>
                        <span>Candidates Selected</span>
                    </div>
                    <div className="h-6 w-px bg-gray-700"></div>
                    <button
                        onClick={() => setSelectedIds([])}
                        className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                        Clear
                    </button>
                    <button
                        onClick={handleBulkRequest}
                        className="bg-white text-brand-gray-900 hover:bg-brand-blue-50 font-bold py-2 px-4 rounded-full text-sm flex items-center gap-2 transition-colors ml-2"
                    >
                        Request Interview <Send size={14} />
                    </button>
                </div>
            )}

            {/* Detail Modal */}
            <CandidateDetailModal
                isOpen={!!viewCandidate}
                candidate={viewCandidate}
                onClose={() => setViewCandidate(null)}
                onRequestInterview={(candidate) => {
                    setViewCandidate(null); // Close detail modal
                    handleSingleRequest(candidate); // Open contact modal
                }}
            />

            {/* Contact Form Modal */}
            <ContactModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
                candidates={contactModalCandidates}
                onRemoveCandidate={handleRemoveFromModal}
                onSuccess={() => {
                    setIsContactModalOpen(false);
                    setSelectedIds([]);
                    setContactModalCandidates([]);
                }}
            />
        </div>
    );
}
