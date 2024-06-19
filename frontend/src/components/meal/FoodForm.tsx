"use client"
import React, { useState } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { FaPlus } from 'react-icons/fa';
import * as yup from 'yup';
import { createCustomFood } from '@/backend_api/meal/createCustomFood';
import { Food } from '@/interfaces/meal.interface';
import { useAppDispatch } from '@/store';
import { setCustomFoodLoading } from '@/store/slices/load.slice';
import { setToast, resetToast } from '@/store/slices/toast.slice';

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
  carb: yup.number().min(0, "Value must be 0 or greater").required("Carb is required"),
  fat: yup.number().min(0, "Value must be 0 or greater").required("Fat is required"),
  protein: yup.number().min(0, "Value must be 0 or greater").required("Protein is required"),
  sugars: yup.number().min(0, "Value must be 0 or greater").required("Sugars is required"),
  dietary_fiber: yup.number().min(0, "Value must be 0 or greater").required("Dietary fiber is required"),
  salt: yup.number().min(0, "Value must be 0 or greater").required("Salt is required"),
  sodium: yup.number().min(0, "Value must be 0 or greater").required("Sodium is required"),
  potassium: yup.number().min(0, "Value must be 0 or greater").required("Potassium is required"),
  calcium: yup.number().min(0, "Value must be 0 or greater").required("Calcium is required"),
  magnesium: yup.number().min(0, "Value must be 0 or greater").required("Magnesium is required"),
  iron: yup.number().min(0, "Value must be 0 or greater").required("Iron is required"),
  zinc: yup.number().min(0, "Value must be 0 or greater").required("Zinc is required"),
  vitamin_a: yup.number().min(0, "Value must be 0 or greater").required("Vitamin A is required"),
  vitamin_d: yup.number().min(0, "Value must be 0 or greater").required("Vitamin D is required"),
  vitamin_e: yup.number().min(0, "Value must be 0 or greater").required("Vitamin E is required"),
  vitamin_b1: yup.number().min(0, "Value must be 0 or greater").required("Vitamin B1 is required"),
  vitamin_b2: yup.number().min(0, "Value must be 0 or greater").required("Vitamin B2 is required"),
  vitamin_b12: yup.number().min(0, "Value must be 0 or greater").required("Vitamin B12 is required"),
  vitamin_b6: yup.number().min(0, "Value must be 0 or greater").required("Vitamin B6 is required"),
  vitamin_c: yup.number().min(0, "Value must be 0 or greater").required("Vitamin C is required"),
  niacin: yup.number().min(0, "Value must be 0 or greater").required("Niacin is required"),
  cholesterol: yup.number().min(0, "Value must be 0 or greater").required("Cholesterol is required"),
  saturated_fat: yup.number().min(0, "Value must be 0 or greater").required("Saturated fat is required"),
  polyunsaturated_fat: yup.number().min(0, "Value must be 0 or greater").required("Polyunsaturated fat is required"),
  monounsaturated_fat: yup.number().min(0, "Value must be 0 or greater").required("Monounsaturated fat is required"),
});

type FormData = Omit<Food, 'id' | 'account' | 'often' | 'custom' | 'ex_api_id'>;

