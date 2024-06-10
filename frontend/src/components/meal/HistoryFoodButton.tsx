"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import { resetToast, setToast } from "@/store/slices/toast.slice";
import { fetchFoodsHistory } from "@/backend_api/meal/fetchFoodsHistory";
import { FatSecretFood } from "@/interfaces/meal.interface";
import { setUsedFatSecretFood, resetUsedFood, setSelectFoodList } from "@/store/slices/meal.slice";
import { useAppSelector } from "@/store";
import { RootState } from "@/store";
import { resetMealSetList } from '@/store/slices/meal.slice';

const HistoryFoodButton: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [foods, setFoods] = useState<FatSecretFood[]>([]);
    const history_food_loading = useAppSelector(
        (state: RootState) => state.load.history_food_loading
    ) as boolean;

    const handleFetchData = async () => {
        try {
        const response = await fetchFoodsHistory();
        if ("error" in response) {
            dispatch(setToast({ message: response.error, type: "error" }));
            setTimeout(() => dispatch(resetToast()), 3000);
            return;
        }
        if ("message" in response) {
            dispatch(resetMealSetList())
            dispatch(setSelectFoodList(response.data));
        }
        } catch (error) {
        console.error("Error fetching history foods:", error);
        }
    };

    const selectFood = (selectedFood: FatSecretFood) => {
        dispatch(setUsedFatSecretFood(selectedFood)); // Dispatch the selected food
        dispatch(resetUsedFood());
    };

    return (
        <button
            className="cursor-pointer p-3 bg-gradient-to-b from-yellow-300 to-yellow-500 shadow-md rounded-lg flex flex-col items-center"
            onClick={handleFetchData}
        >
            <p className="text-xs font-normal text-gray-800">Choose from</p>
            <p className="text-sm font-bold text-gray-800 shadow-text">History</p>
        </button>
    );
};

export default HistoryFoodButton;
