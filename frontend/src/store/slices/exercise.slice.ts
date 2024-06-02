import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Workout } from '@/interfaces/exercise.interface';
import { Exercise } from '@/interfaces/exercise.interface';

export type ExerciseState = {
    used_workout: Workout | null;
    edit_exercise: Exercise | null;
    select_workout_list: Workout[]
};

const defaultState: ExerciseState = {
    used_workout: null,
    edit_exercise: null,
    select_workout_list: []
};

export const workoutExerciseSlice = createSlice({
    name: 'workout_exercise',
    initialState: defaultState,
    reducers: {
        setUsedWorkout: (state, action: PayloadAction<Workout>) => {
            state.used_workout = action.payload;
        },
        resetUsedWorkout: (state) => {
            state.used_workout = null;
        },
        setEditExercise: (state, action: PayloadAction<Exercise>) => {
            state.edit_exercise = action.payload;
        },
        resetEditExercise: (state) => {
            state.edit_exercise = null;
        },
        setSelectWorkoutList: (state, action: PayloadAction<Workout[]>) => {
            state.select_workout_list = action.payload;
        },
        resetSelectWorkoutList: (state) => {
            state.select_workout_list = [];
        },
    }
});

//? Action creators are generated for each case reducer function
export const { 
    setUsedWorkout, 
    resetUsedWorkout,
    setEditExercise,
    resetEditExercise,
    setSelectWorkoutList,
    resetSelectWorkoutList
} = workoutExerciseSlice.actions;
export default workoutExerciseSlice.reducer;
