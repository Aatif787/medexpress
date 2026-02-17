'use client';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function ClientLayout({ children }) {
    return (
        <AuthProvider>
            <ThemeProvider>
                <LanguageProvider>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                    <WhatsAppButton />
                </LanguageProvider>
            </ThemeProvider>
        </AuthProvider>
    );
}
