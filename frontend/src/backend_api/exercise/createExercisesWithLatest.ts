"use server"
import { cookies } from "next/headers";
import { Exercise } from "@/interfaces/exercise.interface";
import { API_URL } from "@/config/envs";
// const API_URL = process.env.API_URL ?? "http://localhost:8000";

type ExerciseInput = {
    date: string,
}

type CreateExerciseResponse = 
    | { error: string }
    | { message: string, data: Exercise[] }
    | { detail: string };

export const createExerciseWithLatest = async (formData: ExerciseInput): Promise<CreateExerciseResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    const response = await fetch(`${API_URL}/exercises/create-exercises-with-latest-exercise/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(formData),
    });
    return response.json();
};
