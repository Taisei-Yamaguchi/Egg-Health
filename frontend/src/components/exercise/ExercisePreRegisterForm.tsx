'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { registerExercise } from '@/backend_api/exercise/registerExercise';
import { RootState } from '@/store';
import { setExerciseLoading, setHistoryWorkoutLoading } from '@/store/slices/load.slice';
import { Workout } from '@/interfaces/exercise.interface';
import { resetUsedWorkout } from '@/store/slices/exercise.slice';
import { createExercisePre } from '@/backend_api/exercise/createExercisePre';

const formSchema = yup.object().shape({
    mins: yup
        .number()
        .min(1, "Mins must be greater than 0")
});

type FormData = {
    mins: number;
};

const FORM_DATA: FormData = {
    mins: 10
};

interface Props {
    exercise_set_id: number
}

const ExercisePreRegisterForm: React.FC<Props> = ({ exercise_set_id }) => {
    const dispatch = useAppDispatch();
    const used_workout = useAppSelector((state: RootState) => state.workout_exercise?.used_workout) as Workout | null;

    const formik = useFormik<FormData>({
        initialValues: FORM_DATA,
        validationSchema: formSchema,
        onSubmit: async (formData) => {
        if (used_workout) {
            try {
            dispatch(setExerciseLoading(true));
            //   dispatch(setHistoryWorkoutLoading(true));
            const data = await createExercisePre({
                ...formData,
                workout: used_workout.id,
                exercise_set:exercise_set_id
            });
            if ('error' in data) {
                dispatch(setToast({ message: data.error, type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
            } else if ('message' in data) {
                dispatch(setToast({ message: data.message, type: "success" }));
                setTimeout(() => dispatch(resetToast()), 4000);
                dispatch(resetUsedWorkout())
            }
            } catch (error) {
            console.error('Error registering exercise:', error);
            dispatch(setToast({ message: 'An error occurred while registering the exercise.', type: "error" }));
            setTimeout(() => dispatch(resetToast()), 3000);
            } finally {
            dispatch(setExerciseLoading(false));
            //   dispatch(setHistoryWorkoutLoading(false));
            }
        } else {
            dispatch(setToast({ message: "You need to choose a workout.", type: "error" }));
            setTimeout(() => dispatch(resetToast()), 3000);
            return;
        }
        },
    });

    return (
        <>
        {used_workout && (
            <div className="max-w-md mx-auto mt-10 border rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center p-2 bg-red-100 rounded-md">
                <div className="text-gray-700 font-medium">
                {used_workout.name}
                </div>
                <div className="text-gray-500 text-sm">
                {/* Optional caloric display can go here */}
                </div>
            </div>
            <form onSubmit={formik.handleSubmit} className="space-y-6 mt-4">
                <div>
                <label htmlFor="mins" className="block text-sm font-medium text-gray-700">
                    Mins
                </label>
                <input
                    type="number"
                    id="mins"
                    name="mins"
                    value={formik.values.mins}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={clsx(
                    "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 pl-2",
                    {
                        "border-2 border-red-500 bg-red-100 text-red-800":
                        formik.touched.mins && formik.errors.mins,
                    }
                    )}
                    autoComplete="off"
                />
                {formik.errors.mins && formik.touched.mins && (
                    <p className="text-red-500 ml-1 my-3 text-xs">{formik.errors.mins}</p>
                )}
                </div>
                <div>
                <button
                    type="submit"
                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    Register Exercise
                </button>
                </div>
            </form>
            </div>
        )}
        </>
    );
};

export default ExercisePreRegisterForm;
