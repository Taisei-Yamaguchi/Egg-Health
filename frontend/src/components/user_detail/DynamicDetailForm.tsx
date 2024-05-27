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
import { createUpdateDynamic } from '@/backend_api/user_detail/createUpdateDynamic';
import { fetchDynamic } from '@/backend_api/user_detail/fetchDynamic';
import { useAppSelector } from '@/store';
import { DynamicDetail } from '@/interfaces/user_detail.inteface';
import { RootState } from '@/store';
import { setExerciseLoading , setHistoryWorkoutLoading} from '@/store/slices/load.slice';
import dynamic from 'next/dynamic';

const formSchema = yup.object().shape({
    weight: yup
        .number()
        .nullable()
        .typeError('Weight must be a number')
        .min(10, "Weight must be at least 10")
        .max(200, "Weight must be at most 200"),
    body_fat: yup
        .number()
        .nullable()
        .typeError('Body fat must be a number')
        .min(1, "Body fat must be at least 1")
        .max(60, "Body fat must be at most 60"),
});

type FormData = {
    weight: number | null;
    body_fat: number | null;
};

interface Props {
    date: string;
}

const DynamicDetailForm: React.FC<Props> = ({date})=>{
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [initialDynamicDetail,setInitialDynamicDetail] = useState<DynamicDetail | null>(null)
    // const used_workout = useAppSelector((state: RootState) => state.workout_exercise?.used_workout) as Workout | null;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchDynamic(date);
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                } else if ('message' in response) {
                    // dispatch(setToast({ message: response.message, type: "success" }));
                    // setTimeout(() => dispatch(resetToast()), 4000);
                    setInitialDynamicDetail(response.data)
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
        formik.setFieldValue('weight', initialDynamicDetail?.weight);
        formik.setFieldValue('body_fat', initialDynamicDetail?.body_fat)
    },[initialDynamicDetail])

    const initialValues: FormData = {
        weight : null,
        body_fat : null,
    };
    const formik = useFormik<FormData>({
        initialValues: initialValues,
        validationSchema: formSchema,
        onSubmit: async (formData) => {
            try {
                // dispatch(setExerciseLoading(true))
                // dispatch(setHistoryWorkoutLoading(true))
                const data = await createUpdateDynamic({
                        ...formData, 
                        date: date,
                    });
                    console.log(data);
                    if ('error' in data) {
                        dispatch(setToast({ message: data.error, type: "error" }));
                        setTimeout(() => dispatch(resetToast()), 3000);
                    } else if ('message' in data) {
                        dispatch(setToast({ message: data.message, type: "success" }));
                        setTimeout(() => dispatch(resetToast()), 4000);
                    }
                } catch (error) {
                    console.error('Error saving Weight & Body Fat:', error);
                    dispatch(setToast({ message: 'An error occurred while saving Weight & Body Fat.', type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                } finally {
                    // dispatch(setExerciseLoading(false))
                    // dispatch(setHistoryWorkoutLoading(false))
                }
            
        },
    });

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        formik.setFieldValue('weight', value === "" ? null : parseFloat(value));
    };
    const handleBodyFatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        formik.setFieldValue('body_fat', value === "" ? null : parseFloat(value));
    };

return (
    <div className="max-w-md mx-auto mt-10 border">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
                <div className=''>
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                        Weight
                    </label>
                    <input
                        type="number"
                        id="weight"
                        name="weight"
                        value={formik.values.weight ?? ''}
                        onChange={handleWeightChange}
                        onBlur={formik.handleBlur}
                        className={clsx(
                            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                            {
                                "border-2 border-red-500 bg-red-100 text-red-800":
                                formik.touched.weight && formik.errors.weight,
                            }
                        )}
                        autoComplete="off"
                    />
                    {formik.errors.weight && formik.touched.weight && (
                        <p className="text-red-500 ml-1 my-3">{formik.errors.weight}</p>
                    )}
                </div>
                <div className=''>
                    <label htmlFor="body_fat" className="block text-sm font-medium text-gray-700">
                        Body Fat
                    </label>
                    <input
                        type="number"
                        id="body_fat"
                        name="body_fat"
                        value={formik.values.body_fat ?? ''}
                        onChange={handleBodyFatChange}
                        onBlur={formik.handleBlur}
                        className={clsx(
                            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                            {
                                "border-2 border-red-500 bg-red-100 text-red-800":
                                formik.touched.body_fat && formik.errors.body_fat,
                            }
                        )}
                        autoComplete="off"
                    />
                    {formik.errors.body_fat && formik.touched.body_fat && (
                        <p className="text-red-500 ml-1 my-3">{formik.errors.body_fat}</p>
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

export default DynamicDetailForm