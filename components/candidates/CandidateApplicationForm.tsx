'use client';

import { useState } from 'react';
import { Loader2, CheckCircle, ChevronRight } from 'lucide-react';
import { CandidateFormInput } from '@/lib/googleSheets';

// Server Action Wrapper (since addCandidate is server-side only, we might need to wrap it or move it)
// Ideally, addCandidate should be called via a Server Action file.
// For now, I'll assume we can import it if it's "use server" or wrapped.
// Actually, `lib/googleSheets.ts` uses `fs` and `process.env`, so it CANNOT be imported directly into a client component.
// I need to create a server action in a separate file.

interface CandidateApplicationFormProps {
    submitAction: (data: CandidateFormInput) => Promise<{ success: boolean; message: string }>;
}

export default function CandidateApplicationForm({ submitAction }: CandidateApplicationFormProps) {
    const [step, setStep] = useState<'form' | 'submitting' | 'success'>('form');
    const [error, setError] = useState<string | null>(null);
    const [salaryCurrency, setSalaryCurrency] = useState('USD');
    const [salaryAmount, setSalaryAmount] = useState('');
    const [formData, setFormData] = useState<CandidateFormInput>({
        fullName: '',
        phone: '',
        gender: '',
        location: '',
        age: '',
        experience: '',
        qualification: '',
        salary: '',
        languages: '',
        availability: '',
        bio: '',
        role: '',
        contractType: 'Full-time',
        notPreferred: '',
        travel: 'No',
        manatalLink: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Format number with commas (e.g. 1900 -> "1,900")
    const formatNumber = (num: string) => {
        const n = num.replace(/[^0-9]/g, '');
        return n ? parseInt(n).toLocaleString('en-US') : '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setStep('submitting');

        // Combine currency + amount into standardized format
        const formattedSalary = salaryAmount.trim()
            ? `${salaryCurrency} ${formatNumber(salaryAmount)}`
            : '';

        try {
            const result = await submitAction({ ...formData, salary: formattedSalary });
            if (result.success) {
                setStep('success');
            } else {
                setError(result.message);
                setStep('form');
            }
        } catch (err) {
            console.error(err);
            setError('Something went wrong. Please try again.');
            setStep('form');
        }
    };

    if (step === 'success') {
        return (
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden text-center p-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Application Received!</h2>
                <p className="text-lg text-slate-600 mb-8">
                    Thank you for joining our Talent Pool. We have received your profile and will review it shortly.
                </p>
                <button
                    onClick={() => window.location.href = '/candidates'}
                    className="bg-brand-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-brand-blue-700 transition-colors"
                >
                    Back to Candidates
                </button>
            </div>
        );
    }

    if (step === 'submitting') {
        return (
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
                <Loader2 size={48} className="text-brand-blue-600 animate-spin mb-4" />
                <h3 className="text-2xl font-bold text-slate-900">Submitting your Profile...</h3>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-brand-blue-900 px-8 py-6 text-white text-center">
                <h2 className="text-2xl font-bold">Join Our Talent Pool</h2>
                <p className="text-brand-blue-100 mt-1">Fill in your details to get discovered by top employers.</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-center">
                        {error}
                    </div>
                )}

                {/* Personal Info */}
                <section>
                    <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Personal Information</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name *</label>
                            <input
                                required
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 outline-none"
                                placeholder="e.g. Somchai Vong..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Phone Number *</label>
                            <input
                                required
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 outline-none"
                                placeholder="e.g. 020 5555 5555"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Gender *</label>
                            <select
                                required
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 outline-none"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Age *</label>
                            <input
                                required
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 outline-none"
                                placeholder="e.g. 25"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Location *</label>
                            <input
                                required
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 outline-none"
                                placeholder="Current City, District"
                            />
                        </div>
                    </div>
                </section>

                {/* Professional Profile */}
                <section>
                    <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Professional Profile</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Current/Looking Role *</label>
                            <input
                                required
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 outline-none"
                                placeholder="e.g. Senior Accountant, Sales Manager"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Highest Qualification *</label>
                            <select
                                required
                                name="qualification"
                                value={formData.qualification}
                                onChange={handleChange}
                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 outline-none"
                            >
                                <option value="">Select Qualification</option>
                                <option value="High School">High School</option>
                                <option value="Diploma">Diploma / Associate Degree</option>
                                <option value="Bachelor's">Bachelor's Degree</option>
                                <option value="Master's">Master's Degree</option>
                                <option value="PhD">PhD / Doctorate</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Years of Experience *</label>
                            <input
                                required
                                type="number"
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 outline-none"
                                placeholder="e.g. 5"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Expected Salary (Monthly)</label>
                            <div className="flex gap-2">
                                <select
                                    value={salaryCurrency}
                                    onChange={(e) => setSalaryCurrency(e.target.value)}
                                    className="w-28 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 outline-none bg-white"
                                >
                                    <option value="USD">USD</option>
                                    <option value="LAK">LAK</option>
                                    <option value="THB">THB</option>
                                    <option value="CNY">CNY</option>
                                </select>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    value={salaryAmount}
                                    onChange={(e) => setSalaryAmount(e.target.value.replace(/[^0-9]/g, ''))}
                                    className="flex-1 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 outline-none"
                                    placeholder="e.g. 1900"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Languages *</label>
                            <input
                                required
                                name="languages"
                                value={formData.languages}
                                onChange={handleChange}
                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 outline-none"
                                placeholder="e.g. Lao (Native), English (Advanced)"
                            />
                        </div>
                    </div>
                </section>

                {/* Preferences */}
                <section>
                    <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Preferences & Availability</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Availability to Start *</label>
                            <select
                                required
                                name="availability"
                                value={formData.availability}
                                onChange={handleChange}
                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 outline-none"
                            >
                                <option value="">Select Availability</option>
                                <option value="Immediately">Immediately</option>
                                <option value="1 Month Notice">1 Month Notice</option>
                                <option value="Open to discuss">Open to discuss</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Contract Preference</label>
                            <select
                                name="contractType"
                                value={formData.contractType}
                                onChange={handleChange}
                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 outline-none"
                            >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract / Freelance</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Willing to Travel?</label>
                            <select
                                name="travel"
                                value={formData.travel}
                                onChange={handleChange}
                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 outline-none"
                            >
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                                <option value="Occasionally">Occasionally</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Not Preferred Industries/Companies</label>
                            <input
                                name="notPreferred"
                                value={formData.notPreferred}
                                onChange={handleChange}
                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 outline-none"
                                placeholder="Optional"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Professional Summary / Bio *</label>
                        <textarea
                            required
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows={4}
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 outline-none"
                            placeholder="Briefly describe your experience, skills, and carrier goals..."
                        />
                    </div>
                </section>

                <section>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Ref Link to Manatal</label>
                        <textarea
                            name="manatalLink"
                            value={formData.manatalLink}
                            onChange={handleChange}
                            rows={2}
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 outline-none"
                            placeholder="Link to Manatal profile..."
                        />
                    </div>
                </section>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                    >
                        <span>Submit Application</span>
                        <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-center text-xs text-slate-400 mt-4">
                        By submitting, you agree to allow People Partners to store your data and share it with potential employers.
                    </p>
                </div>

            </form>
        </div>
    );
}
