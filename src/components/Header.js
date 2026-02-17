'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Pill, User, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { UserButton } from '@clerk/nextjs';

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { lang, toggleLanguage, t } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const { user } = useAuth();

    const navLinks = [
        { href: '/', label: t('home') },
        { href: '/medicines', label: 'Medicines' },
        { href: '/consultation', label: 'Consultation' },
        { href: '/upload', label: t('upload') },
        { href: '/track', label: t('track') },
        { href: '/contact', label: t('contact') },
    ];

    return (
        <>
            <header className="glass-nav">
                <div className="container">
                    <div style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                        {/* Logo */}
                        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                width: '40px', height: '40px', background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                                borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 4px 12px rgba(11, 60, 145, 0.25)'
                            }}>
                                <Pill size={24} color="white" />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em' }} className="text-gradient">
                                    MedExpress
                                </span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Licensed Medicine Delivery</span>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <nav style={{ display: 'none', gap: '28px', alignItems: 'center' }} className="desktop-nav">
                            {navLinks.map(link => (
                                <Link key={link.href} href={link.href} className="nav-link" style={{
                                    color: 'var(--text-muted)', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s',
                                    fontSize: '0.95rem'
                                }}>
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Actions */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

                            <button onClick={toggleLanguage} style={{
                                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                padding: '8px 12px', borderRadius: '8px', color: 'var(--text-main)', cursor: 'pointer',
                                fontWeight: 600, fontSize: '0.9rem'
                            }}>
                                {lang === 'en' ? 'हि' : 'EN'}
                            </button>

                            <button onClick={toggleTheme} style={{
                                background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', padding: '8px'
                            }}>
                                {theme === 'light' ? '🌙' : '☀️'}
                            </button>

                            {user ? (
                                <UserButton afterSignOutUrl="/" />
                            ) : (
                                <Link href="/login" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem', display: 'none' }} id="desktop-login">
                                    Login <ChevronRight size={16} />
                                </Link>
                            )}

                            <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} style={{ background: 'none', border: 'none', color: 'var(--text-main)' }}>
                                {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div className="mobile-menu-overlay" style={{
                position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(20px)',
                zIndex: 999, transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.3s var(--ease-spring)',
                paddingTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px'
            }}>
                {user && (
                    <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                         <div style={{ width: '60px', height: '60px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                            <User size={30} color="white" />
                        </div>
                        <p style={{ color: 'white', fontSize: '1.2rem', fontWeight: 600 }}>Hello, {user.name.split(' ')[0]}</p>
                    </div>
                )}
                {navLinks.map(link => (
                    <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} style={{
                        fontSize: '1.5rem', fontWeight: 700, color: 'white', textDecoration: 'none'
                    }}>
                        {link.label}
                    </Link>
                ))}
                {user ? (
                    <>
                        <Link href="/my-orders" onClick={() => setMobileOpen(false)} style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', textDecoration: 'none' }}>
                            My Orders
                        </Link>
                    </>
                ) : (
                    <Link href="/login" onClick={() => setMobileOpen(false)} className="btn btn-primary btn-lg">
                        Login / Signup
                    </Link>
                )}
            </div>


        </>
    );
}
