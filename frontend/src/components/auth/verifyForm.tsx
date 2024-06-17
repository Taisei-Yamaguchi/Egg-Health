'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import Link from 'next/link';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { fetchVerify } from '@/backend_api/auth/fetchVerify';
import { setAuth } from '@/store/slices/auth.slice';

interface VerifyFormProps {
    uid: string;
}

const VerifyForm: React.FC<VerifyFormProps> = ({uid})=>{
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));

    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return;

        const value = element.value;
        setOtp(prev => {
            const newOtp = [...prev];
            newOtp[index] = value;
            return newOtp;
        });

        // Focus next input field
        if (element.nextElementSibling) {
            (element.nextElementSibling as HTMLInputElement).focus();
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const element = event.currentTarget;
        if (event.key === "Backspace") {
            setOtp(prev => {
                const newOtp = [...prev];
                newOtp[index] = "";
                return newOtp;
            });

            // Focus previous input field
            if (element.previousElementSibling) {
                (element.previousElementSibling as HTMLInputElement).focus();
            }
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const otpString = otp.join("");

        const data = await fetchVerify({ otp: otpString, uid });
        if ('error' in data) {
            dispatch(setToast({ message: data.error, type: "error" }));
            setTimeout(() => dispatch(resetToast()), 3000);
            return;
        }

        if ('message' in data) {
            // HttpOnly later
            setCookie('token', data.token);
            setCookie('nickname', data.account.nickname);
            setCookie('username', data.account.username);
            setCookie('id', data.account.id);

            dispatch(setToast({ message: data.message, type: "success" }));
            dispatch(setAuth(data.account));
            router.push('/dashboard');
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-4 lg:px-8 h-screen">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Verify Account
                </h1>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                    <label
                        htmlFor="otp"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Please enter the 6-digit code sent to your registered email to activate your account.
                    </label>

                        <div className="mt-2 flex justify-between">
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    name="otp"
                                    maxLength={1}
                                    value={data}
                                    onChange={e => handleChange(e.target as HTMLInputElement, index)}
                                    onKeyDown={e => handleKeyDown(e, index)}
                                    className="text-xl font-bold block w-12 h-12 text-center text-lg rounded-md border-0 py-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            ))}
                        </div>
                    </div>

                    <section className="flex flex-col lg:flex-row gap-y-3 lg:gap-y-0 justify-between items-end lg:items-center lg:justify-between">
                        <span className="text-gray-600 order-2 lg:order-1">
                            <span className="mr-2">Not signed up yet?</span>
                            <Link
                                href={"/signup"}
                                className="text-blue-700 hover:text-blue-500"
                            >
                                Sign Up
                            </Link>
                        </span>
                        <button
                            type="submit"
                            className="flex w-full order-1 lg:order-2 lg:w-fit justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Verify
                        </button>
                    </section>
                </form>
                <p className="text-xs text-gray-500 mt-1">
                    * If account verification fails, please try signing up again.
                </p>
            </div>
        </div>
    );
}

export default VerifyForm;
