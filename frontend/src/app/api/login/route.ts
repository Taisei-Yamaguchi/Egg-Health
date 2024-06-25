import { NextRequest, NextResponse } from 'next/server';
import { setCookie } from 'cookies-next';
import { fetchLogin } from '@/backend_api/auth/fetchLogin';
import { SECURE_COOKIE } from '@/config/envs';

export async function POST(req: NextRequest) {
    const formData = await req.json();
    const data = await fetchLogin(formData);

    if ('error' in data) {
        return NextResponse.json({ error: data.error }, { status: 401 });
    }

    if ('message' in data) {
        const res = NextResponse.json({ message: data.message, account: data.account });

        const secureCookie = SECURE_COOKIE === 'true';

        setCookie('token', data.token, { 
            req, 
            res, 
            httpOnly: true, 
            secure: secureCookie, 
            maxAge: 30 * 24 * 60 * 60, path: '/' 
        });
        setCookie('nickname', data.account.nickname, { req, res, path: '/' });
        setCookie('username', data.account.username, { req, res, path: '/' });
        setCookie('id', data.account.id, { req, res, path: '/' });
        setCookie('license', data.license, { req, res, path: '/' });


        return res;
    }

    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
}
