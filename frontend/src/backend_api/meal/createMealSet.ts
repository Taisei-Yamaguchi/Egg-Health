"use server"
import { cookies } from "next/headers";
import { MealSetModel } from "@/interfaces/meal.interface";
import { API_URL } from "@/config/envs";
// const API_URL = process.env.API_URL ?? "http://localhost:8000";

type MealInput = {
    name:string;
}

type CreateMealResponse = 
    | { error: string }
    | { message: string, data: MealSetModel }
    | { detail: string };

export const createMealSet = async (formData: MealInput): Promise<CreateMealResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    const response = await fetch(`${API_URL}/meals/create-meal-set/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(formData),
    });
    return response.json();
};
