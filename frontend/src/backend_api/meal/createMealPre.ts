"use server"
import { cookies } from "next/headers";
import { MealSet } from "@/interfaces/meal.interface";
import { MealPre } from "@/interfaces/meal.interface";

const API_URL = process.env.API_URL ?? "http://localhost:8000";

type MealInputWithFood = {
    food: number,
    servings: number | null,
    grams: number | null
}

type MealInputWithFatSecretFood = {
    fat_secret_food: number,
    servings: number | null,
    grams: number | null
}

type CreateMealResponse = 
    | { error: string }
    | { message: string, data: MealPre }
    | { detail: string };

export const createMealPre = async (formData: MealInputWithFood | MealInputWithFatSecretFood): Promise<CreateMealResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    const response = await fetch(`${API_URL}/backend/meals/create-meal-pre/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(formData),
    });
    return response.json();
};
