'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { createUpdateDynamic } from '@/backend_api/user_detail/createUpdateDynamic';
import { fetchDynamic } from '@/backend_api/user_detail/fetchDynamic';
import { DynamicDetail, GoalDetail } from '@/interfaces/user_detail.inteface';
import { format, parseISO } from 'date-fns';

const formSchema = yup.object().shape({
    weight: yup
        .number()
        .nullable()
        .typeError('Weight must be a number')
        .min(10, "Weight must be at least 10")
        .max(400, "Weight must be at most 200"),
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
    goal: GoalDetail | null;
}

const DynamicDetailForm: React.FC<Props> = ({ date, goal }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [initialDynamicDetail, setInitialDynamicDetail] = useState<DynamicDetail | null>(null);
    const [unit, setUnit] = useState<'kg' | 'lbs'>('lbs'); // Default to lbs

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchDynamic(date);
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                } else if ('message' in response) {
                    setInitialDynamicDetail(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                dispatch(setToast({ message: 'An error occurred while fetching Weight & Body Fat.', type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
            }
        };

        fetchData();
    }, [date, dispatch]);

    useEffect(() => {
        if (initialDynamicDetail) {
            formik.setFieldValue('weight', initialDynamicDetail.weight ? parseFloat(convertWeight(initialDynamicDetail.weight, unit)) : null);
            formik.setFieldValue('body_fat', initialDynamicDetail.body_fat);
        }
    }, [initialDynamicDetail, unit]);

    const initialValues: FormData = {
        weight: null,
        body_fat: null,
    };

    const convertWeight = (weight: number, toUnit: 'kg' | 'lbs') => {
        if (toUnit === 'kg') {
            return (weight ).toFixed(1); // lbs to kg
        } else {
            return (weight * 2.20462).toFixed(1); // kg to lbs
        }
    };

    const formik = useFormik<FormData>({
        initialValues: initialValues,
        validationSchema: formSchema,
        onSubmit: async (formData) => {
            try {
                const weightInKg = unit === 'kg' ? formData.weight : formData.weight ? parseFloat((formData.weight / 2.20462).toFixed(1)) : null;

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
                // Reload the page
                window.location.reload();
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

    const toggleUnit = () => {
        if (initialDynamicDetail && initialDynamicDetail.weight) {
            const convertedWeight = parseFloat(convertWeight(initialDynamicDetail.weight, unit === 'kg' ? 'lbs' : 'kg'));
            formik.setFieldValue('weight', convertedWeight);
            setUnit((prevUnit) => (prevUnit === 'kg' ? 'lbs' : 'kg'));
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-1 relative">
            <div className="p-4 bg-yellow-100 rounded-lg shadow-md">
                {goal ? (
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <div>
                                <span className="text-xs">Target Weight: </span>
                                <span className='font-semibold'>{unit === 'kg' ? goal.goal_weight : goal.goal_weight ? parseFloat(convertWeight(goal.goal_weight, 'lbs')) : '-'} {unit}</span>
                            </div>
                            <div>
                                <span className="text-xs">Target Body Fat: </span>
                                <span className='font-semibold'>{goal.goal_body_fat !== null ? goal.goal_body_fat : '-'}%</span>
                            </div>
                            <div>
                                <span className="text-xs">Target Date: </span>
                                <span className='text-xs font-semibold'>{goal.target_date ? format(parseISO(goal.target_date), 'yyyy, MMMM do') : '-'}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center mb-4">
                        <a href='/dashboard/target/' className="text-blue-500 underline">Set Goal</a>
                    </div>
                )}
                <form onSubmit={formik.handleSubmit} className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-1">
                        <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                            Body Weight
                        </label>
                        <input
                            type="number"
                            id="weight"
                            name="weight"
                            value={formik.values.weight ?? ''}
                            onChange={handleWeightChange}
                            onBlur={formik.handleBlur}
                            className={clsx(
                                "block w-16 rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                                {
                                    "border-2 border-red-500 bg-red-100 text-red-800":
                                        formik.touched.weight && formik.errors.weight,
                                }
                            )}
                            autoComplete="off"
                        />
                        <span className="text-sm">{unit}</span>
                    </div>
                    <div className="flex items-center space-x-1">
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
                                "block w-16 rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                                {
                                    "border-2 border-red-500 bg-red-100 text-red-800":
                                        formik.touched.body_fat && formik.errors.body_fat,
                                }
                            )}
                            autoComplete="off"
                        />
                        <span className="text-sm">%</span>
                    </div>
                    <div className="flex items-center space-x-1 ml-auto">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-1 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Save
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <button
                        type="button"
                        onClick={toggleUnit}
                        className="ml-4 p-2 border border-indigo-600 shadow-sm text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Toggle to {unit === 'kg' ? 'lbs' : 'kg'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DynamicDetailForm;
