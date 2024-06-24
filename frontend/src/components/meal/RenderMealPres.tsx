// src/components/RenderMealsByType.tsx
'use client';
import React , { useEffect ,useState}from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { fetchMeals } from '@/backend_api/meal/fetchMeals';
import { Meal } from '@/interfaces/meal.interface';
import DeleteMealButton from './DeleteMeal';
import ToggleOftenFoodButton from './ToggleOftenFoodButon';
import { setEditMeal, resetUsedFood } from '@/store/slices/meal.slice';
import { RootState } from '@/store';
import LatestMealButton from "@/components/meal/LatestMealButton";
import { MealPre } from '@/interfaces/meal.interface';
import DeleteMealPreButton from './DeleteMealPre';
import { setEditMealPre } from '@/store/slices/meal.slice';

interface Props {
    meal_pres: MealPre[]
}

const RenderMealPres: React.FC<Props> = ({ meal_pres }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    
    const selectEditMealPre = async (meal_pre: MealPre) => {
        dispatch(setEditMealPre(meal_pre));
        resetUsedFood();
    };

    const totalIntakeCal = meal_pres.reduce((total, meal) => total + (meal.intake_cal || 0), 0);

    return (
        <>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
                <span className='text-sm font-semi-bold'>Total: {Math.round(totalIntakeCal)} kcal</span>
            </div>
            <div className="lg:mx-auto sm:w-full lg:max-w-sm max-h-[357px] overflow-y-auto">
                {meal_pres.length > 0 ? (
                    <table className="min-w-full divide-y divide-green-200 border border-green-400">
                        <thead className="bg-green-100">
                            <tr>
                                <th className="px-2 py-1 text-left text-xs font-medium text-green-800">item</th>
                                <th className="px-2 py-1 text-center text-xs font-medium text-green-800">amount</th>
                                <th className="px-2 py-1 text-center text-xs font-medium text-green-800">kcal</th>
                                <th className="px-2 py-1 text-center text-xs font-medium text-green-800">often</th>
                                <th className="px-2 py-1 text-center text-xs font-medium text-green-800">delete</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-green-200">
                            {meal_pres.map((meal) => (
                                <tr key={meal.id} className="whitespace-nowrap">
                                    <td className="px-2 py-1 text-xs font-medium text-gray-900 w-32">
                                        <button className='w-[120px] hover:border-b' onClick={() => selectEditMealPre(meal)}>
                                            <div className='overflow-ellipsis overflow-hidden whitespace-nowrap'>{meal.food && meal.food.name}</div>
                                            <div className='overflow-ellipsis overflow-hidden whitespace-nowrap'>{meal.fat_secret_food && meal.fat_secret_food.name}</div>
                                        </button>
                                    </td>
                                    <td className="px-2 py-1 text-center text-xs text-gray-900">
                                        {meal.servings !== null ? (
                                            <>
                                                {meal.servings}
                                                {meal.food && ' servings'}
                                                {meal.fat_secret_food && ` ${meal.fat_secret_food.unit}`}
                                            </>
                                        ) : meal.grams !== null ? (
                                            `${meal.grams} (g)`
                                        ) : (
                                            "Serving information not available"
                                        )}
                                    </td>
                                    <td className="px-2 py-1 text-center text-xs text-gray-900">
                                        <strong>{Math.round(meal.intake_cal)}</strong> kcal
                                    </td>
                                    <td className="px-2 py-1 text-center text-xs text-gray-900">
                                        {meal.food ? (
                                            <ToggleOftenFoodButton food={meal.food} />
                                        ) : (
                                            <ToggleOftenFoodButton fatsecret_food={meal.fat_secret_food!} />
                                        )}
                                    </td>
                                    <td className="px-2 py-1 text-center text-xs text-red-600">
                                        <DeleteMealPreButton id={meal.id} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No meals recorded for this meal set.</p>
                )}
            </div>
        </>
    );
};

export default RenderMealPres;
