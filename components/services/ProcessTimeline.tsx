// components/services/ProcessTimeline.tsx

interface Step {
    title: string;
    description: string;
}

interface ProcessTimelineProps {
    steps: Step[];
}

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
    return (
        <div className="relative max-w-2xl mx-auto">
            {/* The vertical line */}
            <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-slate-200" aria-hidden="true"></div>

            <div className="space-y-8">
                {steps.map((step, index) => (
                    <div key={index} className="relative flex items-start space-x-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-brand-blue-700 to-brand-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 z-10">
                            {index + 1}
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg text-brand-blue-900 mb-1">{step.title}</h4>
                            <p className="text-brand-gray">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}