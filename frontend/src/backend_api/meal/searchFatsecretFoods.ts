"use server";
import { cookies } from "next/headers";
import { FatSecretFood } from "@/interfaces/meal.interface";

const API_URL = process.env.API_URL ?? "http://localhost:8000";

type FoodResponse = 
    {error: string }
    | {message:string, data: FatSecretFood[]}  
    | {detail:string};

export const searchFatsecretFoods = async (search_key:string): Promise<FoodResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    
    const response = await fetch(`${API_URL}/backend/meals/search-fatsecret/?search_key=${search_key}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            'Authorization': `Token ${token}`
        },
    });
    return response.json();
};
