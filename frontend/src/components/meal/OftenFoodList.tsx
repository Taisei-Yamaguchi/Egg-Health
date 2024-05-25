"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { Food } from '@/interfaces/meal.interface';
import { setUsedFood } from '@/store/slices/meal_form.slice';
import { fetchOftenFoods } from '@/backend_api/meal/fetchOftenFoods';
import { useAppSelector } from '@/store';
import { RootState } from '@/store';

const OftenFoodList: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [foods, setFoods] = useState<Food[]>([]);
    const [isExpanded, setIsExpanded] = useState(false); // State to manage expanded/collapsed state
    const often_food_loading = useAppSelector((state: RootState) => state.load.often_food_loading) as boolean;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchOftenFoods();
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: 'error' }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                    return;
                }
                if ('message' in response) {
                    setFoods(response.data);
                }
            } catch (error) {
                console.error('Error fetching custom foods:', error);
            }
        };
        fetchData();
    }, [often_food_loading]);

    // Function to toggle expanded state
    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const selectFood = (selectedFood: Food) => {
        dispatch(setUsedFood(selectedFood)); // Dispatch the selected food
    };

    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="cursor-pointer" onClick={toggleExpanded}>
                <div className="p-4 bg-white shadow rounded-lg flex items-center justify-between">
                    <p className="text-lg font-semibold">Often Food</p>
                    {isExpanded ? <FaEyeSlash /> : <FaEye />}
                </div>
            </div>
            {isExpanded && ( // Conditional rendering based on isExpanded state
                <div className="mt-4 transition-all duration-500">
                    {foods.length > 0 ? (
                        foods.map((food) => (
                            <div key={food.id} className="p-4 bg-white shadow rounded-lg" onClick={() => selectFood(food)}>
                                <p className="text-lg font-semibold">{food.name}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No food yet</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default OftenFoodList;
