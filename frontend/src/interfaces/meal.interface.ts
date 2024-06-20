// food
export interface Food {
    id: number;
    name: string;
    cal: number;
    g_per_serving: number | null;
    
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
    polyunsaturated_fat: number;
    monounsaturated_fat: number;
    account: number;
}

// fatsecret_food
export interface FatSecretFood {
    id: number;
    food_id: string;
    name: string;
    type: string;
    brand_name: string | null;
    url: string;
    description: string;

    cal: number;
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
    saturated_fat: number;
    polyunsaturated_fat: number;
    monounsaturated_fat: number;
    unit: string;
}

// meal
export interface Meal {
    id: number;
    account: number;
    food: Food | null;
    fat_secret_food: FatSecretFood | null;
    date: string;
    servings: number | null;
    grams: number | null;
    meal_type: string;
    intake_cal: number;
    intake_protein: number;
    intake_fat: number;
    intake_carbs: number;
}

export interface FoodOften {
    id:number,
    food: Food | null,
    fatsecret_food: FatSecretFood | null
}

// meal pre
export interface MealPre {
    id: number;
    account: number;
    food: Food | null;
    fat_secret_food: FatSecretFood | null;
    servings: number | null;
    grams: number | null;
    intake_cal: number;
}

// meal set
export interface MealSet {
    meal_set_id: number,
    meal_set_name: string,
    meal_pres: MealPre[]
}

export interface MealSetModel {
    id: number,
    name: string,
    account: number
}