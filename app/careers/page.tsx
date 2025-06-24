import { BookOpen, Briefcase, Building } from 'lucide-react';
import Breadcrumb from '@/components/services/Breadcrumb';
import PageHero from '@/components/shared/PageHero';
import JobListClient from './JobListClient';

export interface Job {
    id: number;
    hash: string;
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
    applyUrl: string;
    icon: React.ReactNode;
}

interface ManatalJob {
    id: number;
    hash: string;
    position_name: string;
    description: string;
    contract_details: string;
    department?: { name: string; };
    location?: { name: string; };
    location_display?: string;
}

interface ManatalApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: ManatalJob[];
}

// Move the API fetching logic to a shared utility
export async function getManatalJobs(): Promise<Job[]> {
    try {
        const baseApiUrl = 'https://api.manatal.com/open/v3/career-page/ppl/jobs/';
        let allJobs: ManatalJob[] = [];
        let nextUrl: string | null = baseApiUrl;

        while (nextUrl) {
            console.log(`Fetching: ${nextUrl}`);
            const response = await fetch(nextUrl, {
                next: { revalidate: 3600 },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                console.error(`Failed to fetch jobs: ${response.status} ${response.statusText}`);
                break;
            }

            const data: ManatalApiResponse = await response.json();

            if (!data || !Array.isArray(data.results)) {
                console.error("API did not return the expected structure with a 'results' array.");
                break;
            }

            allJobs = allJobs.concat(data.results);
            nextUrl = data.next;

            console.log(`Fetched ${data.results.length} jobs from current page. Total so far: ${allJobs.length}`);

            if (nextUrl) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }

        console.log(`Total jobs fetched: ${allJobs.length}`);

        const formattedJobs: Job[] = allJobs.map((job: ManatalJob) => {
            let contractType = 'N/A';
            if (job.contract_details === 'full_time') contractType = 'Full-time';
            if (job.contract_details === 'part_time') contractType = 'Part-time';
            if (job.contract_details === 'contract') contractType = 'Contract';

            const applyUrl = `https://www.careers-page.com/ppl/job/${job.hash}/apply`;

            return {
                id: job.id,
                hash: job.hash,
                title: job.position_name || 'N/A',
                department: job.department?.name || 'General',
                location: job.location?.name || job.location_display || 'Vientiane, Laos',
                type: contractType,
                description: job.description || 'No description available.',
                applyUrl: applyUrl,
                icon: job.department?.name === 'Consulting' ? <BookOpen /> :
                    (job.department?.name === 'Business Process Outsourcing' ? <Building /> : <Briefcase />),
            };
        });

        return formattedJobs;

    } catch (error) {
        console.error("An error occurred during the fetch operation:", error);
        return [];
    }
}

export default async function CareersPage() {
    const jobs = await getManatalJobs();

    return (
        <div className="pt-20">
            <Breadcrumb pageTitle="Careers" />
            <PageHero
                title="We are actively hiring"
                subtitle="Explore exciting career opportunities at People Partners Lao and help us empower businesses to thrive."
            />
            <main className="py-20 bg-brand-gray-50">
                <div className="container">
                    <JobListClient initialJobs={jobs} />
                </div>
            </main>
        </div>
    );
}