'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, Clock, ShoppingBag, ChevronRight, Calendar } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export default function MyOrdersPage() {
    const { user, loading: authLoading } = useAuth();
    const { t } = useLanguage();
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user]);

    const fetchOrders = async () => {
        try {
            const myOrdersRes = await fetch('/api/orders/my');
            if (myOrdersRes.ok) {
                const data = await myOrdersRes.json();
                setOrders(data.orders || []);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || loading) {
        return (
            <div className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '40px', height: '40px', border: '3px solid rgba(6, 182, 212, 0.2)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <style jsx>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="section" style={{ paddingTop: '100px', minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '900px' }}>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                        <h1 className="text-gradient">My Orders</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Track and manage your prescription orders</p>
                    </div>
                    <Link href="/upload" className="btn btn-primary">
                        New Order <ChevronRight size={18} />
                    </Link>
                </div>

                {orders.length === 0 ? (
                    <div className="glass-panel" style={{ textAlign: 'center', padding: '80px 40px' }}>
                        <div style={{
                            width: '80px', height: '80px', background: 'rgba(255,255,255,0.05)',
                            borderRadius: '50%', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', margin: '0 auto 24px', color: 'var(--text-muted)'
                        }}>
                            <ShoppingBag size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>No orders yet</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
                            Upload your first prescription to get started with fast delivery.
                        </p>
                        <Link href="/upload" className="btn btn-primary">
                            Order Medicines Now
                        </Link>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '24px' }}>
                        {orders.map(order => (
                            <div key={order._id} className="glass-panel card-hover" style={{ padding: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap', marginBottom: '16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <div style={{
                                            width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-light)'
                                        }}>
                                            <Package size={24} />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{order.orderId}</div>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <Calendar size={12} />
                                                {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{
                                            display: 'inline-block', padding: '6px 12px', borderRadius: '20px',
                                            fontSize: '0.85rem', fontWeight: 600, background: 'rgba(6, 182, 212, 0.1)', color: 'var(--accent)',
                                            border: '1px solid rgba(6, 182, 212, 0.2)'
                                        }}>
                                            {order.status}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px', padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                                    <div>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Status</span>
                                        <div style={{ fontWeight: 500 }}>{order.status}</div>
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Estimated Delivery</span>
                                        <div style={{ fontWeight: 500 }}>{order.deliveryTime || 'In Process'}</div>
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Payment</span>
                                        <div style={{ fontWeight: 500 }}>{order.paymentStatus === 'paid' ? 'Paid' : 'Pending (COD)'}</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <Link href={`/track?q=${order.orderId}`} className="btn btn-primary" style={{ flex: 1, height: '44px' }}>
                                        Track Order
                                    </Link>
                                    <Link href={`/contact`} className="btn btn-glass" style={{ height: '44px' }}>
                                        Help
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
