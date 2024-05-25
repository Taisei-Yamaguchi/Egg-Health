"use client"
import React, { useState } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import * as yup from 'yup';
import { createCustomFood } from '@/backend_api/meal/createCustomFood';
import { Food } from '@/interfaces/meal.interface';
import { useAppDispatch } from '@/store';
import { setCustomFoodLoading } from '@/store/slices/load.slice';
import { setToast,resetToast } from '@/store/slices/toast.slice';
// Validation schema
const formSchema = yup.object().shape({
    name: yup
        .string()
        .max(30, "Name must be less than 30 characters")
        .required("Name is required!"),
    cal: yup
        .number()
        .min(1, "Calories must be greater than 0")
        .required("Calories are required!"),
    g_per_serving: yup.number().nullable(),
    food_type: yup
        .string()
        .oneOf(['vegetable', 'fruit', 'beverage', 'rice', 'soup', 'bread', 'noodle', 'pasta', 'fish', 'meat', 'milk', 'snack', 'alcohol', 'other'])
        .required("Food type is required!"),
    carb: yup.number().nullable(),
    fat: yup.number().nullable(),
    protein: yup.number().nullable(),
    sugars: yup.number().nullable(),
    dietary_fiber: yup.number().nullable(),
    salt: yup.number().nullable(),
    sodium: yup.number().nullable(),
    potassium: yup.number().nullable(),
    calcium: yup.number().nullable(),
    magnesium: yup.number().nullable(),
    iron: yup.number().nullable(),
    zinc: yup.number().nullable(),
    vitamin_a: yup.number().nullable(),
    vitamin_d: yup.number().nullable(),
    vitamin_e: yup.number().nullable(),
    vitamin_b1: yup.number().nullable(),
    vitamin_b2: yup.number().nullable(),
    vitamin_b12: yup.number().nullable(),
    vitamin_b6: yup.number().nullable(),
    vitamin_c: yup.number().nullable(),
    niacin: yup.number().nullable(),
    cholesterol: yup.number().nullable(),
    saturated_fat: yup.number().nullable(),
});

type FormData = Omit<Food, 'id' | 'account' | 'often' | 'custom' | 'ex_api_id'>;

export function FoodForm() {
    const dispatch = useAppDispatch()
    const [showModal, setShowModal] = useState(false);
    const formik = useFormik<FormData>({
        initialValues: {
            name: "",
            cal: 1,
            g_per_serving: null,
            food_type: "other",
            carb: null,
            fat: null,
            protein: null,
            sugars: null,
            dietary_fiber: null,
            salt: null,
            sodium: null,
            potassium: null,
            calcium: null,
            magnesium: null,
            iron: null,
            zinc: null,
            vitamin_a: null,
            vitamin_d: null,
            vitamin_e: null,
            vitamin_b1: null,
            vitamin_b2: null,
            vitamin_b12: null,
            vitamin_b6: null,
            vitamin_c: null,
            niacin: null,
            cholesterol: null,
            saturated_fat: null,
        },
        validationSchema: formSchema,
        onSubmit: async (values) => {
            try {
                dispatch(setCustomFoodLoading(true))
                const response = await createCustomFood(values);
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
                dispatch(setToast({ message: 'An error occurred while creating the custom food.', type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
            } finally {
                dispatch(setCustomFoodLoading(false))
            }
        },
    });


    return (
        <div>
            <h2
                className="cursor-pointer text-indigo-600 text-2xl font-bold leading-9 tracking-tight"
                onClick={() => setShowModal(true)}
            >
                Create Custom Food
            </h2>
            {showModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-center">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <div
                        className="relative z-50 bg-white rounded-lg w-full max-w-lg p-6 mx-4 my-8"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-headline"
                        style={{top: "90%"}}
                    >
                        <h2 className="text-2xl font-bold leading-9 tracking-tight mb-4">Create Custom Food</h2>
                        
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
                            
                            {/* Add input fields for all other properties */}
                            <div>
                                <label
                                    htmlFor="cal"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Calories:
                                </label>
                                <input
                                    type="number"
                                    id="cal"
                                    name="cal"
                                    value={formik.values.cal}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={clsx(
                                        "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                                        {
                                            "border-2 border-red-500 bg-red-100 text-red-800":
                                                formik.touched.cal && formik.errors.cal,
                                        }
                                    )}
                                    autoComplete="off"
                                />
                                {formik.errors.cal && formik.touched.cal && (
                                    <p className="text-red-500 ml-1 my-3">{formik.errors.cal}</p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="g_per_serving"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Grams per Serving:
                                </label>
                                <input
                                    type="number"
                                    id="g_per_serving"
                                    name="g_per_serving"
                                    value={formik.values.g_per_serving || ''}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={clsx(
                                        "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                                        {
                                            "border-2 border-red-500 bg-red-100 text-red-800":
                                                formik.touched.g_per_serving && formik.errors.g_per_serving,
                                        }
                                    )}
                                    autoComplete="off"
                                />
                                {formik.errors.g_per_serving && formik.touched.g_per_serving && (
                                    <p className="text-red-500 ml-1 my-3">{formik.errors.g_per_serving}</p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="food_type"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Food Type:
                                </label>
                                <select
                                    id="food_type"
                                    name="food_type"
                                    value={formik.values.food_type}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={clsx(
                                        "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                                        {
                                            "border-2 border-red-500 bg-red-100 text-red-800":
                                                formik.touched.food_type && formik.errors.food_type,
                                        }
                                    )}
                                >
                                    <option value="vegetable">Vegetable</option>
                                    <option value="fruit">Fruit</option>
                                    <option value="beverage">Beverage</option>
                                    <option value="rice">Rice</option>
                                    <option value="soup">Soup</option>
                                    <option value="bread">Bread</option>
                                    <option value="noodle">Noodle</option>
                                    <option value="pasta">Pasta</option>
                                    <option value="fish">Fish</option>
                                    <option value="meat">Meat</option>
                                    <option value="milk">Milk</option>
                                    <option value="snack">Snack</option>
                                    <option value="alcohol">Alcohol</option>
                                    <option value="other">Other</option>
                                </select>
                                {formik.errors.food_type && formik.touched.food_type && (
                                    <p className="text-red-500 ml-1 my-3">{formik.errors.food_type}</p>
                                )}
                            </div>

                            {/* Repeat similar blocks for other fields */}
                            {['carb', 'fat', 'protein', 'sugars', 'dietary_fiber', 'salt', 'sodium', 'potassium', 'calcium', 'magnesium', 'iron', 'zinc', 'vitamin_a', 'vitamin_d', 'vitamin_e', 'vitamin_b1', 'vitamin_b2', 'vitamin_b12', 'vitamin_b6', 'vitamin_c', 'niacin', 'cholesterol', 'saturated_fat'].map((field) => (
                                <div key={field}>
                                    <label
                                        htmlFor={field}
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        {field.replace(/_/g, ' ').toUpperCase()}:
                                    </label>
                                    <input
                                        type="number"
                                        id={field}
                                        name={field}
                                        value={formik.values[field as keyof FormData] || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={clsx(
                                            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                                            {
                                                "border-2 border-red-500 bg-red-100 text-red-800":
                                                    formik.touched[field as keyof FormData] && formik.errors[field as keyof FormData],
                                            }
                                        )}
                                        autoComplete="off"
                                    />
                                    {formik.touched[field as keyof FormData] && formik.errors[field as keyof FormData] && (
                                        <p className="text-red-500 ml-1 my-3">{formik.errors[field as keyof FormData]}</p>
                                    )}
                                </div>
                            ))}


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
