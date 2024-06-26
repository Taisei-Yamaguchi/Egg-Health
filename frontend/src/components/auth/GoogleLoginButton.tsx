"use client";

import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from '@/config/envs';
import { useAppDispatch } from '@/store';
import { setToast } from '@/store/slices/toast.slice';
import { resetToast } from '@/store/slices/toast.slice';
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
            const res = await fetch('/api/google-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_token }),
            });

            const data = await res.json();

            if (res.status !== 200) {
                dispatch(setToast({ message: data.error, type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
                return;
            }

            if ('message' in data) {
                dispatch(setToast({ message: data.message, type: "success" }));
                dispatch(setAuth(data.account));
                router.push('/dashboard');
            } 
        } catch (error) {
            dispatch(setToast({ message: "Something went wrong. Please try again.", type: "error" }));
            setTimeout(() => dispatch(resetToast()), 3000);
        }
    };

    const handleLoginFailure = () => {
        dispatch(setToast({ message: "Google Signin Error. Please try again.", type: "error" }));
        setTimeout(() => dispatch(resetToast()), 3000);
    };

    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <div className="flex justify-center items-center w-full my-10">
                <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={handleLoginFailure}
                    theme="outline"
                    size="large"
                    shape="rectangular"
                    text="signin_with"
                />
            </div>
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginButton;
