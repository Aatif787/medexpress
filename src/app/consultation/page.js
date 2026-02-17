'use client';
import { useState } from 'react';
import { CalendarClock, Stethoscope, ShieldCheck } from 'lucide-react';

export default function ConsultationPage() {
    const [submitted, setSubmitted] = useState(false);

    return (
        <div className="section" style={{ paddingTop: '110px' }}>
            <div className="container" style={{ maxWidth: '900px' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 className="text-gradient" style={{ marginBottom: '12px' }}>Book a Doctor Consultation</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Verified doctors, secure appointments, and prescription review</p>
                </div>

                <div className="grid-2" style={{ alignItems: 'start' }}>
                    <div className="card">
                        <div className="badge badge-success" style={{ marginBottom: '16px' }}>
                            <ShieldCheck size={14} /> Verified Specialists
                        </div>
                        <h3 style={{ marginBottom: '10px' }}>Consultation Highlights</h3>
                        <ul style={{ color: 'var(--text-muted)', display: 'grid', gap: '10px', paddingLeft: '18px' }}>
                            <li>Video or phone appointments with licensed doctors</li>
                            <li>Prescription review and medication safety checks</li>
                            <li>Follow-up reminders and refill guidance</li>
                            <li>Priority medicine delivery after approval</li>
                        </ul>
                        <div className="divider" />
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <div className="icon-circle" style={{ width: '40px', height: '40px' }}>
                                <CalendarClock size={18} color="var(--primary)" />
                            </div>
                            <div>
                                <h4 style={{ margin: 0 }}>Flexible Time Slots</h4>
                                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Morning, afternoon, evening</p>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        {!submitted ? (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setSubmitted(true);
                                }}
                                style={{ display: 'grid', gap: '16px' }}
                            >
                                <div>
                                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Full Name</label>
                                    <input className="input-glass" placeholder="Patient name" required />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Mobile Number</label>
                                    <input className="input-glass" placeholder="10-digit mobile" required />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Specialty</label>
                                    <select className="input-glass" required>
                                        <option value="">Select specialty</option>
                                        <option>General Physician</option>
                                        <option>Cardiology</option>
                                        <option>Diabetology</option>
                                        <option>Dermatology</option>
                                        <option>Pediatrics</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Preferred Time</label>
                                    <select className="input-glass" required>
                                        <option value="">Select slot</option>
                                        <option>Morning (9 AM - 12 PM)</option>
                                        <option>Afternoon (12 PM - 4 PM)</option>
                                        <option>Evening (4 PM - 8 PM)</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Notes</label>
                                    <textarea className="input-glass" rows="3" placeholder="Describe your symptoms or needs" />
                                </div>
                                <button type="submit" className="btn btn-primary">Book Consultation</button>
                            </form>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                                <div className="icon-circle" style={{ margin: '0 auto 16px' }}>
                                    <Stethoscope size={22} color="var(--primary)" />
                                </div>
                                <h3 style={{ marginBottom: '8px' }}>Request Received</h3>
                                <p style={{ color: 'var(--text-muted)' }}>
                                    Our care team will call you shortly to confirm your consultation slot.
                                </p>
                                <button className="btn btn-glass" style={{ marginTop: '16px' }} onClick={() => setSubmitted(false)}>
                                    Book Another
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
