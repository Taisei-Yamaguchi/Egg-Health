'use server';
import { API_URL } from "@/config/envs";
// const API_URL = process.env.API_URL ?? "http://127.0.0.1:8000";

export type UserSignUp = {
    nickname: string;
    username: string;
    password: string;
};

export const fetchSignup = async (newUser: UserSignUp) => {
    const response = await fetch(`${API_URL}/backend/accounts/signup/`, {
        method: "POST",
        headers: {
        "content-type": "application/json",
        },
        body: JSON.stringify(newUser),
    });

    const data = await response.json();
    return data;
};
