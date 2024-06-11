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
import { createExerciseSet } from '@/backend_api/exercise/createExerciseSet';

// Validation schema
const formSchema = yup.object().shape({
    name: yup
        .string()
        .max(30, "Name must be less than 30 characters")
        .required("Name is required!"),
});

export function CreateExerciseSetButton() {
    const router = useRouter();
    const dispatch = useAppDispatch()
    const [showModal, setShowModal] = useState(false);
    const formik = useFormik<{name:string}>({
        initialValues: {
            name: "",
        },
        validationSchema: formSchema,
        onSubmit: async (values) => {
            try {
                // dispatch(setCustomFoodLoading(true))
                const response = await createExerciseSet(values);
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: 'success' }));
                    setTimeout(() => dispatch(resetToast()), 4000);
                } else if ('message' in response) {
                    dispatch(setToast({ message: response.message, type: 'success' }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                    setShowModal(false)
                    // Redirect to the MealSet customization page
                    router.push(`/dashboard/exercise-set/${response.data.id}`);
                }
            } catch (error) {
                console.error('Error creating custom food:', error);
                dispatch(setToast({ message: 'An error occurred while creating the exercise set.', type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
            } finally {
                // dispatch(setCustomFoodLoading(false))
            }
        },
    });

    return (
        <div>
        <button
            className="flex items-center px-3 py-1 text-xs font-medium text-white bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-md shadow hover:from-cyan-500 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            onClick={() => setShowModal(true)}
            >
            <FaPlus className="mr-1" />
            Create Exercise Set
            </button>
        {showModal && (
            <div className="fixed inset-0 z-50 flex justify-center items-center">
            <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div
                className="relative z-50 bg-white rounded-lg w-full max-w-lg p-6 mx-4 my-8"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
            >
                <h2 className="text-2xl font-bold leading-9 tracking-tight mb-4">Create Exercise Set</h2>
                <p className="text-sm mb-2 text-red-600">
                Note: Please ensure the input data is accurate.
                </p>
                <form onSubmit={formik.handleSubmit} className="h-[200px] overflow-y-auto">
                <div className="flex items-center">
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 w-1/3">
                    Name *
                    </label>
                    <div className="w-2/3">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={clsx(
                        "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
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
                    Create
                    </button>
                </section>
                </form>
                <button
                className="absolute top-4 right-4 bg-gray-300 text-gray-700 p-1 rounded-full text-xs"
                onClick={() => setShowModal(false)}
                >
                    ✕
                </button>
            </div>
            </div>
        )}
        </div>
    );
    
}
