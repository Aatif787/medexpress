'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Key, ArrowRight, ChevronLeft } from 'lucide-react';

function VerifyOtpContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!email) {
            router.push('/forgot-password');
        }
    }, [email, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
            });

            const data = await res.json();

            if (res.ok) {
                router.push(`/reset-password?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`);
            } else {
                setError(data.error || 'Invalid OTP');
            }
        } catch (err) {
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '450px', width: '100%' }}>
            <div className="glass-panel" style={{ padding: '40px' }}>
                <Link href="/forgot-password" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)',
                    marginBottom: '32px', textDecoration: 'none', fontSize: '0.9rem'
                }}>
                    <ChevronLeft size={16} /> Back
                </Link>

                <h1 style={{ fontSize: '2rem', marginBottom: '8px', textAlign: 'center' }}>Verify OTP</h1>
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '32px' }}>Enter the OTP sent to {email}</p>

                {error && (
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)',
                        color: '#fca5a5', padding: '12px', borderRadius: '12px', marginBottom: '24px', fontSize: '0.9rem',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
                    <div className="form-group">
                        <label className="form-label" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Enter OTP</label>
                        <div style={{ position: 'relative' }}>
                            <Key size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                className="input-glass"
                                style={{ paddingLeft: '48px' }}
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        style={{ width: '100%', marginTop: '10px' }}
                        disabled={loading}
                    >
                        {loading ? 'Verifying...' : 'Verify OTP'} <ArrowRight size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function VerifyOtpPage() {
    return (
        <div className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '0' }}>
            <Suspense fallback={<div>Loading...</div>}>
                <VerifyOtpContent />
            </Suspense>
        </div>
    );
}
