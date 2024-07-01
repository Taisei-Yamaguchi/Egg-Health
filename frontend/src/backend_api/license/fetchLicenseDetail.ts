"use server";
import { cookies } from "next/headers";
import { API_URL } from "@/config/envs";
import { LicenseDetail } from "@/interfaces/license.interface";
// const API_URL = process.env.API_URL ?? "http://localhost:8000";

type LicenseResponse = 
    {error: string }
    | {message:string, data: LicenseDetail}  
    | {detail:string};

export const fetchLicenseDetail = async (): Promise<LicenseResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value; // Ensure to get the token value
    if (!token) {
        return { error: "Token not found" };
    }
    
    const response = await fetch(`${API_URL}/license/get-license-detail/`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            'Authorization': `Token ${token}`
        },
    });
    return response.json();
};