export function FoodForm() {
  const dispatch = useAppDispatch()
  const [showModal, setShowModal] = useState(false);
  const [showOtherNutrients, setShowOtherNutrients] = useState(false); // State to manage visibility of other nutrients
  
  const formik = useFormik<FormData>({
    initialValues: {
      name: "",
      cal: 1,
      g_per_serving: null,
      // food_type: "other",
      carb: 0,
      fat: 0,
      protein: 0,
      sugars: 0,
      dietary_fiber: 0,
      salt: 0,
      sodium: 0,
      potassium: 0,
      calcium: 0,
      magnesium: 0,
      iron: 0,
      zinc: 0,
      vitamin_a: 0,
      vitamin_d: 0,
      vitamin_e: 0,
      vitamin_b1: 0,
      vitamin_b2: 0,
      vitamin_b12: 0,
      vitamin_b6: 0,
      vitamin_c: 0,
      niacin: 0,
      cholesterol: 0,
      saturated_fat: 0,
      polyunsaturated_fat: 0,
      monounsaturated_fat: 0,
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      try {
        dispatch(setCustomFoodLoading(true))
        const response = await createCustomFood(values);
        if ('error' in response) {
          dispatch(setToast({ message: response.error, type: 'error' }));
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
      <button
        className="flex items-center px-3 py-1 text-xs font-medium text-white bg-gradient-to-r from-orange-400 to-orange-600 rounded-md shadow hover:from-orange-500 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        onClick={() => setShowModal(true)}
        >
        <FaPlus className="mr-1" />
        Create Custom Item
      </button>
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
          >
            <h2 className="text-2xl font-bold leading-9 tracking-tight mb-4">Create Custom Food</h2>
            <p className="text-sm mb-2 text-red-600">
              Note: Please ensure the nutritional information is accurate.
            </p>
            <form onSubmit={formik.handleSubmit} className="h-[510px] overflow-y-auto">
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
                <label htmlFor="cal" className="block text-sm font-medium leading-6 text-gray-900 w-1/3">
                  Calories *
                </label>
                <div className="w-2/3">
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
                    <p className="text-red-500 text-xs">{formik.errors.cal}</p>
                  )}
                </div>
              </div>
  
              <div className="flex items-center mt-4">
                <label htmlFor="g_per_serving" className="block text-sm font-medium leading-6 text-gray-900 w-1/3">
                  Grams per Serving
                </label>
                <div className="w-2/3">
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
                    <p className="text-red-500 text-xs">{formik.errors.g_per_serving}</p>
                  )}
                </div>
              </div>

  
              {/* Input fields for PFC */}
              <div className="flex items-center mt-4">
                <label htmlFor="carb" className="block text-sm font-medium leading-6 text-gray-900 w-1/3">
                  Carbs (g)
                </label>
                <div className="w-2/3">
                  <input
                    type="number"
                    id="carb"
                    name="carb"
                    value={formik.values.carb}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={clsx(
                      "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                      {
                        "border-2 border-red-500 bg-red-100 text-red-800":
                          formik.touched.carb && formik.errors.carb,
                      }
                    )}
                    autoComplete="off"
                  />
                  {formik.errors.carb && formik.touched.carb && (
                    <p className="text-red-500 text-xs">{formik.errors.carb}</p>
                  )}
                </div>
              </div>
  
              <div className="flex items-center mt-4">
                <label htmlFor="fat" className="block text-sm font-medium leading-6 text-gray-900 w-1/3">
                  Fat (g)
                </label>
                <div className="w-2/3">
                  <input
                    type="number"
                    id="fat"
                    name="fat"
                    value={formik.values.fat}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={clsx(
                      "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                      {
                        "border-2 border-red-500 bg-red-100 text-red-800":
                          formik.touched.fat && formik.errors.fat,
                      }
                    )}
                    autoComplete="off"
                  />
                  {formik.errors.fat && formik.touched.fat && (
                    <p className="text-red-500 text-xs">{formik.errors.fat}</p>
                  )}
                </div>
              </div>
  
              <div className="flex items-center mt-4">
                <label htmlFor="protein" className="block text-sm font-medium leading-6 text-gray-900 w-1/3">
                  Protein (g)
                </label>
                <div className="w-2/3">
                  <input
                    type="number"
                    id="protein"
                    name="protein"
                    value={formik.values.protein}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={clsx(
                      "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                      {
                        "border-2 border-red-500 bg-red-100 text-red-800":
                          formik.touched.protein && formik.errors.protein,
                      }
                    )}
                    autoComplete="off"
                  />
                  {formik.errors.protein && formik.touched.protein && (
                    <p className="text-red-500 text-xs">{formik.errors.protein}</p>
                  )}
                </div>
              </div>
  
              {/* Button to toggle other nutrients */}
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="mt-2 mb-1 text-sm font-medium text-blue-500 underline hover:text-blue-700 focus:outline-none"
                        onClick={() => setShowOtherNutrients(!showOtherNutrients)}
                    >
                        {showOtherNutrients ? 'Hide Other Nutrients' : 'Show Other Nutrients'}
                    </button>
                </div>

              {/* Conditionally render other nutrients fields */}
              {showOtherNutrients && (
                <>
                  {['sugars', 'dietary_fiber', 'salt', 'sodium', 'potassium', 'calcium', 'magnesium', 'iron', 'zinc', 'vitamin_a', 'vitamin_d', 'vitamin_e', 'vitamin_b1', 'vitamin_b2', 'vitamin_b12', 'vitamin_b6', 'vitamin_c', 'niacin', 'cholesterol', 'saturated_fat','polyunsaturated_fat','monounsaturated_fat'].map((field) => (
                  <div className="flex items-center mt-4" key={field}>
                    <label htmlFor={field} className="block text-sm font-medium leading-6 text-gray-900 w-1/3">
                      {field.replace(/_/g, ' ').toUpperCase()}
                    </label>
                    <div className="w-2/3">
                      <input
                        type="number"
                        id={field}
                        name={field}
                        value={formik.values[field as keyof FormData] !== null && formik.values[field as keyof FormData] !== undefined ? formik.values[field as keyof FormData] as string | number : ''}

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
                        <p className="text-red-500 text-xs">{formik.errors[field as keyof FormData]}</p>
                      )}
                    </div>
                  </div>
                ))}



                </>
              )}
  
              <section className="w-full flex flex-col gap-y-3 justify-start items-end lg:items-center lg:flex-row lg:gap-y-0 lg:justify-between">
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
