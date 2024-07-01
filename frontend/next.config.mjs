/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.API_URL,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        SECURE_COOKIE: process.env.SECURE_COOKIE,
        STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: `
                            default-src 'self';
                            script-src 'self' https://apis.google.com https://accounts.google.com https://js.stripe.com 'unsafe-inline' 'unsafe-eval';
                            style-src 'self' 'unsafe-inline' https://accounts.google.com;
                            img-src 'self' data:;
                            connect-src 'self' https://apis.google.com https://accounts.google.com https://api.stripe.com;
                            frame-src https://accounts.google.com https://content.googleapis.com https://js.stripe.com;
                            font-src 'self';
                        `.replace(/\s{2,}/g, ' ').trim(),
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
