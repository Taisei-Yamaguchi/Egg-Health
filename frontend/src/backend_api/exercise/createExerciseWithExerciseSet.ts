"use server"
import { cookies } from "next/headers";
import { Exercise } from "@/interfaces/exercise.interface";
import { API_URL } from "@/config/envs";
// const API_URL = process.env.API_URL ?? "http://localhost:8000";

type ExerciseInput = {
    date: string,
    exercise_set_id: number
}

type CreateMealResponse = 
    | { error: string }
    | { message: string, data: Exercise[] }
    | { detail: string };

export const createExerciseWithExerciseSet = async (formData: ExerciseInput): Promise<CreateMealResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    const response = await fetch(`${API_URL}/backend/exercises/create-exercise-with-exercise-set/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(formData),
    });
    return response.json();
};
