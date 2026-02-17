'use client';
import Link from 'next/link';
import { HeartPulse, ShieldCheck, ArrowRight } from 'lucide-react';

const tips = [
    { title: 'Manage Blood Pressure', desc: 'Track BP daily, reduce salt intake, and stay hydrated.', tag: 'Heart Health' },
    { title: 'Diabetes Care Basics', desc: 'Maintain balanced meals, monitor glucose, and keep regular checkups.', tag: 'Diabetes' },
    { title: 'Cold & Flu Safety', desc: 'Rest, hydrate, and consult a doctor for persistent symptoms.', tag: 'Seasonal' },
    { title: 'Medication Adherence', desc: 'Set reminders and never skip prescribed doses.', tag: 'Medication' },
    { title: 'Wellness for Seniors', desc: 'Include mobility exercises and regular vitals monitoring.', tag: 'Senior Care' },
    { title: 'Child Health Essentials', desc: 'Keep vaccination schedules and consult pediatricians early.', tag: 'Pediatrics' }
];

export default function HealthTipsPage() {
    return (
        <div className="section" style={{ paddingTop: '110px' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 className="text-gradient" style={{ marginBottom: '12px' }}>Health Tips & Safety</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Expert-backed tips to stay healthy and use medicines safely</p>
                </div>

                <div className="grid-3">
                    {tips.map((tip) => (
                        <div key={tip.title} className="card card-hover">
                            <div className="badge badge-success" style={{ marginBottom: '12px' }}>
                                <ShieldCheck size={14} /> {tip.tag}
                            </div>
                            <h3 style={{ margin: '0 0 8px' }}>{tip.title}</h3>
                            <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.6 }}>{tip.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="card" style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div className="icon-circle">
                            <HeartPulse size={20} color="var(--highlight)" />
                        </div>
                        <div>
                            <h3 style={{ margin: 0 }}>Need a personalized plan?</h3>
                            <p style={{ margin: 0, color: 'var(--text-muted)' }}>Consult a licensed doctor to review your medicines.</p>
                        </div>
                    </div>
                    <Link href="/consultation" className="btn btn-primary">
                        Book Consultation <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
