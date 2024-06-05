"use server";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL ?? "http://localhost:8000";

type DayData = {
    check_breakfast: boolean,
    check_lunch: boolean,
    check_dinner: boolean,
    check_snack: boolean,
    check_exercise: boolean,
    check_weight: boolean,
    check_body_fat: boolean
}

type MonthData ={
    date:string,
    meal: boolean,
    exercise: boolean,
    weight: boolean
}

type CheckResponse = 
    {error: string }
    | {message:string, data:DayData}  
    | {detail:string};

type CheckResponseMonth = 
    {error: string }
    | {message:string, data:MonthData[]}  
    | {detail:string};

export const checkInputStatus = async (date:string): Promise<CheckResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    
    const response = await fetch(`${API_URL}/backend/user-details/check-input/${date}/`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            'Authorization': `Token ${token}`
        },
    });
    return response.json();
};

export const checkInputStatusByMonth = async (month:string): Promise<CheckResponseMonth> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    
    const response = await fetch(`${API_URL}/backend/user-details/check-input-month/${month}/`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            'Authorization': `Token ${token}`
        },
    });
    return response.json();
};