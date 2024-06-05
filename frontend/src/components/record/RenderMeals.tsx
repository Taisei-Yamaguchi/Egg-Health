'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { fetchMeals } from '@/backend_api/meal/fetchMeals';
import { Meal } from '@/interfaces/meal.interface';
import DeleteMealButton from '../meal/DeleteMeal';
import { setEditMeal, resetUsedFood } from '@/store/slices/meal.slice';
import { useAppSelector } from '@/store';
import { RootState } from '@/store';

interface Props {
    date: string;
}

const RenderMeals: React.FC<Props> = ({ date }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [meals, setMeals] = useState<{ [key: string]: Meal[] }>({});
    const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];
    const meal_loading = useAppSelector((state: RootState) => state.load.meal_loading) as boolean;

    useEffect(() => {
        const fetchData = async (mealType: string) => {
            try {
                const response = await fetchMeals(date, mealType);
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                } else if ('message' in response) {
                    setMeals(prevMeals => ({ ...prevMeals, [mealType]: response.data }));
                }
            } catch (error) {
                console.error('Error fetching meals:', error);
            }
        };

        mealTypes.forEach(mealType => fetchData(mealType));
    }, [meal_loading, date, dispatch]);

    const selectEditMeal = (meal: Meal) => {
        dispatch(setEditMeal(meal));
        resetUsedFood();
    };

    const calculateTotalCalories = (meals: Meal[]) => {
        return meals.reduce((total, meal) => total + (meal.intake_cal || 0), 0);
    };

    return (
        <div className="max-w-4xl mx-auto mt-4">
            {mealTypes.map(mealType => (
                <div key={mealType} className="mb-8 p-4 bg-yellow-50 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-semibold">
                            {mealType} {meals[mealType] && meals[mealType].length > 0 && (
                                <span className="text-sm text-gray-500">
                                    (Total {calculateTotalCalories(meals[mealType])} kcal)
                                </span>
                            )}
                        </h2>
                        <a href={`/dashboard/meal/${mealType}/${date}`} className="text-blue-500 underline">Record {mealType}</a>
                    </div>
                    {meals[mealType] && meals[mealType].length > 0 ? (
                        <div className="bg-white p-4 rounded-lg shadow">
                            {meals[mealType].map((meal) => (
                                <div key={meal.id} className="flex justify-between items-center border-b border-gray-200 py-2">
                                    <div className="w-1/2">
                                        <button className="text-left w-full hover:underline" onClick={() => selectEditMeal(meal)}>
                                            <div className='overflow-ellipsis overflow-hidden whitespace-nowrap'>{meal.food && meal.food.name}</div>
                                            <div className='overflow-ellipsis overflow-hidden whitespace-nowrap'>{meal.fat_secret_food && meal.fat_secret_food.name}</div>
                                        </button>
                                    </div>
                                    <div className="w-1/4 text-center">
                                        {meal.servings !== null ? (
                                            <>
                                                {meal.servings}
                                                {meal.food && ' servings'}
                                                {meal.fat_secret_food && ` ${meal.fat_secret_food.unit}`}
                                            </>
                                        ) : meal.grams !== null ? (
                                            `${meal.grams} g`
                                        ) : (
                                            "Serving information not available"
                                        )}
                                    </div>
                                    <div className="w-1/6 text-center">
                                        <strong>{Math.round(meal.intake_cal)}</strong> kcal
                                    </div>
                                    <div className="w-1/12 text-center text-red-600">
                                        <DeleteMealButton id={meal.id} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No meals recorded for {mealType}.</p>
                    )}
                </div>
            ))}
        </div>
    );
}

export default RenderMeals;