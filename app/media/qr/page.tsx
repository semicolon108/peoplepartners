"use client";

import { Printer, Download } from "lucide-react";

export default function QRGenerator() {
    // Assuming the production domain. Ideally, this comes from an env var, 
    // but for a brochure, we want the hardcoded production URL.
    const targetUrl = "https://www.peoplepartners.la/apply";

    // Using a reliable public API for high-quality QR generation
    // Size 1000x1000 is great for print (high DPI)
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&format=png&data=${encodeURIComponent(targetUrl)}`;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 pt-24">
            <div className="bg-white p-12 rounded-2xl shadow-xl max-w-2xl w-full text-center border border-gray-100">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">QR Code for Marketing</h1>
                <p className="text-gray-500 mb-8">
                    High-resolution QR code pointing to <strong className="text-blue-600">{targetUrl}</strong>
                </p>

                <div className="bg-white p-4 border-2 border-dashed border-gray-200 rounded-xl inline-block mb-8">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={qrImageUrl}
                        alt="QR Code for /apply page"
                        className="w-80 h-80 md:w-96 md:h-96 object-contain"
                    />
                </div>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => window.print()}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-full font-medium hover:bg-gray-900 transition-colors"
                    >
                        <Printer size={20} />
                        Print Page
                    </button>

                    <a
                        href={qrImageUrl}
                        download="people-partners-apply-qr.png"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
                    >
                        <Download size={20} />
                        Download High-Res PNG
                    </a>
                </div>

                <p className="mt-8 text-sm text-gray-400">
                    Use this image for brochures, standees, and banners. It checks out to the correct URL.
                </p>
            </div>
        </div>
    );
}
