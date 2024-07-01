"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import { resetToast, setToast } from "@/store/slices/toast.slice";
import { resetSelectFoodList, setMealSetList } from "@/store/slices/meal.slice";
import { fetchMealSetList } from "@/backend_api/meal/fetchMealSetList";
import { useAppSelector } from "@/store";
import { RootState } from "@/store";

const MealSetListButton: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const license = useAppSelector((state: RootState) => state.license.license);
    const set_loading = useAppSelector((state: RootState) => state.load.set_loading);

    useEffect(() => {
        if (set_loading) {
            handleFetchData();
        }
    }, [set_loading, dispatch]);

    const handleFetchData = async () => {
        if (!license || license === 'free') {
            router.push('/dashboard/premium');
            return;
        }
        try {
            const response = await fetchMealSetList();
            if ("error" in response) {
                dispatch(setToast({ message: response.error, type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
                return;
            }
            if ("message" in response) {
                dispatch(resetSelectFoodList());
                dispatch(setMealSetList(response.data));
            }
        } catch (error) {
            dispatch(setToast({ message: 'An error occurred.', type: "error" }));
            setTimeout(() => dispatch(resetToast()), 3000);
        }
    };

    return (
        <div className="relative inline-block">
            <button
                className="w-[60px] h-[50px] cursor-pointer p-3 bg-gradient-to-b from-cyan-300 to-cyan-500 hover:from-cyan-400 hover:to-cyan-600 shadow-md rounded-lg flex flex-col items-center"
                onClick={handleFetchData}
            >
                <p className="text-[10px] font-normal text-white shadow-text"> Meal</p>
                <p className="text-sm font-bold text-white shadow-text">Set</p>
            </button>
            
            <span className="absolute top-[-10px] right-[-10px] text-[8px] bg-gradient-to-b from-gray-200 to-gray-400 text-black px-1 py-0.5 rounded-full font-bold">
                Premium
            </span>
            
        </div>
    );
};

export default MealSetListButton;
