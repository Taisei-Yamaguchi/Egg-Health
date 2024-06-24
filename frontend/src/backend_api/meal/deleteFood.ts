"use server";
import { cookies } from "next/headers";
import { API_URL } from "@/config/envs";
// const API_URL = process.env.API_URL ?? "http://localhost:8000";

type DeleteFoodResponse = 
    {error: string }
    | {message:string}  
    | {detail:string};

export const deleteFood = async (id:number): Promise<DeleteFoodResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    const response = await fetch(`${API_URL}/meals/delete-food/${id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
    });
    return response.json();
};
