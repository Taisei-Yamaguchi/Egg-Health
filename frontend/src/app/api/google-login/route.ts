import { NextRequest, NextResponse } from 'next/server';
import { setCookie } from 'cookies-next';
import { googleLogin } from '@/backend_api/auth/googleLogin';
import { SECURE_COOKIE } from '@/config/envs';

export async function POST(req: NextRequest) {
    const { id_token } = await req.json();
    const data = await googleLogin(id_token);

    if ('error' in data) {
        return NextResponse.json({ error: data.error }, { status: 401 });
    }

    if ('message' in data) {
        const secureCookie = SECURE_COOKIE === 'true';

        const res = NextResponse.json({ message: data.message, account: data.account });

        setCookie('token', data.token, {
            req, 
            res, 
            httpOnly: true, 
            secure: secureCookie, 
            maxAge: 30 * 24 * 60 * 60, 
            path: '/'
        });
        setCookie('nickname', data.account.nickname, { req, res, path: '/' });
        setCookie('username', data.account.username, { req, res, path: '/' });
        setCookie('id', data.account.id, { req, res, path: '/' });

        return res;
    }

    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
}
