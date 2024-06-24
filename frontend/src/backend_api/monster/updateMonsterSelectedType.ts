"use server";
import { cookies } from "next/headers";
import { API_URL } from "@/config/envs";
// const API_URL = process.env.API_URL ?? "http://localhost:8000";
import { MonsterSelected } from "@/interfaces/monster.interface";

type MonsterResponse = 
    {error: string }
    | {message:string, data: MonsterSelected}  
    | {detail:string};

type MonsterUpdateInput =  {selected_monster: "Normal" | "Premium" | "Cat"}

export const updateMonsterType= async (formData:MonsterUpdateInput): Promise<MonsterResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    const response = await fetch(`${API_URL}/backend/monsters/update-monster-selected/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(formData),
    });
    return response.json()
};
