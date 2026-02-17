'use client';
import { useLanguage } from '@/context/LanguageContext';

export default function TermsPage() {
    const { t } = useLanguage();

    return (
        <div className="legal-page">
            <div className="container" style={{ maxWidth: '800px' }}>
                <h1>{t('termsOfService')}</h1>
                <p className="last-updated">Last Updated: February 2026</p>

                <h2>1. Service Description</h2>
                <p>MedExpress is a medicine delivery service that procures prescribed medicines from licensed pharmacies in Lucknow and delivers them to customers in Domariyaganj and nearby areas in Uttar Pradesh.</p>

                <h2>2. Prescription Requirement</h2>
                <p><strong>Important:</strong> We deliver medicines ONLY against valid prescriptions issued by registered medical practitioners. Orders without valid prescriptions will be rejected.</p>

                <h2>3. Ordering Process</h2>
                <ul>
                    <li>Upload a clear photo/scan of your prescription via our website or WhatsApp</li>
                    <li>Our pharmacist team will verify the prescription</li>
                    <li>Medicines will be purchased from licensed pharmacies at MRP</li>
                    <li>A transparent delivery fee will be added to the total</li>
                </ul>

                <h2>4. Pricing & Payment</h2>
                <ul>
                    <li>All medicines are sold at MRP (Maximum Retail Price)</li>
                    <li>Delivery fee is transparently shown before payment</li>
                    <li>We accept UPI, Razorpay (cards, netbanking), and Cash on Delivery</li>
                    <li>No hidden charges or markups</li>
                </ul>

                <h2>5. Delivery Policy</h2>
                <ul>
                    <li>Standard delivery: 2–3 business days</li>
                    <li>Delivery areas: Domariyaganj, Basti, Khalilabad, and nearby towns</li>
                    <li>We will contact you before delivery to confirm timing</li>
                    <li>Someone must be available at the delivery address to receive the medicines</li>
                </ul>

                <h2>6. Returns & Refunds</h2>
                <ul>
                    <li>Medicines cannot be returned once delivered (as per Indian pharma regulations)</li>
                    <li>If wrong or damaged medicine is delivered, we will replace it at no extra cost</li>
                    <li>Refunds for cancelled orders (before purchase) will be processed within 5-7 days</li>
                </ul>

                <h2>7. Partner Pharmacy Model</h2>
                <p>MedExpress operates as a delivery partner and aggregator. We purchase medicines from licensed, verified pharmacies in Lucknow. We do not manufacture or store medicines ourselves.</p>

                <h2>8. Disclaimer</h2>
                <p>MedExpress is NOT a pharmacy. We are a medicine delivery service. All medicines are sourced from licensed partner pharmacies. We do not provide medical advice. Always consult your doctor before taking any medication.</p>

                <h2>9. Contact</h2>
                <p>📧 legal@medexpress.in | 📞 +91 98765 43210</p>
            </div>
        </div>
    );
}
