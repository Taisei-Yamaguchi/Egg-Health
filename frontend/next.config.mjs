/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.API_URL,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        NODE_ENV: process.env.NODE_ENV,
        SECURE_COOKIE: process.env.SECURE_COOKIE

    },
};

export default nextConfig;
