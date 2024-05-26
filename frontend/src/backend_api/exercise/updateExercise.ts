"use server";
import { cookies } from "next/headers";
import { Exercise } from "@/interfaces/exercise.interface";
const API_URL = process.env.API_URL ?? "http://localhost:8000";

type ExerciseInput = {
    mins: number
}

type UpdateExerciseResponse = 
    {error: string }
    | {message:string, data: Exercise}  
    | {detail:string};

export const updateExercise= async (formData:ExerciseInput,exercise_id:number): Promise<UpdateExerciseResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    const response = await fetch(`${API_URL}/backend/exercises/update-exercise/${exercise_id}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(formData),
    });
    return response.json()
};
