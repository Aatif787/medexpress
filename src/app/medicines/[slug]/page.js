'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useMemo } from 'react';
import { ShieldCheck, Truck, ClipboardCheck, ArrowRight } from 'lucide-react';

const medicines = [
    { name: 'Paracetamol 500mg', category: 'Cold & Fever', price: '₹28', rx: false, desc: 'Pain relief and fever reduction.', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80', pack: '10 tablets', usage: '1 tablet every 6-8 hours', storage: 'Store below 25°C' },
    { name: 'Dolo 650', category: 'Cold & Fever', price: '₹34', rx: true, desc: 'Trusted fever and body pain relief.', image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=800&q=80', pack: '15 tablets', usage: 'As prescribed by doctor', storage: 'Store in a cool, dry place' },
    { name: 'Crocin Advance', category: 'Cold & Fever', price: '₹36', rx: false, desc: 'Fast relief from fever and headache.', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80', pack: '15 tablets', usage: '1 tablet every 6-8 hours', storage: 'Store below 25°C' },
    { name: 'Telma 40', category: 'Heart Care', price: '₹138', rx: true, desc: 'Blood pressure management.', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80', pack: '30 tablets', usage: 'Once daily', storage: 'Store below 25°C' },
    { name: 'Amlodipine 5mg', category: 'Heart Care', price: '₹72', rx: true, desc: 'Supports healthy blood pressure levels.', image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&w=800&q=80', pack: '15 tablets', usage: 'Once daily', storage: 'Store below 30°C' },
    { name: 'Atorvastatin 10mg', category: 'Heart Care', price: '₹120', rx: true, desc: 'Cholesterol control and heart protection.', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80', pack: '30 tablets', usage: 'Once daily at night', storage: 'Store below 30°C' },
    { name: 'Zincovit', category: 'Vitamins', price: '₹105', rx: false, desc: 'Daily multivitamin support.', image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=800&q=80', pack: '15 tablets', usage: 'Once daily after meals', storage: 'Store in a dry place' },
    { name: 'Limcee 500', category: 'Vitamins', price: '₹28', rx: false, desc: 'Vitamin C supplement for immunity.', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80', pack: '15 tablets', usage: 'Once daily', storage: 'Store below 30°C' },
    { name: 'Becosules', category: 'Vitamins', price: '₹45', rx: false, desc: 'B-complex vitamins for daily wellness.', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80', pack: '20 capsules', usage: 'Once daily after meals', storage: 'Store in a cool, dry place' },
    { name: 'Pan 40', category: 'Gastro Care', price: '₹112', rx: true, desc: 'Acid reflux and stomach protection.', image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&w=800&q=80', pack: '15 tablets', usage: 'Once daily before meals', storage: 'Store below 30°C' },
    { name: 'Omez 20', category: 'Gastro Care', price: '₹68', rx: true, desc: 'Reduces acidity and heartburn.', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80', pack: '10 capsules', usage: 'Once daily before meals', storage: 'Store below 30°C' },
    { name: 'Digene Gel', category: 'Gastro Care', price: '₹95', rx: false, desc: 'Quick relief from gas and indigestion.', image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=800&q=80', pack: '200 ml', usage: '2 tsp after meals as needed', storage: 'Store below 30°C' },
    { name: 'Cetirizine 10mg', category: 'Allergy', price: '₹24', rx: false, desc: 'Allergy relief and anti-histamine.', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80', pack: '10 tablets', usage: 'Once daily at night', storage: 'Store below 30°C' },
    { name: 'Montair LC', category: 'Allergy', price: '₹165', rx: true, desc: 'Allergy control and breathing support.', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80', pack: '10 tablets', usage: 'Once daily at night', storage: 'Store below 30°C' },
    { name: 'Allegra 120', category: 'Allergy', price: '₹150', rx: true, desc: 'Non-drowsy allergy relief.', image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&w=800&q=80', pack: '10 tablets', usage: 'Once daily', storage: 'Store below 30°C' },
    { name: 'Azithromycin 500mg', category: 'Antibiotic', price: '₹192', rx: true, desc: 'Doctor-prescribed antibiotic.', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80', pack: '3 tablets', usage: 'As prescribed by doctor', storage: 'Store below 25°C' },
    { name: 'Amoxicillin 500mg', category: 'Antibiotic', price: '₹210', rx: true, desc: 'Broad-spectrum antibiotic capsule.', image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=800&q=80', pack: '10 capsules', usage: 'As prescribed by doctor', storage: 'Store below 25°C' },
    { name: 'Cefixime 200mg', category: 'Antibiotic', price: '₹245', rx: true, desc: 'Antibiotic for bacterial infections.', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80', pack: '10 tablets', usage: 'As prescribed by doctor', storage: 'Store below 25°C' },
    { name: 'Shelcal 500', category: 'Bone Health', price: '₹125', rx: false, desc: 'Calcium and vitamin D support.', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80', pack: '15 tablets', usage: 'Once daily after meals', storage: 'Store below 30°C' },
    { name: 'Uprise-D3 60K', category: 'Bone Health', price: '₹95', rx: true, desc: 'Vitamin D3 support for bones.', image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&w=800&q=80', pack: '4 capsules', usage: 'One capsule weekly', storage: 'Store below 25°C' },
    { name: 'Calcirol D3', category: 'Bone Health', price: '₹110', rx: true, desc: 'Vitamin D3 supplement drops.', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80', pack: '15 ml drops', usage: 'As prescribed by doctor', storage: 'Store below 25°C' },
    { name: 'Orofer XT', category: 'Women Health', price: '₹165', rx: true, desc: 'Iron and folic acid support.', image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=800&q=80', pack: '10 tablets', usage: 'Once daily after meals', storage: 'Store below 25°C' },
    { name: 'Meftal-Spas', category: 'Women Health', price: '₹72', rx: true, desc: 'Relief from menstrual cramps.', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80', pack: '10 tablets', usage: 'As prescribed for cramps', storage: 'Store below 30°C' },
    { name: 'Fol-9', category: 'Women Health', price: '₹58', rx: false, desc: 'Folic acid supplement for wellness.', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80', pack: '30 tablets', usage: 'Once daily', storage: 'Store below 30°C' }
];

const toSlug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

export default function MedicineDetailPage({ params }) {
    const medicine = useMemo(
        () => medicines.find(item => toSlug(item.name) === params.slug),
        [params.slug]
    );

    if (!medicine) {
        return (
            <div className="section" style={{ paddingTop: '110px' }}>
                <div className="container" style={{ maxWidth: '700px', textAlign: 'center' }}>
                    <h1 style={{ marginBottom: '12px' }}>Medicine Not Found</h1>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Browse the catalog to find verified medicines.</p>
                    <Link href="/medicines" className="btn btn-primary">Back to Catalog</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="section" style={{ paddingTop: '110px' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <div className="card" style={{ marginBottom: '30px' }}>
                    <div style={{ width: '100%', height: '260px', borderRadius: '18px', overflow: 'hidden', marginBottom: '18px', background: 'rgba(15, 23, 42, 0.04)' }}>
                        <Image src={medicine.image} alt={medicine.name} width={900} height={600} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} sizes="(max-width: 768px) 100vw, 900px" unoptimized />
                    </div>
                    <div className="badge badge-success" style={{ alignSelf: 'flex-start' }}>
                        {medicine.rx ? 'Prescription Required' : 'OTC Available'}
                    </div>
                    <h1 style={{ margin: '16px 0 12px' }}>{medicine.name}</h1>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>{medicine.desc}</p>
                    <div className="trust-strip" style={{ justifyContent: 'flex-start' }}>
                        <span className="badge badge-success"><ShieldCheck size={14} /> Verified Pharmacy</span>
                        <span className="badge"><ClipboardCheck size={14} /> Pharmacist Review</span>
                        <span className="badge badge-dark"><Truck size={14} /> Next-Day Delivery</span>
                    </div>
                </div>

                <div className="grid-3" style={{ marginBottom: '30px' }}>
                    <div className="card">
                        <h4 style={{ marginBottom: '8px' }}>Category</h4>
                        <p style={{ margin: 0, color: 'var(--text-muted)' }}>{medicine.category}</p>
                    </div>
                    <div className="card">
                        <h4 style={{ marginBottom: '8px' }}>Pack Size</h4>
                        <p style={{ margin: 0, color: 'var(--text-muted)' }}>{medicine.pack}</p>
                    </div>
                    <div className="card">
                        <h4 style={{ marginBottom: '8px' }}>Price</h4>
                        <p style={{ margin: 0, color: 'var(--text-muted)' }}>{medicine.price}</p>
                    </div>
                </div>

                <div className="grid-2" style={{ marginBottom: '30px' }}>
                    <div className="card">
                        <h4 style={{ marginBottom: '8px' }}>Usage Guidance</h4>
                        <p style={{ margin: 0, color: 'var(--text-muted)' }}>{medicine.usage}</p>
                    </div>
                    <div className="card">
                        <h4 style={{ marginBottom: '8px' }}>Storage</h4>
                        <p style={{ margin: 0, color: 'var(--text-muted)' }}>{medicine.storage}</p>
                    </div>
                </div>

                <div className="card" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <h3 style={{ margin: 0 }}>Ready to order?</h3>
                        <p style={{ margin: 0, color: 'var(--text-muted)' }}>Upload prescription and our team will confirm availability.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <Link href="/upload" className="btn btn-primary">Upload Prescription</Link>
                        <Link href="/consultation" className="btn btn-glass">Book Consultation</Link>
                        <Link href="/medicines" className="btn btn-glass">Browse More <ArrowRight size={16} /></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
