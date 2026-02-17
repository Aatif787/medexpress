'use client';
import { Upload, CheckCircle, Truck, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HowItWorks() {
    const steps = [
        {
            icon: <Upload size={40} />,
            title: "1. Upload Prescription",
            desc: "Snap a clear photo of your prescription and share it in seconds.",
            color: "var(--primary)",
            image: "https://cdn.jsdelivr.net/gh/realvjy/3dicons@main/files/blue/dynamic/camera-dynamic-blue.png",
            label: "Smart Upload"
        },
        {
            icon: <CheckCircle size={40} />,
            title: "2. Lucknow Partner Pharmacy",
            desc: "We purchase medicines from trusted partner pharmacies with verified billing.",
            color: "var(--accent)",
            image: "https://cdn.jsdelivr.net/gh/realvjy/3dicons@main/files/blue/dynamic/shield-dynamic-blue.png",
            label: "Verified Purchase"
        },
        {
            icon: <Truck size={40} />,
            title: "3. Home Delivery in Domariyaganj",
            desc: "Next-day delivery to Domariyaganj and nearby towns.",
            color: "#f59e0b",
            image: "https://cdn.jsdelivr.net/gh/realvjy/3dicons@main/files/blue/dynamic/car-dynamic-blue.png",
            label: "Doorstep Delivery"
        }
    ];

    return (
        <div className="section" style={{ paddingTop: '100px', minHeight: '90vh' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '16px' }}>How It Works</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Get your medicines in 3 simple steps</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginBottom: '60px' }}>
                    {steps.map((step, index) => (
                        <div key={index} className="glass-panel step-card card-hover" style={{ padding: '40px', textAlign: 'center', position: 'relative' }}>
                            <span className="step-badge">{step.label}</span>
                            <div style={{
                                width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
                                color: step.color
                            }}>
                                {step.icon}
                            </div>
                            <h3 style={{ marginBottom: '16px', fontSize: '1.5rem' }}>{step.title}</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{step.desc}</p>
                            <div className="step-image" style={{ background: 'transparent', padding: 0 }}>
                                <Image src={step.image} alt={step.title} width={200} height={200} unoptimized style={{ filter: 'drop-shadow(0 20px 30px rgba(59, 130, 246, 0.2))' }} />
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center' }}>
                    <Link href="/upload" className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '1.2rem' }}>
                        Order Now <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
