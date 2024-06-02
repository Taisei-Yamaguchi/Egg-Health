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
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex flex-col mt-4 h-56 overflow-y-auto transition-all duration-500">
                {select_food_list.length > 0 ? (
                    select_food_list.map((food) => (
                        <button key={food.id} className="p-4 bg-white shadow rounded-lg mb-2" onClick={() => selectFood(food)}>
                            <p className="text-sm font-semibold">{food.name}</p>
                        </button>
                    ))
                ) : (
                    <p className="text-gray-500">No food yet</p>
                )}
            </div>        
        </div>
    );
};

export default SelectFoodList;
