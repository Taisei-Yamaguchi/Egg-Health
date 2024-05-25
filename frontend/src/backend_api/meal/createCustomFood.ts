"use server";
import { cookies } from "next/headers";
import { Food } from "@/interfaces/meal.interface";
const API_URL = process.env.API_URL ?? "http://localhost:8000";

type FoodInput = {
    name: string;
    cal: number;
    g_per_serving: number | null;
    food_type: string;
    carb: number | null;
    fat: number | null;
    protein: number | null;
    sugars: number | null;
    dietary_fiber: number | null;
    salt: number | null;
    sodium: number | null;
    potassium: number | null;
    calcium: number | null;
    magnesium: number | null;
    iron: number | null;
    zinc: number | null;
    vitamin_a: number | null;
    vitamin_d: number | null;
    vitamin_e: number | null;
    vitamin_b1: number | null;
    vitamin_b2: number | null;
    vitamin_b12: number | null;
    vitamin_b6: number | null;
    vitamin_c: number | null;
    niacin: number | null;
    cholesterol: number | null;
    saturated_fat: number | null;
}

type CreateFoodResponse = 
    {error: string }
    | {message:string, data: Food}  
    | {detail:string};

export const createCustomFood = async (formData:FoodInput): Promise<CreateFoodResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    const response = await fetch(`${API_URL}/backend/meals/create-food/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(formData),
    });
    return response.json()
};
