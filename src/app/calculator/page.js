'use client';
import { useState } from 'react';
import { Calculator, ClipboardCheck } from 'lucide-react';

export default function DosageCalculatorPage() {
    const [weight, setWeight] = useState('');
    const [dose, setDose] = useState('10');
    const [result, setResult] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();
        const weightNumber = parseFloat(weight);
        const doseNumber = parseFloat(dose);
        if (!weightNumber || !doseNumber) return;
        setResult((weightNumber * doseNumber).toFixed(1));
    };

    return (
        <div className="section" style={{ paddingTop: '110px' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 className="text-gradient" style={{ marginBottom: '12px' }}>Dosage Calculator</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Estimate dosage by weight before consulting a doctor</p>
                </div>

                <div className="card" style={{ display: 'grid', gap: '20px' }}>
                    <form onSubmit={handleCalculate} style={{ display: 'grid', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Patient Weight (kg)</label>
                            <input className="input-glass" type="number" min="1" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 65" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Dosage Strength (mg/kg)</label>
                            <input className="input-glass" type="number" min="1" step="0.1" value={dose} onChange={(e) => setDose(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: 'fit-content' }}>
                            <Calculator size={18} /> Calculate Dose
                        </button>
                    </form>

                    {result && (
                        <div className="card-outline" style={{ padding: '18px', borderRadius: '16px' }}>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <div className="icon-circle" style={{ width: '40px', height: '40px' }}>
                                    <ClipboardCheck size={18} color="var(--primary)" />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0 }}>{result} mg</h3>
                                    <p style={{ margin: 0, color: 'var(--text-muted)' }}>Estimated total dose based on weight</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="card" style={{ marginTop: '30px' }}>
                    <h3 style={{ marginBottom: '12px' }}>Important Notes</h3>
                    <ul style={{ color: 'var(--text-muted)', display: 'grid', gap: '8px', paddingLeft: '18px' }}>
                        <li>This calculator offers an estimate only.</li>
                        <li>Always follow your doctor’s prescription.</li>
                        <li>Consult a pharmacist before changing dosage.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
