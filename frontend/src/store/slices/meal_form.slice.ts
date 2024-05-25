import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Food } from '@/interfaces/meal.interface';
import { Meal } from '@/interfaces/meal.interface';

export type FoodState = {
    used_food: Food | null;
    edit_meal: Meal | null;
};

const defaultState: FoodState = {
    used_food: null,
    edit_meal: null,
};

export const foodMealSlice = createSlice({
    name: 'food_meal',
    initialState: defaultState,
    reducers: {
        setUsedFood: (state, action: PayloadAction<Food>) => {
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
    }
});

//? Action creators are generated for each case reducer function
export const { setUsedFood, resetUsedFood,setEditMeal,resetEditMeal } = foodMealSlice.actions;
export default foodMealSlice.reducer;
