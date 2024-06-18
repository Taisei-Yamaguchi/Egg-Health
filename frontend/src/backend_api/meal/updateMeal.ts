"use server";
import { cookies } from "next/headers";
import { Meal } from "@/interfaces/meal.interface";
import { API_URL } from "@/config/envs";
// const API_URL = process.env.API_URL ?? "http://localhost:8000";

type MealInput = {
    servings: number | null,
    grams: number | null
}

type UpdateMealResponse = 
    {error: string }
    | {message:string, data: Meal}  
    | {detail:string};

export const updateMeal= async (formData:MealInput,meal_id:number): Promise<UpdateMealResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    const response = await fetch(`${API_URL}/backend/meals/update-meal/${meal_id}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(formData),
    });
    return response.json()
};
