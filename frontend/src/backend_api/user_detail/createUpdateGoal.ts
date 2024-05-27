"use server";
import { cookies } from "next/headers";
import { GoalDetail } from "@/interfaces/user_detail.inteface";
const API_URL = process.env.API_URL ?? "http://localhost:8000";

type GoalInput = {
    goal_weight: number | null,
    goal_body_fat: number | null,
    goal_intake_cal: number | null,
    goal_consume_cal: number | null,
}

type GoalDetailResponse = 
    {error: string }
    | {message:string, data: GoalDetail}  
    | {detail:string};

export const createUpdateGoal= async (formData:GoalInput): Promise<GoalDetailResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    const response = await fetch(`${API_URL}/backend/user-details/create-update-goal/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(formData),
    });
    return response.json()
};
