"use server";
import { cookies } from "next/headers";
import { GoalDetail } from "@/interfaces/user_detail.inteface";
import { API_URL } from "@/config/envs";
// const API_URL = process.env.API_URL ?? "http://localhost:8000";

type GoalResponse = 
    {error: string }
    | {message:string, data: GoalDetail | null}  
    | {detail:string};

export const fetchGoal = async (): Promise<GoalResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    
    const response = await fetch(`${API_URL}/backend/user-details/get-goal/`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            'Authorization': `Token ${token}`
        },
    });
    return response.json();
};
