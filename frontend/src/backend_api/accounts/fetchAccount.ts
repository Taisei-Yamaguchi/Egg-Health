"use server";
import { cookies } from "next/headers";
import { Account } from "@/interfaces/account.interface";
import { API_URL } from "@/config/envs";
// const API_URL = process.env.API_URL ?? "http://localhost:8000";

type AccountResponse = 
    {error: string }
    | {message:string, data: Account}  
    | {detail:string};

export const fetchAccount = async (): Promise<AccountResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    
    const response = await fetch(`${API_URL}/accounts/get/`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            'Authorization': `Token ${token}`
        },
    });
    return response.json();
};
