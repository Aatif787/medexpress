'use client';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Upload as UploadIcon, CheckCircle, Clock, Mic, MicOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function UploadPage() {
    const { t } = useLanguage();
    const { user } = useAuth(); // Could pre-fill form if needed

    const [formData, setFormData] = useState({
        name: user?.name || '',
        mobile: user?.mobile || '',
        address: user?.address || '',
        notes: '',
        deliveryTime: 'anytime',
        subscription: false,
        prescription: null
    });
    const [filePreview, setFilePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [error, setError] = useState('');
    const [isListening, setIsListening] = useState(false);

    const startListening = () => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-IN'; // Default to Indian English, could be Hindi
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onstart = () => setIsListening(true);
            recognition.onend = () => setIsListening(false);
            recognition.onError = (e) => {
                console.error(e);
                setIsListening(false);
            };

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setFormData(prev => ({ ...prev, notes: (prev.notes + ' ' + transcript).trim() }));
            };

            recognition.start();
        } else {
            alert("Voice input is not supported in this browser.");
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("File size should be less than 5MB");
                return;
            }
            setFormData({ ...formData, prescription: file });
            setFilePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                data.append(key, formData[key]);
            });

            const res = await fetch('/api/orders', {
                method: 'POST',
                body: data,
            });

            const result = await res.json();

            if (res.ok) {
                setSuccess(true);
                setOrderId(result.orderId);
            } else {
                setError(result.error || 'Something went wrong');
            }
        } catch (err) {
            console.error('Upload error:', err);
            setError(err.message || 'Failed to upload. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="section" style={{ minHeight: '90vh', paddingTop: '100px' }}>
            <div className="container" style={{ maxWidth: '800px' }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Upload Prescription</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        We&apos;ll review your prescription and deliver medicines within 4 hours.
                    </p>
                </div>

                {success ? (
                    <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', animation: 'float 1s ease-out' }}>
                        <div style={{
                            width: '80px', height: '80px', background: 'var(--primary)', borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
                            boxShadow: '0 0 30px rgba(20, 184, 166, 0.4)'
                        }}>
                            <CheckCircle size={40} color="white" />
                        </div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Order Placed!</h2>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '32px' }}>
                            Your Order ID: <strong style={{ color: 'white' }}>{orderId}</strong>
                        </p>
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                            <button
                                onClick={() => window.location.href = `/track?q=${orderId}`}
                                className="btn btn-primary"
                            >
                                Track Order
                            </button>
                            <button
                                onClick={() => window.location.reload()}
                                className="btn btn-glass"
                            >
                                Upload Another
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="glass-panel" style={{ padding: '40px' }}>
                        {error && (
                            <div style={{
                                background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)',
                                color: '#fca5a5', padding: '16px', borderRadius: '12px', marginBottom: '24px', textAlign: 'center'
                            }}>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '24px' }}>

                            {/* File Upload Area */}
                            <div style={{
                                border: '2px dashed rgba(255,255,255,0.2)', borderRadius: '16px', padding: '40px',
                                textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s',
                                background: filePreview ? `url(${filePreview}) center/cover` : 'rgba(255,255,255,0.02)',
                                position: 'relative', minHeight: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                            }}
                                onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--accent)'; }}
                                onDragLeave={e => { e.preventDefault(); e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                                onDrop={e => {
                                    e.preventDefault();
                                    const file = e.dataTransfer.files[0];
                                    if (file) {
                                        setFormData({ ...formData, prescription: file });
                                        setFilePreview(URL.createObjectURL(file));
                                    }
                                }}
                                onClick={() => document.getElementById('fileInput').click()}
                            >
                                {!filePreview && (
                                    <>
                                        <UploadIcon size={48} style={{ color: 'var(--accent)', marginBottom: '16px' }} />
                                        <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Tap or Drag to Upload</h3>
                                        <p style={{ color: 'var(--text-muted)' }}>Supported: JPG, PNG, PDF (Max 5MB)</p>
                                    </>
                                )}
                                <input
                                    type="file"
                                    id="fileInput"
                                    accept="image/*,.pdf"
                                    onChange={handleFileChange}
                                    required
                                    style={{ display: 'none' }}
                                />

                                {filePreview && (
                                    <div style={{
                                        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s'
                                    }} className="preview-overlay">
                                        <span style={{ color: 'white', fontWeight: 600 }}>Click to Change</span>
                                    </div>
                                )}
                                <style jsx>{`
                  .preview-overlay:hover { opacity: 1 !important; }
                `}</style>
                            </div>

                            {/* Form Fields */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-grid">
                                <input
                                    type="text"
                                    placeholder={t('fullName')}
                                    className="input-glass"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                                <input
                                    type="tel"
                                    placeholder={t('mobile')}
                                    className="input-glass"
                                    value={formData.mobile}
                                    onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                    pattern="[0-9]{10}"
                                    required
                                />
                            </div>

                            <textarea
                                placeholder={t('address')}
                                className="input-glass"
                                rows="3"
                                value={formData.address}
                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                                required
                            ></textarea>

                            <div style={{ position: 'relative' }}>
                                <textarea
                                    placeholder="Medicine names or notes (optional)..."
                                    className="input-glass"
                                    rows="2"
                                    value={formData.notes}
                                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                    style={{ paddingRight: '50px' }}
                                ></textarea>
                                <button
                                    type="button"
                                    onClick={startListening}
                                    style={{
                                        position: 'absolute', right: '12px', top: '12px',
                                        background: isListening ? '#ef4444' : 'rgba(255,255,255,0.1)',
                                        border: 'none', borderRadius: '50%', width: '36px', height: '36px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        cursor: 'pointer', color: 'white', transition: 'all 0.2s',
                                        animation: isListening ? 'pulse 1s infinite' : 'none'
                                    }}
                                    title="Speak to type"
                                >
                                    {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                                </button>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px' }}>
                                <input
                                    type="checkbox"
                                    id="sub"
                                    checked={formData.subscription}
                                    onChange={e => setFormData({ ...formData, subscription: e.target.checked })}
                                    style={{ width: '20px', height: '20px', accentColor: 'var(--accent)' }}
                                />
                                <label htmlFor="sub" style={{ fontSize: '0.95rem', cursor: 'pointer', color: 'var(--text-main)' }}>
                                    <strong>Monthly Subscription</strong> (Repeat this order every 30 days)
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-lg"
                                style={{ width: '100%', marginTop: '16px' }}
                                disabled={loading}
                            >
                                {loading ? 'Uploading...' : 'Place Order'}
                            </button>

                        </form>
                    </div>
                )}
            </div>


        </div>
    );
}
