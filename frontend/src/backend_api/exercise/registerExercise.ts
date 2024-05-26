"use server";
import { cookies } from "next/headers";
import { Exercise } from "@/interfaces/exercise.interface";
const API_URL = process.env.API_URL ?? "http://localhost:8000";

type ExerciseInput = {
    workout: number,
    exercise_date: string,
    mins: number
}

type CreateExerciseResponse = 
    {error: string }
    | {message:string, data: Exercise}  
    | {detail:string};

export const registerExercise= async (formData:ExerciseInput): Promise<CreateExerciseResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    const response = await fetch(`${API_URL}/backend/exercises/create-exercise/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(formData),
    });
    return response.json()
};
