
import { getCandidates } from '@/lib/googleSheets';
import CandidateCard from './CandidateCard';

export default async function CandidateList() {
    const candidates = await getCandidates();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates.map((candidate) => (
                <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
            {candidates.length === 0 && (
                <div className="col-span-full text-center py-20 bg-brand-gray-50 rounded-xl border border-dashed border-brand-gray-300">
                    <p className="text-brand-gray-500">No highlighted candidates available at the moment.</p>
                </div>
            )}
        </div>
    );
}
