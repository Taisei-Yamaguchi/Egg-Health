import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Workout } from '@/interfaces/exercise.interface';
import { Exercise } from '@/interfaces/exercise.interface';
import { ExerciseSet } from '@/interfaces/exercise.interface';
import { ExercisePre } from '@/interfaces/exercise.interface';

export type ExerciseState = {
    used_workout: Workout | null;
    edit_exercise: Exercise | null;
    select_workout_list: Workout[] | null
    exercise_set_list: ExerciseSet[] | null
    edit_exercise_pre: ExercisePre | null
};

const defaultState: ExerciseState = {
    used_workout: null,
    edit_exercise: null,
    select_workout_list: null,
    exercise_set_list: null,
    edit_exercise_pre: null
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
            state.select_workout_list = null;
        },
        setExerciseSetList: (state, action: PayloadAction<ExerciseSet[]>) => {
            state.exercise_set_list = action.payload;
        },
        resetExerciseSetList: (state) => {
            state.exercise_set_list = null;
        },
        setEditExercisePre: (state, action: PayloadAction<ExercisePre>) => {
            state.edit_exercise_pre = action.payload;
        },
        resetEditExercisePre: (state) => {
            state.edit_exercise_pre = null;
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
    resetSelectWorkoutList,
    setExerciseSetList,
    resetExerciseSetList,
    setEditExercisePre,
    resetEditExercisePre
} = workoutExerciseSlice.actions;
export default workoutExerciseSlice.reducer;
