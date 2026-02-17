import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { sendWhatsAppMessage } from '@/lib/sendWhatsApp';

export async function GET() {
    try {
        await connectDB();
        const orders = await Order.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ orders });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectDB();

        const formData = await request.formData();
        const name = formData.get('name');
        const mobile = formData.get('mobile');
        const address = formData.get('address');
        const notes = formData.get('notes') || '';
        const deliveryTime = formData.get('deliveryTime') || 'anytime';
        const subscription = formData.get('subscription') === 'true';
        const file = formData.get('prescription');

        if (!name || !mobile || !address) {
            return NextResponse.json({ error: 'Name, mobile, and address are required' }, { status: 400 });
        }

        if (!file) {
            return NextResponse.json({ error: 'Prescription image is required' }, { status: 400 });
        }

        // Save file
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const ext = path.extname(file.name) || '.jpg';
        const filename = `rx_${Date.now()}_${Math.random().toString(36).substring(7)}${ext}`;

        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) {
            // directory already exists
        }

        await writeFile(path.join(uploadDir, filename), buffer);

        const prescriptionUrl = `/uploads/${filename}`;
        const orderId = `MED${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).substring(2, 5).toUpperCase()}`;

        const order = await Order.create({
            orderId,
            name,
            mobile,
            address,
            prescriptionUrl,
            notes,
            deliveryTime,
            subscription,
            status: 'Received',
        });

        // Send WhatsApp notification
        try {
            const adminNumber = process.env.WHATSAPP_NUMBER || '8601439557';
            // Ensure country code
            const formattedAdminNumber = adminNumber.startsWith('+') ? adminNumber : `+91${adminNumber}`;
            
            const message = `New Prescription Uploaded!
            
Order ID: ${orderId}
Name: ${name}
Mobile: ${mobile}
Address: ${address}
Notes: ${notes || 'None'}
Link: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://medexpress.vercel.app'}${prescriptionUrl}`;

            await sendWhatsAppMessage(`whatsapp:${formattedAdminNumber}`, message);
        } catch (whatsappError) {
            console.error('Failed to send WhatsApp notification:', whatsappError);
            // Don't fail the order if notification fails
        }

        return NextResponse.json({
            success: true,
            orderId: order.orderId,
            message: 'Order placed successfully',
        }, { status: 201 });

    } catch (error) {
        console.error('Order creation error:', error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}
