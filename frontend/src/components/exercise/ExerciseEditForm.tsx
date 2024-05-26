'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import { useFormik } from 'formik';
import Link from 'next/link';
import * as yup from 'yup';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { updateExercise } from '@/backend_api/exercise/updateExercise';
import { useAppSelector } from '@/store';
import { Exercise, Workout } from '@/interfaces/exercise.interface';
import { RootState } from '@/store';
import { setExerciseLoading , setHistoryWorkoutLoading} from '@/store/slices/load.slice';

const formSchema = yup.object().shape({
    mins: yup
        .number()
        .min(1, "Mins must be greater than 0")
});

type FormData = {
    mins: number;
};

const ExerciseEditForm: React.FC = ()=>{
    const router = useRouter();
    const dispatch = useAppDispatch();
    const edit_exercise = useAppSelector((state: RootState) => state.workout_exercise?.edit_exercise) as Exercise | null;
    
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
            if(edit_exercise){
                try {
                    dispatch(setExerciseLoading(true))
                    dispatch(setHistoryWorkoutLoading(true))
                    const data = await updateExercise(formData, edit_exercise.id);
                    console.log(data);
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
                    dispatch(setExerciseLoading(false))
                    dispatch(setHistoryWorkoutLoading(false))
                }
            }else{
                dispatch(setToast({ message: "You need to choose workout.", type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
                return;
            }
        },
    });

return (
    <div className="max-w-md mx-auto mt-10 border">
        {edit_exercise ? (<>
            <div className=' flex m-2'>
                <div>{edit_exercise.workout.name} ({edit_exercise.workout.type})</div>
                {/* { formik.values.servings &&(
                    <div>{used_food.cal * formik.values.servings} kcal</div>
                )}
                { used_food.g_per_serving && formik.values.grams &&(<>
                    <div>{used_food.cal * formik.values.grams /used_food.g_per_serving} kcal</div>
                </>)} */}
            </div>
            
            <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
                <div className=''>
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
                            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                            {
                                "border-2 border-red-500 bg-red-100 text-red-800":
                                formik.touched.mins && formik.errors.mins,
                            }
                        )}
                        autoComplete="off"
                    />
                    {formik.errors.mins && formik.touched.mins && (
                        <p className="text-red-500 ml-1 my-3">{formik.errors.mins}</p>
                    )}
                </div>
            </div>
            <div>
                <button
                    type="submit"
                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Edit Exercise
                </button>
            </div>
        </form>
        </>):<>
        </>}
        
    </div>
);

}

export default ExerciseEditForm