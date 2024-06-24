// components/UpdateUserForm.tsx

'use client';

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateAccount } from '@/backend_api/accounts/updateAccount';
import { useAppDispatch } from '@/store';
import { setToast } from '@/store/slices/toast.slice';
import { resetToast } from '@/store/slices/toast.slice';
import { setCookie } from 'cookies-next';

type UpdateUserFormProps = {
    nickname: string;
};

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({ nickname }) => {
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            nickname: nickname,
        },
        validationSchema: Yup.object({
            nickname: Yup.string()
                .min(2, 'Must be at least 2 characters')
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await updateAccount({ nickname: values.nickname });
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: 'error' }));
                }
                else if ('detail' in response){
                    dispatch(setToast({ message: response.detail, type: 'error' }));
                }
                else  if ('message' in response){
                    dispatch(setToast({ message: response.message, type: 'success' }));
                }

                if('data' in response){
                    setCookie('nickname', response.data.nickname);
                    
                }
                setTimeout(() => dispatch(resetToast()), 3000);
            } catch (error) {
                dispatch(setToast({ message: 'An error occurred while updating the nickname.', type: 'error' }));
                setTimeout(() => dispatch(resetToast()), 3000);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className='flex'>
            <div className='w-1/2 mr-1'>
                <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
                    Nickname
                </label>
                <input
                    id="nickname"
                    name="nickname"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nickname}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg"
                />
                {formik.touched.nickname && formik.errors.nickname ? (
                    <div className="text-red-500 text-sm">{formik.errors.nickname}</div>
                ) : null}
            </div>
            <div className="mt-6">
                <button
                    type="submit"
                    className="w-[100px] inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={formik.isSubmitting}
                >
                    save
                </button>
            </div>
        </form>
    );
};

export default UpdateUserForm;
