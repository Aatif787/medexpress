import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { verifyToken } from '@/lib/auth';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const payload = await verifyToken(token);
        if (!payload) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        await connectDB();
        // Find orders where the mobile matches the user's mobile (assuming we link by mobile for now)
        // Or we could store userId in the order if we update the order creation logic.
        // For now, let's fetch the user first to get their mobile number.

        // Better: update Order schema to include userId, but for now we can rely on mobile number matching 
        // since we enforce unique mobile numbers for users.

        // Actually, let's get the user details from the token payload (we might need to fetch the user if mobile isn't in payload)
        // payload has userId and role.
        const User = (await import('@/models/User')).default;
        const user = await User.findById(payload.userId);

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const orders = await Order.find({ mobile: user.mobile }).sort({ createdAt: -1 });

        return NextResponse.json({ orders });

    } catch (error) {
        console.error('Fetch my orders error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
