'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { registerMeal } from '@/backend_api/meal/registerMeal';
import { useAppSelector } from '@/store';
import { FatSecretFood } from '@/interfaces/meal.interface';
import { RootState } from '@/store';
import { setMealLoading, setHistoryFoodLoading } from '@/store/slices/load.slice';
import { resetUsedFatSecretFood } from '@/store/slices/meal.slice';

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
  servings: null,
};

interface Props {
  date: string;
  meal_type: "Breakfast" | "Lunch" | "Dinner" | "Snack";
}

const MealRegisterFormByFatSecret: React.FC<Props> = ({ date, meal_type }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const used_fatsecret_food = useAppSelector((state: RootState) => state.food_meal?.used_fatsecret_food) as FatSecretFood | null;
  const [customOpen, setCustomOpen] = useState(false); // State to manage custom field visibility

  const formik = useFormik<FormData>({
    initialValues: FORM_DATA,
    validationSchema: formSchema,
    onSubmit: async (formData) => {
      if (used_fatsecret_food) {
        try {
          dispatch(setMealLoading(true));
          dispatch(setHistoryFoodLoading(true));
          const data = await registerMeal({
            ...formData,
            fat_secret_food: used_fatsecret_food.id,
            date: date,
            meal_type: meal_type
          });
          console.log(data);
          if ('error' in data) {
            dispatch(setToast({ message: data.error, type: "error" }));
            setTimeout(() => dispatch(resetToast()), 3000);
          } else if ('message' in data) {
            dispatch(setToast({ message: data.message, type: "success" }));
            setTimeout(() => dispatch(resetToast()), 4000);
            dispatch(resetUsedFatSecretFood())
          }
        } catch (error) {
          console.error('Error registering meal:', error);
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
      setCustomOpen(!customOpen);
    } else {
      formik.setFieldValue('servings', option);
      formik.setFieldValue('grams', null);
      setCustomOpen(false); // Close custom field if a predefined option is selected
    }
  };

  return (
    <>
      {used_fatsecret_food && (
        <div className="max-w-md mx-auto mt-10 border rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center p-2 bg-green-100 rounded-md">
            <div className="text-gray-700 font-medium">
              {used_fatsecret_food.name}
              {used_fatsecret_food.brand_name ? (
                <> ({used_fatsecret_food.brand_name})</>
              ) : (
                <> ({used_fatsecret_food.type})</>
              )}
            </div>
            <div className="text-gray-500 text-sm">
              ({Math.round(used_fatsecret_food.calories_per_unit)} kcal) / {used_fatsecret_food.unit}
            </div>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-6 mt-4">
            <div>
              {used_fatsecret_food.unit === "100g" ? (
                <div>
                  <label htmlFor="grams" className="block text-sm font-medium text-gray-700">
                    Grams
                  </label>
                  <input
                    id="grams"
                    name="grams"
                    type="number"
                    onChange={handleGramsChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.grams ?? ""}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                  {formik.touched.grams && formik.errors.grams ? (
                    <div className="text-red-600 text-sm">{formik.errors.grams}</div>
                  ) : null}
                </div>
              ) : (
                <div>
                  <div className="bg-green-100 p-2 rounded-md">
                    <p className="text-sm text-gray-600">Select Serving Size</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {servingsOptions.map(option => (
                      <button
                        type="button"
                        key={option}
                        onClick={() => handleServingsButtonClick(option)}
                        className={clsx(
                          "px-4 py-2 border rounded-md text-sm",
                          formik.values.servings === option ? "bg-green-500 text-white" : "bg-white text-green-500 border-green-500"
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-col mt-4">
                    <button
                      type="button"
                      onClick={() => handleServingsButtonClick('custom')}
                      className="px-4 py-2 border rounded-md text-sm bg-white text-green-500 border-green-500"
                    >
                      Custom
                    </button>
                    {customOpen && (
                      <input
                        id="servings"
                        name="servings"
                        type="number"
                        onChange={handleServingsChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.servings ?? ""}
                        className="mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      />
                    )}
                    {formik.touched.servings && formik.errors.servings ? (
                      <div className="text-red-600 text-sm">{formik.errors.servings}</div>
                    ) : null}
                  </div>
                </div>
              )}
            </div>

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

export default MealRegisterFormByFatSecret;
