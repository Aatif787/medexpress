import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

export async function GET(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const order = await Order.findById(id) || await Order.findOne({ orderId: id });

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({ order });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
    }
}

export async function PATCH(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await request.json();

        const order = await Order.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true }
        );

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({ order });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}
