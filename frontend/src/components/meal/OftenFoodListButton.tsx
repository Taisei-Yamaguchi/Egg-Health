"use client";
import React from "react";
import { useAppDispatch } from "@/store";
import { resetToast, setToast } from "@/store/slices/toast.slice";
import { fetchOftenFoods } from "@/backend_api/meal/fetchOftenFoods";
import { setSelectFoodList } from "@/store/slices/meal.slice";
import { resetMealSetList } from '@/store/slices/meal.slice';
import { useAppSelector } from "@/store";
import { RootState } from "@/store";

const OftenFoodListButton: React.FC = () => {
    const dispatch = useAppDispatch();
    const license = useAppSelector((state: RootState) => state.license.license);
    
    const handleFetchData = async () => {
        // free plan cannot 
        if(!license || license =='free'){
            console.log('this is for premium')
            return
        }
        try {
        const response = await fetchOftenFoods();
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
            className="w-[60px] h-[50px] cursor-pointer p-3 bg-gradient-to-b from-green-300 to-green-500 hover:from-green-400 hover:to-green-600 shadow-md rounded-lg flex flex-col items-center"
            onClick={handleFetchData}
            >
            <p className="text-sm font-bold shadow-text text-white self-center">Often</p>
        </button>
    );
};

export default OftenFoodListButton;
