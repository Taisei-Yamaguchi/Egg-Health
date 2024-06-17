"use server";
import { cookies } from "next/headers";
import { ExercisePre } from "@/interfaces/exercise.interface";
import { API_URL } from "@/config/envs";
// const API_URL = process.env.API_URL ?? "http://localhost:8000";

type ExerciseInput = {
    mins: number
}

type UpdateExerciseResponse = 
    {error: string }
    | {message:string, data: ExercisePre}  
    | {detail:string};

export const updateExercisePre= async (formData:ExerciseInput,exercise_pre_id:number): Promise<UpdateExerciseResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    const response = await fetch(`${API_URL}/backend/exercises/update-exercise-pre/${exercise_pre_id}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(formData),
    });
    return response.json()
};
