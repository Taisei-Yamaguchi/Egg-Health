"use server";
import { cookies } from "next/headers";
import { Monster } from "@/interfaces/monster.interface";
import { API_URL } from "@/config/envs";
// const API_URL = process.env.API_URL ?? "http://localhost:8000";

type MonsterResponse = 
    { error: string }
    | { message: string, data: {
        normal_monster: Monster | null,
        premium_monster: Monster | null,
        cat_monster: Monster | null,
        flame_monster: Monster | null,
        ghost_monster: Monster | null,
        dog_monster: Monster | null,
        dinosaur_monster: Monster | null,
        metal_monster: Monster | null,
        selected_stage: 0 | 1 | 2 | 3 | 4 | 5, 
        selected_type: "Normal" | "Premium" | "Cat" | "Flame" | "Ghost" | "Dog" | "Dinosaur" | "Metal"
    }}  
    | { detail: string };

export const fetchMonstersList = async (): Promise<MonsterResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    
    const response = await fetch(`${API_URL}/monsters/get-monster-list/`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            'Authorization': `Token ${token}`
        },
    });
    return response.json();
};
