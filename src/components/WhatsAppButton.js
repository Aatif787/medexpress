'use client';
import { useLanguage } from '@/context/LanguageContext';
import { MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function WhatsAppButton() {
    const { t } = useLanguage();
    const pathname = usePathname();

    // Don't show on admin dashboard
    if (pathname?.startsWith('/admin')) return null;

    return (
        <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                backgroundColor: '#25D366',
                color: 'white',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
                zIndex: 1000,
                transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                cursor: 'pointer',
                textDecoration: 'none'
            }}
            className="whatsapp-float"
            aria-label="Chat with us on WhatsApp"
        >
            <MessageCircle size={32} />

            {/* Tooltip */}
            <div className="tooltip" style={{
                position: 'absolute',
                right: '70px',
                background: 'rgba(15, 23, 42, 0.9)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                opacity: 0,
                visibility: 'hidden',
                transition: 'all 0.3s',
                pointerEvents: 'none',
                border: '1px solid rgba(255,255,255,0.1)'
            }}>
                Chat with Pharmacist
            </div>

            <style jsx>{`
        .whatsapp-float:hover {
          transform: scale(1.1);
        }
        .whatsapp-float:hover .tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateX(-10px);
        }
      `}</style>
        </a>
    );
}
