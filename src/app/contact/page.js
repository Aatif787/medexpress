'use client';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
    const { t } = useLanguage();

    return (
        <div className="section" style={{ paddingTop: '100px' }}>
            <div className="container">

                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h1 className="text-gradient" style={{ marginBottom: '16px' }}>Get in Touch</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                        Have questions about your prescription or delivery? We&apos;re here to help 24/7.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '40px' }} className="contact-grid">

                    {/* Contact Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {[
                            { icon: <Phone size={24} />, title: 'Call Us', value: '+91 86014 39557', link: 'tel:+918601439557' },
                            { icon: <Mail size={24} />, title: 'Email Us', value: 'support@medexpress.in', link: 'mailto:support@medexpress.in' },
                            { icon: <Clock size={24} />, title: 'Operating Hours', value: '8:00 AM - 10:00 PM', sub: 'Every Day (Mon-Sun)' },
                            { icon: <MapPin size={24} />, title: 'Service Area', value: 'Domariyaganj & Basti', sub: 'Uttar Pradesh, India' }
                        ].map((item, i) => (
                            <div key={i} className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div style={{
                                    width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)'
                                }}>
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{item.title}</h3>
                                    {item.link ? (
                                        <a href={item.link} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '1rem' }}>{item.value}</a>
                                    ) : (
                                        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>{item.value}</p>
                                    )}
                                    {item.sub && <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px', opacity: 0.7 }}>{item.sub}</p>}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Form & Map */}
                    <div className="glass-panel" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <h2 style={{ fontSize: '1.8rem' }}>Send a Message</h2>
                        <form style={{ display: 'grid', gap: '20px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <input type="text" placeholder="Name" className="input-glass" />
                                <input type="email" placeholder="Email" className="input-glass" />
                            </div>
                            <input type="text" placeholder="Subject" className="input-glass" />
                            <textarea placeholder="Your Message..." rows="5" className="input-glass"></textarea>
                            <button className="btn btn-primary" style={{ justifySelf: 'start' }}>
                                Send Message <Send size={18} />
                            </button>
                        </form>

                        <div style={{ marginTop: '20px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.3976374972!2d82.6568297!3d27.2064124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39908e2cf5a5b5b1%3A0x6b1c2b2b2b2b2b2b!2sDomariyaganj%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                                width="100%"
                                height="250"
                                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>

                </div>
            </div>
            <style jsx>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    );
}
