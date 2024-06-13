"use server";
import { Account } from "@/interfaces/account.interface";

const API_URL = process.env.API_URL ?? "http://localhost:8000";

type GoogleLoginResponse = 
    {error: string }
    | {message:string, account: Account,token:string}  
    | {detail:string};

export const googleLogin = async (id_token: string): Promise<GoogleLoginResponse> => {
    try {
        const response= await fetch(`${API_URL}/backend/accounts/google-sign-in/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: id_token }),
        });

        if (!response.ok) {
            throw new Error('Failed to authenticate with Django');
        }

        return await response.json();
    } catch (error) {
        console.error('Google Login Error:', error);
        return { error: 'Failed to authenticate with Google' };
    }
};