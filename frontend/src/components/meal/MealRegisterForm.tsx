'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { registerMeal } from '@/backend_api/meal/registerMeal';
import { useAppSelector } from '@/store';
import { Food } from '@/interfaces/meal.interface';
import { RootState } from '@/store';
import { setMealLoading, setHistoryFoodLoading } from '@/store/slices/load.slice';
import { resetUsedFood } from '@/store/slices/meal.slice';

const formSchema = yup.object().shape({
  grams: yup
    .number()
    .nullable()
    .transform((_, originalValue) => (originalValue === "" ? null : originalValue))
    .min(1, "Grams must be greater than 0")
    .test('either-grams-or-servings', 'Either servings or grams must be provided', function (value) {
      const { servings } = this.parent;
      return value !== null || servings !== null;
    }),
  servings: yup
    .number()
    .nullable()
    .transform((_, originalValue) => (originalValue === "" ? null : originalValue))
    .min(0.1, "Servings must be greater than 0.1")
    .max(10, "Servings must be less than 10.0")
    .test('either-servings-or-grams', 'Either servings or grams must be provided', function (value) {
      const { grams } = this.parent;
      return value !== null || grams !== null;
    })
});

type FormData = {
  grams: number | null;
  servings: number | null;
};

const FORM_DATA: FormData = {
  grams: null,
  servings: 1,
};

interface Props {
  date: string;
  meal_type: "Breakfast" | "Lunch" | "Dinner" | "Snack";
}

const MealRegisterForm: React.FC<Props> = ({ date, meal_type }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const used_food = useAppSelector((state: RootState) => state.food_meal?.used_food) as Food | null;
  const [showGrams, setShowGrams] = useState(false); // State to manage grams field visibility
  const [showCustomServings, setShowCustomServings] = useState(false); // State to manage custom servings field visibility
  const custom_food_loading = useAppSelector((state: RootState) => state.load.custom_food_loading);
  
  useEffect(()=>{
    dispatch(resetUsedFood())
  },[custom_food_loading])
  
  const formik = useFormik<FormData>({
    initialValues: FORM_DATA,
    validationSchema: formSchema,
    onSubmit: async (formData) => {
      if (used_food) {
        try {
          dispatch(setMealLoading(true));
          dispatch(setHistoryFoodLoading(true));
          const data = await registerMeal({
            ...formData,
            food: used_food.id,
            date: date,
            meal_type: meal_type
          });
          if ('error' in data) {
            dispatch(setToast({ message: data.error, type: "error" }));
            setTimeout(() => dispatch(resetToast()), 3000);
          } else if ('message' in data) {
            dispatch(setToast({ message: data.message, type: "success" }));
            setTimeout(() => dispatch(resetToast()), 4000);
            dispatch(resetUsedFood())
          }
        } catch (error) {
          // console.error('Error registering meal:', error);
          dispatch(setToast({ message: 'An error occurred while registering the meal.', type: "error" }));
          setTimeout(() => dispatch(resetToast()), 3000);
        } finally {
          dispatch(setMealLoading(false));
          dispatch(setHistoryFoodLoading(false));
        }
      } else {
        dispatch(setToast({ message: "You need to choose food.", type: "error" }));
        setTimeout(() => dispatch(resetToast()), 3000);
        return;
      }
    },
  });

  const servingsOptions = [0.25, 0.5, 0.75, 1, 1.5, 2, 3];
  const handleGramsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    formik.setFieldValue('grams', value === "" ? null : parseFloat(value));
    if (value !== "") {
      formik.setFieldValue('servings', null);
    }
  };

  const handleServingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    formik.setFieldValue('servings', value === "" ? null : parseFloat(value));
    if (value !== "") {
      formik.setFieldValue('grams', null);
    }
  };

  const handleServingsButtonClick = (option: number | 'custom') => {
    if (option === 'custom') {
      setShowCustomServings(!showCustomServings);
    } else {
      formik.setFieldValue('servings', option);
      formik.setFieldValue('grams', null);
      setShowGrams(false); // Close grams field if a predefined option is selected
    }
  };

  const toggleShowGrams = () => {
    setShowGrams(!showGrams);
    if (!showGrams) {
      formik.setFieldValue('grams', null);
      formik.setFieldValue('servings', 1);
      setShowCustomServings(false);
    } else {
      formik.setFieldValue('grams', null);
      formik.setFieldValue('servings', null);
    }
  };

  return (
    <>
      {used_food && (
        <div className="max-w-md mx-auto mt-10 border rounded-lg shadow-md p-4">
          <div className="flex flex-col justify-between items-center p-2 bg-green-100 rounded-md">
            <div className="text-gray-700 font-medium items-start text-base">
              {used_food.name}
            </div>
            <div className="text-gray-500 text-xs">
              P: {Math.round(used_food.protein)} g
              F: {Math.round(used_food.fat)} g
              C: {Math.round(used_food.carb)} g
              
              ({Math.round(used_food.cal)} kcal) / serving
            </div>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-6 mt-4">
            <div>
              {used_food.g_per_serving ? (
                <div>
                  <div className={clsx(showGrams ? 'block' : 'hidden')}>
                    <input
                      id="grams"
                      name="grams"
                      type="number"
                      onChange={handleGramsChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.grams ?? ""}
                      className="w-[100px] px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    /><span className='text-[15px]'> (g)</span>
                  </div>
                  {formik.touched.grams && formik.errors.grams ? (
                      <div className="text-red-600 text-sm">{formik.errors.grams}</div>
                    ) : null}
                </div>
              ) : null}

              <div className={clsx(!showGrams ? 'block' : 'hidden')}>
                <div className="flex flex-wrap gap-1 mt-2">
                  {servingsOptions.map(option => (
                    <button
                      type="button"
                      key={option}
                      onClick={() => handleServingsButtonClick(option)}
                      className={clsx(
                        "px-2 py-2 border rounded-md text-[10px] w-[32px]",
                        formik.values.servings === option ? "bg-green-500 text-white" : "bg-white text-green-500 border-green-500"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="flex mt-4">
                  <button
                    type="button"
                    onClick={() => handleServingsButtonClick('custom')}
                    className="w-[100px] px-2 py-1 border rounded-md text-[10px] bg-white text-green-500 border-green-500 mr-2"
                  >
                    Input manually
                  </button>
                  {showCustomServings && (
                    <>
                    <input
                      id="servings"
                      name="servings"
                      type="number"
                      onChange={handleServingsChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.servings ?? ""}
                      className="w-[100px] px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                    <span className='text-[15px]'> (servings)</span>
                    </>
                  )}
                </div>
                {formik.touched.servings && formik.errors.servings ? (
                    <div className="text-red-600 text-sm">{formik.errors.servings}</div>
                  ) : null}
              </div>
            </div>

            {used_food.g_per_serving ? (
              <div>
                <button
                  type="button"
                  className="w-[160px] inline-flex justify-center py-1 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  onClick={toggleShowGrams}
                >
                  {showGrams ? 'Input by Servings' : 'Input by Grams'}
                </button>
              </div>
            ) : null}

            <div>
              <button
                type="submit"
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Register Meal
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default MealRegisterForm;
