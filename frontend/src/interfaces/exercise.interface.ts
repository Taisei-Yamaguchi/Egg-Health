import { Account } from "./account.interface";

export interface Workout {
    id: number;
    account: Account | null;  // account can be null
    name: string;
    type: 'Living' | 'Aerobic' | 'Walk' | 'Run' | 'Muscle' | 'Sports Club' | 'Martial Arts' | 'Marine Winter' | 'Other';
    mets: number;
    custom: boolean;
}

export interface Exercise {
    id: number;
    account: Account;
    workout: Workout;
    mins: number;
    consume_cal?: number;
    exercise_date: string;  // Assuming this is a string in 'YYYY-MM-DD' format
}