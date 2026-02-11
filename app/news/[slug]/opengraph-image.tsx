
import { ImageResponse } from 'next/og'
import { LOGO_BASE64 } from '@/lib/logo'
import { getNewsBySlug } from '@/lib/news';

// export const runtime = 'edge'
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

/* eslint-disable-next-line @next/next/no-img-element */
export default async function Image({ params }: { params: { slug: string } }) {
    const post = getNewsBySlug(params.slug);

    // Fallback
    const title = post?.title || 'News & Insights';
    const category = post?.category || 'Article';
    const date = post?.date || '';

    return new ImageResponse(
        (
            <div
                style={{
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    fontFamily: 'Inter, sans-serif',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Decorative Background Element */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-10%',
                        right: '-10%',
                        width: '600px',
                        height: '600px',
                        background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.05) 0%, rgba(59, 130, 246, 0.1) 100%)',
                        borderRadius: '50%',
                        zIndex: 0,
                    }}
                />

                <div
                    style={{
                        padding: '80px 60px',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        justifyContent: 'center',
                        zIndex: 1,
                    }}
                >
                    {/* Category & Date */}
                    <div
                        style={{
                            display: 'flex',
                            gap: '16px',
                            alignItems: 'center',
                            marginBottom: '30px',
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: '#EFF6FF',
                                color: '#1e40af',
                                padding: '8px 20px',
                                borderRadius: '30px',
                                fontSize: '24px',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                            }}
                        >
                            {category}
                        </div>
                        {date && (
                            <div
                                style={{
                                    fontSize: '24px',
                                    color: '#6B7280',
                                    fontWeight: '500',
                                }}
                            >
                                {date}
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    <h1
                        style={{
                            fontSize: '70px',
                            fontWeight: 'bold',
                            color: '#111827',
                            marginBottom: '40px',
                            lineHeight: '1.1',
                            maxWidth: '1000px',
                        }}
                    >
                        {title}
                    </h1>

                    {/* Author/Brand */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            marginTop: 'auto',
                        }}
                    >
                        <div
                            style={{
                                width: '50px',
                                height: '50px',
                                backgroundColor: '#1e40af',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '8px',
                            }}
                        >
                            <img
                                src={LOGO_BASE64}
                                alt="Logo"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    filter: 'brightness(0) invert(1)',
                                }}
                            />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
                                People Partners Laos
                            </span>
                            <span style={{ fontSize: '18px', color: '#6B7280' }}>
                                Insights & Updates
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{ height: '12px', width: '100%', background: 'linear-gradient(90deg, #1e40af 0%, #3b82f6 100%)' }} />
            </div>
        ),
        {
            ...size,
        }
    )
}
