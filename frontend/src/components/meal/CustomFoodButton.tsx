"use client";
import React from "react";
import { useAppDispatch } from "@/store";
import { resetToast, setToast } from "@/store/slices/toast.slice";
import { fetchCustomFoods } from "@/backend_api/meal/fetchCustomFoods";
import { setSelectFoodList } from "@/store/slices/meal.slice";
import { resetMealSetList } from '@/store/slices/meal.slice';
import { useAppSelector } from "@/store";
import { RootState } from "@/store";
import { useEffect } from "react";

const CustomFoodButton: React.FC = () => {
    const dispatch = useAppDispatch();
    const custom_food_loading = useAppSelector((state: RootState) => state.load.custom_food_loading);

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

    useEffect(()=>{
        handleFetchData()
    },[custom_food_loading])

    return (
        <button
            className="w-[60px] h-[50px] cursor-pointer p-3 bg-gradient-to-b from-orange-300 to-orange-500 hover:from-orange-400 hover:to-orange-600 shadow-md rounded-lg flex flex-col items-center"
            onClick={handleFetchData}
            >
            <p className="text-sm font-bold text-white shadow-text">Custom</p>
            <p className="text-[10px] font-normal text-white shadow-text"> Foods</p>
        </button>
    );
};

export default CustomFoodButton;
