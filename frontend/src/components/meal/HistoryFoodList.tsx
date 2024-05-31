"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { fetchFoodsHistory } from '@/backend_api/meal/fetchFoodsHistory';
import { FatSecretFood } from '@/interfaces/meal.interface';
import { setUsedFatSecretFood } from '@/store/slices/meal.slice';
import { resetUsedFood } from '@/store/slices/meal.slice';
import { useAppSelector } from '@/store';
import { RootState } from '@/store';

const HistoryFoodList: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [foods, setFoods] = useState<FatSecretFood[]>([]);
    const [isExpanded, setIsExpanded] = useState(false); // State to manage expanded/collapsed state
    const history_food_loading = useAppSelector((state: RootState) => state.load.history_food_loading) as boolean;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchFoodsHistory();
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: 'error' }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                    return;
                }
                if ('message' in response) {
                    setFoods(response.data);
                }
            } catch (error) {
                console.error('Error fetching history foods:', error);
            }
        };
        fetchData();
    }, [history_food_loading]);

    // Function to toggle expanded state
    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const selectFood = (selectedFood: FatSecretFood) => {
        dispatch(setUsedFatSecretFood(selectedFood)); // Dispatch the selected food
        dispatch(resetUsedFood());
    };

    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="cursor-pointer" onClick={toggleExpanded}>
                <div className="p-4 bg-white shadow rounded-lg flex items-center justify-between">
                    <p className="text-lg font-semibold">Food in History</p>
                    {isExpanded ? <FaEyeSlash /> : <FaEye />}
                </div>
            </div>
            {isExpanded && ( // Conditional rendering based on isExpanded state
                <div className="flex flex-col mt-4 transition-all duration-500">
                    {foods.length > 0 ? (
                        foods.map((food) => (
                            <button key={food.id} className="flex justify-between p-4 bg-white shadow rounded-lg" onClick={() => selectFood(food)}>
                                <p className="text-sm font-semibold">{food.name}</p>
                                {food.brand_name ?(<>
                                    <p className="text-xs font-semibold">{food.brand_name}</p>
                                </>):(<>
                                    <p className="text-xs font-semibold">{food.type}</p>
                                </>)}
                                
                            </button>
                        ))
                    ) : (
                        <p className="text-gray-500">No food yet</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default HistoryFoodList;
