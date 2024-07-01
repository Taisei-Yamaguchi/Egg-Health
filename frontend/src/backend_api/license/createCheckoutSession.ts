"use server";
import { cookies } from "next/headers";
import { API_URL } from "@/config/envs";
// const API_URL = process.env.API_URL ?? "http://localhost:8000";

type CheckoutInput = {
    item_license: 'premium' | 'premium_plus',
    item_period: 'monthly' | 'yearly'
}

type LicenseResponse = 
    {error: string }
    | {message:string, id:string}  
    | {detail:string};

export const createCheckoutSession = async (formData: CheckoutInput): Promise<LicenseResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    
    const response = await fetch(`${API_URL}/license/create-checkout-session/`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(formData),
    });
    return response.json();
};
