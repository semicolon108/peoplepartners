// app/careers/JobListClient.tsx
"use client";

import { useState, useEffect } from 'react';
import type { Job } from './page';
import { MapPin, Clock, Briefcase, ArrowLeft, Search, Filter, X } from 'lucide-react';
import Link from 'next/link';

// Enhanced JobDetail component with better mobile handling
function JobDetail({ job, onBack, isMobile }: { job: Job; onBack?: () => void; isMobile: boolean }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            {/* Mobile header with back button */}
            {isMobile && (
                <div className="bg-gradient-to-r from-brand-blue-700 to-brand-blue-500 p-4 text-white">
                    <button 
                        onClick={onBack}
                        className="flex items-center gap-2 text-white/90 hover:text-white mb-3 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Back to Jobs
                    </button>
                    <h2 className="text-xl font-bold">{job.title}</h2>
                    <p className="text-white/90 text-sm">{job.department}</p>
                </div>
            )}
            
            <div className="p-6 sm:p-8">
                {/* Desktop header */}
                {!isMobile && (
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-brand-blue-900 mb-3">{job.title}</h2>
                        <div className="flex flex-wrap items-center gap-4 text-brand-gray-600 text-sm mb-4">
                            <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full">
                                <Briefcase size={16} /> {job.department}
                            </span>
                            <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full">
                                <MapPin size={16} /> {job.location}
                            </span>
                            <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full">
                                <Clock size={16} /> {job.type}
                            </span>
                        </div>
                    </div>
                )}

                {/* Mobile job meta info */}
                {isMobile && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full text-sm">
                            <MapPin size={14} /> {job.location}
                        </span>
                        <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full text-sm">
                            <Clock size={14} /> {job.type}
                        </span>
                    </div>
                )}

                {/* Job description */}
                <div
                    className="prose prose-slate max-w-none prose-p:my-3 prose-ul:my-4 prose-li:my-1 prose-h3:text-lg prose-h3:font-semibold prose-h3:text-brand-blue-900 prose-h4:font-semibold prose-h4:text-brand-blue-800 prose-h4:mb-2 mb-8"
                    dangerouslySetInnerHTML={{ __html: job.description }}
                />

                {/* Apply button */}
                <div className="sticky bottom-0 bg-white pt-4 border-t border-slate-200 -mx-6 -mb-6 px-6 pb-6 sm:-mx-8 sm:-mb-8 sm:px-8 sm:pb-8">
                    <Link
                        href={job.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-gradient-to-r from-brand-blue-700 to-brand-blue-500 text-white font-semibold py-4 px-6 rounded-xl text-center hover:shadow-lg hover:-translate-y-0.5 transition-all text-lg"
                    >
                        Apply for this Position
                    </Link>
                    <p className="text-center text-sm text-brand-gray-500 mt-3">
                        Application opens in a new window
                    </p>
                </div>
            </div>
        </div>
    );
}

// Enhanced JobCard component for better mobile experience
function JobCard({ job, isSelected, onClick, isMobile }: { 
    job: Job; 
    isSelected: boolean; 
    onClick: () => void;
    isMobile: boolean;
}) {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 group ${
                isSelected && !isMobile
                    ? 'bg-gradient-to-r from-brand-blue-600 to-brand-blue-500 text-white border-brand-blue-500 shadow-lg transform scale-[1.02]' 
                    : 'bg-white hover:bg-slate-50 hover:border-brand-blue-300 border-slate-200 hover:shadow-md'
            }`}
        >
            <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all ${
                    isSelected && !isMobile
                        ? 'bg-white/20 text-white' 
                        : 'bg-gradient-to-br from-brand-blue-100 to-brand-blue-200 text-brand-blue-700 group-hover:from-brand-blue-200 group-hover:to-brand-blue-300'
                }`}>
                    {job.icon}
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className={`font-bold text-base sm:text-lg mb-1 line-clamp-2 transition-colors ${
                        isSelected && !isMobile ? 'text-white' : 'text-brand-blue-900 group-hover:text-brand-blue-700'
                    }`}>
                        {job.title}
                    </h4>
                    <p className={`text-sm mb-2 transition-colors ${
                        isSelected && !isMobile ? 'text-white/90' : 'text-brand-gray-600'
                    }`}>
                        {job.department}
                    </p>
                    <div className={`flex flex-wrap items-center gap-3 text-xs ${
                        isSelected && !isMobile ? 'text-white/80' : 'text-brand-gray-500'
                    }`}>
                        <span className="flex items-center gap-1">
                            <MapPin size={12} /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock size={12} /> {job.type}
                        </span>
                    </div>
                </div>
            </div>
        </button>
    );
}

