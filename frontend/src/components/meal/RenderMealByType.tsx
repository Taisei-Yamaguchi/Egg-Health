'use client';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { fetchMeals } from '@/backend_api/meal/fetchMeals';
import { Meal } from '@/interfaces/meal.interface';
import DeleteMealButton from './DeleteMeal';
import ToggleOftenFoodButton from './ToggleOftenFoodButon';
import { setEditMeal, resetUsedFood } from '@/store/slices/meal.slice';
import { RootState } from '@/store';
import LatestMealButton from "@/components/meal/LatestMealButton";

interface Props {
    date: string;
    meal_type: "Breakfast" | "Lunch" | "Dinner" | "Snack";
}

const RenderMealsByType: React.FC<Props> = ({ date, meal_type }) => {
    const dispatch = useAppDispatch();
    const [meals, setMeals] = useState<Meal[]>([]);
    const meal_loading = useAppSelector((state: RootState) => state.load.meal_loading) as boolean;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchMeals(date, meal_type);
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                    return;
                } if ('message' in response) {
                    setMeals(response.data);
                }
            } catch (error) {
                console.error('Error fetching meals:', error);
            }
        };
        fetchData();
    }, [meal_loading]);

    const selectEditMeal = async (meal: Meal) => {
        dispatch(setEditMeal(meal));
        resetUsedFood();
    };

    const totalIntakeCal = meals.reduce((total, meal) => total + (meal.intake_cal || 0), 0);

    return (
        <>
            <div className="sm:mx-auto md:w-full sm:max-w-sm flex justify-between items-center">
                {/* <LatestMealButton date={date} meal_type={meal_type} /> */}
                <div className='flex items-center'>
                    <span className='text-xs mr-2'>{date}  </span>
                    <span className='text-sm font-medium mr-2'>{meal_type}</span>
                    <span className='text-sm font-semi-bold'>(Total: {Math.round(totalIntakeCal)} kcal)</span>
                </div>
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm max-h-[357px] max-md:h-auto overflow-y-auto">
                {meals.length > 0 ? (
                    <table className="min-w-full divide-y divide-green-200 border border-green-400">
                        <thead className="bg-green-100">
                            <tr>
                                <th className="px-2 py-1 text-left text-xs font-medium text-green-800">item</th>
                                <th className="px-2 py-1 text-center text-xs font-medium text-green-800">amount</th>
                                <th className="px-2 py-1 text-center text-xs font-medium text-green-800">kcal</th>
                                {/* <th className="px-2 py-1 text-center text-xs font-medium text-green-800">often</th> */}
                                <th className="px-2 py-1 text-center text-xs font-medium text-green-800">delete</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-green-200">
                            {meals.map((meal) => (
                                <tr key={meal.id} className="whitespace-nowrap">
                                    <td className="px-2 py-1 text-xs font-medium text-gray-900 w-32">
                                        <button className='w-[120px] hover:border-b' onClick={() => selectEditMeal(meal)}>
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
                                    {/* <td className="px-2 py-1 text-center text-xs text-gray-900">
                                        {meal.food ? (
                                            <ToggleOftenFoodButton food={meal.food} />
                                        ) : (
                                            <ToggleOftenFoodButton fatsecret_food={meal.fat_secret_food!} />
                                        )}
                                    </td> */}
                                    <td className="px-2 py-1 text-center text-xs text-red-600">
                                        <DeleteMealButton id={meal.id} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No meals recorded for {meal_type}.</p>
                )}
            </div>
        </>
    );
};

export default RenderMealsByType;
