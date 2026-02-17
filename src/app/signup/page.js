'use client';
import Link from 'next/link';
import { SignUp } from '@clerk/nextjs';
import { ChevronLeft } from 'lucide-react';

export default function SignupPage() {
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
        <div className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '40px', paddingBottom: '40px' }}>

            {/* Background Decor */}
            <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
                <div style={{ position: 'absolute', top: '10%', right: '20%', width: '300px', height: '300px', background: 'var(--accent)', opacity: 0.1, filter: 'blur(100px)' }} />
                <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: '250px', height: '250px', background: 'var(--primary)', opacity: 0.1, filter: 'blur(80px)' }} />
            </div>

            <div className="container" style={{ maxWidth: '500px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Link href="/" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)',
                    marginBottom: '32px', textDecoration: 'none', fontSize: '0.9rem', alignSelf: 'flex-start'
                }}>
                    <ChevronLeft size={16} /> Back to Home
                </Link>

                <SignUp routing="hash" appearance={clerkAppearance} />
            </div>
        </div>
    );
}
