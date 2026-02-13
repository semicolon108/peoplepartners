'use server';

import { addCandidate, CandidateFormInput } from '@/lib/googleSheets';

export async function submitCandidateApplication(data: CandidateFormInput) {
    return await addCandidate(data);
}
