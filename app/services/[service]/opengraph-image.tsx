// app/services/[service]/opengraph-image.tsx
import { ImageResponse } from 'next/og'
import { LOGO_BASE64 } from '@/lib/logo'
import { serviceConfig } from '@/lib/serviceConfig'


export const runtime = 'edge'
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: { service: string } }) {
    const service = serviceConfig[params.service as keyof typeof serviceConfig] || serviceConfig.bpo

    return new ImageResponse(
        (
            <div
                style={{
                    background: service.gradient,
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
                    }}
                >
                    {/* Service Icon */}
                    <div
                        style={{
                            fontSize: '80px',
                            marginBottom: '30px',
                        }}
                    >
                        {service.icon}
                    </div>

                    <h1
                        style={{
                            fontSize: '56px',
                            fontWeight: 'bold',
                            marginBottom: '20px',
                            lineHeight: '1.1',
                            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                        }}
                    >
                        {service.title}
                    </h1>

                    <p
                        style={{
                            fontSize: '28px',
                            marginBottom: '40px',
                            opacity: 0.9,
                            fontWeight: '400',
                            maxWidth: '800px',
                        }}
                    >
                        {service.description}
                    </p>

                    {/* Company branding with logo */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            fontSize: '24px',
                            fontWeight: '600',
                            opacity: 0.9,
                        }}
                    >
                        <div
                            style={{
                                width: '50px',
                                height: '50px',
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '8px',
                            }}
                        >
                            <img
                                src={LOGO_BASE64}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                }}
                            />
                        </div>
                        <span>People Partners Lao</span>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}