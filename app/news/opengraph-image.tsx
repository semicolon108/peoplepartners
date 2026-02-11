
import { ImageResponse } from 'next/og'
import { LOGO_BASE64 } from '@/lib/logo'

export const runtime = 'edge'
export const alt = 'News & Insights - People Partners Laos'
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

/* eslint-disable-next-line @next/next/no-img-element */
export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Inter, sans-serif',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Background Decor */}
                <div
                    style={{
                        position: 'absolute',
                        top: -100,
                        right: -100,
                        width: 400,
                        height: 400,
                        borderRadius: '50%',
                        background: 'rgba(30, 64, 175, 0.1)',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: -100,
                        left: -100,
                        width: 400,
                        height: 400,
                        borderRadius: '50%',
                        background: 'rgba(59, 130, 246, 0.1)',
                    }}
                />

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        zIndex: 10,
                        border: '1px solid #e5e7eb',
                        borderRadius: '24px',
                        padding: '60px 80px',
                        background: 'rgba(255, 255, 255, 0.9)',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                    }}
                >
                    {/* Logo Area */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            marginBottom: '40px',
                        }}
                    >
                        <div
                            style={{
                                width: '60px',
                                height: '60px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <img
                                src={LOGO_BASE64}
                                alt="Logo"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                }}
                            />
                        </div>
                        <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e40af' }}>
                            People Partners Laos
                        </span>
                    </div>

                    <h1
                        style={{
                            fontSize: '80px',
                            fontWeight: '900',
                            color: '#111827',
                            marginBottom: '20px',
                            lineHeight: '1',
                            letterSpacing: '-2px',
                        }}
                    >
                        News & Insights
                    </h1>

                    <p
                        style={{
                            fontSize: '36px',
                            color: '#4b5563',
                            marginBottom: '40px',
                            maxWidth: '800px',
                        }}
                    >
                        Legal Updates, Labor Law & HR Best Practices
                    </p>

                    <div
                        style={{
                            display: 'flex',
                            gap: '16px',
                        }}
                    >
                        <div style={{ padding: '10px 24px', background: '#eff6ff', color: '#1e40af', borderRadius: '50px', fontSize: '24px', fontWeight: '600' }}>
                            Stay Informed
                        </div>
                        <div style={{ padding: '10px 24px', background: '#eff6ff', color: '#1e40af', borderRadius: '50px', fontSize: '24px', fontWeight: '600' }}>
                            Compliance
                        </div>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
