'use client';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Menu, X, Pill, LogIn, User, LogOut, ChevronRight, Search, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

const medicines = [
    "Paracetamol", "Dolo 650", "Azithromycin", "Cough Syrup", "Vitamin C",
    "Zincovit", "Pan 40", "Omez", "Metacin", "Crocin",
    "Aspirin", "Ibuprofen", "Cetirizine", "Montair LC", "Shelcal 500",
    "Limcee", "Becosules", "Neurobion", "Thyronorm", "Telma 40"
];

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { lang, toggleLanguage, t } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchResults = useMemo(() => {
        if (searchQuery.length > 1) {
            return medicines.filter(med => med.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        return [];
    }, [searchQuery]);

    const navLinks = [
        { href: '/', label: t('home') },
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
                                boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)'
                            }}>
                                <Pill size={24} color="white" />
                            </div>
                            <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em' }} className="text-gradient">
                                MedExpress
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav style={{ display: 'none', gap: '32px', alignItems: 'center' }} className="desktop-nav">
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

                            <button onClick={() => setSearchOpen(true)} style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer' }}>
                                <Search size={20} />
                            </button>

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
                                <div style={{ position: 'relative' }}>
                                    <button
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)',
                                            border: '1px solid rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '20px',
                                            color: 'var(--text-main)', cursor: 'pointer', fontWeight: 600
                                        }}
                                    >
                                        <div style={{ width: '24px', height: '24px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <User size={14} color="white" />
                                        </div>
                                        <span>{user.name.split(' ')[0]}</span>
                                    </button>

                                    {userMenuOpen && (
                                        <div className="glass-panel" style={{
                                            position: 'absolute', top: '100%', right: 0, marginTop: '12px',
                                            padding: '8px', minWidth: '180px', display: 'flex', flexDirection: 'column', gap: '4px',
                                            animation: 'float 0.3s ease-out forwards'
                                        }}>
                                            <Link href="/my-orders" className="menu-item" onClick={() => setUserMenuOpen(false)}>
                                                <div className="icon-box"><User size={14} /></div> My Orders
                                            </Link>
                                            <button onClick={() => { logout(); setUserMenuOpen(false); }} className="menu-item danger">
                                                <div className="icon-box"><LogOut size={14} /></div> Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
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

            {/* Search Modal */}
            {searchOpen && (
                <div className="search-modal" style={{
                    position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(10px)',
                    zIndex: 2000, display: 'flex', flexDirection: 'column', padding: '100px 20px 20px'
                }}>
                    <button
                        onClick={() => setSearchOpen(false)}
                        style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                    >
                        <X size={32} />
                    </button>

                    <div className="container" style={{ maxWidth: '600px', width: '100%' }}>
                        <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>Find Medicines</h2>
                        <div style={{ position: 'relative', marginBottom: '40px' }}>
                            <Search className="search-icon" size={20} style={{ position: 'absolute', left: '20px', top: '22px', color: 'var(--text-muted)' }} />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search for medicines..."
                                className="input-glass search-input"
                                style={{ height: '64px', fontSize: '1.2rem', paddingLeft: '56px' }}
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div style={{ display: 'grid', gap: '16px', maxHeight: '50vh', overflowY: 'auto' }}>
                            {searchQuery.length > 1 && searchResults.map(result => (
                                <div key={result} className="glass-panel" style={{
                                    padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    cursor: 'pointer'
                                }} onClick={() => { setSearchOpen(false); window.location.href = '/upload?note=' + result; }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Pill size={20} color="var(--accent)" />
                                        </div>
                                        <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>{result}</span>
                                    </div>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Check Availability</span>
                                </div>
                            ))}
                            {searchQuery.length > 1 && searchResults.length === 0 && (
                                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No medicines found. Try uploading a prescription instead.</div>
                            )}
                            {searchQuery.length <= 1 && (
                                <div style={{ textAlign: 'center', opacity: 0.5 }}>
                                    <TrendingUp size={24} style={{ marginBottom: '8px' }} />
                                    <p>Popular searches: Dolo 650, Pan 40, Zincovit</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

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
                        <button onClick={() => { logout(); setMobileOpen(false); }} className="btn btn-primary" style={{ marginTop: '20px' }}>
                            Logout
                        </button>
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
