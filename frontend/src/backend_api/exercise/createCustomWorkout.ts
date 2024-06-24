"use server";
import { cookies } from "next/headers";
import { Workout } from "@/interfaces/exercise.interface";
import { API_URL } from "@/config/envs";
// const API_URL = process.env.API_URL ?? "http://localhost:8000";

type WorkoutInput = {
    name: string;
    mets: number;
    type: 'Daily Living Activities' | 'Cardio' | 'Walking・Running' | 'Strength Training' | 'Fitness' | 'Ball Sports' | 'Martial Arts' | 'Water and Winter Sports' | 'Other';
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
    const response = await fetch(`${API_URL}/exercises/create-custom-workout/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(formData),
    });
    return response.json()
};
