'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('medexpress-theme') || 'light';
        }
        return 'light';
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('medexpress-theme', theme);
        }
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme(prev => {
            const next = prev === 'light' ? 'dark' : 'light';
            return next;
        });
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
