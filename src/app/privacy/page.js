'use client';
import { useLanguage } from '@/context/LanguageContext';

export default function PrivacyPage() {
    const { t } = useLanguage();

    return (
        <div className="legal-page">
            <div className="container" style={{ maxWidth: '800px' }}>
                <h1>{t('privacyPolicy')}</h1>
                <p className="last-updated">Last Updated: February 2026</p>

                <h2>1. Information We Collect</h2>
                <p>When you use MedExpress, we collect the following information:</p>
                <ul>
                    <li>Full name, mobile number, and delivery address</li>
                    <li>Prescription images uploaded for order processing</li>
                    <li>Medicine notes and delivery preferences</li>
                    <li>Payment information (processed securely via Razorpay)</li>
                </ul>

                <h2>2. How We Use Your Information</h2>
                <p>Your information is used exclusively for:</p>
                <ul>
                    <li>Processing and delivering your medicine orders</li>
                    <li>Contacting you regarding order updates via WhatsApp or phone</li>
                    <li>Sending monthly reminders for subscription orders</li>
                    <li>Improving our service quality</li>
                </ul>

                <h2>3. Prescription Data Security</h2>
                <p>We take the security of your medical data very seriously:</p>
                <ul>
                    <li>Prescriptions are stored securely and accessed only by authorized personnel</li>
                    <li>We do not share prescription data with any third party except partner pharmacies for order fulfillment</li>
                    <li>Prescription images are deleted 90 days after order completion</li>
                </ul>

                <h2>4. Data Sharing</h2>
                <p>We do NOT sell your personal data. We share information only with:</p>
                <ul>
                    <li>Licensed partner pharmacies in Lucknow (for medicine procurement)</li>
                    <li>Delivery partners (name and address for delivery)</li>
                    <li>Payment processors (Razorpay) for transaction processing</li>
                </ul>

                <h2>5. Your Rights</h2>
                <p>You have the right to:</p>
                <ul>
                    <li>Request access to your personal data</li>
                    <li>Request deletion of your account and data</li>
                    <li>Opt out of marketing communications</li>
                    <li>Request a copy of your order history</li>
                </ul>

                <h2>6. Contact Us</h2>
                <p>For any privacy-related queries, contact us at:</p>
                <p>📧 privacy@medexpress.in | 📞 +91 98765 43210</p>
            </div>
        </div>
    );
}
