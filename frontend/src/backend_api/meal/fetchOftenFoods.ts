"use server";
import { cookies } from "next/headers";
import { Food } from "@/interfaces/meal.interface";
import { FatSecretFood } from "@/interfaces/meal.interface";
import { API_URL } from "@/config/envs";
// const API_URL = process.env.API_URL ?? "http://localhost:8000";

type OftenFoodResponse = 
    {error: string }
    | {message:string, data: Array<Food | FatSecretFood>}  
    | {detail:string};

export const fetchOftenFoods = async (): Promise<OftenFoodResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    
    const response = await fetch(`${API_URL}/backend/meals/often-food-list/`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            'Authorization': `Token ${token}`
        },
    });
    return response.json();
};
