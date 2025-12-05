// app/api/login/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        console.log(res);
        
        if (!res.ok) {
            const error = await res.json();
            return NextResponse.json({ message: error.message || 'Invalid credentials' }, { status: 401 });
        }
        else {
            const data = await res.json();
            const token = data.token;
            if (!token) {
                return NextResponse.json({ message: 'No token returned' }, { status: 500 });
            }
            cookies().set({
                name: 'auth_token',
                value: token,
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            });
            return NextResponse.json(data);
        }

    } catch (error) {
        console.error('API login error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
