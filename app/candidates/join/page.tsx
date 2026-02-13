import CandidateApplicationForm from '@/components/candidates/CandidateApplicationForm';
import { submitCandidateApplication } from '@/app/actions/candidate';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Join Our Talent Pool | People Partners',
    description: 'Apply to join our vetted talent pool and get discovered by top employers.',
};

export default function JoinCandidatePoolPage() {
    return (
        <div className="pt-32 pb-20 min-h-screen bg-slate-50 bg-[url('/grid-pattern.svg')]">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-brand-blue-900 mb-4">
                        Unlock Your Career Potential
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Join our exclusive talent network. We connect professionals with leading companies in Laos.
                    </p>
                </div>
                <CandidateApplicationForm submitAction={submitCandidateApplication} />
            </div>
        </div>
    );
}
