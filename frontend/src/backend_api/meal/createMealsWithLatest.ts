"use server"
import { cookies } from "next/headers";
import { Meal } from "@/interfaces/meal.interface";

const API_URL = process.env.API_URL ?? "http://localhost:8000";

type MealInput = {
    date: string,
    meal_type: "Breakfast" | "Lunch" | "Dinner" | "Snack",
}

type CreateMealResponse = 
    | { error: string }
    | { message: string, data: Meal[] }
    | { detail: string };

export const createMealWithLatest = async (formData: MealInput): Promise<CreateMealResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    const response = await fetch(`${API_URL}/backend/meals/create-meals-with-latest-meal/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(formData),
    });
    return response.json();
};
