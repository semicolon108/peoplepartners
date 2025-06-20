// components/home/Trust.tsx

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const clientLogos = [
    {
        src: "/dhl-logo.svg",
        alt: "DHL Logo",
        width: 180,
        height: 80,
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Logo_EssilorLuxottica.svg",
        alt: "EssilorLuxottica Logo",
        width: 180,
        height: 80,
    },
    {
        src: "/Schneider_Electric_2007.svg",
        alt: "Schneider Electric Logo",
        width: 180,
        height: 80,
    },
    {
        src: "/Huawei_Standard_logo.svg",
        alt: "Huawei Logo",
        width: 180,
        height: 80,
    },
    {
        src: "/OR-logo-color.svg",
        alt: "OR Logo",
        width: 180,
        height: 80,
    },
];

export default function Trust() {
    const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

    const handleImageError = (src: string) => {
        setImageErrors(prev => ({ ...prev, [src]: true }));
        console.warn(`Failed to load image: ${src}`);
    };

    const handleImageLoad = (src: string) => {
        console.log(`Successfully loaded image: ${src}`);
    };

    // Double the logos array for seamless looping
    const duplicatedLogos = [...clientLogos, ...clientLogos];

    return (
        <section className="py-20 bg-white">
            <div className="container text-center">
                <a
                    href="https://www.108.jobs/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-br from-brand-yellow-300 to-brand-yellow-400 text-white font-semibold px-8 py-3 rounded-full mb-8 text-lg hover:shadow-lg transition-shadow"
                >
                    Sister Company of 108Jobs - Laos&apos; No.1 Job Portal
                </a>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-blue-700">Trusted by Leading Companies</h2>
                <p className="text-brand-gray-500 max-w-2xl mx-auto mb-10">
                    Our clients trust us with their most valuable asset - their people. Join the growing list of companies that rely on our expertise.
                </p>
                
                {/* Sliding Logo Carousel */}
                <div className="relative overflow-hidden">
                    <div className="flex animate-slide-left-infinite">
                        {duplicatedLogos.map((logo, index) => (
                            <div
                                key={`${logo.src}-${index}`}
                                className="flex-shrink-0 mx-8 flex items-center justify-center h-20 w-48"
                            >
                                {!imageErrors[logo.src] ? (
                                    <Image
                                        src={logo.src}
                                        alt={logo.alt}
                                        width={logo.width}
                                        height={logo.height}
                                        className="max-h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                                        onError={() => handleImageError(logo.src)}
                                        onLoad={() => handleImageLoad(logo.src)}
                                        priority={index < clientLogos.length}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-16 w-32 bg-brand-gray-100 rounded text-brand-gray-400 text-sm">
                                        Logo unavailable
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Image Status Debug Info (only in development) */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="mt-8 text-sm text-brand-gray-400">
                        <details>
                            <summary className="cursor-pointer">Image Status (Dev Only)</summary>
                            <div className="mt-2 space-y-1">
                                {clientLogos.map((logo) => (
                                    <div key={logo.src} className="flex justify-between">
                                        <span>{logo.alt}:</span>
                                        <span className={imageErrors[logo.src] ? "text-red-500" : "text-green-500"}>
                                            {imageErrors[logo.src] ? "Failed" : "Loaded"}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </details>
                    </div>
                )}
            </div>
        </section>
    );
}