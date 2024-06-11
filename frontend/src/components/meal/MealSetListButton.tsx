"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import { resetToast, setToast } from "@/store/slices/toast.slice";
import { fetchOftenFoods } from "@/backend_api/meal/fetchOftenFoods";
import { setSelectFoodList } from "@/store/slices/meal.slice";
import { useAppSelector } from "@/store";
import { RootState } from "@/store";
import { resetSelectFoodList } from "@/store/slices/meal.slice";
import { setMealSetList } from "@/store/slices/meal.slice";
import { fetchMealSetList } from "@/backend_api/meal/fetchMealSetList";

const MealSetListButton: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleFetchData = async () => {
        try {
        const response = await fetchMealSetList();
        if ("error" in response) {
            dispatch(setToast({ message: response.error, type: "error" }));
            setTimeout(() => dispatch(resetToast()), 3000);
            return;
        }
        if ("message" in response) {
            dispatch(resetSelectFoodList())
            dispatch(setMealSetList(response.data));
        }
        } catch (error) {
        console.error("Error fetching meal set list:", error);
        }
    };

    return (
        <button
            className="cursor-pointer p-3 bg-gradient-to-b from-cyan-300 to-cyan-500 shadow-md rounded-lg flex flex-col items-center"
            onClick={handleFetchData}
            >
            <p className="text-base font-bold text-gray-800 shadow-text text-white ">Meal Set</p>
        </button>
    );
};

export default MealSetListButton;
