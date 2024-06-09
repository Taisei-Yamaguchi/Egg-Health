import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type LoadState = {
	meal_loading: boolean;
    often_food_loading: boolean;
    history_food_loading: boolean;
    custom_food_loading: boolean;
	exercise_loading: boolean;
    history_workout_loading: boolean;
    custom_workout_loading: boolean;
	often_workout_loading: boolean;
};

const defaultState: LoadState = {
	meal_loading: false,
    often_food_loading: false,
    history_food_loading: false,
    custom_food_loading: false,
	exercise_loading: false,
    history_workout_loading: false,
    custom_workout_loading: false,
	often_workout_loading: false
};

export const loadSlice = createSlice({
	name: 'loading',
	initialState: defaultState,
	reducers: {
		setMealLoading: (state, action: PayloadAction<boolean>) => {
			state.meal_loading = action.payload;
		},
        setOftenFoodLoading: (state, action: PayloadAction<boolean>) => {
			state.often_food_loading = action.payload;
		},
        setHistoryFoodLoading: (state, action: PayloadAction<boolean>) => {
			state.history_food_loading = action.payload;
		},
        setCustomFoodLoading: (state, action: PayloadAction<boolean>) => {
			state.custom_food_loading = action.payload;
		},
		setExerciseLoading: (state, action: PayloadAction<boolean>) => {
			state.exercise_loading = action.payload;
		},
        setHistoryWorkoutLoading: (state, action: PayloadAction<boolean>) => {
			state.history_workout_loading = action.payload;
		},
        setCustomWorkoutLoading: (state, action: PayloadAction<boolean>) => {
			state.custom_workout_loading = action.payload;
		},
		setOftenWorkoutLoading: (state, action: PayloadAction<boolean>) => {
			state.often_workout_loading = action.payload;
		},
	}
});

export const { 
    setMealLoading ,
    setOftenFoodLoading, 
    setHistoryFoodLoading, 
    setCustomFoodLoading,
	setExerciseLoading,
	setCustomWorkoutLoading,
	setHistoryWorkoutLoading,
	setOftenWorkoutLoading
} = loadSlice.actions;

export default loadSlice.reducer;
