"use server";
import { cookies } from "next/headers";
import { Food } from "@/interfaces/meal.interface";

const API_URL = process.env.API_URL ?? "http://localhost:8000";

type FoodResponse = 
    {error: string }
    | {message:string, data: Food[]}  
    | {detail:string};

export const fetchCustomFoods = async (): Promise<FoodResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    
    const response = await fetch(`${API_URL}/backend/meals/custom-food-list/`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            'Authorization': `Token ${token}`
        },
    });
    return response.json();
};
