// components/GoogleLoginButton.tsx

'use client';

import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from '@/config/envs';
import { googleLogin } from '@/backend_api/auth/googleLogin';
import { useAppDispatch } from '@/store';
import { setToast } from '@/store/slices/toast.slice';
import { resetToast } from '@/store/slices/toast.slice';
import { setCookie } from 'cookies-next';
import { setAuth } from '@/store/slices/auth.slice';
import { useRouter } from 'next/navigation';

const CLIENT_ID = GOOGLE_CLIENT_ID ?? '';

const GoogleLoginButton = () => {
    const router = useRouter();
    const dispatch = useAppDispatch()

    const handleLoginSuccess = async (response: any) => {
        const id_token = response.credential;
        
        try {
            const response = await googleLogin(id_token)
            if ('error' in response) {
                dispatch(setToast({ message: response.error, type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
                return;
            }
            if ('message' in response) {
                // HttpOnly later
                setCookie('token', response.token);
                setCookie('nickname', response.account.nickname);
                setCookie('username', response.account.username);
                setCookie('id', response.account.id);
                
                dispatch(setToast({ message: response.message, type: "success" }));
                dispatch(setAuth(response.account))
                router.push('/dashboard');
            } 
        } catch (error) {
            console.error('Error sending token to backend:', error);
        }
    };

    const handleLoginFailure = () => {
        console.error('Google login failed:');
    };

    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <div className="flex justify-center items-center w-full">
                <div className="p-4 border border-gray-300 rounded-lg shadow-lg w-full">
                    <h2 className="text-center mb-4 text-lg font-semibold">
                        Sign in with Google
                    </h2>
                    <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onError={handleLoginFailure}
                        theme="outline"
                        size="large"
                        shape="rectangular"
                        text="signin_with"
                    />
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginButton;
