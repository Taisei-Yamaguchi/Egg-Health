'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { updateMeal } from '@/backend_api/meal/updateMeal';
import { useAppSelector } from '@/store';
import { Meal } from '@/interfaces/meal.interface';
import { RootState } from '@/store';
import { setMealLoading, setHistoryFoodLoading } from '@/store/slices/load.slice';
import { resetEditMeal } from '@/store/slices/meal.slice';

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

    const MealEditForm: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const edit_meal = useAppSelector((state: RootState) => state.food_meal?.edit_meal) as Meal | null;
    const [showGrams, setShowGrams] = useState(false);
    const [showCustomServings, setShowCustomServings] = useState(false);
    
    const custom_food_loading = useAppSelector((state: RootState) => state.load.custom_food_loading);
    
    useEffect(()=>{
        dispatch(resetEditMeal())
    },[custom_food_loading])
    
    const initialValues: FormData = {
        grams: edit_meal?.grams ?? null,
        servings: edit_meal?.servings ?? 1,
    };

    useEffect(() => {
        if (edit_meal) {
        formik.setValues({
            grams: edit_meal.grams ?? null,
            servings: edit_meal.servings ?? null,
        });
        if (edit_meal.grams && !edit_meal.servings) {
            setShowGrams(true);
        } else {
            setShowGrams(false);
        }
        }
    }, [edit_meal]);

    const formik = useFormik<FormData>({
        initialValues: initialValues,
        validationSchema: formSchema,
        onSubmit: async (formData) => {
        if (edit_meal) {
            try {
            dispatch(setMealLoading(true));
            dispatch(setHistoryFoodLoading(true));
            const data = await updateMeal(formData, edit_meal.id);
            if ('error' in data) {
                dispatch(setToast({ message: data.error, type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
                return;
            } else if ('message' in data) {
                dispatch(setToast({ message: data.message, type: "success" }));
                setTimeout(() => dispatch(resetToast()), 4000);
                dispatch(resetEditMeal())
            }
            } catch (error) {
            console.error('Error updating meal:', error);
            dispatch(setToast({ message: 'An error occurred while updating the meal.', type: "error" }));
            setTimeout(() => dispatch(resetToast()), 3000);
            } finally {
            dispatch(setMealLoading(false));
            dispatch(setHistoryFoodLoading(false));
            }
        } else {
            dispatch(setToast({ message: "You need to choose meal.", type: "error" }));
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
        setShowGrams(false);
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
        {edit_meal && (
            <div className="max-w-md mx-auto mt-10 border rounded-lg shadow-md p-4">
            {edit_meal.food && (
                <>
                <div className="flex flex-col justify-between items-center p-2 bg-green-100 rounded-md">
                    <div className="text-gray-700 font-medium items-start text-base">
                        {edit_meal.food.name}
                        </div>
                        <div className="text-gray-500 text-xs">
                        P: {Math.round(edit_meal.food.protein)} g
                        F: {Math.round(edit_meal.food.fat)} g
                        C: {Math.round(edit_meal.food.carb)} g
                        
                        ({Math.round(edit_meal.food.cal)} kcal) / serving
                    </div>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-6 mt-4">
                    <div>
                    {edit_meal.food.g_per_serving ? (
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

                    {edit_meal.food.g_per_serving ? (
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
                        Edit Meal
                    </button>
                    </div>
                </form>
                </>
            )}
            {edit_meal.fat_secret_food && (
                <>
                <div className="flex flex-col justify-between items-center p-2 bg-green-100 rounded-md">
                    <div className="text-gray-700 font-medium text-base">
                    {edit_meal.fat_secret_food.name}
                    {edit_meal.fat_secret_food.brand_name ? (
                        <> ({edit_meal.fat_secret_food.brand_name})</>
                    ) : (
                        <> ({edit_meal.fat_secret_food.type})</>
                    )}
                    </div>
                    <div className="text-gray-500 text-xs">
                    P: {Math.round(edit_meal.fat_secret_food.protein_per_unit)} g
                    F: {Math.round(edit_meal.fat_secret_food.fat_per_unit)} g
                    C: {Math.round(edit_meal.fat_secret_food.carbs_per_unit)} g
                    ({Math.round(edit_meal.fat_secret_food.calories_per_unit)} kcal) / {edit_meal.fat_secret_food.unit}
                    </div>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-6 mt-4">
                    <div>
                    {edit_meal.fat_secret_food.unit === "100g" ? (
                        <div>
                        <input
                            id="grams"
                            name="grams"
                            type="number"
                            onChange={handleGramsChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.grams ?? ""}
                            className="w-[100px] px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        /> <span className='text-[15px]'> (g)</span>
                        {formik.touched.grams && formik.errors.grams ? (
                            <div className="text-red-600 text-sm">{formik.errors.grams}</div>
                        ) : null}
                        </div>
                    ) : (
                        <div>
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
                                    <span className='text-[15px]'> ({edit_meal.fat_secret_food.unit})</span>
                                </>
                            )}
                        </div>
                        {formik.touched.servings && formik.errors.servings ? (
                            <div className="text-red-600 text-sm">{formik.errors.servings}</div>
                            ) : null}
                        </div>
                    )}
                    </div>

                    <div>
                    <button
                        type="submit"
                        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Edit Meal
                    </button>
                    </div>
                </form>
                </>
            )}
            </div>
        )}
        </>
    );
};

export default MealEditForm;
