"use server";
import { cookies } from "next/headers";
import { API_URL } from "@/config/envs";
// const API_URL = process.env.API_URL ?? "http://localhost:8000";

type MealExerciseCalData = {date:string, sum_intake_cal:number, sum_exercise_cal: number}
type MealExerciseCalResponse = 
    {error: string }
    | {message:string, data: MealExerciseCalData[]}  
    | {detail:string};

export const fetchMealExerciseCal = async (): Promise<MealExerciseCalResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    
    const response = await fetch(`${API_URL}/user-details/get-exercise-meal-cal/`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            'Authorization': `Token ${token}`
        },
    });
    return response.json();
};