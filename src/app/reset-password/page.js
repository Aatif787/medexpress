'use client';
import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, ArrowRight, ChevronLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

function ResetPasswordContent() {
    const { updateUser } = useAuth();
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');

        const res = await updateUser(password);

        if (res.success) {
            setSuccess('Password reset successfully! Redirecting to login...');
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } else {
            setError(res.error || 'Failed to reset password');
        }
        setLoading(false);
    };

    return (
        <div className="container" style={{ maxWidth: '450px', width: '100%' }}>
            <div className="glass-panel" style={{ padding: '40px' }}>
                <Link href="/login" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)',
                    marginBottom: '32px', textDecoration: 'none', fontSize: '0.9rem'
                }}>
                    <ChevronLeft size={16} /> Back to Login
                </Link>

                <h1 style={{ fontSize: '2rem', marginBottom: '8px', textAlign: 'center' }}>Reset Password</h1>
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '32px' }}>Enter your new password</p>

                {success && (
                    <div style={{
                        background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)',
                        color: 'var(--accent)', padding: '12px', borderRadius: '12px', marginBottom: '24px', fontSize: '0.9rem',
                        textAlign: 'center'
                    }}>
                        {success}
                    </div>
                )}

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
                        <label className="form-label" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>New Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-muted)' }} />
                            <input
                                type="password"
                                className="input-glass"
                                style={{ paddingLeft: '48px' }}
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Confirm Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-muted)' }} />
                            <input
                                type="password"
                                className="input-glass"
                                style={{ paddingLeft: '48px' }}
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        style={{ width: '100%', marginTop: '10px' }}
                        disabled={loading}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'} <ArrowRight size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '0' }}>
            <Suspense fallback={<div>Loading...</div>}>
                <ResetPasswordContent />
            </Suspense>
        </div>
    );
}
