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
import { FcGoogle } from 'react-icons/fc';

const CLIENT_ID = GOOGLE_CLIENT_ID ?? '';

const GoogleLoginButton = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleLoginSuccess = async (response: any) => {
        const id_token = response.credential;
        
        try {
            const backendResponse = await googleLogin(id_token);
            if ('error' in backendResponse) {
                dispatch(setToast({ message: backendResponse.error, type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
                return;
            }
            if ('message' in backendResponse) {
                // HttpOnly later
                setCookie('token', backendResponse.token);
                setCookie('nickname', backendResponse.account.nickname);
                setCookie('username', backendResponse.account.username);
                setCookie('id', backendResponse.account.id);
                setCookie('license', backendResponse.license);

                dispatch(setToast({ message: backendResponse.message, type: "success" }));
                dispatch(setAuth(backendResponse.account));
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
            <div className="flex justify-center items-center w-full my-10">
                <button
                        className="px-4 flex items-center justify-center w-full py-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
                        onClick={() => {
                            const googleButton = document.querySelector('div[role="button"]') as HTMLDivElement;
                            if (googleButton) googleButton.click();
                        }}
                    >
                        <FcGoogle className="text-2xl mr-3" />
                        <span className="text-lg text-gray-700 font-medium mx-2 px-2">Sign in with Google</span>
                </button>
                    <div style={{ display: 'none' }}>
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
