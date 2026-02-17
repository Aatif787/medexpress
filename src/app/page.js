'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Upload, Truck, Shield, Quote, ArrowRight, HeartPulse, MapPin, ShoppingBag, MessageCircle, ShieldCheck, CalendarClock, ChevronDown, ChevronUp, CheckCircle, Stethoscope, Pill, Bandage, Baby, Heart, ClipboardCheck, ShieldPlus } from 'lucide-react';
import { useState } from 'react';
import TiltCard from '@/components/TiltCard';
import CountUp from '@/components/CountUp';

export default function Home() {
  const [heroSrc, setHeroSrc] = useState('/hero_delivery.svg');
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div style={{ overflowX: 'hidden' }}>
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
                Trusted Partner Pharmacies
              </div>

              <h1 style={{ marginBottom: '24px', lineHeight: 1.2 }}>
                <span style={{ display: 'block', fontSize: 'clamp(2.1rem, 4.6vw, 3.9rem)', color: 'var(--text-main)' }}>
                  Order Medicines Online — Delivered to Your Door
                </span>
              </h1>

              <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '24px' }}>
                Upload your prescription and get genuine medicines delivered from Lucknow to Domariyaganj & nearby towns.
              </p>

              <div style={{ display: 'grid', gap: '12px', marginBottom: '32px' }}>
                {[
                  'Prescription Required',
                  'Next-Day Delivery',
                  'Genuine Medicines at MRP',
                  'WhatsApp Support Available'
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)', fontWeight: 600 }}>
                    <CheckCircle size={18} color="var(--accent)" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                <Link href="/upload" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
                  <Upload size={20} /> Upload Prescription Now
                </Link>
                <a
                  href="https://wa.me/918601439557"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-glass"
                  style={{ padding: '16px 32px', fontSize: '1.1rem' }}
                >
                  <MessageCircle size={20} /> Order via WhatsApp
                </a>
              </div>

              <div className="trust-strip" style={{ justifyContent: 'flex-start', marginTop: '20px' }}>
                <span className="badge badge-success"><ShieldCheck size={14} /> Verified Pharmacy</span>
                <span className="badge"><Stethoscope size={14} /> Licensed Pharmacists</span>
                <span className="badge badge-dark"><ShieldPlus size={14} /> Secure Payments</span>
              </div>

              <div style={{ marginTop: '50px', display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <div className="stats-card">
                  <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>
                    <CountUp end={5000} suffix="+" />
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Orders Delivered</p>
                </div>
                <div className="stats-card">
                  <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>
                    <CountUp end={4.9} />
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Average Rating</p>
                </div>
              </div>
            </div>

            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }} className="hero-visual">
              <div className="hero-stack">
                <TiltCard className="animate-float hero-main-card" style={{ border: 'none', background: 'transparent', boxShadow: 'none' }}>
                  <Image
                    src={heroSrc}
                    alt="Medicine delivery rider"
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
                        src="/globe.svg"
                        alt="Lucknow to Domariyaganj"
                        width={120}
                        height={120}
                        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                      />
                    </div>
                  </div>
                </div>
                <div className="hero-float hero-float-two">
                  <div className="glass-panel hero-mini">
                    <Image src="/file.svg" alt="Prescription upload" width={120} height={120} className="hero-mini-image" unoptimized />
                    <span className="hero-mini-text">Prescription Upload</span>
                  </div>
                </div>
                <div className="hero-float hero-float-three">
                  <div className="glass-panel hero-mini">
                    <Image src="/window.svg" alt="Route updates" width={120} height={120} className="hero-mini-image" unoptimized />
                    <span className="hero-mini-text">Lucknow → Domariyaganj</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 100px' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '12px' }}>How It Works</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '50px' }}>Three simple steps from prescription to doorstep</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            <div className="glass-panel card-hover" style={{ padding: '28px', position: 'relative' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'rgba(59, 130, 246, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <Upload size={24} color="var(--primary)" />
              </div>
              <h3 style={{ margin: '0 0 10px' }}>Upload Prescription</h3>
              <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.6 }}>Send a clear photo of your prescription in seconds.</p>
            </div>
            <div className="glass-panel card-hover" style={{ padding: '28px', position: 'relative' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <ShoppingBag size={24} color="var(--accent)" />
              </div>
              <h3 style={{ margin: '0 0 10px' }}>Lucknow Partner Pharmacy</h3>
              <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.6 }}>We purchase medicines from trusted, licensed pharmacies.</p>
            </div>
            <div className="glass-panel card-hover" style={{ padding: '28px', position: 'relative' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'rgba(245, 158, 11, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <Truck size={24} color="var(--highlight)" />
              </div>
              <h3 style={{ margin: '0 0 10px' }}>Home Delivery in Domariyaganj</h3>
              <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.6 }}>Next-day delivery to Domariyaganj and nearby towns.</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 100px' }}>
        <div className="container">
          <h2 className="section-title">Browse Medicine Categories</h2>
          <p className="section-subtitle">Find the right treatment fast with curated categories</p>
          <div className="grid-4">
            {[
              { label: 'Cold & Cough', icon: <Bandage size={22} color="var(--primary)" /> },
              { label: 'Heart Care', icon: <Heart size={22} color="var(--accent)" /> },
              { label: 'Diabetes', icon: <ClipboardCheck size={22} color="var(--primary)" /> },
              { label: 'Women Health', icon: <Stethoscope size={22} color="var(--highlight)" /> },
              { label: 'Baby Care', icon: <Baby size={22} color="var(--primary)" /> },
              { label: 'Vitamins', icon: <Pill size={22} color="var(--accent)" /> },
              { label: 'First Aid', icon: <Shield size={22} color="var(--primary)" /> },
              { label: 'Skin Care', icon: <HeartPulse size={22} color="var(--highlight)" /> }
            ].map((category) => (
              <Link key={category.label} href="/medicines" className="card card-hover" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div className="icon-circle">{category.icon}</div>
                <div>
                  <h4 style={{ margin: 0, color: 'var(--text-main)' }}>{category.label}</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>View products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 100px' }}>
        <div className="container">
          <div className="card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '28px', alignItems: 'center' }}>
            <div>
              <span className="badge badge-success">Doctor Consultation</span>
              <h2 style={{ margin: '16px 0 12px' }}>Book a Consultation with Verified Doctors</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
                Schedule video or clinic consultations. Get prescriptions reviewed and delivered by licensed pharmacies.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '18px' }}>
                <Link href="/consultation" className="btn btn-primary">Book Consultation</Link>
                <Link href="/upload" className="btn btn-glass">Upload Prescription</Link>
              </div>
            </div>
            <div className="card-outline" style={{ padding: '22px', borderRadius: '16px' }}>
              <div className="grid-2">
                {[
                  { title: 'Verified Doctors', desc: 'Licensed practitioners and specialists.' },
                  { title: 'Flexible Slots', desc: 'Morning, afternoon, evening options.' },
                  { title: 'Care Plans', desc: 'Personalized guidance and reminders.' },
                  { title: 'Prescription Review', desc: 'Safety checks before delivery.' }
                ].map((item) => (
                  <div key={item.title} style={{ display: 'flex', gap: '12px' }}>
                    <div className="icon-circle" style={{ width: '38px', height: '38px' }}>
                      <Stethoscope size={18} color="var(--primary)" />
                    </div>
                    <div>
                      <h4 style={{ margin: 0 }}>{item.title}</h4>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 100px' }}>
        <div className="container">
          <h2 className="section-title">Smart Health Tools</h2>
          <p className="section-subtitle">Stay on track with reminders, dosage checks, and expert tips</p>
          <div className="grid-3">
            <Link href="/reminders" className="card card-hover" style={{ textDecoration: 'none' }}>
              <div className="icon-circle" style={{ marginBottom: '16px' }}>
                <CalendarClock size={22} color="var(--primary)" />
              </div>
              <h3 style={{ margin: '0 0 10px' }}>Medicine Reminders</h3>
              <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.6 }}>Set daily reminders and refill alerts for your prescriptions.</p>
            </Link>
            <Link href="/calculator" className="card card-hover" style={{ textDecoration: 'none' }}>
              <div className="icon-circle" style={{ marginBottom: '16px' }}>
                <ClipboardCheck size={22} color="var(--accent)" />
              </div>
              <h3 style={{ margin: '0 0 10px' }}>Dosage Calculator</h3>
              <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.6 }}>Estimate dosage schedules with verified guidance.</p>
            </Link>
            <Link href="/health-tips" className="card card-hover" style={{ textDecoration: 'none' }}>
              <div className="icon-circle" style={{ marginBottom: '16px' }}>
                <HeartPulse size={22} color="var(--highlight)" />
              </div>
              <h3 style={{ margin: '0 0 10px' }}>Daily Health Tips</h3>
              <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.6 }}>Read expert-backed wellness tips and safety advice.</p>
            </Link>
          </div>
        </div>
      </section>

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
          <div className="grid-3">
            <Link href="/medicines" className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '16px', textDecoration: 'none' }}>
              <div className="icon-circle">
                <Pill size={22} color="var(--primary)" />
              </div>
              <h4 style={{ margin: 0, color: 'var(--text-main)' }}>Browse Medicines</h4>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>Explore verified products and categories.</p>
              <span style={{ marginTop: 'auto', color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                View Catalog <ArrowRight size={16} />
              </span>
            </Link>
            <Link href="/consultation" className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '16px', textDecoration: 'none' }}>
              <div className="icon-circle" style={{ background: 'rgba(22, 163, 74, 0.12)' }}>
                <Stethoscope size={22} color="var(--accent)" />
              </div>
              <h4 style={{ margin: 0, color: 'var(--text-main)' }}>Book Consultation</h4>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>Get prescriptions reviewed by doctors.</p>
              <span style={{ marginTop: 'auto', color: 'var(--accent)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Book Slot <ArrowRight size={16} />
              </span>
            </Link>
            <Link href="/upload" className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '16px', textDecoration: 'none' }}>
              <div className="icon-circle">
                <Upload size={22} color="var(--primary)" />
              </div>
              <h4 style={{ margin: 0, color: 'var(--text-main)' }}>Upload Prescription</h4>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>Share a photo to start your order.</p>
              <span style={{ marginTop: 'auto', color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Start Now <ArrowRight size={16} />
              </span>
            </Link>
            <Link href="/track" className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '16px', textDecoration: 'none' }}>
              <div className="icon-circle" style={{ background: 'rgba(22, 163, 74, 0.12)' }}>
                <Truck size={22} color="var(--accent)" />
              </div>
              <h4 style={{ margin: 0, color: 'var(--text-main)' }}>Track My Order</h4>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>Live updates from pickup to doorstep.</p>
              <span style={{ marginTop: 'auto', color: 'var(--accent)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Track Now <ArrowRight size={16} />
              </span>
            </Link>
            <Link href="/contact" className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '16px', textDecoration: 'none' }}>
              <div className="icon-circle" style={{ background: 'rgba(20, 184, 166, 0.12)' }}>
                <MessageCircle size={22} color="var(--highlight)" />
              </div>
              <h4 style={{ margin: 0, color: 'var(--text-main)' }}>Pharmacist Support</h4>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>Chat with a licensed pharmacist.</p>
              <span style={{ marginTop: 'auto', color: 'var(--highlight)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Contact Us <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 100px' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '12px' }}>Trusted & Verified</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '40px' }}>Compliance-backed pharmacy care you can trust</p>
          <div className="card card-hover" style={{ padding: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '28px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }} className="promise-item">
              <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: 'rgba(59, 130, 246, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={22} color="var(--primary)" />
              </div>
              <div>
                <h4 style={{ margin: 0 }}>Verified Pharmacy Badge</h4>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Licensed partners with audited billing.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }} className="promise-item">
              <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield size={22} color="var(--accent)" />
              </div>
              <div>
                <h4 style={{ margin: 0 }}>100% Genuine Medicines</h4>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Sourced from authorized distributors only.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }} className="promise-item">
              <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: 'rgba(245, 158, 11, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CalendarClock size={22} color="var(--highlight)" />
              </div>
              <div>
                <h4 style={{ margin: 0 }}>Secure Checkout</h4>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>PCI-compliant payments and encrypted data.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }} className="promise-item">
              <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: 'rgba(99, 102, 241, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Stethoscope size={22} color="#6366f1" />
              </div>
              <div>
                <h4 style={{ margin: 0 }}>Licensed Pharmacists</h4>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Prescription verification and dosage review.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }} className="promise-item">
              <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: 'rgba(20, 184, 166, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Truck size={22} color="var(--highlight)" />
              </div>
              <div>
                <h4 style={{ margin: 0 }}>Cold-Chain Handling</h4>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Temperature-safe packaging for sensitive meds.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }} className="promise-item">
              <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: 'rgba(59, 130, 246, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageCircle size={22} color="var(--primary)" />
              </div>
              <div>
                <h4 style={{ margin: 0 }}>Care Team Support</h4>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>WhatsApp and phone help from experts.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 120px' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '12px' }}>Customer Testimonials</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '50px' }}>Trusted by families for safe, verified medicine delivery</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {[
              {
                name: 'Rakesh Verma',
                role: 'Domariyaganj',
                quote: 'Clear updates and verified medicines. Their pharmacist called to confirm my prescription.'
              },
              {
                name: 'Shalini Sharma',
                role: 'Basti',
                quote: 'Quick delivery and professional service. The consultation booking was smooth and helpful.'
              },
              {
                name: 'Imran Ali',
                role: 'Nearby Towns',
                quote: 'Reliable service with safe packaging. I trust them for my family’s monthly medicines.'
              }
            ].map((testimonial) => (
              <div key={testimonial.name} className="card card-hover" style={{ padding: '28px' }}>
                <Quote size={28} color="var(--primary)" style={{ marginBottom: '16px' }} />
                <p style={{ margin: '0 0 20px', color: 'var(--text-muted)', lineHeight: 1.7 }}>{testimonial.quote}</p>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--primary)' }}>
                    {testimonial.name.slice(0, 1)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{testimonial.name}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
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
                q: "Do you deliver without prescription?", 
                a: "No. We deliver medicines only against valid prescriptions verified by a licensed pharmacist." 
              },
              { 
                q: "How long does delivery take?", 
                a: "Orders are typically delivered next day from Lucknow to Domariyaganj and nearby towns." 
              },
              { 
                q: "Can I book a doctor consultation?", 
                a: "Yes. Book verified doctors and get prescriptions reviewed before delivery." 
              },
              { 
                q: "Do you provide medicine reminders?", 
                a: "Yes. Set reminders and refill alerts from your dashboard." 
              },
              { 
                q: "Are medicines genuine?", 
                a: "Yes. All medicines are sourced from licensed partner pharmacies with verified billing." 
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

      <section style={{ padding: '60px 0', position: 'relative' }}>
        <div className="container">
          <TiltCard style={{
            padding: '40px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.9) 0%, rgba(30, 58, 138, 0.7) 100%)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h2 style={{ fontSize: '3rem', marginBottom: '24px', color: 'white' }}>Upload Your Prescription Today</h2>
              <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
                Get genuine medicines delivered from Lucknow to Domariyaganj with next-day delivery.
              </p>
              <Link href="/upload" className="btn btn-highlight" style={{ padding: '18px 40px', fontSize: '1.2rem' }}>
                Upload Prescription <ArrowRight size={20} />
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
          .bento-grid > .glass-panel {
            grid-column: 1 / -1 !important;
            grid-row: auto !important;
          }
        }
      `}</style>
    </div>
  );
}
