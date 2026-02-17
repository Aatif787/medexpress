'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Download, MessageCircle, MoreVertical, Package, CheckCircle, Clock, Truck, TrendingUp, Users } from 'lucide-react';

import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';

export default function AdminDashboard() {
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    const fetchOrders = useCallback(async () => {
        try {
            const res = await fetch('/api/orders');
            if (res.ok) {
                const data = await res.json();
                setOrders(data.orders);
                setFilteredOrders(data.orders);
            }
        } catch (error) {
            console.error('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        setMounted(true);
        // Supabase protected route logic can be added here if needed for admin
        // For now keeping existing logic as requested for user dashboard task
        const token = localStorage.getItem('admin_token');
        if (!token) {
            router.push('/admin');
        } else {
            fetchOrders();
        }
    }, [router, fetchOrders]);

    useEffect(() => {
        const results = orders.filter(order =>
            order.name.toLowerCase().includes(search.toLowerCase()) ||
            order.mobile.includes(search) ||
            order.orderId.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredOrders(results);
    }, [search, orders]);

    const updateStatus = async (id, newStatus) => {
        try {
            const res = await fetch(`/api/orders/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                fetchOrders();
            }
        } catch (error) {
            console.error('Failed to update status');
        }
    };

    // Chart Data Preparation
    const statusData = ['Received', 'Processing', 'Purchased', 'Out for Delivery', 'Delivered'].map(status => ({
        name: status,
        count: orders.filter(o => o.status === status).length,
        color: status === 'Delivered' ? '#10b981' : status === 'Pending' ? '#ef4444' : '#0ea5e9'
    }));

    if (!mounted) return null;

    return (
        <div className="section" style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-darker)' }}>
            <div className="container" style={{ maxWidth: '1400px' }}>

                {/* Header Stats */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem' }}>Dashboard</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Welcome back, Admin</p>
                    </div>

                    <div style={{ display: 'flex', gap: '16px' }}>
                        <button onClick={() => { localStorage.removeItem('admin_token'); router.push('/admin'); }} className="btn btn-glass">
                            Logout
                        </button>
                        <button onClick={fetchOrders} className="btn btn-primary">
                            Refresh Data
                        </button>
                    </div>
                </div>

                {/* Quick Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                    {[
                        { label: 'Total Orders', value: orders.length, icon: <Package size={24} color="#0ea5e9" />, bg: 'rgba(14, 165, 233, 0.1)' },
                        { label: 'Pending', value: orders.filter(o => o.status === 'Received').length, icon: <Clock size={24} color="#f59e0b" />, bg: 'rgba(245, 158, 11, 0.1)' },
                        { label: 'Active', value: orders.filter(o => ['Processing', 'Purchased', 'Out for Delivery'].includes(o.status)).length, icon: <TrendingUp size={24} color="#10b981" />, bg: 'rgba(16, 185, 129, 0.1)' },
                        { label: 'Customers', value: new Set(orders.map(o => o.mobile)).size, icon: <Users size={24} color="#8b5cf6" />, bg: 'rgba(139, 92, 246, 0.1)' },
                    ].map((stat, i) => (
                        <div key={i} className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {stat.icon}
                            </div>
                            <div>
                                <div style={{ fontSize: '2rem', fontWeight: 700 }}>{stat.value}</div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chart Section */}
                <div className="glass-panel" style={{ padding: '40px', marginBottom: '40px', height: '400px' }}>
                    <h3 style={{ marginBottom: '20px' }}>Order Status Overview</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={statusData}>
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <RechartsTooltip
                                contentStyle={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            />
                            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                {statusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Filters */}
                <div style={{ marginBottom: '24px', position: 'relative', maxWidth: '400px' }}>
                    <Search size={20} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search orders, mobile, name..."
                        className="input-glass"
                        style={{ paddingLeft: '48px' }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Orders Table */}
                <div className="glass-panel" style={{ overflowX: 'auto', padding: 0, borderRadius: '16px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                                <th style={{ padding: '20px', textAlign: 'left', color: 'var(--text-muted)' }}>Order ID</th>
                                <th style={{ padding: '20px', textAlign: 'left', color: 'var(--text-muted)' }}>Customer</th>
                                <th style={{ padding: '20px', textAlign: 'left', color: 'var(--text-muted)' }}>Prescription</th>
                                <th style={{ padding: '20px', textAlign: 'left', color: 'var(--text-muted)' }}>Status</th>
                                <th style={{ padding: '20px', textAlign: 'left', color: 'var(--text-muted)' }}>Date</th>
                                <th style={{ padding: '20px', textAlign: 'left', color: 'var(--text-muted)' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="6" style={{ padding: '40px', textAlign: 'center' }}>Loading...</td></tr>
                            ) : filteredOrders.length === 0 ? (
                                <tr><td colSpan="6" style={{ padding: '40px', textAlign: 'center' }}>No orders found</td></tr>
                            ) : (
                                filteredOrders.map(order => (
                                    <tr key={order._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }} className="table-row">
                                        <td style={{ padding: '20px', fontWeight: 600, fontFamily: 'monospace' }}>{order.orderId}</td>
                                        <td style={{ padding: '20px' }}>
                                            <div style={{ fontWeight: 600 }}>{order.name}</div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{order.mobile}</div>
                                        </td>
                                        <td style={{ padding: '20px' }}>
                                            <a href={order.prescriptionUrl} target="_blank" download className="btn btn-glass" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                                                <Download size={14} /> View
                                            </a>
                                        </td>
                                        <td style={{ padding: '20px' }}>
                                            <select
                                                value={order.status}
                                                onChange={(e) => updateStatus(order._id, e.target.value)}
                                                style={{
                                                    padding: '8px 12px', borderRadius: '8px',
                                                    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)',
                                                    color: 'white', cursor: 'pointer'
                                                }}
                                            >
                                                {['Received', 'Processing', 'Purchased', 'Out for Delivery', 'Delivered'].map(s => (
                                                    <option key={s} value={s} style={{ background: '#0f172a' }}>{s}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td style={{ padding: '20px', color: 'var(--text-muted)' }}>
                                            {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}<br />
                                            {new Date(order.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                        <td style={{ padding: '20px' }}>
                                            <a
                                                href={`https://wa.me/91${order.mobile}?text=Hi ${order.name}, regarding your MedExpress order ${order.orderId}: `}
                                                target="_blank"
                                                className="btn btn-primary"
                                                style={{ padding: '8px 16px', fontSize: '0.85rem', background: '#25D366', boxShadow: 'none' }}
                                            >
                                                <MessageCircle size={14} /> Chat
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <style jsx>{`
        .table-row:hover { background: rgba(255,255,255,0.02); }
      `}</style>
        </div>
    );
}
