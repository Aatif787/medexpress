import { NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'medexpress2026';

export async function POST(request) {
    try {
        const { password } = await request.json();

        if (password === ADMIN_PASSWORD) {
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: 'Login failed' }, { status: 500 });
    }
}
