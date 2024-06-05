"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { fetchCustomFoods } from '@/backend_api/meal/fetchCustomFoods';
import { FatSecretFood, Food } from '@/interfaces/meal.interface';
import { setUsedFood } from '@/store/slices/meal.slice';
import { resetUsedFatSecretFood } from '@/store/slices/meal.slice';
import { useAppSelector } from '@/store';
import { RootState } from '@/store';
import { setUsedFatSecretFood } from '@/store/slices/meal.slice';
import { resetUsedFood } from '@/store/slices/meal.slice';

const SelectFoodList: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [isExpanded, setIsExpanded] = useState(false); // State to manage expanded/collapsed state
    const custom_food_loading = useAppSelector((state: RootState) => state.load.custom_food_loading) as boolean;
    const select_food_list = useAppSelector((state: RootState) => state.food_meal.select_food_list);

    const selectFood = (selectedFood: Food | FatSecretFood) => {
        console.log(selectedFood)
        if('food_id' in selectedFood){
            dispatch(setUsedFatSecretFood(selectedFood as FatSecretFood)); // Dispatch the selected food
            dispatch(resetUsedFood());
        } else {
            dispatch(setUsedFood(selectedFood as Food)); // Dispatch the selected food
            dispatch(resetUsedFatSecretFood());
        }
    };

    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white border border-gray-300 rounded-md">
                <div className="bg-green-100 px-4 py-2 text-left text-xs font-medium text-gray-500 rounded-t-md">
                Select Menu
                </div>
                <div className="flex flex-col h-56 overflow-y-auto">
                {select_food_list.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="bg-white divide-y divide-gray-200">
                        {select_food_list.map((food) => (
                        <tr key={food.id} className="hover:bg-gray-100 cursor-pointer" onClick={() => selectFood(food)}>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{food.name}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500 p-4">No food yet</p>
                )}
                </div>
            </div>
        </div>
    );
};

export default SelectFoodList;
