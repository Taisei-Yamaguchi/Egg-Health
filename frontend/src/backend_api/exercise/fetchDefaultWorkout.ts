"use server";
import { Workout } from "@/interfaces/exercise.interface";
import { API_URL } from "@/config/envs";
// const API_URL = process.env.API_URL ?? "http://localhost:8000";

type WorkoutResponse = 
    {error: string }
    | {message:string, data: Workout[]}  
    | {detail:string};

export const fetchDefaultWorkoutsByType = async (type:string): Promise<WorkoutResponse> => {
    const response = await fetch(`${API_URL}/exercises/get-default-workouts/${type}/`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    });
    return response.json();
};

export const fetchDefaultWorkoutsBySearch = async (search_key:string): Promise<WorkoutResponse> => {
    const response = await fetch(`${API_URL}/exercises/get-default-workouts/?search_key=${search_key}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    });
    return response.json();
};