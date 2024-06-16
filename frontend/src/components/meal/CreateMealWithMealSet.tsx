"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import { resetToast, setToast } from "@/store/slices/toast.slice";
import { createMealWithMealSet } from "@/backend_api/meal/createMealWithMealSet";
import { setMealLoading } from "@/store/slices/load.slice";
import { MealSet } from "@/interfaces/meal.interface";

interface Props {
    date: string;
    meal_type: "Breakfast" | "Lunch" | "Dinner" | "Snack";
    meal_set: MealSet;
}

const CreateMealWithMealSetButton: React.FC<Props> = ({ date, meal_type, meal_set }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    
    const handleCreateMeal = async () => {
        try {
            dispatch(setMealLoading(true));
            const response = await createMealWithMealSet({
                date: date,
                meal_type: meal_type,
                meal_set_id: meal_set.meal_set_id
            });
            if ("error" in response) {
                dispatch(setToast({ message: response.error, type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
                return;
            } else if ("message" in response) {
                dispatch(setToast({ message: response.message, type: "success" }));
                setTimeout(() => dispatch(resetToast()), 4000);
            }
        } catch (error) {
            console.error("Error registering meal:", error);
            dispatch(setToast({ message: "An error occurred while registering the meal.", type: "error" }));
            setTimeout(() => dispatch(resetToast()), 3000);
        } finally {
            dispatch(setMealLoading(false));
        }
    };

    const totalIntakeCal = meal_set.meal_pres.reduce((total, meal) => total + (meal.intake_cal || 0), 0);

    return (
        <td
            className="relative px-2 py-2 text-sm text-gray-900 truncate max-w-xs hover:text-gray-400 cursor-pointer"
            title={meal_set.meal_set_name}
            onClick={handleCreateMeal}
        >
            <span className="font-semibold">{meal_set.meal_set_name}</span>
            <span> (Total: {Math.round(totalIntakeCal)} kcal)</span>
        </td>
    );
};

export default CreateMealWithMealSetButton;
