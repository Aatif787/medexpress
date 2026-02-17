'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    const handleLogout = async () => {
        await logout();
    };

    if (loading || !user) {
        return (
            <div className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="section" style={{ minHeight: '100vh', paddingTop: '100px' }}>
            <div className="container">
                <h1 style={{ marginBottom: '20px' }}>Welcome, {user.name}</h1>
                <p style={{ color: 'var(--text-muted)' }}>This is your protected dashboard.</p>
                
                {/* Dashboard content goes here */}
                <div className="glass-panel" style={{ padding: '40px', marginTop: '40px' }}>
                    <h3>Your Account Details</h3>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Mobile:</strong> {user.mobile || 'Not provided'}</p>
                    
                    <button 
                        onClick={handleLogout}
                        className="btn btn-primary"
                        style={{ marginTop: '20px', background: 'var(--accent)' }}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
