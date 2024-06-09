"use server";
import { cookies } from "next/headers";
import { Monster } from "@/interfaces/monster.interface";

const API_URL = process.env.API_URL ?? "http://localhost:8000";

type MonsterResponse = 
    {error: string }
    | {message:string, data:{monster:Monster, selected_stage:0|1|2|3|4|5}}  
    | {detail:string};

export const fetchSelectedMonster = async (): Promise<MonsterResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    
    const response = await fetch(`${API_URL}/backend/monsters/get-monster/`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            'Authorization': `Token ${token}`
        },
    });
    return response.json();
};