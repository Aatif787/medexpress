import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isBuildTime = !supabaseUrl || !supabaseAnonKey;

if (isBuildTime) {
  console.warn('Supabase URL or Key is missing. Using a mock client for build.');
}

// Create a real client if env vars exist, otherwise create a mock client that won't crash the build
export const supabase = isBuildTime 
  ? {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: async () => ({ error: { message: 'Supabase not configured' } }),
        signUp: async () => ({ error: { message: 'Supabase not configured' } }),
        signOut: async () => ({ error: null }),
        resetPasswordForEmail: async () => ({ error: { message: 'Supabase not configured' } }),
        updateUser: async () => ({ error: { message: 'Supabase not configured' } }),
      },
      from: () => ({
        select: () => ({ data: [], error: null }),
        insert: () => ({ data: [], error: null }),
        update: () => ({ data: [], error: null }),
        delete: () => ({ data: [], error: null }),
      })
    }
  : createClient(supabaseUrl, supabaseAnonKey);
