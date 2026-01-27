import { Quote } from 'lucide-react';

const testimonials = [
    {
        quote: "PPL helped me find a role that perfectly matched my skills. The recruitment process was transparent and professional from start to finish.",
        author: "Somphet K.",
        role: "Senior Marketing Manager"
    },
    {
        quote: "I was impressed by how quickly they connected me with top companies in Vientiane. Highly recommended for anyone looking to advance their career.",
        author: "David V.",
        role: "Software Developer"
    },
    {
        quote: "The team at PPL really understood what I was looking for. They didn't just find me a job, they found me a career path.",
        author: "Malaythong S.",
        role: "HR Specialist"
    }
];

export default function CandidateTestimonials() {
    return (
        <section className="py-20 bg-white">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-brand-blue-900 mb-4">
                        Success Stories
                    </h2>
                    <p className="text-brand-gray-600 text-lg">
                        Join hundreds of professionals who have found their dream careers through People Partners Lao.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <div key={index} className="bg-brand-gray-50 p-8 rounded-2xl relative hover:shadow-lg transition-shadow duration-300">
                            <div className="absolute top-8 right-8 text-brand-blue-100">
                                <Quote size={48} fill="currentColor" />
                            </div>
                            <div className="relative z-10">
                                <p className="text-brand-gray-700 leading-relaxed mb-6">
                                    "{item.quote}"
                                </p>
                                <div>
                                    <div className="font-bold text-brand-blue-900">{item.author}</div>
                                    <div className="text-sm text-brand-blue-600 font-medium">{item.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
