"use server";
import { cookies } from "next/headers";
import { DynamicDetail } from "@/interfaces/user_detail.inteface";

const API_URL = process.env.API_URL ?? "http://localhost:8000";

type DynamicResponse = 
    {error: string }
    | {message:string, data: DynamicDetail}  
    | {detail:string};

export const fetchDynamic = async (date:string): Promise<DynamicResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    
    const response = await fetch(`${API_URL}/backend/user-details/get-dynamic/${date}/`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            'Authorization': `Token ${token}`
        },
    });
    return response.json();
};
