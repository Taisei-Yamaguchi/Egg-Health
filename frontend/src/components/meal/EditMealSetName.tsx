"use client"
import React, { useState } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { useAppDispatch } from '@/store';
import { setToast, resetToast } from '@/store/slices/toast.slice';
import { FaPlus } from 'react-icons/fa';
import { createMealSet } from '@/backend_api/meal/createMealSet';
import { updateMealSet } from '@/backend_api/meal/updateMealSet';

// Validation schema
const formSchema = yup.object().shape({
    name: yup
        .string()
        .max(30, "Name must be less than 30 characters")
        .required("Name is required!"),
});

interface Props {
    id: number,
    name: string
}

const EditMealSetName: React.FC<Props> = ({id,name}) => {
    const router = useRouter();
    const dispatch = useAppDispatch()

    const formik = useFormik<{name:string}>({
        initialValues: {
            name: name,
        },
        validationSchema: formSchema,
        onSubmit: async (values) => {
            try {
                // dispatch(setCustomFoodLoading(true))
                const response = await updateMealSet(id,values);
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: 'success' }));
                    setTimeout(() => dispatch(resetToast()), 4000);
                } else if ('message' in response) {
                    dispatch(setToast({ message: response.message, type: 'success' }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                }
            } catch (error) {
                console.error('Error creating meal set:', error);
                dispatch(setToast({ message: 'An error occurred while creating the meal set.', type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
            } finally {
                // dispatch(setCustomFoodLoading(false))
            }
        },
    });

    return (
        <div>
            
                <form onSubmit={formik.handleSubmit} className="">
                <div className="flex items-center">
                    <div className="w-full">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={clsx(
                        "text-xl font-bold block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:leading-6 pl-2",
                        {
                            "border-2 border-red-500 bg-red-100 text-red-800":
                            formik.touched.name && formik.errors.name,
                        }
                        )}
                        autoComplete="off"
                    />
                    {formik.errors.name && formik.touched.name && (
                        <p className="text-red-500 text-xs">{formik.errors.name}</p>
                    )}
                    </div>
                </div>

                <section className="w-full flex flex-col gap-y-3 justify-start items-end lg:items-center lg:flex-row lg:gap-y-0 lg:justify-between">
                    <button
                    type="submit"
                    className="flex w-[80px] order-1 lg:order-2 lg:w-fit justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                    Save
                    </button>
                </section>
                </form>
        </div>
    );
    
}

export default EditMealSetName