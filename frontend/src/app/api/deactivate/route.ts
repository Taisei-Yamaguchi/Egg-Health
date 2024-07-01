import { NextRequest, NextResponse } from 'next/server';
import { deactivateAccount } from '@/backend_api/accounts/deactivateAccount';

export async function POST(req: NextRequest) {
    const cookies = req.cookies;
    const token = cookies.get('token')?.value;

    const res = NextResponse.json({ message: 'Deactivate successfully' });

    // クッキーを削除する関数
    const deleteCookies = () => {
        res.cookies.set('token', '', { httpOnly: true, secure: process.env.SECURE_COOKIE === 'true', maxAge: -1 });
        res.cookies.set('id', '', { maxAge: -1 });
        res.cookies.set('nickname', '', { maxAge: -1 });
        res.cookies.set('username', '', { maxAge: -1 });
    };

    if (!token) {
        deleteCookies();
        return NextResponse.json({ error: 'Token not found. Please try signing in again.' }, { status: 400 });
    }

    const data = await deactivateAccount();

    if ('error' in data) {
        deleteCookies();
        return NextResponse.json({ error: "Some error happedn. Please try signing in again" }, { status: 401 });
    }

    if ('detail' in data) {
        deleteCookies();
        return NextResponse.json({ detail: "Some error happedn. Please try signing in again" }, { status: 400 });
    }

    deleteCookies();
    return res;
}
