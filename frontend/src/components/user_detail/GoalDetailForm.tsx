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
import { createUpdateGoal } from '@/backend_api/user_detail/createUpdateGoal';
import { fetchGoal } from '@/backend_api/user_detail/fetchGoal';
import { useAppSelector } from '@/store';
import { GoalDetail } from '@/interfaces/user_detail.inteface';
import { RootState } from '@/store';
import { setExerciseLoading , setHistoryWorkoutLoading} from '@/store/slices/load.slice';
import dynamic from 'next/dynamic';

const formSchema = yup.object().shape({
    goal_weight: yup
        .number()
        .nullable()
        .typeError('Target Weight must be a number')
        .min(10, "Target Weight must be at least 10")
        .max(200, "Weight must be at most 200"),
    goal_body_fat: yup
        .number()
        .nullable()
        .typeError('Target Body fat must be a number')
        .min(1, "Target Body fat must be at least 1")
        .max(60, "Target Body fat must be at most 60"),
    goal_intake_cal: yup
        .number()
        .nullable()
        .typeError('Target Daily Intake Cals must be a number')
        .min(500, "Target Daily Intake Cals fat must be at least 500")
        .max(8000, "Target Daily Intake Cals must be at most 8000"),
    goal_consume_cal: yup
        .number()
        .nullable()
        .typeError('Target Daily Exercise Cals must be a number')
        .min(10, "Target Daily Exercise Cals fat must be at least 10")
        .max(6000, "Target Daily Exercise Cals fat must be at most 6000"),
});

type FormData = {
    goal_weight: number | null;
    goal_body_fat: number | null;
    goal_intake_cal: number | null;
    goal_consume_cal: number | null;
};

const GoalDetailForm: React.FC = ()=>{
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [initialGoalDetail,setInitialGoalDetail] = useState<GoalDetail | null>(null)
    // const used_workout = useAppSelector((state: RootState) => state.workout_exercise?.used_workout) as Workout | null;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchGoal();
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                } else if ('message' in response) {
                    // dispatch(setToast({ message: response.message, type: "success" }));
                    // setTimeout(() => dispatch(resetToast()), 4000);
                    setInitialGoalDetail(response.data)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                dispatch(setToast({ message: 'An error occurred while fetching Weight & Body Fat.', type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
            }
        };
    
        fetchData();
    }, []);

    useEffect(()=> {
        formik.setFieldValue('goal_weight', initialGoalDetail?.goal_weight);
        formik.setFieldValue('goal_body_fat', initialGoalDetail?.goal_body_fat);
        formik.setFieldValue('goal_intake_cal', initialGoalDetail?.goal_intake_cal);
        formik.setFieldValue('goal_consume_cal', initialGoalDetail?.goal_consume_cal);
    },[initialGoalDetail])

    const initialValues: FormData = {
        goal_weight : null,
        goal_body_fat : null,
        goal_intake_cal: null,
        goal_consume_cal:  null
    };
    const formik = useFormik<FormData>({
        initialValues: initialValues,
        validationSchema: formSchema,
        onSubmit: async (formData) => {
            try {
                // dispatch(setExerciseLoading(true))
                // dispatch(setHistoryWorkoutLoading(true))
                const data = await createUpdateGoal(formData);
                    console.log(data);
                    if ('error' in data) {
                        dispatch(setToast({ message: data.error, type: "error" }));
                        setTimeout(() => dispatch(resetToast()), 3000);
                    } else if ('message' in data) {
                        dispatch(setToast({ message: data.message, type: "success" }));
                        setTimeout(() => dispatch(resetToast()), 4000);
                    }
                } catch (error) {
                    console.error('Error saving Goal:', error);
                    dispatch(setToast({ message: 'An error occurred while saving Goal.', type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                } finally {
                    // dispatch(setExerciseLoading(false))
                    // dispatch(setHistoryWorkoutLoading(false))
                }
            
        },
    });
    
    const handleGoalWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        formik.setFieldValue('goal_weight', value === "" ? null : parseFloat(value));
    };
    const handleGoalBodyFatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        formik.setFieldValue('goal_body_fat', value === "" ? null : parseFloat(value));
    };
    const handleGoalIntakeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        formik.setFieldValue('goal_intake_cal', value === "" ? null : parseFloat(value));
    };
    const handleGoalConsumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        formik.setFieldValue('goal_consume_cal', value === "" ? null : parseFloat(value));
    };

