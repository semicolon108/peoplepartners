'use client';

import { useState } from 'react';
import { Loader2, Lock, KeyRound, Mail, AlertCircle, ArrowRight, RefreshCw } from 'lucide-react';

interface AccessGateProps {
    children: React.ReactNode;
}

export default function AccessGate({ children }: AccessGateProps) {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [step, setStep] = useState<'email' | 'code'>('email');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form State
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    // Verification Context (The "Lock" from the server)
    const [lockData, setLockData] = useState<{ hash: string; expires: number } | null>(null);

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await fetch('/api/auth/otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'send', email }),
            });
            const data = await res.json();

            if (data.success) {
                setLockData({ hash: data.hash, expires: data.expires });
                setStep('code');
            } else {
                setError(data.error || 'Failed to send code.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!lockData) {
            setError("Session invalid. Please restart.");
            setStep('email');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/auth/otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'verify',
                    email,
                    code,
                    hash: lockData.hash,
                    expires: lockData.expires
                }),
            });
            const data = await res.json();

            if (data.success) {
                setIsUnlocked(true);
            } else {
                setError(data.error || 'Invalid code.');
            }
        } catch (err) {
            setError('Verification failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (isUnlocked) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                {/* Header */}
                <div className="bg-brand-blue-900 p-8 text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <Lock className="text-white w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Recruiter Access</h2>
                    <p className="text-brand-blue-200 text-sm mt-1">Internal Application Portal</p>
                </div>

                <div className="p-8">
                    {error && (
                        <div className="bg-red-50 text-red-600 text-sm p-4 rounded-lg flex items-start gap-2 mb-6">
                            <AlertCircle size={16} className="mt-0.5 shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

                    {step === 'email' ? (
                        <form onSubmit={handleSendOTP} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Company Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@peoplepartners.la"
                                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 outline-none transition-all"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-2 ml-1">
                                    Must be a valid <strong>@peoplepartners.la</strong> address.
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    <>
                                        Send Access Code <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerify} className="space-y-6">
                            <div className="text-center mb-2">
                                <p className="text-sm text-slate-600">Enter the code sent to:</p>
                                <p className="font-medium text-slate-900">{email}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Access Code</label>
                                <div className="relative">
                                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        required
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        placeholder="123456"
                                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 outline-none transition-all tracking-widest font-mono text-lg"
                                        maxLength={6}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : 'Unlock Portal'}
                            </button>

                            <button
                                type="button"
                                onClick={() => { setStep('email'); setCode(''); setError(null); }}
                                className="w-full text-sm text-slate-500 hover:text-brand-blue-600 flex items-center justify-center gap-1 transition-colors"
                            >
                                <RefreshCw size={14} /> Send a new code
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
