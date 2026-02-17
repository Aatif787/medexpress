'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useClerk } from '@clerk/nextjs';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const { isLoaded, isSignedIn, user: clerkUser } = useUser();
    const { signOut } = useClerk();
    const router = useRouter();
    
    // Map Clerk user to application user structure
    const user = isSignedIn && clerkUser ? {
        id: clerkUser.id,
        name: clerkUser.fullName || clerkUser.firstName,
        email: clerkUser.primaryEmailAddress?.emailAddress,
        mobile: clerkUser.primaryPhoneNumber?.phoneNumber,
        imageUrl: clerkUser.imageUrl,
        // Add other fields if needed, e.g. metadata
        ...clerkUser.publicMetadata
    } : null;

    const loading = !isLoaded;

    const login = () => {
        router.push('/login');
    };

    const signup = () => {
        router.push('/signup');
    };

    const logout = async () => {
        await signOut();
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
