"use server";
import { cookies } from "next/headers";
import { ExerciseSet } from "@/interfaces/exercise.interface";

const API_URL = process.env.API_URL ?? "http://localhost:8000";

type ExerciseSetResponse = 
    {error: string }
    | {message:string, data: ExerciseSet[]}  
    | {detail:string};

export const fetchExerciseSetList = async (): Promise<ExerciseSetResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    
    const response = await fetch(`${API_URL}/backend/exercises/get-exercise-set-list/`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            'Authorization': `Token ${token}`
        },
    });
    return response.json();
};
