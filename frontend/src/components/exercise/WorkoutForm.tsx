"use client"
import React, { useState } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { FaEyeSlash, FaPlus } from 'react-icons/fa';
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
    .oneOf(['Daily Living Activities', 'Cardio', 'Walking・Running', 'Strength Training', 'Fitness', 'Ball Sports', 'Martial Arts', 'Water and Winter Sports', 'Other'])
    .required("Workout type is required!"),
});

type FormData = Omit<Workout, 'id' | 'account' | 'custom' | 'ja_name'>;

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
          dispatch(setToast({ message: response.error, type: 'error' }));
          setTimeout(() => dispatch(resetToast()), 4000);
        } else if ('message' in response) {
          dispatch(setToast({ message: response.message, type: 'success' }));
          setTimeout(() => dispatch(resetToast()), 3000);
          setShowModal(false)
        }
      } catch (error) {
        // console.error('Error creating custom workout:', error);
        dispatch(setToast({ message: 'An error occurred while creating the custom activity.', type: "error" }));
        setTimeout(() => dispatch(resetToast()), 3000);
      } finally {
        dispatch(setCustomWorkoutLoading(false))
      }
    },
  });

  return (
    <div>
      <button
        className="flex items-center px-3 py-1 text-xs font-medium text-white bg-gradient-to-r from-orange-400 to-orange-600 rounded-md shadow hover:from-orange-500 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        onClick={() => setShowModal(true)}
      >
        <FaPlus className="mr-1" />
        Create Custom Activity
      </button>
      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div
            className="relative z-50 bg-white h-[400px]  rounded-lg w-full max-w-lg p-6 mx-4 my-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <h2 className="text-2xl font-bold leading-9 tracking-tight mb-4">Create Custom Activity</h2>
            <p className="text-sm mb-2 text-red-600">
              Note: Please ensure the activity information is accurate.
            </p>
            <form onSubmit={formik.handleSubmit} className="h-[400px] overflow-y-auto">
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

              <div className="flex items-center mt-4">
                <label htmlFor="mets" className="block text-sm font-medium leading-6 text-gray-900 w-1/3">
                  METs *
                </label>
                <div className="w-2/3">
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
                    <p className="text-red-500 text-xs">{formik.errors.mets}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center mt-4">
                <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900 w-1/3">
                  Activity Type *
                </label>
                <div className="w-2/3">
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
                    <option value="Daily Living Activities">Daily Living Activities</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Walking・Running">Walking・Running</option>
                    <option value="Strength Training">Strength Training</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Ball Sports">Ball Sports</option>
                    <option value="Martial Arts">Martial Arts</option>
                    <option value="Water and Winter Sports">Water and Winter Sports</option>
                    <option value="Other">Other</option>
                  </select>
                  {formik.errors.type && formik.touched.type && (
                    <p className="text-red-500 text-xs">{formik.errors.type}</p>
                  )}
                </div>
              </div>

              <section className="w-full flex flex-col gap-y-3 justify-start items-end lg:items-center lg:flex-row lg:gap-y-0 lg:justify-between mt-6">
                <button
                  type="submit"
                  className="flex w-full order-1 lg:order-2 lg:w-fit justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
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
