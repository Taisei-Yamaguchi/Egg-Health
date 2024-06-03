'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { createUpdateDynamic } from '@/backend_api/user_detail/createUpdateDynamic';
import { fetchLatestWeight } from '@/backend_api/user_detail/fetchLatestWeight';
import { RootState } from '@/store';
import { setLatestWeight } from '@/store/slices/latest_weight.slice';

const formSchema = yup.object().shape({
    weight: yup
        .number()
        .typeError('Weight must be a number')
        .min(10, "Weight must be at least 10")
        .max(200, "Weight must be at most 200")
        .required(),
});

type FormData = {
    weight: number | null;
};

const LatestWeightForm: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const latestWeight = useAppSelector((state: RootState) => state.latest_weight.latest_weight);
    const [load, setLoad] = useState<Boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchLatestWeight();
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                } else if ('data' in response) {
                    dispatch(setLatestWeight(response.data));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                dispatch(setToast({ message: 'An error occurred while fetching latest weight.', type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
            }
        };
    
        fetchData();
    }, [load]);

    useEffect(() => {
        formik.setFieldValue('weight', latestWeight);
    }, [latestWeight]);

    const initialValues: FormData = {
        weight: null,
    };
    
    const formik = useFormik<FormData>({
        initialValues: initialValues,
        validationSchema: formSchema,
        onSubmit: async (formData) => {
            try {
                setLoad(true)
                const date = new Date().toISOString().split('T')[0];  // YYYY-MM-DD形式に変換
                const data = await createUpdateDynamic({
                    ...formData, 
                    date: date,  
                });
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
            } finally{
                setLoad(false)
            }
        },
    });

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        formik.setFieldValue('weight', value === "" ? null : parseFloat(value));
    }

    return (
        <div className="max-w-sm mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
            <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div className="flex items-center">
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mr-4">
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
                            "block w-1/2 rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                            {
                                "border-2 border-red-500 bg-red-100 text-red-800": formik.touched.weight && formik.errors.weight,
                            }
                        )}
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        className="ml-4 py-1 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Save
                    </button>
                </div>
                {formik.errors.weight && formik.touched.weight && (
                    <p className="text-red-500 ml-1 my-3">{formik.errors.weight}</p>
                )}
            </form>
        </div>
    );
}

export default LatestWeightForm;
