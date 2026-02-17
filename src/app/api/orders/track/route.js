import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

export async function POST(request) {
    try {
        await connectDB();
        const { query } = await request.json();

        if (!query) {
            return NextResponse.json({ error: 'Please provide a mobile number or Order ID' }, { status: 400 });
        }

        // Search by orderId or mobile number
        const order = await Order.findOne({
            $or: [
                { orderId: { $regex: query, $options: 'i' } },
                { mobile: query },
            ],
        }).sort({ createdAt: -1 });

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({
            order: {
                orderId: order.orderId,
                name: order.name,
                status: order.status,
                createdAt: order.createdAt,
                deliveryTime: order.deliveryTime,
            },
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to track order' }, { status: 500 });
    }
}
