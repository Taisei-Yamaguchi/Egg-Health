"use server";
import { cookies } from "next/headers";
import { Workout } from "@/interfaces/exercise.interface";
const API_URL = process.env.API_URL ?? "http://localhost:8000";

type WorkoutInput = {
    name: string;
    mets: number;
    type: 'Living' | 'Aerobic' | 'Walk' | 'Run' | 'Muscle' | 'Sports Club' | 'Martial Arts' | 'Marine Winter' | 'Other';
}

type CreateWorkoutResponse = 
    {error: string }
    | {message:string, data: Workout}  
    | {detail:string};

export const createCustomWorkout = async (formData:WorkoutInput): Promise<CreateWorkoutResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    const response = await fetch(`${API_URL}/backend/exercises/create-custom-workout/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(formData),
    });
    return response.json()
};