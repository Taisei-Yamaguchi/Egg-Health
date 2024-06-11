"use server"
import { cookies } from "next/headers";
import { MealSet } from "@/interfaces/meal.interface";

const API_URL = process.env.API_URL ?? "http://localhost:8000";

type MealInput = {
    name:string;
}

type UpdateMealResponse = 
    | { error: string }
    | { message: string, data: MealSet }
    | { detail: string };

export const updateMealSet = async (id:number,formData: MealInput): Promise<UpdateMealResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    const response = await fetch(`${API_URL}/backend/meals/update-meal-set/${id}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(formData),
    });
    return response.json();
};
