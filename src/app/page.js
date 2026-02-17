'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Upload, Truck, Shield, Clock, ChevronRight, Star, Quote, ArrowRight, PlayCircle, HeartPulse, MapPin, ShoppingBag, Phone, MessageCircle, ShieldCheck, CalendarClock, CreditCard, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useState, useEffect } from 'react';
import TiltCard from '@/components/TiltCard';
import CountUp from '@/components/CountUp';

export default function Home() {
  const { t } = useLanguage();
  const [typedText, setTypedText] = useState('');
  const fullText = "Medicine Delivery";
  const [heroSrc, setHeroSrc] = useState('/hero_delivery.svg');
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ overflowX: 'hidden' }}>
      {/* HERO SECTION */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative',
        paddingTop: '80px', perspective: '1000px'
      }}>
        <div className="hero-bg">
          <span className="hero-orb hero-orb-one" />
          <span className="hero-orb hero-orb-two" />
          <span className="hero-orb hero-orb-three" />
        </div>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }} className="hero-grid">

            {/* Text Content */}
            <div style={{ zIndex: 10, paddingRight: '40px' }} className="hero-text-content">
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '50px',
                background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)',
                color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '24px'
              }}>
                <span style={{ position: 'relative', display: 'flex', height: '10px', width: '10px' }}>
                  <span style={{ position: 'absolute', display: 'inline-flex', height: '100%', width: '100%', borderRadius: '50%', background: 'var(--primary)', opacity: 0.75, animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite' }}></span>
                  <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '50%', height: '10px', width: '10px', background: 'var(--primary)' }}></span>
                </span>
                We Buy & Deliver For You
              </div>

              <h1 style={{ marginBottom: '24px', lineHeight: 1.2 }}>
                <span style={{ display: 'block', whiteSpace: 'nowrap', fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', color: 'var(--text-main)' }}>
                  Premium <span style={{ color: 'var(--primary-light)' }}>{typedText}</span><span className="animate-glow" style={{ color: 'var(--accent)' }}>|</span>
                </span>
                <span style={{ display: 'block', fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}>Direct to Your Door</span>
              </h1>

              <div className="glass-panel" style={{ padding: '24px', marginBottom: '40px', border: '1px solid rgba(255,255,255,0.1)' }}>
                {/* Step 1 */}
                <div style={{ display: 'flex', gap: '16px', position: 'relative' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', zIndex: 2 }}>
                      <Upload size={20} />
                    </div>
                    <div style={{ width: '2px', height: '100%', background: 'rgba(255,255,255,0.2)', minHeight: '30px' }}></div>
                  </div>
                  <div style={{ paddingBottom: '24px' }}>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-main)' }}>1. Upload Prescription</h4>
                    <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Snap a photo. We handle the rest.</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div style={{ display: 'flex', gap: '16px', position: 'relative' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', zIndex: 2 }}>
                      <ShoppingBag size={20} />
                    </div>
                    <div style={{ width: '2px', height: '100%', background: 'rgba(255,255,255,0.2)', minHeight: '30px' }}></div>
                  </div>
                  <div style={{ paddingBottom: '24px' }}>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-main)' }}>2. Personal Shopper</h4>
                    <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>We buy from trusted partners.</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div style={{ display: 'flex', gap: '16px', position: 'relative' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--highlight)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', zIndex: 2 }}>
                      <Truck size={20} />
                    </div>
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-main)' }}>3. Instant Delivery</h4>
                    <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Direct to your doorstep.</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Link href="/upload" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
                  <Upload size={20} /> Order Now
                </Link>
                <Link href="/how-it-works" className="btn btn-glass" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
                  <PlayCircle size={20} /> How It Works
                </Link>
              </div>

              <div style={{ marginTop: '50px', display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <div className="stats-card">
                  <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>
                    <CountUp end={5000} suffix="+" />
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Happy Customers</p>
                </div>
                <div className="stats-card">
                  <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>
                    <CountUp end={4.9} />
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Trust Score</p>
                </div>
              </div>
            </div>

            {/* Visual/3D Element */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }} className="hero-visual">
              <div className="hero-stack">
                <TiltCard className="animate-float hero-main-card" style={{ border: 'none', background: 'transparent', boxShadow: 'none' }}>
                  <Image
                    src={heroSrc}
                    alt="Personal Delivery Service"
                    width={740}
                    height={540}
                    priority
                    unoptimized
                    className="hero-image"
                    onError={() => setHeroSrc('/globe.svg')}
                    style={{
                      maxWidth: '120%', height: 'auto',
                      filter: 'drop-shadow(0 30px 60px rgba(59, 130, 246, 0.3))',
                      transform: 'scale(1.1)'
                    }}
                  />
                </TiltCard>
                <div className="hero-float hero-float-one">
                  <div className="glass-panel hero-mini" style={{ padding: '6px', overflow: 'hidden', width: '132px', height: '132px', minWidth: '132px', borderRadius: '22px' }}>
                    <div style={{ width: '100%', height: '100%', borderRadius: '16px', overflow: 'hidden', background: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Image
                        src="/img.png"
                        alt="Live coverage"
                        width={120}
                        height={120}
                        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                      />
                    </div>
                  </div>
                </div>
                <div className="hero-float hero-float-two">
                  <div className="glass-panel hero-mini">
                    <Image src="/file.svg" alt="Verified prescription" width={120} height={120} className="hero-mini-image" unoptimized />
                    <span className="hero-mini-text">Verified Rx</span>
                  </div>
                </div>
                <div className="hero-float hero-float-three">
                  <div className="glass-panel hero-mini">
                    <Image src="/window.svg" alt="Delivery updates" width={120} height={120} className="hero-mini-image" unoptimized />
                    <span className="hero-mini-text">Fast Updates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENTO GRID FEATURES */}
      <section style={{ padding: '50px 0 100px' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Why <span className="text-gradient">MedExpress</span>?</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '60px' }}>We handle your health with care</p>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 300px)',
            gap: '32px', gridAutoFlow: 'dense'
          }} className="bento-grid">

            {/* Large Card */}
            <TiltCard style={{ gridColumn: 'span 2', background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)', color: 'white' }}>
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px' }}>
                <Truck size={48} style={{ marginBottom: '20px', opacity: 0.8 }} />
                <h3 style={{ fontSize: '2rem', color: 'white', marginBottom: '10px' }}>Personal Shopper Experience</h3>
                <p style={{ opacity: 0.9, fontSize: '1.1rem', maxWidth: '500px' }}>
                  Unlike standard couriers, we assign a dedicated runner to buy your specific medicines from the best pharmacies in town.
                </p>
                <div style={{ marginTop: 'auto', display: 'flex', gap: '10px', opacity: 0.5 }}>
                  <MapPin size={16} /> Real-time Updates
                </div>
              </div>
            </TiltCard>

            {/* Tall Card */}
            <TiltCard style={{ gridRow: 'span 2', background: 'var(--glass-bg)' }}>
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '40px', alignItems: 'center', textAlign: 'center' }}>
                <div style={{
                  width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px'
                }}>
                  <Shield size={40} color="var(--accent)" />
                </div>
                <h3 style={{ margin: '0 0 14px', lineHeight: 1 }}>
                  <span style={{ display: 'block', fontSize: '2.2rem', color: 'var(--text-main)', lineHeight: 1 }}>100%</span>
                  <span style={{ display: 'block', fontSize: '1.1rem', color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.1 }}>Genuine</span>
                </h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>
                  We partner directly with licensed distributors. Every strip is QR-coded and verified for authenticity.
                </p>
                <Image
                  src={heroSrc}
                  alt="Decoration"
                  width={150}
                  height={110}
                  unoptimized
                  onError={() => setHeroSrc('/globe.svg')}
                  style={{ width: '150px', opacity: 0.5, filter: 'grayscale(1)' }}
                />
              </div>
            </TiltCard>

            {/* Small Card 1 */}
            <TiltCard>
              <div style={{ padding: '30px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Upload size={32} color="var(--primary)" style={{ marginBottom: '16px' }} />
                <h4>Easy Upload</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>AI parses your prescription instantly.</p>
              </div>
            </TiltCard>

            {/* Small Card 2 */}
            <TiltCard style={{ background: 'linear-gradient(135deg, var(--accent) 0%, #059669 100%)', color: 'white' }}>
              <div style={{ padding: '30px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <HeartPulse size={32} color="white" style={{ marginBottom: '16px' }} />
                <h4 style={{ color: 'white' }}>24/7 Support</h4>
                <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>Pharmacists available on chat.</p>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      <section style={{ padding: '30px 0 100px' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '12px' }}>Quick Actions</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '50px' }}>Do the most common tasks in one tap</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            <Link href="/upload" className="glass-panel card-hover" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px', textDecoration: 'none' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(59, 130, 246, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Upload size={22} color="var(--primary)" />
              </div>
              <h4 style={{ margin: 0, color: 'var(--text-main)' }}>Upload Prescription</h4>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>Take a photo and send it instantly.</p>
              <span style={{ marginTop: 'auto', color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Start Now <ArrowRight size={16} />
              </span>
            </Link>
            <Link href="/track" className="glass-panel card-hover" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px', textDecoration: 'none' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Truck size={22} color="var(--accent)" />
              </div>
              <h4 style={{ margin: 0, color: 'var(--text-main)' }}>Track My Order</h4>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>Live updates from pickup to doorstep.</p>
              <span style={{ marginTop: 'auto', color: 'var(--accent)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Track Now <ArrowRight size={16} />
              </span>
            </Link>
            <Link href="/contact" className="glass-panel card-hover" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px', textDecoration: 'none' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(245, 158, 11, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageCircle size={22} color="var(--highlight)" />
              </div>
              <h4 style={{ margin: 0, color: 'var(--text-main)' }}>Need Help?</h4>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>Chat with a pharmacist in minutes.</p>
              <span style={{ marginTop: 'auto', color: 'var(--highlight)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Contact Us <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 100px' }}>
        <div className="container">
          <div className="glass-panel card-hover" style={{ padding: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '28px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }} className="promise-item">
              <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: 'rgba(59, 130, 246, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={22} color="var(--primary)" />
              </div>
              <div>
                <h4 style={{ margin: 0 }}>Verified Medicines</h4>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Licensed pharmacy partners only.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }} className="promise-item">
              <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CalendarClock size={22} color="var(--accent)" />
              </div>
              <div>
                <h4 style={{ margin: 0 }}>Same-Day Delivery</h4>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Fast pickup and dispatch.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }} className="promise-item">
              <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: 'rgba(245, 158, 11, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CreditCard size={22} color="var(--highlight)" />
              </div>
              <div>
                <h4 style={{ margin: 0 }}>Flexible Payments</h4>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>UPI, cards, wallets supported.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }} className="promise-item">
              <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: 'rgba(99, 102, 241, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Phone size={22} color="#6366f1" />
              </div>
              <div>
                <h4 style={{ margin: 0 }}>Human Support</h4>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Real people, real help.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 120px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '12px' }}>Frequently Asked</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '50px' }}>Quick answers to common questions</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { 
                q: "How do I upload my prescription?", 
                a: "Simply click the 'Order Now' button, take a clear photo of your prescription, and upload it. Our team will review it instantly." 
              },
              { 
                q: "Do you verify prescriptions?", 
                a: "Yes, every prescription is verified by our licensed pharmacists before we process the order to ensure your safety." 
              },
              { 
                q: "Can I track my delivery?", 
                a: "Absolutely! You'll receive live updates as your personal shopper picks up your medicines and heads to your doorstep." 
              },
              { 
                q: "What payment methods do you accept?", 
                a: "We accept all major UPI apps, credit/debit cards, and popular digital wallets for a seamless checkout experience." 
              }
            ].map((faq, i) => (
              <div key={i} className="glass-panel" style={{ overflow: 'hidden', transition: 'all 0.3s ease' }}>
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  style={{
                    width: '100%', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left'
                  }}
                >
                  <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-main)' }}>{faq.q}</h4>
                  {activeFaq === i ? <ChevronUp size={20} color="var(--primary)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
                </button>
                <div style={{ 
                  maxHeight: activeFaq === i ? '200px' : '0', overflow: 'hidden', 
                  transition: 'max-height 0.3s ease-in-out', background: 'rgba(255,255,255,0.03)'
                }}>
                  <p style={{ padding: '0 24px 24px', margin: 0, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ padding: '60px 0', position: 'relative' }}>
        <div className="container">
          <TiltCard style={{
            padding: '40px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.9) 0%, rgba(30, 58, 138, 0.7) 100%)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h2 style={{ fontSize: '3rem', marginBottom: '24px', color: 'white' }}>Ready to Experience the Future?</h2>
              <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
                Join the healthcare revolution today.
              </p>
              <Link href="/upload" className="btn btn-highlight" style={{ padding: '18px 40px', fontSize: '1.2rem' }}>
                Get Started <ArrowRight size={20} />
              </Link>
            </div>
          </TiltCard>
        </div>
      </section>

      <style jsx>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @media (max-width: 900px) {
          .bento-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }
        }
      `}</style>
    </div>
  );
}