export default function JobListClient({ initialJobs }: { initialJobs: Job[] }) {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [showDetail, setShowDetail] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [isMobile, setIsMobile] = useState(false);

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Auto-select first job on desktop
    useEffect(() => {
        if (!isMobile && initialJobs.length > 0 && !selectedJob) {
            setSelectedJob(initialJobs[0]|| null);
        }
    }, [initialJobs, isMobile, selectedJob]);

    // Filter jobs based on search and department
    const filteredJobs = initialJobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDepartment = !selectedDepartment || job.department === selectedDepartment;
        return matchesSearch && matchesDepartment;
    });

    // Get unique departments for filter
    const departments = Array.from(new Set(initialJobs.map(job => job.department)));

    const handleJobSelect = (job: Job) => {
        setSelectedJob(job);
        if (isMobile) {
            setShowDetail(true);
        }
    };

    const handleBackToList = () => {
        setShowDetail(false);
    };

    if (initialJobs.length === 0) {
        return (
            <div className="text-center py-16 px-6 bg-white rounded-2xl shadow-md">
                <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 bg-brand-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Briefcase className="w-8 h-8 text-brand-gray-500" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-brand-blue-900 mb-2">No Open Positions</h2>
                    <p className="text-brand-gray-600">We don&apos;t have any open positions at the moment, but we&apos;re always looking for talented individuals. Check back soon!</p>
                </div>
            </div>
        );
    }

    // Mobile view: show either list or detail
    if (isMobile) {
        if (showDetail && selectedJob) {
            return <JobDetail job={selectedJob} onBack={handleBackToList} isMobile={true} />;
        }

        return (
            <div className="space-y-6">
                {/* Mobile search and filters */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search jobs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent"
                        />
                    </div>
                    
                    <div className="flex gap-2 items-center">
                        <Filter className="text-brand-gray-400 w-5 h-5" />
                        <select
                            value={selectedDepartment}
                            onChange={(e) => setSelectedDepartment(e.target.value)}
                            className="flex-1 py-2 px-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent"
                        >
                            <option value="">All Departments</option>
                            {departments.map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                        {(searchTerm || selectedDepartment) && (
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedDepartment('');
                                }}
                                className="p-2 text-brand-gray-400 hover:text-brand-gray-600 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Mobile job list */}
                <div>
                    <h3 className="text-xl font-bold mb-4 text-brand-blue-900 px-1">
                        Open Positions ({filteredJobs.length})
                    </h3>
                    <div className="space-y-3">
                        {filteredJobs.map(job => (
                            <JobCard
                                key={job.id}
                                job={job}
                                isSelected={false}
                                onClick={() => handleJobSelect(job)}
                                isMobile={true}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Desktop view: two-column layout
    return (
        <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Search + Job List */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-6">
                {/* Desktop search and filters */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search jobs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent"
                        />
                    </div>
                    
                    <select
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="w-full py-3 px-4 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent"
                    >
                        <option value="">All Departments</option>
                        {departments.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </select>

                    {(searchTerm || selectedDepartment) && (
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedDepartment('');
                            }}
                            className="w-full py-2 px-4 text-sm text-brand-gray-600 hover:text-brand-gray-800 transition-colors flex items-center justify-center gap-2"
                        >
                            <X size={16} />
                            Clear Filters
                        </button>
                    )}
                </div>

                {/* Desktop job list */}
                <div>
                    <h3 className="text-xl xl:text-2xl font-bold mb-4 text-brand-blue-900">
                        Open Positions ({filteredJobs.length})
                    </h3>
                    <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                        {filteredJobs.map(job => (
                            <JobCard
                                key={job.id}
                                job={job}
                                isSelected={selectedJob?.id === job.id}
                                onClick={() => handleJobSelect(job)}
                                isMobile={false}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: Job Detail (Sticky) */}
            <div className="lg:col-span-7 xl:col-span-8">
                <div className="sticky top-24">
                    {selectedJob ? (
                        <JobDetail key={selectedJob.id} job={selectedJob} isMobile={false} />
                    ) : (
                        <div className="flex items-center justify-center h-96 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border-2 border-dashed border-slate-300">
                            <div className="text-center">
                                <Briefcase className="w-12 h-12 text-brand-gray-400 mx-auto mb-4" />
                                <p className="text-brand-gray-500 text-lg">Select a job to view details</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}