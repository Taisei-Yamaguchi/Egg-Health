'use client';

import React, {FC, useState } from 'react';
import { useRouter } from 'next/navigation';
// import { setCookie } from 'cookies-next';
import { fetchLogin } from '@/backend_api/auth/fetchLogin';
import clsx from 'clsx';
import { useFormik } from 'formik';
import Link from 'next/link';
import * as yup from 'yup';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { fetchVerify } from '@/backend_api/auth/fetchVerify';

const formSchema = yup.object().shape({
    otp: yup
        .string()
        .length(6, "OTP must be exactly 6 characters!")
        .required("OTP is required!"),
});

type FormData = {
    otp: string
};

const FORM_DATA: FormData = {
    otp: ''
};

interface VerifyFormProps {
    uid: string;
}

const VerifyForm: React.FC<VerifyFormProps> = ({uid})=>{
    const router = useRouter();
    const dispatch = useAppDispatch();

    const formik = useFormik<FormData>({
        initialValues: FORM_DATA,
        validationSchema: formSchema,
        onSubmit: async (formData) => {
            const data = await fetchVerify({...formData, uid});
            if ('error' in data) {
                dispatch(setToast({ message: data.error, type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
                return;
            }

            if ('message' in data) {
                // setCookie('token', data.token);
                dispatch(setToast({ message: data.message, type: "success" }));
                // formik.resetForm();
                router.push('/dashboard');
            }
        },
    });
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Verfiy Account
            </h1>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div>
                <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
                >
                One Time Password
                </label>
                <div className="mt-2">
                <input
                    id="otp"
                    name="otp"
                    type="string"
                    autoComplete="off"
                    value={formik.values.otp}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={clsx(
                    "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                    {
                        "border-2 border-red-500 bg-red-100 text-red-800":
                        formik.touched.otp && formik.errors.otp,
                    }
                    )}
                />
                {formik.errors.otp && formik.touched.otp && (
                    <p className="text-red-500 ml-1 my-3">{formik.errors.otp}</p>
                )}
                </div>
            </div>

            <section className="flex flex-col lg:flex-row gap-y-3 lg:gap-y-0 justify-between items-end lg:items-center lg:justify-between">
                <span className="text-gray-600 order-2 lg:order-1">
                <span className="mr-2">Not sign sp yet?</span>
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
        </div>
        </div>
    );
}

export default VerifyForm