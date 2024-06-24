"use server";
import { cookies } from "next/headers";
import { ExerciseSet } from "@/interfaces/exercise.interface";
import { API_URL } from "@/config/envs";
// const API_URL = process.env.API_URL ?? "http://localhost:8000";

type ExerciseSetResponse = 
    {error: string }
    | {message:string, data: ExerciseSet}  
    | {detail:string};

export const fetchExerciseSet = async (exercise_set_id:number): Promise<ExerciseSetResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    
    const response = await fetch(`${API_URL}/exercises/get-exercise-set/${exercise_set_id}/`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            'Authorization': `Token ${token}`
        },
    });
    return response.json();
};
