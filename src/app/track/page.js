'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Package, MapPin, Truck, CheckCircle, Smartphone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function TrackPage() {
    return (
        <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
            <TrackContent />
        </Suspense>
    );
}

function TrackContent() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('q') || '');
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTrack = async (e) => {
        e.preventDefault();
        if (!query) return;

        setLoading(true);
        setError('');
        setOrder(null);

        try {
            const res = await fetch('/api/orders/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query }),
            });

            const data = await res.json();

            if (res.ok) {
                setOrder(data.order);
            } else {
                setError(data.error || 'Order not found');
            }
        } catch (err) {
            setError('Failed to track order');
        } finally {
            setLoading(false);
        }
    };

    const steps = [
        { status: 'Received', icon: <Smartphone size={20} />, label: 'Order Received' },
        { status: 'Processing', icon: <Package size={20} />, label: 'Processing' },
        { status: 'Purchased', icon: <CheckCircle size={20} />, label: 'Purchased' },
        { status: 'Out for Delivery', icon: <Truck size={20} />, label: 'Out for Delivery' },
        { status: 'Delivered', icon: <MapPin size={20} />, label: 'Delivered' },
    ];

    const currentStepIndex = order ? steps.findIndex(s => s.status === order.status) : -1;

    return (
        <div className="section" style={{ minHeight: '80vh', paddingTop: '100px' }}>
            <div className="container" style={{ maxWidth: '600px' }}>

                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 className="text-gradient" style={{ marginBottom: '16px' }}>Track Order</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Enter your Mobile Number or Order ID</p>
                </div>

                <form onSubmit={handleTrack} style={{ marginBottom: '40px', position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="e.g. 9876543210 or MED123..."
                        className="input-glass"
                        style={{ paddingRight: '120px', fontSize: '1.2rem', padding: '20px' }}
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ position: 'absolute', right: '8px', top: '8px', bottom: '8px', borderRadius: '8px' }}
                        disabled={loading}
                    >
                        {loading ? 'Searching...' : <><Search size={18} /> Track</>}
                    </button>
                </form>

                {error && (
                    <div className="glass-panel" style={{ padding: '20px', color: '#fca5a5', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                {order && (
                    <div className="glass-panel" style={{ padding: '40px', animation: 'float 0.5s ease-out' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
                            <div>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Order ID</span>
                                <div style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'monospace' }}>{order.orderId}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Estimated Delivery</span>
                                <div style={{ color: 'var(--accent)', fontWeight: 600 }}>{order.deliveryTime || 'Today'}</div>
                            </div>
                        </div>

                        <div style={{ position: 'relative', paddingLeft: '20px' }}>
                            {steps.map((step, i) => {
                                const isActive = i <= currentStepIndex;
                                const isCurrent = i === currentStepIndex;

                                return (
                                    <div key={i} style={{
                                        display: 'flex', gap: '20px', marginBottom: '32px', position: 'relative',
                                        opacity: isActive ? 1 : 0.4
                                    }}>
                                        {/* Timeline Line */}
                                        {i !== steps.length - 1 && (
                                            <div style={{
                                                position: 'absolute', left: '20px', top: '40px', bottom: '-32px', width: '2px',
                                                background: isActive ? 'var(--primary)' : 'rgba(255,255,255,0.1)'
                                            }} />
                                        )}

                                        <div style={{
                                            width: '40px', height: '40px', borderRadius: '50%',
                                            background: isActive ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                            boxShadow: isCurrent ? '0 0 20px var(--accent-glow)' : 'none',
                                            border: isCurrent ? '2px solid var(--accent)' : 'none'
                                        }}>
                                            {step.icon}
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '1.1rem', marginBottom: '4px', color: isActive ? 'white' : 'var(--text-muted)' }}>{step.label}</h4>
                                            {isCurrent && <span style={{ fontSize: '0.8rem', color: 'var(--accent)' }}>Current Status</span>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
