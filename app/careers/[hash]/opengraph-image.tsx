
import { ImageResponse } from 'next/og'
import { LOGO_BASE64 } from '@/lib/logo'
import { getManatalJobs } from '../page';

// export const runtime = 'edge'
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

/* eslint-disable-next-line @next/next/no-img-element */
export default async function Image({ params }: { params: { hash: string } }) {
    const jobs = await getManatalJobs();
    const job = jobs.find((j) => j.hash === params.hash);

    // Fallback for missing job
    const title = job?.title || 'Job Opportunity';
    const department = job?.department || 'Careers';
    const location = job?.location || 'Laos';

    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Inter, sans-serif',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        color: 'white',
                        padding: '40px',
                        width: '90%',
                    }}
                >
                    {/* Badge */}
                    <div
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            padding: '8px 24px',
                            borderRadius: '30px',
                            fontSize: '24px',
                            fontWeight: '600',
                            marginBottom: '30px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                        }}
                    >
                        We Are Hiring
                    </div>

                    <h1
                        style={{
                            fontSize: '72px',
                            fontWeight: 'bold',
                            marginBottom: '20px',
                            lineHeight: '1.1',
                            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                            maxWidth: '1000px',
                        }}
                    >
                        {title}
                    </h1>

                    <div
                        style={{
                            display: 'flex',
                            gap: '20px',
                            alignItems: 'center',
                            fontSize: '32px',
                            marginBottom: '60px',
                            opacity: 0.9,
                            fontWeight: '500',
                        }}
                    >
                        <span>{department}</span>
                        <span>•</span>
                        <span>{location}</span>
                    </div>

                    {/* Company Footer */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            fontSize: '24px',
                            fontWeight: '600',
                            opacity: 0.9,
                            backgroundColor: 'white',
                            padding: '12px 24px',
                            borderRadius: '12px',
                            color: '#1e40af',
                        }}
                    >
                        <img
                            src={LOGO_BASE64}
                            alt="People Partners Laos Logo"
                            style={{
                                width: '40px',
                                height: '40px',
                                objectFit: 'contain',
                            }}
                        />
                        <span>People Partners Laos</span>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
