'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                localStorage.setItem('admin_token', 'true');
                router.push('/admin/dashboard');
            } else {
                setError('Invalid Password');
            }
        } catch {
            setError('Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 0 }}>
            {/* Background Decor */}
            <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
                <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px', height: '400px', background: 'var(--primary-dark)', opacity: 0.2, filter: 'blur(120px)', borderRadius: '50%' }} />
            </div>

            <div className="glass-panel" style={{ padding: '60px', width: '100%', maxWidth: '450px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{
                        width: '80px', height: '80px', background: 'linear-gradient(135deg, var(--bg-dark) 0%, var(--primary-dark) 100%)',
                        borderRadius: '24px', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', margin: '0 auto 24px', color: 'var(--primary-light)',
                        boxShadow: '0 0 30px rgba(15, 118, 110, 0.3)', border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <ShieldCheck size={40} />
                    </div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '8px', letterSpacing: '-0.02em' }}>Admin Access</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Authorized personnel only</p>
                </div>

                <form onSubmit={handleLogin} style={{ display: 'grid', gap: '20px' }}>
                    <div className="form-group">
                        <div style={{ position: 'relative' }}>
                            <Lock size={20} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-muted)' }} />
                            <input
                                type="password"
                                className="input-glass"
                                style={{ paddingLeft: '48px', height: '54px', fontSize: '1rem' }}
                                placeholder="Enter Admin Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div style={{
                            color: '#fca5a5', textAlign: 'center', fontSize: '0.9rem',
                            background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '8px'
                        }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        style={{ width: '100%', height: '54px', fontSize: '1.1rem' }}
                        disabled={loading}
                    >
                        {loading ? 'Verifying...' : 'Access Dashboard'} <ArrowRight size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
}
