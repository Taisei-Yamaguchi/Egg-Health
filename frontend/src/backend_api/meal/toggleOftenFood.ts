"use server";
import { cookies } from "next/headers";
import { API_URL } from "@/config/envs";
// const API_URL = process.env.API_URL ?? "http://localhost:8000";

type ToggleOftenResponse = 
    {error: string }
    | {message:string}  
    | {detail:string};

type OftenFoodToggle = {food_id: number } | {fatsecret_food_id: number}

export const toggleOftenFood= async (formData:OftenFoodToggle): Promise<ToggleOftenResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    const response = await fetch(`${API_URL}/backend/meals/toggle-often-food/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(formData),
    });
    return response.json();
};
