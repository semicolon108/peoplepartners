// app/careers/JobListClient.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import type { Job } from './page';
import { MapPin, Clock, Briefcase, Search, Filter, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

function JobCard({ job }: { job: Job }) {
    return (
        <Link
            href={`/careers/${job.hash}`}
            className="flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 group overflow-hidden"
        >
            <div className="p-6 flex flex-col flex-grow">
                {/* Icon & Dept */}
                <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-brand-blue-50 text-brand-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                        {job.icon}
                    </div>
                    <span className="inline-block px-3 py-1 bg-gray-50 text-gray-600 text-xs font-bold rounded-lg tracking-wide border border-gray-100">
                        {job.department}
                    </span>
                </div>

                {/* Title */}
                <h4 className="font-bold text-xl text-gray-900 leading-tight mb-4 group-hover:text-brand-blue-600 transition-colors line-clamp-2">
                    {job.title}
                </h4>

                {/* Tags */}
                <div className="mt-auto space-y-2.5">
                    <div className="flex items-center gap-2.5 text-sm text-gray-500">
                        <MapPin size={16} className="text-gray-400" />
                        {job.location}
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-gray-500">
                        <Clock size={16} className="text-gray-400" />
                        {job.type}
                    </div>
                </div>
            </div>

            {/* Footer Action */}
            <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between group-hover:bg-brand-blue-50/30 transition-colors">
                <span className="text-sm font-bold text-gray-600 group-hover:text-brand-blue-700 transition-colors">
                    View Position
                </span>
                <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-brand-blue-300 group-hover:text-brand-blue-600 group-hover:translate-x-1 transition-all shadow-sm">
                    <ArrowRight size={16} />
                </div>
            </div>
        </Link>
    );
}

export default function JobListClient({ initialJobs }: { initialJobs: Job[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const listTopRef = useRef<HTMLDivElement>(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 12; // Change as needed

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
        <div className="space-y-8 scroll-mt-24" ref={listTopRef}>
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
                            />
                        ))}
                    </div>
                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-12 mb-8">
                            <button
                                onClick={() => {
                                    setCurrentPage(p => Math.max(1, p - 1));
                                    listTopRef.current?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border border-brand-gray-300 rounded-lg text-sm font-medium text-brand-gray-700 hover:bg-brand-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Previous
                            </button>

                            <div className="flex gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => {
                                            setCurrentPage(page);
                                            listTopRef.current?.scrollIntoView({ behavior: 'smooth' });
                                        }}
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
                                onClick={() => {
                                    setCurrentPage(p => Math.min(totalPages, p + 1));
                                    listTopRef.current?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 border border-brand-gray-300 rounded-lg text-sm font-medium text-brand-gray-700 hover:bg-brand-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    )}
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