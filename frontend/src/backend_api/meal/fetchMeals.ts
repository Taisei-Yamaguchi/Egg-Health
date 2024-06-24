"use server";
import { cookies } from "next/headers";
import { Meal } from "@/interfaces/meal.interface";
import { API_URL } from "@/config/envs";
// const API_URL = process.env.API_URL ?? "http://localhost:8000";

type MealResponse = 
    {error: string }
    | {message:string, data: Meal[]}  
    | {detail:string};

export const fetchMeals = async (date:string, meal_type:string): Promise<MealResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    
    const response = await fetch(`${API_URL}/backend/meals/get-meal/${date}/${meal_type}/`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            'Authorization': `Token ${token}`
        },
    });
    return response.json();
};
