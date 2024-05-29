"use server";
import { cookies } from "next/headers";
import { Exercise } from "@/interfaces/exercise.interface";

const API_URL = process.env.API_URL ?? "http://localhost:8000";

type ExerciseResponse = 
    {error: string }
    | {message:string, data: Exercise[]}  
    | {detail:string};

export const fetchExercises = async (date:string): Promise<ExerciseResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    
    const response = await fetch(`${API_URL}/backend/exercises/get-exercises/${date}/`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            'Authorization': `Token ${token}`
        },
    });
    return response.json();
};
