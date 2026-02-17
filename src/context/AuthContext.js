'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Check if user is logged in
    useEffect(() => {
        const checkUser = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session?.user) {
                    // Extract name from metadata if available, or use email part
                    const userData = {
                        ...session.user,
                        name: session.user.user_metadata?.name || session.user.email.split('@')[0],
                    };
                    setUser(userData);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Failed to fetch user', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkUser();

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                const userData = {
                    ...session.user,
                    name: session.user.user_metadata?.name || session.user.email.split('@')[0],
                };
                setUser(userData);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const login = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            
            // Explicitly set user state immediately after successful login
            if (data?.user) {
                const userData = {
                    ...data.user,
                    name: data.user.user_metadata?.name || data.user.email.split('@')[0],
                };
                setUser(userData);
            }
            
            return { success: true };
        } catch (error) {
            // Check for rate limit error
            const errorMessage = error.message?.toLowerCase() || '';
            if (error.status === 429 || errorMessage.includes('rate limit') || errorMessage.includes('too many requests')) {
                return { success: false, error: 'Too many requests. Please wait a minute before trying again.' };
            }
            return { success: false, error: error.message };
        }
    };

    const signup = async (email, password, name, mobile) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name,
                        mobile,
                    },
                },
            });

            if (error) throw error;
            
            // Check if email confirmation is required
            if (data?.user && !data.session) {
                return { success: true, message: 'Please check your email to confirm your account.' };
            }

            return { success: true, user: data.user };
        } catch (error) {
            // Check for rate limit error
            const errorMessage = error.message?.toLowerCase() || '';
            if (error.status === 429 || errorMessage.includes('rate limit') || errorMessage.includes('too many requests')) {
                return { success: false, error: 'Too many signups. Please wait a minute before trying again.' };
            }
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            await supabase.auth.signOut();
            setUser(null);
            router.push('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const resetPasswordForEmail = async (email) => {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });
            if (error) throw error;
            return { success: true };
        } catch (error) {
            // Check for rate limit error
            const errorMessage = error.message?.toLowerCase() || '';
            if (error.status === 429 || errorMessage.includes('rate limit') || errorMessage.includes('too many requests')) {
                return { success: false, error: 'Too many password reset requests. Please wait a minute.' };
            }
            return { success: false, error: error.message };
        }
    };

    const updateUser = async (password) => {
        try {
            const { error } = await supabase.auth.updateUser({ password });
            if (error) throw error;
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const resendConfirmation = async (email) => {
        try {
            const { error } = await supabase.auth.resend({
                type: 'signup',
                email,
            });
            if (error) throw error;
            return { success: true, message: 'Confirmation email sent. Please check your inbox.' };
        } catch (error) {
             // Check for rate limit error
             const errorMessage = error.message?.toLowerCase() || '';
             if (error.status === 429 || errorMessage.includes('rate limit') || errorMessage.includes('too many requests')) {
                 return { success: false, error: 'Too many requests. Please wait a minute.' };
             }
            return { success: false, error: error.message };
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout, resetPasswordForEmail, updateUser, resendConfirmation }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
