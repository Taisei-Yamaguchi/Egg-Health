"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import { resetToast, setToast } from "@/store/slices/toast.slice";
import { resetSelectFoodList } from "@/store/slices/meal.slice";
import { setMealSetList } from "@/store/slices/meal.slice";
import { fetchMealSetList } from "@/backend_api/meal/fetchMealSetList";

const MealSetListButton: React.FC = () => {
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
            className="w-[60px] h-[50px]  cursor-pointer p-3 bg-gradient-to-b from-cyan-300 to-cyan-500 hover:from-cyan-400 hover:to-cyan-600 shadow-md rounded-lg flex flex-col items-center"
            onClick={handleFetchData}
            >
                <p className="text-[10px] font-normal text-white shadow-text"> Meal</p>
                <p className="text-sm font-bold text-white shadow-text">Set</p>
        </button>
    );
};

export default MealSetListButton;
