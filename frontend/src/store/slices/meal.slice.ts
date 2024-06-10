import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Food, Meal, FatSecretFood, MealPre, MealSet } from '@/interfaces/meal.interface';
import { FoodOften } from '@/interfaces/meal.interface';

export type FoodState = {
    used_food: Food | null;
    edit_meal: Meal | null;
    used_fatsecret_food: FatSecretFood | null
    select_food_list: Array<Food | FatSecretFood> | null
    meal_set_list: MealSet[] | null
    
};

const defaultState: FoodState = {
    used_food: null,
    edit_meal: null,
    used_fatsecret_food: null,
    select_food_list: null,
    meal_set_list: null
};

export const foodMealSlice = createSlice({
    name: 'food_meal',
    initialState: defaultState,
    reducers: {
        setUsedFood: (state, action: PayloadAction<Food >) => {
            state.used_food = action.payload;
        },
        resetUsedFood: (state) => {
            state.used_food = null;
        },
        setEditMeal: (state, action: PayloadAction<Meal>) => {
            state.edit_meal = action.payload;
        },
        resetEditMeal: (state) => {
            state.edit_meal = null;
        },
        setUsedFatSecretFood: (state, action: PayloadAction<FatSecretFood >) => {
            state.used_fatsecret_food = action.payload;
        },
        resetUsedFatSecretFood: (state) => {
            state.used_fatsecret_food = null;
        },
        setSelectFoodList: (state, action: PayloadAction<Array<Food | FatSecretFood> >) => {
            state.select_food_list = action.payload;
        },
        resetSelectFoodList: (state) => {
            state.select_food_list = null;
        },
        setMealSetList: (state, action: PayloadAction<MealSet[] >) => {
            state.meal_set_list = action.payload;
        },
        resetMealSetList: (state) => {
            state.meal_set_list = null;
        },
    }
});

//? Action creators are generated for each case reducer function
export const { 
    setUsedFood, 
    resetUsedFood,
    setEditMeal,
    resetEditMeal,
    setUsedFatSecretFood,
    resetUsedFatSecretFood, 
    setSelectFoodList,
    resetSelectFoodList,
    setMealSetList,
    resetMealSetList
} = foodMealSlice.actions;
export default foodMealSlice.reducer;
