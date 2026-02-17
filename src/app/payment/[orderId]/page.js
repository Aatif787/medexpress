'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { CreditCard, Smartphone, Banknote, CheckCircle, Package } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function PaymentPage() {
    const { t } = useLanguage();
    const params = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedMethod, setSelectedMethod] = useState('');
    const [codConfirmed, setCodConfirmed] = useState(false);

    const deliveryFee = 99;
    const medicineCost = 500; // placeholder

    useEffect(() => {
        async function fetchOrder() {
            try {
                const res = await fetch(`/api/orders/${params.orderId}`);
                if (res.ok) {
                    const data = await res.json();
                    setOrder(data.order);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        if (params.orderId) fetchOrder();
    }, [params.orderId]);

    const handleRazorpay = () => {
        // Razorpay integration stub
        alert('Razorpay payment integration will be configured with your API keys. Contact admin to set up.');
    };

    const handleUPI = () => {
        const upiLink = `upi://pay?pa=medexpress@upi&pn=MedExpress&am=${medicineCost + deliveryFee}&cu=INR&tn=MedExpress Order ${params.orderId}`;
        window.open(upiLink, '_blank');
    };

    const handleCOD = async () => {
        setCodConfirmed(true);
    };

    if (loading) {
        return (
            <section className="section">
                <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
                    <Package size={48} style={{ color: 'var(--text-tertiary)', marginBottom: '16px' }} />
                    <p style={{ color: 'var(--text-secondary)' }}>Loading order details...</p>
                </div>
            </section>
        );
    }

    if (codConfirmed) {
        return (
            <section className="section">
                <div className="container" style={{ maxWidth: '500px', textAlign: 'center' }}>
                    <div className="card-flat" style={{ padding: '48px' }}>
                        <div className="modal-icon" style={{ margin: '0 auto 20px' }}>
                            <CheckCircle size={36} />
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px' }}>COD Confirmed!</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>{t('codConfirmed')}</p>
                        <p style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--primary)', fontSize: '1.1rem' }}>
                            {t('orderId')}: {params.orderId}
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="section">
            <div className="container">
                <h1 className="section-title">{t('payment')}</h1>
                <p className="section-subtitle">{t('selectPayment')}</p>

                <div className="payment-grid">
                    <div className="card-flat payment-summary">
                        <h2>{t('orderSummary')}</h2>
                        {order && (
                            <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>{t('orderId')}</p>
                                <p style={{ fontWeight: 700, fontFamily: 'monospace', color: 'var(--primary)' }}>{order.orderId}</p>
                            </div>
                        )}
                        <div className="payment-row">
                            <span>{t('medicineCost')}</span>
                            <span>₹{medicineCost.toFixed(2)}</span>
                        </div>
                        <div className="payment-row">
                            <span>{t('deliveryFee')}</span>
                            <span>₹{deliveryFee.toFixed(2)}</span>
                        </div>
                        <div className="payment-row total">
                            <span>{t('total')}</span>
                            <span>₹{(medicineCost + deliveryFee).toFixed(2)}</span>
                        </div>
                    </div>

                    <div>
                        <div
                            className={`payment-option ${selectedMethod === 'razorpay' ? 'selected' : ''}`}
                            onClick={() => setSelectedMethod('razorpay')}
                        >
                            <div className="payment-option-icon" style={{ background: '#e0e7ff', color: '#4338ca' }}>
                                <CreditCard size={22} />
                            </div>
                            <div>
                                <h3 style={{ fontWeight: 700, fontSize: '0.95rem' }}>{t('payWithRazorpay')}</h3>
                                <p style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>Cards, Netbanking, Wallets</p>
                            </div>
                        </div>

                        <div
                            className={`payment-option ${selectedMethod === 'upi' ? 'selected' : ''}`}
                            onClick={() => setSelectedMethod('upi')}
                        >
                            <div className="payment-option-icon" style={{ background: '#dcfce7', color: '#16a34a' }}>
                                <Smartphone size={22} />
                            </div>
                            <div>
                                <h3 style={{ fontWeight: 700, fontSize: '0.95rem' }}>{t('payWithUPI')}</h3>
                                <p style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>Google Pay, PhonePe, Paytm</p>
                            </div>
                        </div>

                        <div
                            className={`payment-option ${selectedMethod === 'cod' ? 'selected' : ''}`}
                            onClick={() => setSelectedMethod('cod')}
                        >
                            <div className="payment-option-icon" style={{ background: '#fef3c7', color: '#d97706' }}>
                                <Banknote size={22} />
                            </div>
                            <div>
                                <h3 style={{ fontWeight: 700, fontSize: '0.95rem' }}>{t('cashOnDelivery')}</h3>
                                <p style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>Pay when you receive</p>
                            </div>
                        </div>

                        {selectedMethod && (
                            <button
                                className="btn btn-primary btn-lg"
                                style={{ width: '100%', marginTop: '20px' }}
                                onClick={() => {
                                    if (selectedMethod === 'razorpay') handleRazorpay();
                                    else if (selectedMethod === 'upi') handleUPI();
                                    else if (selectedMethod === 'cod') handleCOD();
                                }}
                            >
                                {selectedMethod === 'cod' ? 'Confirm Cash on Delivery' : `Pay ₹${(medicineCost + deliveryFee).toFixed(2)}`}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
