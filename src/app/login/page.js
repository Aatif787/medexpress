'use client';
import Link from 'next/link';
import { SignIn } from '@clerk/nextjs';
import { ChevronLeft } from 'lucide-react';

export default function LoginPage() {
    const clerkAppearance = {
        elements: {
            formFieldRow: 'hidden',
            formButtonPrimary: 'hidden',
            dividerLine: 'hidden',
            dividerText: 'hidden',
            footerActionLink: 'hidden',
            footerActionText: 'hidden',
        },
    };

    return (
        <div className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '0' }}>

            {/* Background Decor */}
            <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
                <div style={{ position: 'absolute', top: '20%', left: '20%', width: '300px', height: '300px', background: 'var(--primary)', opacity: 0.15, filter: 'blur(100px)' }} />
                <div style={{ position: 'absolute', bottom: '20%', right: '20%', width: '200px', height: '200px', background: 'var(--accent)', opacity: 0.15, filter: 'blur(80px)' }} />
            </div>

            <div className="container" style={{ maxWidth: '450px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Link href="/" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)',
                    marginBottom: '32px', textDecoration: 'none', fontSize: '0.9rem', alignSelf: 'flex-start'
                }}>
                    <ChevronLeft size={16} /> Back to Home
                </Link>

                <SignIn routing="hash" appearance={clerkAppearance} />
            </div>
        </div>
    );
}
