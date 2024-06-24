"use server";
import { cookies } from "next/headers";
import { MealSet } from "@/interfaces/meal.interface";
import { API_URL } from "@/config/envs";
// const API_URL = process.env.API_URL ?? "http://localhost:8000";

type MealSetResponse = 
    {error: string }
    | {message:string, data: MealSet[]}  
    | {detail:string};

export const fetchMealSetList = async (): Promise<MealSetResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    
    const response = await fetch(`${API_URL}/meals/get-meal-set-list/`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            'Authorization': `Token ${token}`
        },
    });
    return response.json();
};
