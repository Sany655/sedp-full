import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const token = cookies().get('auth_token')?.value;

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/campaign-types`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json({ msg: data.msg || 'Failed to fetch campaign types' }, { status: res.status });
        }

        return NextResponse.json({ success: true, data: data.data });
    } catch (err) {
        console.error("Server Error:", err);
        return NextResponse.json({ msg: 'Internal server error' }, { status: 500 });
    }
}
