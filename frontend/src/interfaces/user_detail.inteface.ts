export interface DynamicDetail {
    id: number;
    account: number; // ForeignKey to Account
    date: string; // YYYY-MM-DD
    weight: number | null;
    body_fat: number | null;
}

export interface StaticDetail {
    id: number;
    account: number; // ForeignKey to Account
    tall: number | null;
    birthday: string | null; // Date in ISO format (YYYY-MM-DD)
    sex: 'male' | 'female' | null;
    bmr: number | null;
    active_level: 'very low' | 'low' | 'middle' | 'high' | 'very high'; // Updated with all possible choices
    tdee: number | null; // Added to match the model
}

export interface GoalDetail {
    id: number;
    account: number; // ForeignKey to Account
    goal_weight: number; // Removed null as it has a default value of 60
    goal_body_fat: number | null;
    goal_consume_cal: number | null;
    goal_intake_cal: number | null;
    target_date: string | null; // Date in ISO format (YYYY-MM-DD)
    set_date: string; // Date in ISO format (YYYY-MM-DD)
    goal_type: 'diet' | 'maintain' | 'bulk'; // Updated with all possible choices
}
