"use server";
import { Account } from "@/interfaces/account.interface";
import { API_URL } from "@/config/envs";
// const API_URL = process.env.API_URL ?? "http://localhost:8000";

type UserCredentials = {
    username: string;
    password: string;
};

type LoginResponse = 
    {error: string }
    | {message:string, account: Account,token:string, license: 'free' | 'premium' | 'premium_plus'}  
    | {detail:string};

export const fetchLogin = async (credentials: UserCredentials): Promise<LoginResponse> => {
    const response = await fetch(`${API_URL}/backend/accounts/signin/`, {
        method: "POST",
        headers: {
        "content-type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    return response.json();
};
