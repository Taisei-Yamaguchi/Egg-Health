"use server";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL ?? "http://localhost:8000";

type DeleteMealResponse = 
    {error: string }
    | {message:string}  
    | {detail:string};

export const deleteMeal = async (id:number): Promise<DeleteMealResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    const response = await fetch(`${API_URL}/backend/meals/delete-meal/${id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
    });
    return response.json();
};
