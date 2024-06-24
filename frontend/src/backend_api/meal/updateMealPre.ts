"use server";
import { cookies } from "next/headers";
import { MealPre } from "@/interfaces/meal.interface";
import { API_URL } from "@/config/envs";
// const API_URL = process.env.API_URL ?? "http://localhost:8000";

type MealInput = {
    servings: number | null,
    grams: number | null
}

type UpdateMealResponse = 
    {error: string }
    | {message:string, data: MealPre}  
    | {detail:string};

export const updateMealPre= async (formData:MealInput,meal_pre_id:number): Promise<UpdateMealResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    const response = await fetch(`${API_URL}/meals/update-meal-pre/${meal_pre_id}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(formData),
    });
    return response.json()
};
