// app/careers/JobListClient.tsx
"use client";

import { useState, useEffect } from 'react';
import type { Job } from './page';
import { MapPin, Clock, Briefcase, Search, Filter, X, ExternalLink } from 'lucide-react';
import Link from 'next/link';

// Enhanced JobCard component with link to individual job page
function JobCard({ job, isMobile }: { 
    job: Job; 
    isMobile: boolean;
}) {
    return (
        <Link
            href={`/careers/${job.hash}`}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm block transition hover:shadow-md"
        >
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-blue-700 to-brand-blue-500 text-white rounded-lg flex items-center justify-center mb-4">
                    {job.icon}
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-lg mb-2 text-brand-blue-900">{job.title}</h4>
                    <p className="text-brand-gray-500 text-sm mb-2">{job.department}</p>
                    {!isMobile && (
                        <div className="flex flex-wrap items-center gap-3 text-xs text-brand-gray-500 mb-2">
                            <span className="flex items-center gap-1">
                                <MapPin size={12} /> {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock size={12} /> {job.type}
                            </span>
                        </div>
                    )}
                    {!isMobile && (
                        <ExternalLink size={16} className="text-brand-gray-400 group-hover:text-brand-blue-500 transition-colors flex-shrink-0 mt-1" />
                    )}
                </div>
            </div>
        </Link>
    );
}

export default function JobListClient({ initialJobs }: { initialJobs: Job[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [isMobile, setIsMobile] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 12; // Change as needed

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Filter jobs based on search and department
    const filteredJobs = initialJobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDepartment = !selectedDepartment || job.department === selectedDepartment;
        return matchesSearch && matchesDepartment;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
    const paginatedJobs = filteredJobs.slice(
        (currentPage - 1) * jobsPerPage,
        currentPage * jobsPerPage
    );

    // Reset to first page on filter/search change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedDepartment]);

    // Get unique departments for filter
    const departments = Array.from(new Set(initialJobs.map(job => job.department)));

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

    return (
        <div className="space-y-8">
            {/* Search and filters */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
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
                        <Filter className="text-brand-gray-400 w-5 h-5 sm:hidden" />
                        <select
                            value={selectedDepartment}
                            onChange={(e) => setSelectedDepartment(e.target.value)}
                            className="flex-1 py-3 px-4 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent"
                        >
                            <option value="">All Departments</option>
                            {departments.map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {(searchTerm || selectedDepartment) && (
                    <div className="flex justify-center">
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedDepartment('');
                            }}
                            className="inline-flex items-center gap-2 py-2 px-4 text-sm text-brand-gray-600 hover:text-brand-gray-800 transition-colors"
                        >
                            <X size={16} />
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>

            {/* Results header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue-900">
                    Open Positions ({filteredJobs.length})
                </h2>
                {filteredJobs.length > 0 && (
                    <p className="text-brand-gray-600 text-sm">
                        Click on any position to view details
                    </p>
                )}
            </div>

            {/* Job grid */}
            {filteredJobs.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {paginatedJobs.map(job => (
                            <JobCard
                                key={job.id}
                                job={job}
                                isMobile={isMobile}
                            />
                        ))}
                    </div>
                    {/* Pagination controls */}
                    <div className="flex justify-center gap-2 mt-6">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded bg-brand-blue-100 text-brand-blue-700 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2">{currentPage} / {totalPages}</span>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 rounded bg-brand-blue-100 text-brand-blue-700 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-200">
                    <div className="max-w-md mx-auto">
                        <div className="w-16 h-16 bg-brand-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-brand-gray-500" />
                        </div>
                        <h3 className="text-xl font-bold text-brand-blue-900 mb-2">No Jobs Found</h3>
                        <p className="text-brand-gray-600 mb-4">
                            We couldn&apos;t find any positions matching your search criteria.
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedDepartment('');
                            }}
                            className="inline-flex items-center gap-2 bg-brand-blue-600 text-white px-4 py-2 rounded-lg hover:bg-brand-blue-700 transition-colors"
                        >
                            <X size={16} />
                            Clear Filters
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}