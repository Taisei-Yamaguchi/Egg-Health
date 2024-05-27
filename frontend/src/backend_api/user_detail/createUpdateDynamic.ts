"use server";
import { cookies } from "next/headers";
import { DynamicDetail } from "@/interfaces/user_detail.inteface";
const API_URL = process.env.API_URL ?? "http://localhost:8000";

type DynamicInput = {
    weight: number | null,
    body_fat: number | null,
    date: string
}

type DynamicDetailResponse = 
    {error: string }
    | {message:string, data: DynamicDetail}  
    | {detail:string};

export const createUpdateDynamic= async (formData:DynamicInput): Promise<DynamicDetailResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    const response = await fetch(`${API_URL}/backend/user-details/create-update-dynamic/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(formData),
    });
    return response.json()
};
