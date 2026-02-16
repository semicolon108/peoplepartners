import CandidateApplicationForm from '@/components/candidates/CandidateApplicationForm';
import { submitCandidateApplication } from '@/app/actions/candidate';
import { Metadata } from 'next';

// ============================================================
// NO-AUTH VERSION (Public Access)
// To switch to AUTH version, see: page.auth.tsx in this folder
// ============================================================

export const metadata: Metadata = {
    title: 'Join Our Talent Pool | People Partners',
    description: 'Submit your profile to join the People Partners Talent Pool.',
};

export default function JoinCandidatePoolPage() {
    return (
        <div className="pt-32 pb-20 min-h-screen bg-slate-50 bg-[url('/grid-pattern.svg')]">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-brand-blue-900 mb-4">
                        Join Our Talent Pool
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Fill in your details to get discovered by top employers.
                    </p>
                </div>
                <CandidateApplicationForm submitAction={submitCandidateApplication} />
            </div>
        </div>
    );
}
