'use client';
import { useState } from 'react';
import { Bell, CalendarClock } from 'lucide-react';

export default function RemindersPage() {
    const [reminders, setReminders] = useState([
        { name: 'Morning BP Tablet', time: '08:00 AM', days: 'Daily' },
        { name: 'Vitamin D', time: '01:00 PM', days: 'Mon, Wed, Fri' },
        { name: 'Night Allergy Tablet', time: '09:30 PM', days: 'Daily' }
    ]);

    const [form, setForm] = useState({ name: '', time: '', days: '' });

    const addReminder = (e) => {
        e.preventDefault();
        if (!form.name || !form.time || !form.days) return;
        setReminders([...reminders, form]);
        setForm({ name: '', time: '', days: '' });
    };

    return (
        <div className="section" style={{ paddingTop: '110px' }}>
            <div className="container" style={{ maxWidth: '900px' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 className="text-gradient" style={{ marginBottom: '12px' }}>Medicine Reminders</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Stay consistent with automatic reminders and refill alerts</p>
                </div>

                <div className="grid-2" style={{ alignItems: 'start' }}>
                    <div className="card">
                        <h3 style={{ marginBottom: '16px' }}>Your Reminders</h3>
                        <div style={{ display: 'grid', gap: '14px' }}>
                            {reminders.map((reminder, index) => (
                                <div key={`${reminder.name}-${index}`} className="card-outline" style={{ padding: '16px', borderRadius: '14px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <h4 style={{ margin: 0 }}>{reminder.name}</h4>
                                            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>{reminder.days}</p>
                                        </div>
                                        <span className="badge">
                                            <Bell size={14} /> {reminder.time}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card">
                        <h3 style={{ marginBottom: '16px' }}>Add Reminder</h3>
                        <form onSubmit={addReminder} style={{ display: 'grid', gap: '14px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Medicine Name</label>
                                <input className="input-glass" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Metformin" />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Time</label>
                                <input className="input-glass" type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Days</label>
                                <input className="input-glass" value={form.days} onChange={(e) => setForm({ ...form, days: e.target.value })} placeholder="Daily or Mon, Wed, Fri" />
                            </div>
                            <button type="submit" className="btn btn-primary">Save Reminder</button>
                        </form>
                        <div className="divider" />
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <div className="icon-circle" style={{ width: '40px', height: '40px' }}>
                                <CalendarClock size={18} color="var(--primary)" />
                            </div>
                            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Refill alerts sync with your prescription schedule.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
