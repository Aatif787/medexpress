'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus, User, Mail, Phone, Lock, MapPin, ArrowRight, ChevronLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export default function SignupPage() {
    const { signup } = useAuth();
    const { t } = useLanguage();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        address: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        const res = await signup(formData.email, formData.password, formData.name, formData.mobile);

        if (res.success) {
            if (res.message) {
                setSuccessMessage(res.message);
                // Clear sensitive data
                setFormData(prev => ({ ...prev, password: '' }));
            } else {
                router.push('/');
            }
        } else {
            setError(res.error || 'Signup failed');
        }
        setLoading(false);
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '40px', paddingBottom: '40px' }}>

            {/* Background Decor */}
            <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
                <div style={{ position: 'absolute', top: '10%', right: '20%', width: '300px', height: '300px', background: 'var(--accent)', opacity: 0.1, filter: 'blur(100px)' }} />
                <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: '250px', height: '250px', background: 'var(--primary)', opacity: 0.1, filter: 'blur(80px)' }} />
            </div>

            <div className="container" style={{ maxWidth: '500px', width: '100%' }}>
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
                            justifyContent: 'center', margin: '0 auto 16px', color: 'var(--highlight)',
                            boxShadow: '0 0 20px rgba(244, 63, 94, 0.2)'
                        }}>
                            <UserPlus size={28} />
                        </div>
                        <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Create Account</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Join MedExpress for fast medicine delivery</p>
                    </div>

                    {error && (
                        <div style={{
                            background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)',
                            color: '#fca5a5', padding: '12px', borderRadius: '12px', marginBottom: '24px', fontSize: '0.9rem',
                            textAlign: 'center'
                        }}>
                            {error}
                        </div>
                    )}

                    {successMessage && (
                        <div style={{
                            background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)',
                            color: 'var(--accent)', padding: '12px', borderRadius: '12px', marginBottom: '24px', fontSize: '0.9rem',
                            textAlign: 'center'
                        }}>
                            {successMessage}
                            <div style={{ marginTop: '12px' }}>
                                <Link href="/login" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                                    Proceed to Login
                                </Link>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
                        <div className="form-group">
                            <label className="form-label" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    name="name"
                                    className="input-glass"
                                    style={{ paddingLeft: '48px' }}
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-muted)' }} />
                                <input
                                    type="email"
                                    name="email"
                                    className="input-glass"
                                    style={{ paddingLeft: '48px' }}
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Mobile Number</label>
                            <div style={{ position: 'relative' }}>
                                <Phone size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-muted)' }} />
                                <input
                                    type="tel"
                                    name="mobile"
                                    className="input-glass"
                                    style={{ paddingLeft: '48px' }}
                                    placeholder="10-digit mobile number"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    pattern="\d{10}"
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
                                    name="password"
                                    className="input-glass"
                                    style={{ paddingLeft: '48px' }}
                                    placeholder="Create a password (min 6 chars)"
                                    value={formData.password}
                                    onChange={handleChange}
                                    minLength={6}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Address (Optional)</label>
                            <div style={{ position: 'relative' }}>
                                <MapPin size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-muted)' }} />
                                <textarea
                                    name="address"
                                    className="input-glass"
                                    style={{ paddingLeft: '48px', minHeight: '80px' }}
                                    placeholder="Your delivery address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            style={{ width: '100%', marginTop: '10px' }}
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'} <ArrowRight size={18} />
                        </button>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                        Already have an account? <Link href="/login" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
