// food
export interface Food {
    id: number;
    name: string;
    cal: number;
    g_per_serving: number | null;
    food_type: string;
    ex_api_id: string | null;
    custom: boolean;
    often: boolean;
    carb: number;
    fat: number;
    protein: number;
    sugars: number;
    dietary_fiber: number;
    salt: number;
    sodium: number;
    potassium: number;
    calcium: number;
    magnesium: number;
    iron: number;
    zinc: number;
    vitamin_a: number;
    vitamin_d: number;
    vitamin_e: number;
    vitamin_b1: number;
    vitamin_b2: number;
    vitamin_b12: number;
    vitamin_b6: number;
    vitamin_c: number;
    niacin: number;
    cholesterol: number; 
    saturated_fat: number ;
    account: number | null;
}

// meal
export interface Meal {
    id: number;
    account: number;
    food: Food;
    date: string;
    servings: number | null;
    grams: number | null;
    meal_type: string;
    intake_cal: number;
}