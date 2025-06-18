// components/home/Trust.tsx

import Image from "next/image";


export default function Trust() {
    return (
        <section className="py-20 bg-white">
            <div className="container text-center">
                <a
                    href="https://www.108.jobs/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-br from-brand-yellow-light to-brand-yellow text-white font-semibold px-8 py-3 rounded-full mb-8 text-lg hover:shadow-lg transition-shadow"
                >
                    Sister Company of 108Jobs - Laos&apos; No.1 Job Portal
                </a>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-blue-dark">Trusted by Leading Companies</h2>
                <p className="text-brand-gray max-w-2xl mx-auto mb-10">
                    Our clients trust us with their most valuable asset - their people. Join the growing list of companies that rely on our expertise.
                </p>
                <div className="flex justify-center items-center gap-x-10 gap-y-6 flex-wrap">
                    <Image
                        className="rounded-sm"
                        src="/dhl-logo.svg"
                        width={256}
                        height={256}
                        alt="DHL Logo"
                    />
                    <Image
                        className="rounded-sm"
                        src="https://upload.wikimedia.org/wikipedia/commons/e/ed/Logo_EssilorLuxottica.svg"
                        width={256}
                        height={256}
                        alt="essilor"
                    />
                    <Image
                        className="rounded-sm"
                        src="/Schneider_Electric_2007.svg"
                        width={256}
                        height={256}
                        alt="se"
                    />
                    <Image
                        className="rounded-sm"
                        src="/Huawei_Standard_logo.svg"
                        width={124}
                        height={256}
                        alt="HW"
                    />
                    {/* <Image
                        className="rounded-sm"
                        src="/OR-logo-color.svg"
                        width={256}
                        height={256}
                        alt="Or"
                    /> */}
                </div>
            </div>
        </section>
    );
}