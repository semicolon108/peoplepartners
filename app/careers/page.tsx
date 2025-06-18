// app/careers/page.tsx - Full Embed Approach
// import Breadcrumb from '@/components/services/Breadcrumb';
// import PageHero from '@/components/shared/PageHero';

// export default function CareersPage() {
//     const manatalCareersPageUrl = "https://www.careers-page.com/ppl"; // YOUR URL

//     return (
//         <div className="pt-20">
//             <Breadcrumb pageTitle="Careers" />
//             <PageHero
//                 title="Join Our Team"
//                 subtitle="Explore exciting career opportunities below."
//             />
//             <main className="py-10 bg-brand-gray-light">
//                 <div className="container">
//                     <div className="w-full h-[1200px] bg-white rounded-lg shadow-md overflow-hidden">
//                         <iframe
//                             src={manatalCareersPageUrl}
//                             title="People Partners Lao Career Opportunities"
//                             className="w-full h-full border-0"
//                         />
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// }


// app/careers/page.tsx - API Approach
// app/careers/page.tsx
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
    applyUrl: string; // The URL we will construct
    icon: React.ReactNode;
}

interface ManatalJob {
    id: number;
    hash: string;
    position_name: string;
    description: string;
    contract_details: string; // e.g., "full_time"
    // These fields might be null or have other shapes, so keep them optional
    department?: { name: string; };
    location?: { name: string; };
    location_display?: string;
}


async function getManatalJobs(): Promise<Job[]> { // Note: Returns our internal Job type
    try {
        const apiUrl = 'https://api.manatal.com/open/v3/career-page/ppl/jobs/';
        const response = await fetch(apiUrl, { next: { revalidate: 3600 } });

        if (!response.ok) {
            console.error(`Failed to fetch jobs: ${response.status} ${response.statusText}`);
            return [];
        }

        const data = await response.json();
        if (!data || !Array.isArray(data.results)) {
            console.error("API did not return the expected structure with a 'results' array.");
            return [];
        }

        const formattedJobs: Job[] = data.results.map((job: ManatalJob) => {
            let contractType = 'N/A';
            if (job.contract_details === 'full_time') contractType = 'Full-time';
            if (job.contract_details === 'part_time') contractType = 'Part-time';
            if (job.contract_details === 'contract') contractType = 'Contract';

            // Construct the apply URL
            const applyUrl = `https://www.careers-page.com/ppl/job/${job.hash}`;

            return {
                id: job.id,
                hash: job.hash,
                title: job.position_name || 'N/A',
                department: job.department?.name || 'General',
                location: job.location?.name || job.location_display || 'Vientiane, Laos',
                type: contractType,
                description: job.description || 'No description available.',
                applyUrl: applyUrl,
                icon: job.department?.name === 'Consulting' ? <BookOpen /> : (job.department?.name === 'Business Process Outsourcing' ? <Building /> : <Briefcase />),
            };
        });

        return formattedJobs;

    } catch (error) {
        console.error("An error occurred during the fetch operation:", error);
        return [];
    }
}

// The page is now an `async` Server Component
export default async function CareersPage() {
    const jobs = await getManatalJobs();

    return (
        <div className="pt-20">
            <Breadcrumb pageTitle="Careers" />
            <PageHero
                title="We are actively hiring"
                subtitle="Explore exciting career opportunities at People Partners Lao and help us empower businesses to thrive."
            />
            <main className="py-20 bg-brand-gray-light">
                <div className="container">
                    <JobListClient initialJobs={jobs} />
                </div>
            </main>
        </div>
    );
}