"use server";
import { cookies } from "next/headers";
const API_URL = process.env.API_URL ?? "http://localhost:8000";

type IntakeCalResponse = 
    {error: string }
    | {message:string, data: {date:string, sum_intake_cal:number}[]}  
    | {detail:string};

export const fetchIntakeCal = async (): Promise<IntakeCalResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    
    const response = await fetch(`${API_URL}/backend/user-details/get-meal-cal/`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            'Authorization': `Token ${token}`
        },
    });
    return response.json();
};