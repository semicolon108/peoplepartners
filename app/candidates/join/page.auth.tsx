import CandidateApplicationForm from '@/components/candidates/CandidateApplicationForm';
import { submitCandidateApplication } from '@/app/actions/candidate';
import { Metadata } from 'next';
import AccessGate from '@/components/candidates/AccessGate';

// ============================================================
// AUTH VERSION (Recruiter Access Only - OTP Gate)
// To use this version:
//   1. Rename the current page.tsx -> page.public.tsx
//   2. Rename this file -> page.tsx
// ============================================================

export const metadata: Metadata = {
    title: 'Join Our Talent Pool | People Partners',
    description: 'Internal Application - Recruiter Access Only',
};

export default function JoinCandidatePoolPage() {
    return (
        <AccessGate>
            <div className="pt-32 pb-20 min-h-screen bg-slate-50 bg-[url('/grid-pattern.svg')]">
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-brand-blue-900 mb-4">
                            Internal Candidate Application
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Recruiter Access Mode
                        </p>
                    </div>
                    <CandidateApplicationForm submitAction={submitCandidateApplication} />
                </div>
            </div>
        </AccessGate>
    );
}
