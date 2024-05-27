export interface DynamicDetail {
    id: number;
    account: number;
    date: string; // YYYY-MM-DD
    weight: number | null;
    body_fat: number | null;
}

export interface StaticDetail {
    id: number;
    account: number; // Assuming account is the foreign key to the Account model
    tall: number | null;
    birthday: string | null; // Date in ISO format (YYYY-MM-DD)
    sex: 'male' | 'female' | null;
    bmr: number | null;
    active_level: 'low' | 'middle' | 'high';
}

export interface GoalDetail {
    id: number;
    account: number; // Assuming account is the foreign key to the Account model
    goal_weight: number | null;
    goal_body_fat: number | null;
    goal_consume_cal: number | null;
    goal_intake_cal: number | null;
}
