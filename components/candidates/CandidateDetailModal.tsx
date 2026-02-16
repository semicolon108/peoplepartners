
'use client';

import { X, MapPin, Calendar, Briefcase, FileText, User, Clock, CheckCircle2, Wallet } from 'lucide-react';
import { Candidate } from '@/lib/googleSheets';

interface CandidateDetailModalProps {
    candidate: Candidate | null;
    isOpen: boolean;
    onClose: () => void;
    onRequestInterview: (candidate: Candidate) => void;
}

export default function CandidateDetailModal({ candidate, isOpen, onClose, onRequestInterview }: CandidateDetailModalProps) {
    if (!candidate || !isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="inline-block px-3 py-1 bg-brand-blue-100 text-brand-blue-700 text-xs font-bold rounded-lg uppercase tracking-wide">
                                {candidate.role}
                            </span>
                            <span className="text-gray-400 text-sm font-medium">#{candidate.id}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Candidate Profile</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body - Scrollable */}
                <div className="p-6 overflow-y-auto custom-scrollbar">

                    {/* Key Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        <div className="p-3 bg-brand-blue-50/50 rounded-xl border border-brand-blue-100">
                            <div className="flex items-center gap-2 text-brand-blue-600 mb-1">
                                <MapPin size={16} />
                                <span className="text-xs font-bold uppercase">Location</span>
                            </div>
                            <p className="text-gray-900 font-semibold text-sm truncate" title={candidate.location}>{candidate.location}</p>
                        </div>
                        <div className="p-3 bg-brand-green-50/50 rounded-xl border border-brand-green-100">
                            <div className="flex items-center gap-2 text-brand-green-600 mb-1">
                                <Clock size={16} />
                                <span className="text-xs font-bold uppercase">Availability</span>
                            </div>
                            <p className="text-gray-900 font-semibold text-sm truncate" title={candidate.availability}>{candidate.availability}</p>
                        </div>
                        {candidate.travel ? (
                            <div className="p-3 bg-teal-50/50 rounded-xl border border-teal-100">
                                <div className="flex items-center gap-2 text-teal-600 mb-1">
                                    <Briefcase size={16} />
                                    <span className="text-xs font-bold uppercase">Travel</span>
                                </div>
                                <p className="text-gray-900 font-semibold text-sm truncate" title={candidate.travel}>{candidate.travel}</p>
                            </div>
                        ) : (
                            <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100">
                                <div className="flex items-center gap-2 text-purple-600 mb-1">
                                    <Briefcase size={16} />
                                    <span className="text-xs font-bold uppercase">Experience</span>
                                </div>
                                <p className="text-gray-900 font-semibold text-sm truncate" title={candidate.experience}>{candidate.experience}</p>
                            </div>
                        )}
                        <div className="p-3 bg-orange-50/50 rounded-xl border border-orange-100">
                            <div className="flex items-center gap-2 text-orange-600 mb-1">
                                <Wallet size={16} />
                                <span className="text-xs font-bold uppercase">Salary</span>
                            </div>
                            <p className="text-gray-900 font-semibold text-sm truncate" title={candidate.salary || 'Negotiable'}>{candidate.salary || 'Negotiable'}</p>
                        </div>
                    </div>

                    {/* Bio Section */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-3 text-gray-900 font-bold text-lg">
                            <User className="text-brand-blue-500" size={20} />
                            <h3>Professional Summary</h3>
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-gray-600 bg-gray-50 p-5 rounded-xl border border-gray-100 leading-relaxed">
                            {candidate.bio.split('.').filter(sentence => sentence.trim().length > 0).map((sentence, index) => (
                                <li key={index}>{sentence.trim()}.</li>
                            ))}
                        </ul>
                    </div>

                    {/* Not Preferred Section */}
                    {candidate.notPreferred && (
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-3 text-red-600 font-bold text-lg">
                                <X className="text-red-500" size={20} />
                                <h3>Not Preferred</h3>
                            </div>
                            <div className="text-gray-600 bg-red-50 p-5 rounded-xl border border-red-100 leading-relaxed whitespace-pre-line">
                                {candidate.notPreferred}
                            </div>
                        </div>
                    )}

                    {/* Skills Section */}
                    {candidate.skills.length > 0 && (
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-3 text-gray-900 font-bold text-lg">
                                <CheckCircle2 className="text-brand-blue-500" size={20} />
                                <h3>Skills & Qualifications</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {candidate.skills.map((skill, index) => (
                                    <span key={index} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium shadow-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Additional Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                        {candidate.age && (
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-gray-100 rounded-lg text-gray-500">
                                    <Calendar size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold">Age</p>
                                    <p className="text-gray-900 font-medium">{candidate.age} Years Old</p>
                                </div>
                            </div>
                        )}
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg text-gray-500">
                                <FileText size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold">Contract Type</p>
                                <p className="text-gray-900 font-medium">{candidate.contractType}</p>
                            </div>
                        </div>
                        {/* Show Experience here if Travel took its spot in the grid */}
                        {candidate.travel && (
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-gray-100 rounded-lg text-gray-500">
                                    <Briefcase size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold">Experience</p>
                                    <p className="text-gray-900 font-medium">{candidate.experience}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 text-gray-600 font-medium hover:bg-gray-200 rounded-xl transition-colors"
                    >
                        Close
                    </button>
                    <button
                        onClick={() => {
                            onRequestInterview(candidate);
                            onClose();
                        }}
                        className="px-6 py-2.5 bg-brand-blue-600 text-white font-bold rounded-xl hover:bg-brand-blue-700 transition-colors shadow-lg shadow-brand-blue-200 flex items-center gap-2"
                    >
                        Request Interview <Briefcase size={18} />
                    </button>
                </div>

            </div>
        </div>
    );
}
