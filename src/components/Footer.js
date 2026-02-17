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
                        <h3>💊 MedExpress</h3>
                        <p>{t('tagline')}</p>
                        <p style={{ fontSize: '0.85rem' }}>
                            Domariyaganj, Basti, UP - 272189
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4>{t('quickLinks')}</h4>
                        <Link href="/">{t('home')}</Link>
                        <Link href="/upload">{t('upload')}</Link>
                        <Link href="/track">{t('track')}</Link>
                        <Link href="/contact">{t('contact')}</Link>
                    </div>

                    <div className="footer-section">
                        <h4>{t('legal')}</h4>
                        <Link href="/privacy">{t('privacyPolicy')}</Link>
                        <Link href="/terms">{t('termsOfService')}</Link>
                    </div>

                    <div className="footer-section">
                        <h4>{t('contactInfo')}</h4>
                        <a href="tel:+919876543210">📞 +91 98765 43210</a>
                        <a href="mailto:support@medexpress.in">📧 support@medexpress.in</a>
                        <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
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
