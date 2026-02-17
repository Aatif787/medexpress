import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

export async function GET() {
    try {
        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        await connectDB();
        
        // Find orders by userId
        // Newly created orders will have userId associated with the Clerk user
        const orders = await Order.find({ userId: user.id }).sort({ createdAt: -1 });

        return NextResponse.json({ orders });

    } catch (error) {
        console.error('Fetch my orders error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
