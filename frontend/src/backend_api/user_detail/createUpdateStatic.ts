"use server";
import { cookies } from "next/headers";
import { StaticDetail } from "@/interfaces/user_detail.inteface";
import { API_URL } from "@/config/envs";
// const API_URL = process.env.API_URL ?? "http://localhost:8000";

type StaticInput = {
    tall: number | null;
    birthday: string | null; // Date in ISO format (YYYY-MM-DD)
    sex: 'male' | 'female' | null;
    bmr: number | null;
    active_level: 'very low' |'low' | 'middle' | 'high' |'very high'| null;
}

type StaticDetailResponse = 
    {error: string }
    | {message:string, data: StaticDetail}  
    | {detail:string};

export const createUpdateStatic= async (formData:StaticInput): Promise<StaticDetailResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    const response = await fetch(`${API_URL}/backend/user-details/create-update-static/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(formData),
    });
    console.log(response)
    return response.json()
};
