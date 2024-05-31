import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Workout } from '@/interfaces/exercise.interface';
import { Exercise } from '@/interfaces/exercise.interface';

export type ExerciseState = {
    used_workout: Workout | null;
    edit_exercise: Exercise | null;
};

const defaultState: ExerciseState = {
    used_workout: null,
    edit_exercise: null,
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
    }
});

//? Action creators are generated for each case reducer function
export const { setUsedWorkout, resetUsedWorkout,setEditExercise,resetEditExercise } = workoutExerciseSlice.actions;
export default workoutExerciseSlice.reducer;
