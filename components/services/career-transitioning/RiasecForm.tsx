'use client';

import { useState } from 'react';
import { personalQuestions, questions } from '@/app/services/career-transitioning/questions';
import { ChevronRight, ChevronLeft, CheckCircle, Loader2, Download } from 'lucide-react';
import { welcomeContent } from './welcome';

export default function RiasecForm() {
    const [step, setStep] = useState<'welcome' | 'personal' | 'assessment' | 'submitting' | 'success'>('welcome');
    const [personalInfo, setPersonalInfo] = useState<Record<string, string>>({});
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    const currentQuestion = questions[currentQuestionIndex];

    // Calculate progress
    // Personal step is 0%, then proportional to questions answered
    const totalSteps = questions.length;
    const progress = step === 'welcome' || step === 'personal' ? 0 : ((currentQuestionIndex) / totalSteps) * 100;

    // Filter validation
    const isPersonalStepValid = () => {
        return personalQuestions.every(q => {
            if (!q.required) return true;
            const val = personalInfo[q.id];
            return val && val.trim() !== '';
        });
    };

    const handlePersonalSubmit = () => {
        if (isPersonalStepValid()) {
            setStep('assessment');
            window.scrollTo(0, 0);
        } else {
            setError('Please fill in all required fields.');
        }
    };

    const handleAnswerSelect = (questionId: number, value: string) => {
        const newAnswers = { ...answers, [questionId]: value };
        setAnswers(newAnswers);

        // Auto-advance with delay
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                // window.scrollTo(0, 0); // Not needed for single question view usually
            } else {
                // Last question answered - maybe show submit button or auto submit?
                // Let's just auto-complete the form or show a "Finish" state
                handleSubmit(newAnswers);
            }
        }, 300);
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        } else {
            setStep('personal');
        }
    };

    const handleSubmit = async (answersOverride?: Record<number, string>) => {
        setStep('submitting');

        const finalAnswers = answersOverride || answers;
        const answersPayload: Record<string, string> = {};
        questions.forEach(q => {
            answersPayload[`q${q.id}`] = finalAnswers[q.id] || '';
        });

        const payload = {
            fullName: personalInfo.fullName,
            age: personalInfo.age,
            gender: personalInfo.gender,
            language: personalInfo.language,
            industry: personalInfo.industry,
            currentJob: personalInfo.currentJob,
            experience: personalInfo.experience,
            province: personalInfo.province,
            phone: personalInfo.phone,
            email: personalInfo.email,
            reason: personalInfo.reason,
            ...answersPayload,
            timestamp: new Date().toISOString()
        };

        // ==================================================================================
        // VERSION 1: Instant PDF Download (EVENT PERIOD - FREE)
        // This version expects the Google Script to return a JSON with { status: 'success', pdfUrl: '...' }
        // ==================================================================================
        try {
            const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzhmMUGlMCzUeE51if0UR61XYNcpnW_ud07uPB2Mn75G41pGu1k4J6sXX8tsIQadzGZjA/exec';

            // Send as text/plain to avoid preflight CORS issues, but body is valid JSON
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.status === 'success') {
                if (result.pdfUrl) {
                    setPdfUrl(result.pdfUrl);
                }
                setStep('success');
                window.scrollTo(0, 0);
            } else {
                throw new Error(result.message || "Script returned error");
            }
        } catch (err) {
            console.error("Submission Error:", err);
            setError('Something went wrong. Please check your connection and try again.');
            setStep('assessment');
        }

        /*
        // ==================================================================================
        // VERSION 2: Email Only Report (PAID MODE - ADMIN MANUAL SEND)
        // Use this if you want to switch back to the version where admin sends report manually.
        // This handles standard 'no-cors' submission if needed.
        // ==================================================================================
        try {
            const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzhmMUGlMCzUeE51if0UR61XYNcpnW_ud07uPB2Mn75G41pGu1k4J6sXX8tsIQadzGZjA/exec';

            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Useful if script doesn't handle CORS well
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            // Small delay to ensure the user sees the submitting state briefly
            await new Promise(resolve => setTimeout(resolve, 1500));

            setStep('success');
            window.scrollTo(0, 0);
        } catch (err) {
            console.error(err);
            setError('Something went wrong. Please try again.');
            setStep('assessment');
        }
        */

    };


    if (step === 'welcome') {
        const { Lao, English } = welcomeContent;

        return (
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden text-center p-8 md:p-12 animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-brand-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-brand-blue-600" />
                </div>

                {/* Titles */}
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{Lao.title}</h2>
                <p className="text-xl text-slate-600 mb-6 font-semibold">{Lao.subtitle}</p>

                <h3 className="text-xl font-bold text-brand-blue-600 mb-1">{English.title}</h3>
                <p className="text-md text-brand-blue-400 mb-8">{English.subtitle}</p>

                <div className="space-y-6 text-slate-600 mb-8 text-left bg-slate-50 p-6 rounded-xl border border-slate-100">
                    <div className="space-y-4">
                        <p className="font-medium text-lg leading-relaxed">{Lao.intro}</p>
                        <blockquote className="italic border-l-4 border-brand-blue-300 pl-4 py-2 bg-white rounded-r-lg shadow-sm">
                            "{Lao.quote}"
                        </blockquote>

                        <h4 className="font-bold text-brand-blue-800 mt-4">{Lao.targetAudienceTitle}</h4>
                        <ul className="list-disc list-inside space-y-2 marker:text-brand-blue-500">
                            {Lao.points.map((point, idx) => (
                                <li key={idx} className="leading-relaxed">{point}</li>
                            ))}
                        </ul>
                        <p className="text-sm text-slate-500 italic mt-4">{Lao.note}</p>
                    </div>

                    <div className="h-px bg-slate-200 my-4"></div>

                    <div className="space-y-4 text-sm md:text-base opacity-90">
                        <p className="leading-relaxed">{English.intro}</p>
                        <blockquote className="italic border-l-4 border-slate-300 pl-4 py-1 text-slate-500">
                            {English.quote}
                        </blockquote>
                        <h4 className="font-bold text-slate-700 mt-4">{English.targetAudienceTitle}</h4>
                        <ul className="list-disc list-inside space-y-1 marker:text-slate-400">
                            {English.points.map((point, idx) => (
                                <li key={idx}>{point}</li>
                            ))}
                        </ul>
                        <p className="text-xs text-slate-400 italic mt-2">{English.note}</p>
                    </div>
                </div>

                <button
                    onClick={() => {
                        setStep('personal');
                        window.scrollTo(0, 0);
                    }}
                    className="w-full bg-brand-blue-600 text-white font-bold py-4 rounded-xl hover:bg-brand-blue-700 transition-all shadow-lg hover:shadow-xl hover:translate-y-[-2px] flex items-center justify-center gap-2 group"
                >
                    <span className="text-lg">{Lao.buttonStart}</span>
                    <span className="opacity-75 font-normal text-sm">| {English.buttonStart}</span>
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        );
    }

    if (step === 'success') {
        return (
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden text-center p-8 md:p-12 animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-green-600" />
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">ການປະເມີນສຳເລັດ!</h2>
                <h3 className="text-xl text-slate-500 font-medium mb-6">Assessment Complete!</h3>

                <p className="text-lg text-slate-700 mb-2 font-medium">
                    ຂອບໃຈທີ່ທ່ານໄດ້ເຮັດບົດທົດສອບ RIASEC.<br />
                    ພວກເຮົາໄດ້ຮັບຂໍ້ມູນຂອງທ່ານແລ້ວ
                    {!pdfUrl && " ແລະ ຈະຕິດຕໍ່ຫາທ່ານໃນໄວໆນີ້ ພ້ອມກັບບົດລາຍງານຜົນການທົດສອບຂອງທ່ານ."}
                </p>
                <p className="text-slate-500 mb-8 text-sm">
                    Thank you for completing the RIASEC assessment.<br />
                    We have received your results.
                </p>

                {pdfUrl && (
                    <div className="mb-8">
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                            <p className="text-green-800 font-bold mb-1">ບົດລາຍງານຂອງທ່ານພ້ອມແລ້ວ! (Your report is ready!)</p>
                            <p className="text-green-700 text-sm">ກະລຸນາກົດປຸ່ມລຸ່ມນີ້ເພື່ອດາວໂຫລດ.</p>
                        </div>
                        <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                        >
                            <Download size={24} />
                            <span>Download PDF Report / ດາວໂຫລດບົດລາຍງານ</span>
                        </a>
                    </div>
                )}

                <div className="p-6 bg-slate-50 rounded-xl mb-8 text-left space-y-6">
                    <div>
                        <h4 className="font-bold text-slate-900 mb-3 text-lg">ຂັ້ນຕອນຕໍ່ໄປ (Next Steps):</h4>
                        <ul className="list-disc list-inside text-slate-700 space-y-3">
                            <li>
                                <span className="font-medium">ນັກໃຫ້ຄຳປຶກສາອາຊີບຂອງພວກເຮົາຈະວິເຄາະຂໍ້ມູນຂອງທ່ານ.</span>
                                <div className="text-sm text-slate-500 pl-5 pt-1">Our career counselors will analyze your profile.</div>
                            </li>
                            {pdfUrl ? (
                                <li>
                                    <span className="font-medium">ທ່ານສາມາດເບິ່ງບົດລາຍງານເບື້ອງຕົ້ນໄດ້ເລີຍ.</span>
                                    <div className="text-sm text-slate-500 pl-5 pt-1">You can view your preliminary report immediately.</div>
                                </li>
                            ) : (
                                <li>
                                    <span className="font-medium">ທ່ານຈະໄດ້ຮັບບົດລາຍງານຜ່ານທາງອີເມວທີ່ທ່ານໃຫ້ໄວ້ ({personalInfo.email}).</span>
                                    <div className="text-sm text-slate-500 pl-5 pt-1">You will receive the report via the email you provided ({personalInfo.email}).</div>
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className="border-t border-slate-200 pt-6">
                        <h4 className="font-bold text-slate-900 mb-3">ຕິດຕໍ່ພວກເຮົາ (Contact Us):</h4>
                        <div className="space-y-2 text-slate-600">
                            <p className="flex items-center gap-2">
                                <span className="font-semibold w-24">ໂທ (Tel):</span>
                                <span className="font-mono text-brand-blue-600">+856 20 xxxx xxxx</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="font-semibold w-24">ອີເມວ (Mail):</span>
                                <span className="font-mono text-brand-blue-600">contact@peoplepartners.la</span>
                            </p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => window.location.href = '/services/career-transitioning'}
                    className="inline-block bg-slate-200 text-slate-700 font-bold px-8 py-3 rounded-lg hover:bg-slate-300 transition-colors"
                >
                    Back to Career Transitioning
                </button>
            </div>
        );
    }

    if (step === 'submitting') {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-white rounded-2xl shadow-xl">
                <Loader2 size={48} className="text-brand-blue-600 animate-spin mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">ກໍາລັງປະມວນຜົນຄໍາຕອບຂອງທ່ານ...</h3>
                <p className="text-slate-500">Processing Results...</p>
            </div>
        );
    }

    // Common layout for form steps
    return (
        <div className="max-w-5xl mx-auto">
            {/* Persistent Progress Bar */}
            <div className="mb-6 bg-white p-4 rounded-xl shadow-sm border border-slate-100 sticky top-4 z-20">
                <div className="flex justify-between items-center mb-1 text-sm text-slate-500">
                    <span>{step === 'personal' ? 'Personal Information' : `Question ${currentQuestionIndex + 1} of ${questions.length}`}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-brand-blue-600 transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {step === 'personal' && (
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-brand-blue-900 px-6 py-6 text-white text-center">
                        <h2 className="text-xl md:text-2xl font-bold mb-1">ຂໍ້ມູນສ່ວນຕົວ</h2>
                        <p className="text-brand-blue-100 text-sm">Personal Information</p>
                    </div>
                    <div className="p-6 md:p-8 space-y-4">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}
                        <div className="grid gap-4 md:grid-cols-2">
                            {personalQuestions.map((q) => (
                                <div key={q.id} className={q.type === 'email' || q.type === 'text' && (q.id === 'currentJob' || q.id === 'reason') ? 'md:col-span-2' : ''}>
                                    <label className="block mb-1">
                                        <span className="text-base font-semibold text-slate-800 block">{q.labelLao}</span>
                                        <span className="text-xs text-slate-500 font-normal">{q.labelEng} {q.required && '*'}</span>
                                    </label>
                                    {q.type === 'select' ? (
                                        <select
                                            className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 outline-none transition-all text-sm md:text-base"
                                            value={personalInfo[q.id] || ''}
                                            onChange={(e) => {
                                                setPersonalInfo(prev => ({ ...prev, [q.id]: e.target.value }));
                                                setError(null);
                                            }}
                                        >
                                            <option value="">Select / ເລືອກ</option>
                                            {q.options?.map(opt => (
                                                <option key={opt.value} value={opt.value}>
                                                    {opt.labelLao} ({opt.labelEng})
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={q.type}
                                            placeholder={q.placeholder}
                                            className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 outline-none transition-all text-sm md:text-base"
                                            value={personalInfo[q.id] || ''}
                                            onChange={(e) => {
                                                setPersonalInfo(prev => ({ ...prev, [q.id]: e.target.value }));
                                                setError(null);
                                            }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={handlePersonalSubmit}
                            className="w-full bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group mt-4"
                        >
                            <span>Start Assessment</span>
                            <span className="opacity-75 font-normal">| ເລີ່ມເຮັດບົດທົດສອບ</span>
                            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            )}

            {step === 'assessment' && currentQuestion && (
                <div className="space-y-4">
                    <div className="bg-white rounded-2xl p-6 md:p-10 shadow-lg border border-slate-100 flex flex-col justify-center animate-in fade-in slide-in-from-right-4 duration-300 key={currentQuestionIndex}">
                        <div className="text-center mb-8">
                            <h3 className="text-xl md:text-3xl font-bold text-slate-900 mb-2 leading-relaxed">
                                {currentQuestion.textLao}
                            </h3>
                            <p className="text-base md:text-lg text-slate-500 font-medium">
                                {currentQuestion.textEng}
                            </p>
                        </div>

                        <div className="grid gap-4 w-full md:grid-cols-3">
                            {currentQuestion.options.map((opt) => {
                                const isSelected = answers[currentQuestion.id] === opt.value;
                                return (
                                    <button
                                        key={opt.value}
                                        onClick={() => handleAnswerSelect(currentQuestion.id, opt.value)}
                                        className={`
                                            relative p-4 md:p-6 rounded-xl border-2 transition-all duration-200 group h-full flex flex-col items-center justify-center text-center gap-2
                                            ${isSelected
                                                ? 'border-brand-blue-600 bg-brand-blue-50 text-brand-blue-700 shadow-md transform scale-[1.02]'
                                                : 'border-slate-200 hover:border-brand-blue-300 hover:bg-slate-50 text-slate-600 hover:shadow-sm'
                                            }
                                        `}
                                    >
                                        <div className="font-bold text-lg md:text-xl">{opt.labelLao}</div>
                                        <div className={`text-sm ${isSelected ? 'text-brand-blue-600' : 'text-slate-400 group-hover:text-slate-500'}`}>
                                            {opt.labelEng}
                                        </div>
                                        {isSelected && <CheckCircle className="text-brand-blue-600 absolute top-4 right-4" size={24} />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <button
                            onClick={handlePrev}
                            className="px-6 py-3 rounded-lg font-semibold flex items-center gap-2 text-slate-500 hover:bg-white hover:text-slate-700 transition-colors"
                        >
                            <ChevronLeft size={20} />
                            Back
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
