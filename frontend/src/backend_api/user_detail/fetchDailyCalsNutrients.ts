"use server";
import { cookies } from "next/headers";
import { API_URL } from "@/config/envs";
// const API_URL = process.env.API_URL ?? "http://localhost:8000";

type Data = {
    sum_intake_cal:number,
    sum_intake_protein:number,
    sum_intake_fat:number,
    sum_intake_carbs:number,
    total_consume_cal:number,
}

type DynamicResponse = 
    {error: string }
    | {message:string, data:Data}  
    | {detail:string};

export const fetchDailyCalsNutrients = async (date:string): Promise<DynamicResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    
    const response = await fetch(`${API_URL}/backend/user-details/daily-cals-nutrients/${date}/`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            'Authorization': `Token ${token}`
        },
    });
    return response.json();
};