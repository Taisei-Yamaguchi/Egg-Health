"use server";
import { cookies } from "next/headers";
import { MonsterSelected } from "@/interfaces/monster.interface";
const API_URL = process.env.API_URL ?? "http://localhost:8000";

type MonsterResponse = 
    {error: string }
    | {message:string, data:MonsterSelected}  
    | {detail:string};

type MonsterUpdateInput =  {selected_stage:0|1|2|3|4|5}

export const updateMonsterStage= async (formData:MonsterUpdateInput): Promise<MonsterResponse> => {
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
