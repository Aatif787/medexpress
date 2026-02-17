'use client';
import { useState, useEffect } from 'react';

export default function CountUp({ end, duration = 2000, suffix = '' }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime = null;
        const endVal = parseFloat(end);

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            // Easing function for smooth stop
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);

            const currentVal = endVal * easeOutQuart;

            if (Number.isInteger(endVal)) {
                setCount(Math.floor(currentVal));
            } else {
                setCount(currentVal.toFixed(1));
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [end, duration]);

    return <span>{count}{suffix}</span>;
}
