import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { toastSlice, authSlice, foodMealSlice , loadSlice, workoutExerciseSlice, dateSlice, latestWeightSlice, licenseSlice} from './slices';

export const mainStore = configureStore({
    reducer: {
        toast: toastSlice,
        auth: authSlice,
        food_meal: foodMealSlice,
        load: loadSlice,
        workout_exercise: workoutExerciseSlice,
        date: dateSlice,
        latest_weight: latestWeightSlice,
        license: licenseSlice
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof mainStore.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof mainStore.dispatch;

export { default as Providers } from './Providers';

//? Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
