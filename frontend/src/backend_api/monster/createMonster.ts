"use server";
import { cookies } from "next/headers";
import { Monster } from "@/interfaces/monster.interface";
import { API_URL } from "@/config/envs";
// const API_URL = process.env.API_URL ?? "http://localhost:8000";

type MonsterResponse = 
    {error: string }
    | {message:string, data:Monster }
    | {detail:string};

type MonsterInput =  {monster_type: "Normal" | "Premium" |"Cat" | "Flame" | "Ghost" | "Dog" |"Metal" |"Dinosaur"}

export const createMonster= async (formData:MonsterInput): Promise<MonsterResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    const response = await fetch(`${API_URL}/monsters/create-monster/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(formData),
    });
    return response.json()
};
