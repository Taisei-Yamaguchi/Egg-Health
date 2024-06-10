"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { FatSecretFood, Food } from '@/interfaces/meal.interface';
import { setUsedFood, setUsedFatSecretFood, resetUsedFood, resetUsedFatSecretFood } from '@/store/slices/meal.slice';
import { useAppSelector } from '@/store';
import { RootState } from '@/store';
import ToggleOftenFoodButton from './ToggleOftenFoodButon';

const SelectFoodList: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [isExpanded, setIsExpanded] = useState(false); // State to manage expanded/collapsed state
    const custom_food_loading = useAppSelector((state: RootState) => state.load.custom_food_loading) as boolean;
    const select_food_list = useAppSelector((state: RootState) => state.food_meal.select_food_list);

    const selectFood = (selectedFood: Food | FatSecretFood) => {
        if ('food_id' in selectedFood) {
            dispatch(setUsedFatSecretFood(selectedFood as FatSecretFood)); // Dispatch the selected food
            dispatch(resetUsedFood());
        } else {
            dispatch(setUsedFood(selectedFood as Food)); // Dispatch the selected food
            dispatch(resetUsedFatSecretFood());
        }
    };

    return (
        <>{select_food_list && (
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
                                    <tr key={food.id} className="hover:bg-gray-100 cursor-pointer">
                                        <td className="px-2 py-2 text-sm text-gray-900 truncate max-w-xs" title={food.name} onClick={() => selectFood(food)}>
                                            {food.name}
                                        </td>
                                        <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                                            {'food_id' in food ? (
                                                <ToggleOftenFoodButton fatsecret_food={food as FatSecretFood} />
                                            ) : (
                                                <ToggleOftenFoodButton food={food as Food} />
                                            )}
                                        </td>
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
        )}</>
    );
};

export default SelectFoodList;
