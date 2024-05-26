"use client"
import React, { useState } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import * as yup from 'yup';
import { useAppDispatch } from '@/store';
import { setToast, resetToast } from '@/store/slices/toast.slice';
import { Workout } from '@/interfaces/exercise.interface';
import { createCustomWorkout } from '@/backend_api/exercise/createCustomWorkout';
import { setCustomWorkoutLoading } from '@/store/slices/load.slice';

// Validation schema
const formSchema = yup.object().shape({
    name: yup
        .string()
        .max(30, "Name must be less than 30 characters")
        .required("Name is required!"),
    mets: yup
        .number()
        .min(1, "Mets must be greater than 0")
        .required("Mets are required!"),
    type: yup
        .string()
        .oneOf(['Living', 'Aerobic', 'Walk', 'Run', 'Muscle', 'Sports Club', 'Martial Arts', 'Marine Winter', 'Other'])
        .required("Workout type is required!"),
});

type FormData = Omit<Workout, 'id' | 'account' | 'custom'>;

export function WorkoutForm() {
    const dispatch = useAppDispatch()
    const [showModal, setShowModal] = useState(false);
    const formik = useFormik<FormData>({
        initialValues: {
            name: "",
            mets: 1,
            type: "Other"
        },
        validationSchema: formSchema,
        onSubmit: async (values) => {
            try {
                dispatch(setCustomWorkoutLoading(true))
                const response = await createCustomWorkout(values);
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: 'success' }));
                    setTimeout(() => dispatch(resetToast()), 4000);
                } else if ('message' in response) {
                    dispatch(setToast({ message: response.message, type: 'success' }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                    setShowModal(false)
                }
            } catch (error) {
                console.error('Error creating custom food:', error);
                dispatch(setToast({ message: 'An error occurred while creating the custom workout.', type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
            } finally {
                dispatch(setCustomWorkoutLoading(false))
            }
        },
    });


    return (
        <div>
            <h2
                className="cursor-pointer text-indigo-600 text-2xl font-bold leading-9 tracking-tight"
                onClick={() => setShowModal(true)}
            >
                Create Custom Workout
            </h2>
            {showModal && (
                <div className="fixed inset-0 z-50 flex justify-center items-center">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <div
                        className="relative z-50 bg-white rounded-lg w-full max-w-lg p-6 mx-4 my-8 "
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-headline"
                    >
                        <h2 className="text-2xl font-bold leading-9 tracking-tight mb-4">Create Custom Workout</h2>
                        
                        <form className="" onSubmit={formik.handleSubmit}>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Name:
                                </label>
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
                                    <p className="text-red-500 ml-1 my-3">{formik.errors.name}</p>
                                )}
                            </div>
                            
                            <div>
                                <label
                                    htmlFor="mets"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Mets:
                                </label>
                                <input
                                    type="number"
                                    id="mets"
                                    name="mets"
                                    value={formik.values.mets}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={clsx(
                                        "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                                        {
                                            "border-2 border-red-500 bg-red-100 text-red-800":
                                                formik.touched.mets && formik.errors.mets,
                                        }
                                    )}
                                    autoComplete="off"
                                />
                                {formik.errors.mets && formik.touched.mets && (
                                    <p className="text-red-500 ml-1 my-3">{formik.errors.mets}</p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="type"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Workout Type:
                                </label>
                                <select
                                    id="type"
                                    name="type"
                                    value={formik.values.type}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={clsx(
                                        "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                                        {
                                            "border-2 border-red-500 bg-red-100 text-red-800":
                                                formik.touched.type && formik.errors.type,
                                        }
                                    )}
                                >
                                    <option value="" label="Select workout type" />
                                    <option value="Living" label="Living" />
                                    <option value="Aerobic" label="Aerobic" />
                                    <option value="Walk" label="Walk" />
                                    <option value="Run" label="Run" />
                                    <option value="Muscle" label="Muscle" />
                                    <option value="Sports Club" label="Sports Club" />
                                    <option value="Martial Arts" label="Martial Arts" />
                                    <option value="Marine Winter" label="Marine Winter" />
                                    <option value="Other" label="Other" />
                                </select>
                                {formik.errors.type && formik.touched.type && (
                                    <p className="text-red-500 ml-1 my-3">{formik.errors.type}</p>
                                )}
                            </div>
                            <section className="w-full flex flex-col gap-y-3 justify-start items-end lg:items-center lg:flex-row lg:gap-y-0 lg:justify-between">
                                <button
                                    type="submit"
                                    className="flex w-full order-1 lg:order-2 lg:w-fit justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >Create</button>
                            </section>
                        </form>
                        <button
                            className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-900"
                            onClick={() => setShowModal(false)}
                        >
                            <FaEyeSlash />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
