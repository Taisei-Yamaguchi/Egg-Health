"use server"
import { cookies } from "next/headers";
import { ExerciseSet } from "@/interfaces/exercise.interface";
import { API_URL } from "@/config/envs";
// const API_URL = process.env.API_URL ?? "http://localhost:8000";

type ExerciseInput = {
    name:string;
}

type UpdateExerciseResponse = 
    | { error: string }
    | { message: string, data: ExerciseSet }
    | { detail: string };

export const updateExerciseSet = async (id:number,formData: ExerciseInput): Promise<UpdateExerciseResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    const response = await fetch(`${API_URL}/exercises/update-exercise-set/${id}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(formData),
    });
    return response.json();
};
