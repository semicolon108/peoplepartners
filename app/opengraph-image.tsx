// app/opengraph-image.tsx
import { ImageResponse } from 'next/og'
import { LOGO_BASE64 } from '@/lib/logo'

export const runtime = 'edge'
export const alt = 'People Partners Lao - Your Expert HR Partner in Laos'
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
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
                    }}
                >
                    {/* Logo */}
                    <div
                        style={{
                            width: '120px',
                            height: '120px',
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '40px',
                            padding: '16px',
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

                    <h1
                        style={{
                            fontSize: '64px',
                            fontWeight: 'bold',
                            marginBottom: '20px',
                            lineHeight: '1.1',
                            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                        }}
                    >
                        People Partners Lao
                    </h1>

                    <p
                        style={{
                            fontSize: '32px',
                            marginBottom: '30px',
                            opacity: 0.9,
                            fontWeight: '500',
                        }}
                    >
                        Your Expert HR Partner in Laos
                    </p>

                    <div
                        style={{
                            display: 'flex',
                            gap: '30px',
                            fontSize: '24px',
                            fontWeight: '500',
                            opacity: 0.8,
                        }}
                    >
                        <span>Compliant</span>
                        <span>•</span>
                        <span>Efficient</span>
                        <span>•</span>
                        <span>Reliable</span>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}