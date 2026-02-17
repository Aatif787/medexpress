'use client';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <h3>MedExpress</h3>
                        <p>{t('tagline')}</p>
                        <p style={{ fontSize: '0.85rem' }}>
                            Domariyaganj, Basti, UP - 272189
                        </p>
                        <div className="trust-strip" style={{ marginTop: '16px', justifyContent: 'flex-start' }}>
                            <span className="badge badge-success">Licensed Pharmacy</span>
                            <span className="badge">Secure Payments</span>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h4>{t('quickLinks')}</h4>
                        <Link href="/">{t('home')}</Link>
                        <Link href="/upload">{t('upload')}</Link>
                        <Link href="/track">{t('track')}</Link>
                        <Link href="/medicines">Medicines</Link>
                        <Link href="/consultation">Consultation</Link>
                        <Link href="/contact">{t('contact')}</Link>
                    </div>

                    <div className="footer-section">
                        <h4>{t('legal')}</h4>
                        <Link href="/privacy">{t('privacyPolicy')}</Link>
                        <Link href="/terms">{t('termsOfService')}</Link>
                        <Link href="/health-tips">Health Tips</Link>
                    </div>

                    <div className="footer-section">
                        <h4>{t('contactInfo')}</h4>
                        <a href="tel:+918601439557">📞 +91 86014 39557</a>
                        <a href="mailto:support@medexpress.in">📧 support@medexpress.in</a>
                        <a href="https://wa.me/918601439557" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
                        <p style={{ marginTop: '12px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                            Licensed Pharmacist on Duty
                        </p>
                    </div>
                </div>

                <div className="footer-disclaimer">
                    <p className="disclaimer-text">⚠️ {t('disclaimer')}</p>
                    <p>© {new Date().getFullYear()} MedExpress. {t('allRightsReserved')}</p>
                </div>
            </div>
        </footer>
    );
}
