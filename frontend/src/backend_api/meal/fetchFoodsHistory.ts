"use server";
import { cookies } from "next/headers";
import { FatSecretFood } from "@/interfaces/meal.interface";
import { API_URL } from "@/config/envs";
// const API_URL = process.env.API_URL ?? "http://localhost:8000";

type FoodResponse = 
    {error: string }
    | {message:string, data: FatSecretFood[]}  
    | {detail:string};

export const fetchFoodsHistory = async (): Promise<FoodResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    
    const response = await fetch(`${API_URL}/meals/get-food-history/`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            'Authorization': `Token ${token}`
        },
    });
    return response.json();
};
