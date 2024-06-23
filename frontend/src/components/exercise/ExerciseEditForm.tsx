'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { updateExercise } from '@/backend_api/exercise/updateExercise';
import { Exercise } from '@/interfaces/exercise.interface';
import { RootState } from '@/store';
import { setExerciseLoading, setHistoryWorkoutLoading } from '@/store/slices/load.slice';
import { resetEditExercise } from '@/store/slices/exercise.slice';

const formSchema = yup.object().shape({
  mins: yup
    .number()
    .min(1, "Mins must be greater than 0")
    .required()
});

type FormData = {
  mins: number;
};

const ExerciseEditForm: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const edit_exercise = useAppSelector((state: RootState) => state.workout_exercise?.edit_exercise) as Exercise | null;

  const custom_workout_loading  = useAppSelector((state: RootState) => state.load.custom_workout_loading);

    useEffect(()=>{
        dispatch(resetEditExercise())
    },[custom_workout_loading,dispatch])


  const initialValues: FormData = {
    mins: edit_exercise?.mins ?? 1,
  };

  useEffect(() => {
    if (edit_exercise) {
      formik.setValues({
        mins: edit_exercise?.mins ?? 1,
      });
    }
  }, [edit_exercise]);

  const formik = useFormik<FormData>({
    initialValues: initialValues,
    validationSchema: formSchema,
    onSubmit: async (formData) => {
      if (edit_exercise) {
        try {
          dispatch(setExerciseLoading(true));
          dispatch(setHistoryWorkoutLoading(true));
          const data = await updateExercise(formData, edit_exercise.id);
          if ('error' in data) {
            dispatch(setToast({ message: data.error, type: "error" }));
            setTimeout(() => dispatch(resetToast()), 3000);
          } else if ('message' in data) {
            dispatch(setToast({ message: data.message, type: "success" }));
            setTimeout(() => dispatch(resetToast()), 4000);
          }
        } catch (error) {
          console.error('Error updating exercise:', error);
          dispatch(setToast({ message: 'An error occurred while updating the exercise.', type: "error" }));
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
      {edit_exercise && (
        <div className="max-w-md mx-auto mt-10 border rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center p-2 bg-red-100 rounded-md">
            <div className="text-gray-700 font-medium capitalize">
              {edit_exercise.workout.name} ({edit_exercise.workout.mets} METs)
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
                Edit Exercise
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ExerciseEditForm;
