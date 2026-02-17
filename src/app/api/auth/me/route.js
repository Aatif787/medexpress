import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        const payload = await verifyToken(token);
        if (!payload) {
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 401 }
            );
        }

        await connectDB();
        const user = await User.findById(payload.userId).select('-password');

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ user });

    } catch (error) {
        console.error('Auth check error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST() {
    // Logout route
    const response = NextResponse.json({ success: true, message: 'Logged out' });
    response.cookies.set('token', '', {
        httpOnly: true,
        expires: new Date(0),
        path: '/',
    });
    return response;
}
