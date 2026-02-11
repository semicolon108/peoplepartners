"use client";

import { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { toPng } from 'html-to-image';
import { Download, Link as LinkIcon, FileText, Image as ImageIcon } from 'lucide-react';
import { LOGO_BASE64 } from '@/lib/logo';

export default function QRGenerator() {
    const [url, setUrl] = useState("https://www.peoplepartners.la/apply");
    const [filename, setFilename] = useState("ppl-qr-code");
    const [includeLogo, setIncludeLogo] = useState(true);
    const [qrColor, setQrColor] = useState("#000000"); // Default black

    // Ref for the element we want to convert to an image
    const qrRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (qrRef.current === null) {
            return;
        }

        try {
            const dataUrl = await toPng(qrRef.current, { cacheBust: true, pixelRatio: 3 }); // High resolution
            const link = document.createElement('a');
            link.download = `${filename || 'qr-code'}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Failed to generate QR image', err);
            alert('Could not generate image. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-brand-gray-50 flex flex-col items-center justify-center p-8 pt-24">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-4xl w-full border border-brand-gray-100 flex flex-col md:flex-row gap-12">

                {/* Controls Section */}
                <div className="flex-1 space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-brand-gray-900 mb-2">QR Generator</h1>
                        <p className="text-brand-gray-500">Create branded QR codes for marketing materials.</p>
                    </div>

                    <div className="space-y-4">
                        {/* URL Input */}
                        <div>
                            <label className="block text-sm font-medium text-brand-gray-700 mb-1">
                                Target URL
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-gray-400">
                                    <LinkIcon size={16} />
                                </div>
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="pl-10 w-full px-4 py-2 border border-brand-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 transition-colors"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        {/* Filename Input */}
                        <div>
                            <label className="block text-sm font-medium text-brand-gray-700 mb-1">
                                File Name (for download)
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-gray-400">
                                    <FileText size={16} />
                                </div>
                                <input
                                    type="text"
                                    value={filename}
                                    onChange={(e) => setFilename(e.target.value)}
                                    className="pl-10 w-full px-4 py-2 border border-brand-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 transition-colors"
                                    placeholder="e.g. job-fair-2024"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-brand-gray-400 text-sm">
                                    .png
                                </div>
                            </div>
                        </div>

                        {/* Color Picker */}
                        <div>
                            <label className="block text-sm font-medium text-brand-gray-700 mb-1">
                                QR Color
                            </label>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setQrColor("#000000")}
                                    className={`w-8 h-8 rounded-full bg-black border-2 ${qrColor === "#000000" ? 'border-brand-blue-500 ring-2 ring-brand-blue-200' : 'border-transparent'}`}
                                    title="Black"
                                />
                                <button
                                    onClick={() => setQrColor("#1e40af")}
                                    className={`w-8 h-8 rounded-full bg-brand-blue-800 border-2 ${qrColor === "#1e40af" ? 'border-brand-blue-500 ring-2 ring-brand-blue-200' : 'border-transparent'}`}
                                    title="Brand Blue"
                                />
                            </div>
                        </div>

                        {/* Options */}
                        <div className="pt-2">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${includeLogo ? 'bg-brand-blue-600' : 'bg-brand-gray-300'}`}>
                                    <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out ${includeLogo ? 'translate-x-6' : 'translate-x-0'}`} />
                                </div>
                                <input
                                    type="checkbox"
                                    checked={includeLogo}
                                    onChange={(e) => setIncludeLogo(e.target.checked)}
                                    className="hidden"
                                />
                                <span className="text-sm font-medium text-brand-gray-700 group-hover:text-brand-gray-900 flex items-center gap-2">
                                    <ImageIcon size={16} />
                                    Include Logo
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            onClick={handleDownload}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-blue-600 text-white rounded-lg font-bold hover:bg-brand-blue-700 transition-colors shadow-lg shadow-brand-blue-200"
                        >
                            <Download size={20} />
                            Download High-Res PNG
                        </button>
                        <p className="mt-3 text-xs text-center text-brand-gray-400">
                            Generates a 1000x1000px high-quality image.
                        </p>
                    </div>
                </div>

                {/* Preview Section */}
                <div className="flex-1 flex flex-col items-center justify-center bg-brand-gray-50 rounded-xl p-8 border border-dashed border-brand-gray-200">
                    <p className="text-sm font-medium text-brand-gray-500 mb-6 uppercase tracking-wider">Preview</p>

                    {/* The specific div we will capture */}
                    <div
                        ref={qrRef}
                        className="bg-white p-8 rounded-xl shadow-sm"
                        style={{ width: 'fit-content' }} // Ensure implementation fits content for cleaner capture
                    >
                        <QRCodeCanvas
                            value={url}
                            size={300}
                            bgColor={"#ffffff"}
                            fgColor={qrColor}
                            level={"H"} // High error correction for logo tolerance
                            includeMargin={false}
                            {...(includeLogo && {
                                imageSettings: {
                                    src: LOGO_BASE64,
                                    height: 60,
                                    width: 60,
                                    excavate: true,
                                }
                            })}
                        />
                    </div>
                    <p className="mt-6 text-sm text-brand-gray-500 text-center max-w-xs break-all">
                        {url}
                    </p>
                </div>

            </div>
        </div>
    );
}
