// app/careers/JobListClient.tsx
"use client";

import { useState, useEffect } from 'react';
import type { Job } from './page';
import { MapPin, Clock, Briefcase } from 'lucide-react';
import Link from 'next/link';

// JobDetail component remains the same, but it will be placed in the right column.
function JobDetail({ job }: { job: Job }) {
    return (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                <div className="flex-grow">
                    <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue-dark mb-2">{job.title}</h2>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-brand-gray text-sm">
                        <span className="flex items-center gap-1.5"><Briefcase size={16} /> {job.department}</span>
                        <span className="flex items-center gap-1.5"><MapPin size={16} /> {job.location}</span>
                        <span className="flex items-center gap-1.5"><Clock size={16} /> {job.type}</span>
                    </div>
                </div>
                <Link
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-full sm:w-auto bg-gradient-to-r from-brand-blue to-brand-blue-light text-white font-semibold py-3 px-6 rounded-lg text-center hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                    Apply Now
                </Link>
            </div>
            <div
                className="prose prose-slate max-w-none prose-p:my-2 prose-ul:my-4 prose-h4:font-bold prose-h4:text-brand-blue-dark"
                dangerouslySetInnerHTML={{ __html: job.description }}
            />
        </div>
    );
}


export default function JobListClient({ initialJobs }: { initialJobs: Job[] }) {
    const [selectedJob, setSelectedJob] = useState<Job | null>(initialJobs[0] || null);

    // A small effect to prevent showing a stale detail view if the job list changes.
    useEffect(() => {
        setSelectedJob(initialJobs[0] || null);
    }, [initialJobs]);

    if (initialJobs.length === 0) {
        return (
            <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-brand-blue-dark mb-4">No Open Positions Currently</h2>
                <p className="text-brand-gray">Please check back later.</p>
            </div>
        );
    }

    return (
        // --- THIS IS THE NEW TWO-COLUMN GRID LAYOUT ---
        <div className="grid lg:grid-cols-12 gap-8 items-start">

            {/* Left Column: Job List */}
            <div className="lg:col-span-5 xl:col-span-4">
                <h3 className="text-2xl font-bold mb-4 text-brand-blue-dark">Open Positions ({initialJobs.length})</h3>
                <div className="space-y-4">
                    {initialJobs.map(job => (
                        <button
                            key={job.id}
                            onClick={() => setSelectedJob(job)}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-center gap-4 ${selectedJob?.id === job.id ? 'bg-brand-blue text-white border-brand-blue-light shadow-lg' : 'bg-white hover:bg-slate-50 hover:border-slate-300 border-slate-200'}`}
                        >
                            <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${selectedJob?.id === job.id ? 'bg-white/20' : 'bg-brand-gray-light text-brand-blue'}`}>
                                {job.icon}
                            </div>
                            <div>
                                <h4 className={`font-bold transition-colors ${selectedJob?.id === job.id ? 'text-white' : 'text-brand-blue-dark'}`}>{job.title}</h4>
                                <p className={`text-sm transition-colors ${selectedJob?.id === job.id ? 'text-slate-200' : 'text-brand-gray'}`}>{job.department}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Right Column: Job Detail (Sticky) */}
            <div className="lg:col-span-7 xl:col-span-8 lg:sticky lg:top-24">
                {selectedJob ? (
                    // By adding a `key`, we tell React to re-render this component from scratch
                    // when the job changes, which can allow for entry animations if you add them.
                    <JobDetail key={selectedJob.id} job={selectedJob} />
                ) : (
                    // A placeholder for when no job is selected (e.g., on mobile before a click)
                    <div className="hidden lg:flex items-center justify-center h-96 bg-slate-100 rounded-2xl">
                        <p className="text-brand-gray">Select a job on the left to view details.</p>
                    </div>
                )}
            </div>
        </div>
    );
}