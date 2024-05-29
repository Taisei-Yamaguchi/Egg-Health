"use server";
import { cookies } from "next/headers";
const API_URL = process.env.API_URL ?? "http://localhost:8000";

type BMRData = {bmr: number, active_level: "low" | "middle" | "high"} 
type BMRResponse = 
    {error: string }
    | {message:string, data: BMRData}  
    | {detail:string};

export const fetchBMR = async (): Promise<BMRResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    
    const response = await fetch(`${API_URL}/backend/user-details/get-bmr/`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            'Authorization': `Token ${token}`
        },
    });
    return response.json();
};