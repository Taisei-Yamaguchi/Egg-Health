"use server";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL ?? "http://localhost:8000";

type ToggleOftenResponse = 
    {error: string }
    | {message:string}  
    | {detail:string};

type OftenWorkoutToggle = {workout_id: number }

export const toggleOftenWorkout= async (formData:OftenWorkoutToggle): Promise<ToggleOftenResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    const response = await fetch(`${API_URL}/backend/exercises/toggle-often-workout/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(formData),
    });
    return response.json();
};
