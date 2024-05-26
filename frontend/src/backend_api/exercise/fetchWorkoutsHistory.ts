"use server";
import { cookies } from "next/headers";
import { Workout } from "@/interfaces/exercise.interface";

const API_URL = process.env.API_URL ?? "http://localhost:8000";

type WorkoutResponse = 
    {error: string }
    | {message:string, data: Workout[]}  
    | {detail:string};

export const fetchWorkoutsHistory = async (): Promise<WorkoutResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    
    const response = await fetch(`${API_URL}/backend/exercises/get-workout-history/`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            'Authorization': `Token ${token}`
        },
    });
    return response.json();
};
