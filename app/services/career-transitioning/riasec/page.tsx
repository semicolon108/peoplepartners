// app/services/career-transitioning/riasec/page.tsx
import RiasecForm from '@/components/services/career-transitioning/RiasecForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'RIASEC Assessment | Career Transitioning',
    description: 'Take the RIASEC assessment to discover your career personality type and find the perfect job fit.',
};

export default function RiasecAssessmentPage() {
    return (
        <div className="pt-32 pb-20 min-h-screen bg-slate-50 bg-[url('/grid-pattern.svg')]">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-brand-blue-900 mb-4">
                        RIASEC Assessment
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        ຄົ້ນຫາບຸກຄະລິກກະພາບທາງອາຊີບຂອງທ່ານ. ກະລຸນາຕອບຄໍາຖາມຕາມຄວາມເປັນຈິງ.
                        <br />
                        <span className="text-slate-500 text-base">Discover your career personality. Please answer the questions truthfully to get the most accurate result.</span>
                    </p>
                </div>

                <RiasecForm />
            </div>
        </div>
    );
}
