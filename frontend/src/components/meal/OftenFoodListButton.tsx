"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import { resetToast, setToast } from "@/store/slices/toast.slice";
import { fetchOftenFoods } from "@/backend_api/meal/fetchOftenFoods";
import { setSelectFoodList } from "@/store/slices/meal.slice";
import { useAppSelector } from "@/store";
import { RootState } from "@/store";

const OftenFoodListButton: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const custom_food_loading = useAppSelector(
        (state: RootState) => state.load.custom_food_loading
    ) as boolean;

    const handleFetchData = async () => {
        try {
        const response = await fetchOftenFoods();
        if ("error" in response) {
            dispatch(setToast({ message: response.error, type: "error" }));
            setTimeout(() => dispatch(resetToast()), 3000);
            return;
        }
        if ("message" in response) {
            dispatch(setSelectFoodList(response.data));
        }
        } catch (error) {
        console.error("Error fetching custom foods:", error);
        }
    };

    return (
        <button
            className="cursor-pointer p-3 bg-gradient-to-b from-green-300 to-green-500 shadow-md rounded-lg flex flex-col items-center"
            onClick={handleFetchData}
            >
            <p className="text-base font-bold text-gray-800 shadow-text text-white ">Often</p>
        </button>
    );
};

export default OftenFoodListButton;
