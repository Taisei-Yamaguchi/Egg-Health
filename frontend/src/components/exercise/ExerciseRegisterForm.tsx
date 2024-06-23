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
const formSchema = yup.object().shape({
  mins: yup
    .number()
    .min(1, "Mins must be greater than 0")
    .required()
});

type FormData = {
  mins: number;
};

const FORM_DATA: FormData = {
  mins: 10
};

interface Props {
  date: string;
}

const ExerciseRegisterForm: React.FC<Props> = ({ date }) => {
  const dispatch = useAppDispatch();
  const used_workout = useAppSelector((state: RootState) => state.workout_exercise?.used_workout) as Workout | null;

  const custom_workout_loading  = useAppSelector((state: RootState) => state.load.custom_workout_loading);

    useEffect(()=>{
        dispatch(resetUsedWorkout())
    },[custom_workout_loading,dispatch])

  const formik = useFormik<FormData>({
    initialValues: FORM_DATA,
    validationSchema: formSchema,
    onSubmit: async (formData) => {
      if (used_workout) {
        try {
          dispatch(setExerciseLoading(true));
          dispatch(setHistoryWorkoutLoading(true));
          const data = await registerExercise({
            ...formData,
            workout: used_workout.id,
            date: date,
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
          dispatch(setHistoryWorkoutLoading(false));
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
            <div className="text-gray-700 font-medium capitalize">
              {used_workout.name} ({used_workout.mets} METs)
            </div>
            <div className="text-gray-500 text-sm">
              {/* Optional caloric display can go here */}
            </div>
          </div>
          <form onSubmit={formik.handleSubmit} className="space-y-6 mt-4">
            <div>
              <input
                type="number"
                id="mins"
                name="mins"
                value={formik.values.mins}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={clsx(
                  "w-[100px] px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm",
                  {
                    "border-2 border-red-500 bg-red-100 text-red-800":
                      formik.touched.mins && formik.errors.mins,
                  }
                )}
                autoComplete="off"
              /><span className='text-[15px]'> (mins)</span>
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

export default ExerciseRegisterForm;
