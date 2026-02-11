// app/careers/[hash]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getManatalJobs } from '../page';
import JobDetailPage from './JobDetailPage';



// Generate static params for all jobs
export async function generateStaticParams() {
    const jobs = await getManatalJobs();
    return jobs.map((job) => ({
        hash: job.hash,
    }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ hash: string }> }): Promise<Metadata> {
    const { hash } = await params;
    const jobs = await getManatalJobs();
    const job = jobs.find((j) => j.hash === hash);

    if (!job) {
        return {
            title: 'Job Not Found',
            description: 'The requested job position could not be found.',
        };
    }

    return {
        title: `${job.title} - People Partners Laos`,
        description: `Apply for ${job.title} position in ${job.department} at People Partners Laos. Location: ${job.location}`,
        openGraph: {
            title: `${job.title} - People Partners Laos`,
            description: `Apply for ${job.title} position in ${job.department} at People Partners Laos. Location: ${job.location}`,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${job.title} - People Partners Laos`,
            description: `Apply for ${job.title} position in ${job.department} at People Partners Laos. Location: ${job.location}`,
        },
    };
}

export default async function JobPage({ params }: { params: Promise<{ hash: string }> }) {
    const { hash } = await params;
    const jobs = await getManatalJobs();
    const job = jobs.find((j) => j.hash === hash);

    if (!job) {
        notFound();
    }

    return <JobDetailPage job={job} allJobs={jobs} />;
}