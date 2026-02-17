'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Search, Pill, ShieldCheck, Truck, ClipboardCheck } from 'lucide-react';

const medicines = [
    { name: 'Paracetamol 500mg', category: 'Cold & Fever', price: '₹28', rx: false, desc: 'Pain relief and fever reduction.', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80' },
    { name: 'Dolo 650', category: 'Cold & Fever', price: '₹34', rx: true, desc: 'Trusted fever and body pain relief.', image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=800&q=80' },
    { name: 'Crocin Advance', category: 'Cold & Fever', price: '₹36', rx: false, desc: 'Fast relief from fever and headache.', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80' },
    { name: 'Telma 40', category: 'Heart Care', price: '₹138', rx: true, desc: 'Blood pressure management.', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80' },
    { name: 'Amlodipine 5mg', category: 'Heart Care', price: '₹72', rx: true, desc: 'Supports healthy blood pressure levels.', image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&w=800&q=80' },
    { name: 'Atorvastatin 10mg', category: 'Heart Care', price: '₹120', rx: true, desc: 'Cholesterol control and heart protection.', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80' },
    { name: 'Zincovit', category: 'Vitamins', price: '₹105', rx: false, desc: 'Daily multivitamin support.', image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=800&q=80' },
    { name: 'Limcee 500', category: 'Vitamins', price: '₹28', rx: false, desc: 'Vitamin C supplement for immunity.', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80' },
    { name: 'Becosules', category: 'Vitamins', price: '₹45', rx: false, desc: 'B-complex vitamins for daily wellness.', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80' },
    { name: 'Pan 40', category: 'Gastro Care', price: '₹112', rx: true, desc: 'Acid reflux and stomach protection.', image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&w=800&q=80' },
    { name: 'Omez 20', category: 'Gastro Care', price: '₹68', rx: true, desc: 'Reduces acidity and heartburn.', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80' },
    { name: 'Digene Gel', category: 'Gastro Care', price: '₹95', rx: false, desc: 'Quick relief from gas and indigestion.', image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=800&q=80' },
    { name: 'Cetirizine 10mg', category: 'Allergy', price: '₹24', rx: false, desc: 'Allergy relief and anti-histamine.', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80' },
    { name: 'Montair LC', category: 'Allergy', price: '₹165', rx: true, desc: 'Allergy control and breathing support.', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80' },
    { name: 'Allegra 120', category: 'Allergy', price: '₹150', rx: true, desc: 'Non-drowsy allergy relief.', image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&w=800&q=80' },
    { name: 'Azithromycin 500mg', category: 'Antibiotic', price: '₹192', rx: true, desc: 'Doctor-prescribed antibiotic.', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80' },
    { name: 'Amoxicillin 500mg', category: 'Antibiotic', price: '₹210', rx: true, desc: 'Broad-spectrum antibiotic capsule.', image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=800&q=80' },
    { name: 'Cefixime 200mg', category: 'Antibiotic', price: '₹245', rx: true, desc: 'Antibiotic for bacterial infections.', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80' },
    { name: 'Shelcal 500', category: 'Bone Health', price: '₹125', rx: false, desc: 'Calcium and vitamin D support.', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80' },
    { name: 'Uprise-D3 60K', category: 'Bone Health', price: '₹95', rx: true, desc: 'Vitamin D3 support for bones.', image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&w=800&q=80' },
    { name: 'Calcirol D3', category: 'Bone Health', price: '₹110', rx: true, desc: 'Vitamin D3 supplement drops.', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80' },
    { name: 'Orofer XT', category: 'Women Health', price: '₹165', rx: true, desc: 'Iron and folic acid support.', image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=800&q=80' },
    { name: 'Meftal-Spas', category: 'Women Health', price: '₹72', rx: true, desc: 'Relief from menstrual cramps.', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80' },
    { name: 'Fol-9', category: 'Women Health', price: '₹58', rx: false, desc: 'Folic acid supplement for wellness.', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80' }
];

const toSlug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

export default function MedicinesPage() {
    const [query, setQuery] = useState('');
    const results = medicines.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="section" style={{ paddingTop: '110px' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 className="text-gradient" style={{ marginBottom: '12px' }}>Medicines Catalog</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Verified medicines, clear pricing, and pharmacist-reviewed orders</p>
                </div>

                <div className="card" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', marginBottom: '30px' }}>
                    <div className="icon-circle" style={{ width: '44px', height: '44px' }}>
                        <Search size={18} color="var(--primary)" />
                    </div>
                    <input
                        className="input-glass"
                        style={{ border: 'none', padding: '12px 6px', flex: 1, minWidth: '220px' }}
                        placeholder="Search medicines, brands, categories"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="trust-strip" style={{ justifyContent: 'flex-end', flex: 1 }}>
                        <span className="badge badge-success"><ShieldCheck size={14} /> Verified</span>
                        <span className="badge"><Truck size={14} /> Next-Day Delivery</span>
                        <span className="badge badge-dark"><ClipboardCheck size={14} /> RX Review</span>
                    </div>
                </div>

                <div className="grid-4" style={{ marginBottom: '30px' }}>
                    {['Cold & Fever', 'Heart Care', 'Vitamins', 'Gastro Care', 'Allergy', 'Antibiotic', 'Bone Health', 'Women Health'].map(category => (
                        <div key={category} className="card card-compact">
                            <div className="badge" style={{ marginBottom: '10px' }}>
                                <Pill size={14} /> {category}
                            </div>
                            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Curated medicines for {category.toLowerCase()}.</p>
                        </div>
                    ))}
                </div>

                <div className="grid-3">
                    {results.map((item) => (
                        <Link
                            key={item.name}
                            href={`/medicines/${toSlug(item.name)}`}
                            className="card card-hover"
                            style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}
                        >
                            <div style={{ width: '100%', height: '150px', borderRadius: '14px', overflow: 'hidden', background: 'rgba(15, 23, 42, 0.04)' }}>
                                <Image src={item.image} alt={item.name} width={400} height={300} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} sizes="(max-width: 768px) 100vw, 33vw" unoptimized />
                            </div>
                            <div className="badge badge-success" style={{ alignSelf: 'flex-start' }}>
                                {item.rx ? 'Prescription Required' : 'OTC Available'}
                            </div>
                            <h3 style={{ margin: 0, color: 'var(--text-main)' }}>{item.name}</h3>
                            <p style={{ margin: 0, color: 'var(--text-muted)' }}>{item.desc}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{item.price}</span>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item.category}</span>
                            </div>
                        </Link>
                    ))}
                    {results.length === 0 && (
                        <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                            <h3 style={{ marginBottom: '8px' }}>No medicines found</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Try another keyword or upload your prescription.</p>
                            <Link href="/upload" className="btn btn-primary" style={{ marginTop: '16px' }}>Upload Prescription</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
