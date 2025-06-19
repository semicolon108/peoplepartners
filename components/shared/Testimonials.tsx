import { serviceData } from "@/app/about/data";

// components/shared/Testimonials.tsx
export default function Testimonials() {
    return (
        <section className="py-20 bg-gradient-to-br from-brand-blue-700 to-brand-blue-500 text-white">
            <div className="container">
                <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
                <div className="grid lg:grid-cols-3 gap-8">
                    {serviceData.testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
                            <p className="italic mb-6">&quot;{testimonial.quote}&quot;</p>
                            <div className="font-semibold text-slate-200">{testimonial.author}</div>
                            <div className="text-sm opacity-80">{testimonial.company}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}