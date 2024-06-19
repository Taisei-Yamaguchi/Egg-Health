"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import { resetToast, setToast } from "@/store/slices/toast.slice";
import { setMealLoading } from "@/store/slices/load.slice";
import { createMealWithLatest } from "@/backend_api/meal/createMealsWithLatest";
import { fetchLatestMeals } from "@/backend_api/meal/fetchLatestMeals";
import { Meal } from "@/interfaces/meal.interface";
import { MdHistory } from "react-icons/md";  // Import the icon
import { useAppSelector } from "@/store";
import { RootState } from "@/store";

interface Props {
    date: string;
    meal_type: "Breakfast" | "Lunch" | "Dinner" | "Snack";
}

const LatestMealButton: React.FC<Props> = ({ date, meal_type }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [latestMeals, setLatestMeals] = useState<Meal[]>([]);
    const [isHovered, setIsHovered] = useState(false);
    const license = useAppSelector((state: RootState) => state.license.license);
    
    useEffect(() => {
        const fetchData = async () => {
            if (!license || license === 'free') {
                console.log('This feature is for premium users.');
                return;
            }
    
            try {
                const response = await fetchLatestMeals(meal_type);
                if ("error" in response) {
                    dispatch(setToast({ message: response.error, type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                    return;
                } else if ("message" in response) {
                    setLatestMeals(response.data);
                }
            } catch (error) {
                console.error("Error fetching latest meals:", error);
            }
        };
        fetchData();
    }, [meal_type, dispatch,license]);

    const handleCreateMeal = async () => {
        if (!license || license === 'free') {
            console.log('This feature is for premium users.');
            return;
        }

        try {
            dispatch(setMealLoading(true));
            const response = await createMealWithLatest({
                date: date,
                meal_type: meal_type,
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

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button
                className=" flex items-center justify-center p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                onClick={handleCreateMeal}
            >
                <MdHistory size={20} /> 
            </button>
            {isHovered && (
                <div className="absolute z-10 p-2 bg-white border-2 border-blue-500 rounded shadow-lg w-64 ml-2 mt-2">
                    <div className="border-2 border-blue-500 p-2 rounded-md bg-blue-50">
                        <ul>
                            {latestMeals.map((meal, index) => (
                                <li key={index} className="text-xs text-gray-700 truncate">
                                    {meal.food ? meal.food.name : meal.fat_secret_food?.name}
                                </li>
                            ))}
                        </ul>
                        {!license || license === 'free' &&(
                        <div className="font-bold">
                            This is for premium
                        </div>)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LatestMealButton;
