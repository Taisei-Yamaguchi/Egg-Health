"use server";
import { Account } from "@/interfaces/account.interface";

const API_URL = process.env.API_URL ?? "http://localhost:8000";

type FormData = {
    uid: string;
    otp: string;
};

type VerifyResponse = 
    {error: string }
    | {message:string, account: Account,token:string}  
    | {detail:string};

export const fetchVerify = async (credentials: FormData): Promise<VerifyResponse> => {
    const response = await fetch(`${API_URL}/backend/accounts/verify/`, {
        method: "POST",
        headers: {
        "content-type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    return response.json();
};
