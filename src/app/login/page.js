'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogIn, User, Lock, ArrowRight, ChevronLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export default function LoginPage() {
    const { login, resendConfirmation } = useAuth();
    const { t } = useLanguage();
    const router = useRouter();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [needsConfirmation, setNeedsConfirmation] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');
        setNeedsConfirmation(false);

        const res = await login(formData.email, formData.password);

        if (res.success) {
            router.push('/');
        } else {
            // Check for specific email not confirmed error
            if (res.error?.includes('Email not confirmed')) {
                setError('Please confirm your email address before logging in.');
                setNeedsConfirmation(true);
            } else {
                setError(res.error || 'Login failed');
            }
        }
        setLoading(false);
    };

    const handleResendConfirmation = async () => {
        setLoading(true);
        setError('');
        setSuccessMessage('');
        
        const res = await resendConfirmation(formData.email);
        
        if (res.success) {
            setSuccessMessage(res.message);
            setNeedsConfirmation(false);
        } else {
            setError(res.error || 'Failed to resend confirmation email');
        }
        setLoading(false);
    };

    return (
        <div className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '0' }}>

            {/* Background Decor */}
            <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
                <div style={{ position: 'absolute', top: '20%', left: '20%', width: '300px', height: '300px', background: 'var(--primary)', opacity: 0.15, filter: 'blur(100px)' }} />
                <div style={{ position: 'absolute', bottom: '20%', right: '20%', width: '200px', height: '200px', background: 'var(--accent)', opacity: 0.15, filter: 'blur(80px)' }} />
            </div>

            <div className="container" style={{ maxWidth: '450px', width: '100%' }}>
                <div className="glass-panel" style={{ padding: '40px' }}>

                    <Link href="/" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)',
                        marginBottom: '32px', textDecoration: 'none', fontSize: '0.9rem'
                    }}>
                        <ChevronLeft size={16} /> Back to Home
                    </Link>

                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <div style={{
                            width: '60px', height: '60px', background: 'rgba(255,255,255,0.05)',
                            borderRadius: '50%', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', margin: '0 auto 16px', color: 'var(--accent)',
                            boxShadow: '0 0 20px rgba(6, 182, 212, 0.2)'
                        }}>
                            <LogIn size={28} />
                        </div>
                        <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Welcome Back</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Sign in to continue to MedExpress</p>
                    </div>

                    {error && (
                        <div style={{
                            background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)',
                            color: '#fca5a5', padding: '12px', borderRadius: '12px', marginBottom: '24px', fontSize: '0.9rem',
                            textAlign: 'center'
                        }}>
                            {error}
                            {needsConfirmation && (
                                <button 
                                    onClick={handleResendConfirmation}
                                    type="button"
                                    className="btn-link"
                                    style={{ display: 'block', margin: '8px auto 0', color: 'var(--accent)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                    Resend Confirmation Email
                                </button>
                            )}
                        </div>
                    )}

                    {successMessage && (
                        <div style={{
                            background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)',
                            color: 'var(--accent)', padding: '12px', borderRadius: '12px', marginBottom: '24px', fontSize: '0.9rem',
                            textAlign: 'center'
                        }}>
                            {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
                        <div className="form-group">
                            <label className="form-label" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-muted)' }} />
                                <input
                                    type="email"
                                    className="input-glass"
                                    style={{ paddingLeft: '48px' }}
                                    placeholder="Enter email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-muted)' }} />
                                <input
                                    type="password"
                                    className="input-glass"
                                    style={{ paddingLeft: '48px' }}
                                    placeholder="Enter password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                            {loading ? 'Signing in...' : 'Sign In'} <ArrowRight size={18} />
                        </button>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                        Don&apos;t have an account? <Link href="/signup" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>Create Account</Link>
                    </div>
                    
                    <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.9rem' }}>
                        <Link href="/forgot-password" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Forgot Password?</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
