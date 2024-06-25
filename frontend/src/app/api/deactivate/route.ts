import { NextRequest, NextResponse } from 'next/server';
import { deactivateAccount } from '@/backend_api/accounts/deactivateAccount';

export async function POST(req: NextRequest) {
    const cookies = req.cookies;
    const token = cookies.get('token')?.value;

    // クッキーを削除する関数
    const deleteCookies = (res: NextResponse) => {
        res.cookies.set('token', '', { httpOnly: true, secure: process.env.SECURE_COOKIE === 'true', maxAge: -1 });
        res.cookies.set('id', '', { maxAge: -1 });
        res.cookies.set('nickname', '', { maxAge: -1 });
        res.cookies.set('username', '', { maxAge: -1 });
    };

    let res;

    if (!token) {
        res = NextResponse.json({ error: 'Token not found' }, { status: 400 });
        deleteCookies(res);
        return res;
    }

    const data = await deactivateAccount();

    if ('error' in data ) {
        res = NextResponse.json({ error: data.error}, { status: 401 });
        deleteCookies(res);
        return res;
    }
    if ('detail' in data){
        res = NextResponse.json({ detail: data.detail}, { status: 401 });
        deleteCookies(res);
        return res;
    }

    res = NextResponse.json({ message: 'Account deactivated successfully' });
    deleteCookies(res);
    return res;
}
