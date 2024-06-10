import { Account } from "./account.interface";

export interface Workout {
    id: number;
    account: Account | null;  // account can be null
    name: string;
    ja_name: string;
    type: 'Daily Living Activities' | 'Cardio' | 'Walking・Running' | 'Strength Training' | 'Fitness' | 'Ball Sports' | 'Martial Arts' | 'Water and Winter Sports' | 'Other';
    mets: number;
    custom: boolean;
}

export interface Exercise {
    id: number;
    account: Account;
    workout: Workout;
    mins: number;
    consume_cal?: number;
    date: string;  // Assuming this is a string in 'YYYY-MM-DD' format
}

// exercise pre
export interface ExercisePre {
    id: number;
    account: number;
    workout: Workout;
    mins: number;
}

// exercise set
export interface ExerciseSet {
    exercise_set_id: number,
    exercise_set_name: string,
    exercise_pres: ExercisePre[]
}