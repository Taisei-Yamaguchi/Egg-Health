"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import { resetToast, setToast } from "@/store/slices/toast.slice";
import { fetchCustomFoods } from "@/backend_api/meal/fetchCustomFoods";
import { setSelectFoodList } from "@/store/slices/meal.slice";
import { useAppSelector } from "@/store";
import { RootState } from "@/store";
import { resetMealSetList } from '@/store/slices/meal.slice';

const CustomFoodButton: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const custom_food_loading = useAppSelector(
        (state: RootState) => state.load.custom_food_loading
    ) as boolean;

    const handleFetchData = async () => {
        try {
        const response = await fetchCustomFoods();
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
        console.error("Error fetching custom foods:", error);
        }
    };

    return (
        <button
            className="cursor-pointer p-3 bg-gradient-to-b from-orange-300 to-orange-500 shadow-md rounded-lg flex flex-col items-center"
            onClick={handleFetchData}
            >
            <p className="text-base font-bold text-gray-800 shadow-text">My</p>
            <p className="text-xs font-normal text-gray-800 shadow-text">Custom Foods</p>
        </button>
    );
};

export default CustomFoodButton;
