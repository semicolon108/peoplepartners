// app/careers/[hash]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getManatalJobs } from '../page';
import JobDetailPage from './JobDetailPage';

interface PageProps {
    params: {
        hash: string;
    };
}

// Generate static params for all jobs
export async function generateStaticParams() {
    const jobs = await getManatalJobs();
    return jobs.map((job) => ({
        hash: job.hash,
    }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const jobs = await getManatalJobs();
    const job = jobs.find((j) => j.hash === params.hash);

    if (!job) {
        return {
            title: 'Job Not Found',
            description: 'The requested job position could not be found.',
        };
    }

    return {
        title: `${job.title} - People Partners Lao`,
        description: `Apply for ${job.title} position in ${job.department} at People Partners Lao. Location: ${job.location}`,
        openGraph: {
            title: `${job.title} - People Partners Lao`,
            description: `Apply for ${job.title} position in ${job.department} at People Partners Lao. Location: ${job.location}`,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${job.title} - People Partners Lao`,
            description: `Apply for ${job.title} position in ${job.department} at People Partners Lao. Location: ${job.location}`,
        },
    };
}

export default async function JobPage({ params }: PageProps) {
    const jobs = await getManatalJobs();
    const job = jobs.find((j) => j.hash === params.hash);

    if (!job) {
        notFound();
    }

    return <JobDetailPage job={job} allJobs={jobs} />;
}