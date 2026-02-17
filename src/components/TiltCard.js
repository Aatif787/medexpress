'use client';
import { useRef, useState } from 'react';

export default function TiltCard({ children, className = '', style = {} }) {
    const cardRef = useRef(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const [glow, setGlow] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
        const rotateY = ((x - centerX) / centerX) * 10;

        setRotate({ x: rotateX, y: rotateY });
        setGlow({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
    };

    return (
        <div
            ref={cardRef}
            className={`glass-panel ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.02, 1.02, 1.02)`,
                transition: 'transform 0.1s ease-out',
                position: 'relative',
                overflow: 'hidden',
                ...style
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.3), transparent 60%)`,
                    pointerEvents: 'none',
                    zIndex: 1,
                    opacity: 0.5
                }}
            />
            <div style={{ position: 'relative', zIndex: 2 }}>
                {children}
            </div>
        </div>
    );
}
