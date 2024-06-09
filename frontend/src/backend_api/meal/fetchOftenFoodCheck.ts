"use server";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL ?? "http://localhost:8000";

type ResData = {
    id: number,
    food: number | null,
    fatsecret_food: number | null
}

type OftenFoodResponse = 
    {error: string }
    | {message:string, data: ResData[]}  
    | {detail:string};

export const fetchOftenFoodCheck = async (): Promise<OftenFoodResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    
    const response = await fetch(`${API_URL}/backend/meals/often-food-check/`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            'Authorization': `Token ${token}`
        },
    });
    return response.json();
};
