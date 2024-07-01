"use server";
import { cookies } from "next/headers";
import { API_URL } from "@/config/envs";
// const API_URL = process.env.API_URL ?? "http://localhost:8000";

type LicenseResponse = 
    {error: string }
    | {message:string}  
    | {detail:string};

export const cancelSubscription = async (): Promise<LicenseResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    
    const response = await fetch(`${API_URL}/license/cancel-subscription/`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({}),
    });
    return response.json();
};
