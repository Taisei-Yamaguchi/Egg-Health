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
    carb: number | null;
    fat: number | null;
    protein: number | null;
    sugars: number | null;
    dietary_fiber: number | null;
    salt: number | null;
    sodium: number | null;
    potassium: number | null;
    calcium: number | null;
    magnesium: number | null;
    iron: number | null;
    zinc: number | null;
    vitamin_a: number | null;
    vitamin_d: number | null;
    vitamin_e: number | null;
    vitamin_b1: number | null;
    vitamin_b2: number | null;
    vitamin_b12: number | null;
    vitamin_b6: number | null;
    vitamin_c: number | null;
    niacin: number | null;
    cholesterol: number | null;
    saturated_fat: number | null;
    account: number;
}

// meal
export interface Meal {
    id: number;
    account: number;
    food: Food;
    meal_date: string;
    servings: number | null;
    grams: number | null;
    meal_type: string;
}
