"use server"
import { cookies } from "next/headers";
import { Account } from "@/interfaces/account.interface";
import { API_URL } from "@/config/envs";
// const API_URL = process.env.API_URL ?? "http://localhost:8000";

type AccountInput = {password:string} | {nickname:string}

type UpdateAccountResponse = 
    | { error: string }
    | { message: string, data: Account }
    | { detail: string };

export const updateAccount = async (formData: AccountInput): Promise<UpdateAccountResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    const response = await fetch(`${API_URL}/accounts/update/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(formData),
    });
    return response.json();
};
