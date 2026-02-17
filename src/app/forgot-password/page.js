'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, ChevronLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function ForgotPasswordPage() {
    const { resetPasswordForEmail } = useAuth();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        const res = await resetPasswordForEmail(email);

        if (res.success) {
            setMessage('Check your email for the password reset link.');
        } else {
            setError(res.error || 'Failed to send reset email');
        }
        setLoading(false);
    };

    return (
        <div className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '0' }}>
             <div className="container" style={{ maxWidth: '450px', width: '100%' }}>
                <div className="glass-panel" style={{ padding: '40px' }}>
                    <Link href="/login" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)',
                        marginBottom: '32px', textDecoration: 'none', fontSize: '0.9rem'
                    }}>
                        <ChevronLeft size={16} /> Back to Login
                    </Link>

                    <h1 style={{ fontSize: '2rem', marginBottom: '8px', textAlign: 'center' }}>Forgot Password</h1>
                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '32px' }}>Enter your email to receive a reset link</p>

                    {message && (
                        <div style={{
                            background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)',
                            color: 'var(--accent)', padding: '12px', borderRadius: '12px', marginBottom: '24px', fontSize: '0.9rem',
                            textAlign: 'center'
                        }}>
                            {message}
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
                            <label className="form-label" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-muted)' }} />
                                <input
                                    type="email"
                                    className="input-glass"
                                    style={{ paddingLeft: '48px' }}
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                            {loading ? 'Sending...' : 'Send Reset Link'} <ArrowRight size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
