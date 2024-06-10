"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { useAppSelector } from '@/store';
import { RootState } from '@/store';
import CreateMealWithMealSetButton from './CreateMealWithMealSet';
import DeleteMealSetButton from './DeleteMealSet';
import { MealSet } from '@/interfaces/meal.interface';

interface Props {
    date: string;
    meal_type: "Breakfast" | "Lunch" | "Dinner" | "Snack";
}

const MealSetList: React.FC<Props> = ({ meal_type, date }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const meal_set_list = useAppSelector((state: RootState) => state.food_meal.meal_set_list);
    const [hoveredMealSet, setHoveredMealSet] = useState<number | null>(null);

    return (
        <>
            {meal_set_list && (
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white border border-gray-300 rounded-md">
                        <div className="bg-green-100 px-4 py-2 text-left text-xs font-medium text-gray-500 rounded-t-md">
                            Select Meal Set
                        </div>
                        <div className="flex flex-col h-56 overflow-y-auto">
                            {meal_set_list.length > 0 ? (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {meal_set_list.map((meal_set) => (
                                            <tr
                                                key={meal_set.meal_set_id}
                                                className="relative hover:bg-gray-100"
                                                onMouseEnter={() => setHoveredMealSet(meal_set.meal_set_id)}
                                                onMouseLeave={() => setHoveredMealSet(null)}
                                            >
                                                <CreateMealWithMealSetButton
                                                    meal_set={meal_set}
                                                    date={date}
                                                    meal_type={meal_type}
                                                />
                                                <td className="px-2 py-2 text-center text-xs text-gray-900">
                                                    edit
                                                </td>
                                                <td className="px-2 py-2 text-center text-xs text-red-600">
                                                    <DeleteMealSetButton id={meal_set.meal_set_id} />
                                                </td>
                                                {hoveredMealSet === meal_set.meal_set_id && (
                                                    <td colSpan={3} className="absolute top-full left-0 w-1/2 bg-white border-2 border-green-500 rounded shadow-lg z-10">
                                                        <div className="border-2 border-green-500 p-2 rounded-md bg-green-50">
                                                            <ul>
                                                                {meal_set.meal_pres.map((meal_pre, index) => (
                                                                    <li key={index} className="text-xs text-gray-700 truncate">
                                                                        {meal_pre.food ? meal_pre.food.name : meal_pre.fat_secret_food?.name}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-gray-500 p-4">No meal set created yet</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MealSetList;