return (
    <div className="max-w-md mx-auto mt-10 border">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
                <div className=''>
                    <label htmlFor="goal_weight" className="block text-sm font-medium text-gray-700">
                        Target Weight
                    </label>
                    <input
                        type="number"
                        id="goal_weight"
                        name="goal_weight"
                        value={formik.values.goal_weight ?? ''}
                        onChange={handleGoalWeightChange}
                        onBlur={formik.handleBlur}
                        className={clsx(
                            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                            {
                                "border-2 border-red-500 bg-red-100 text-red-800":
                                formik.touched.goal_weight && formik.errors.goal_weight,
                            }
                        )}
                        autoComplete="off"
                    />
                    {formik.errors.goal_weight && formik.touched.goal_weight && (
                        <p className="text-red-500 ml-1 my-3">{formik.errors.goal_weight}</p>
                    )}
                </div>
                <div className=''>
                    <label htmlFor="goal_body_fat" className="block text-sm font-medium text-gray-700">
                        Target Body Fat
                    </label>
                    <input
                        type="number"
                        id="goal_body_fat"
                        name="goal_body_fat"
                        value={formik.values.goal_body_fat ?? ''}
                        onChange={handleGoalBodyFatChange}
                        onBlur={formik.handleBlur}
                        className={clsx(
                            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                            {
                                "border-2 border-red-500 bg-red-100 text-red-800":
                                formik.touched.goal_body_fat && formik.errors.goal_body_fat,
                            }
                        )}
                        autoComplete="off"
                    />
                    {formik.errors.goal_body_fat && formik.touched.goal_body_fat && (
                        <p className="text-red-500 ml-1 my-3">{formik.errors.goal_body_fat}</p>
                    )}
                </div>
                <div className=''>
                    <label htmlFor="goal_intake_cal" className="block text-sm font-medium text-gray-700">
                        Target Daily Intake Cals
                    </label>
                    <input
                        type="number"
                        id="goal_intake_cal"
                        name="goal_intake_cal"
                        value={formik.values.goal_intake_cal ?? ''}
                        onChange={handleGoalIntakeChange}
                        onBlur={formik.handleBlur}
                        className={clsx(
                            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                            {
                                "border-2 border-red-500 bg-red-100 text-red-800":
                                formik.touched.goal_intake_cal && formik.errors.goal_intake_cal,
                            }
                        )}
                        autoComplete="off"
                    />
                    {formik.errors.goal_intake_cal && formik.touched.goal_intake_cal && (
                        <p className="text-red-500 ml-1 my-3">{formik.errors.goal_intake_cal}</p>
                    )}
                </div>
                <div className=''>
                    <label htmlFor="goal_consume_cal" className="block text-sm font-medium text-gray-700">
                        Target Daily Exercise Cals
                    </label>
                    <input
                        type="number"
                        id="goal_consume_cal"
                        name="goal_consume_cal"
                        value={formik.values.goal_consume_cal ?? ''}
                        onChange={handleGoalConsumeChange}
                        onBlur={formik.handleBlur}
                        className={clsx(
                            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                            {
                                "border-2 border-red-500 bg-red-100 text-red-800":
                                formik.touched.goal_consume_cal && formik.errors.goal_consume_cal,
                            }
                        )}
                        autoComplete="off"
                    />
                    {formik.errors.goal_consume_cal && formik.touched.goal_consume_cal && (
                        <p className="text-red-500 ml-1 my-3">{formik.errors.goal_consume_cal}</p>
                    )}
                </div>
            </div>
            <div>
                <button
                    type="submit"
                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Save
                </button>
            </div>
        </form>
    </div>
);

}

export default GoalDetailForm