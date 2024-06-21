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
        .max(400, "Weight must be at most 400")
        .required(),
});

type FormData = {
    weight: number | null;
};

const LatestWeightForm: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const latestWeight = useAppSelector((state: RootState) => state.latest_weight.latest_weight);
    // const [load, setLoad] = useState<Boolean>(false);
    const [unit, setUnit] = useState<'kg' | 'lbs'>('lbs'); // State to manage unit, default to lbs

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchLatestWeight();
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                } else if ('data' in response) {
                    if (response.data !== null) {
                        const weightInLbs = parseFloat(convertWeight(response.data, 'lbs')); // Convert initial weight to lbs
                        dispatch(setLatestWeight(weightInLbs));
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                dispatch(setToast({ message: 'An error occurred while fetching latest weight.', type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        formik.setFieldValue('weight', latestWeight);
    }, [latestWeight]);

    const initialValues: FormData = {
        weight: null,
    };

    const convertWeight = (weight: number, toUnit: 'kg' | 'lbs') => {
        if (toUnit === 'kg') {
            return (weight / 2.20462).toFixed(1);
        } else {
            return (weight * 2.20462).toFixed(0);
        }
    };

    const formik = useFormik<FormData>({
        initialValues: initialValues,
        validationSchema: formSchema,
        onSubmit: async (formData) => {
            try {
                // setLoad(true);
                const date = new Date().toISOString().split('T')[0];  // YYYY-MM-DD形式に変換
                const weightInKg = unit === 'kg' ? formData.weight : formData.weight ? parseFloat(convertWeight(formData.weight, 'kg')) : null;
                const data = await createUpdateDynamic({
                    ...formData,
                    weight: weightInKg,
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
            } finally {
                // setLoad(false);
            }
        },
    });

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        formik.setFieldValue('weight', value === "" ? null : parseFloat(value));
    };

    const toggleUnit = () => {
        if (formik.values.weight !== null) {
            const convertedWeight = parseFloat(convertWeight(formik.values.weight, unit === 'kg' ? 'lbs' : 'kg'));
            formik.setFieldValue('weight', convertedWeight);
        }
        setUnit((prevUnit) => (prevUnit === 'kg' ? 'lbs' : 'kg'));
    };

    return (
        <div className="max-w-lg mx-auto mt-4 p-6 bg-white rounded-lg shadow-md">
            <button
                    type="button"
                    onClick={toggleUnit}
                    className="ml-2 p-1 border border-indigo-600 shadow-sm text-xs font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Show in {unit === 'kg' ? 'lbs' : 'kg'}
            </button>
            <form onSubmit={formik.handleSubmit} className="flex items-center space-x-4">
                <div className="flex items-center">
                    <label htmlFor="weight" className="block text-lg font-medium text-gray-700 mr-4">
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
                            "block w-28 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6 pl-2",
                            {
                                "border-2 border-red-500 bg-red-100 text-red-800": formik.touched.weight && formik.errors.weight,
                            }
                        )}
                        autoComplete="off"
                    />
                    <span className="ml-2 text-lg font-medium text-gray-700">{unit}</span>
                </div>
                <button
                    type="submit"
                    className="py-1 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Save
                </button>
            </form>
            {formik.errors.weight && formik.touched.weight && (
                <p className="text-red-500 mt-2">{formik.errors.weight}</p>
            )}
        </div>
    );
};

export default LatestWeightForm;
