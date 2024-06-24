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
        .max(400, "Weight must be at most 400")
        ,
    body_fat: yup
        .number()
        .nullable()
        .typeError('Body fat must be a number')
        .min(1, "Body fat must be at least 1")
        .max(60, "Body fat must be at most 60")
        
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
                // console.error('Error fetching data:', error);
                dispatch(setToast({ message: 'An error occurred while fetching Weight & Body Fat.', type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
            }
        };

        fetchData();
    }, [date, dispatch]);

    useEffect(() => {
        if (initialDynamicDetail) {
            // Set weight in lbs
            const weightInLbs = initialDynamicDetail.weight ? parseFloat(convertWeight(initialDynamicDetail.weight, 'lbs')) : null;
            formik.setFieldValue('weight', weightInLbs);
            formik.setFieldValue('body_fat', initialDynamicDetail.body_fat);
        }
    }, [initialDynamicDetail]);

    const initialValues: FormData = {
        weight: null,
        body_fat: null,
    };

    const convertWeight = (weight: number, toUnit: 'kg' | 'lbs') => {
        if (toUnit === 'kg') {
            return (weight / 2.20462).toFixed(1); // lbs to kg
        } else {
            return Math.round(weight * 2.20462).toString(); // kg to lbs, round to integer
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
                    weight: weightInKg !== null ? weightInKg : 0, // Adjust here to prevent null value
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
                // console.error('Error saving Weight & Body Fat:', error);
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
        if (formik.values.weight !== null) {
            const convertedWeight = unit === 'kg' 
                ? Math.round(parseFloat(convertWeight(formik.values.weight, 'lbs'))) // kg to lbs, round to integer
                : parseFloat(convertWeight(formik.values.weight, 'kg')); // lbs to kg
            formik.setFieldValue('weight', convertedWeight);
        }
        setUnit((prevUnit) => (prevUnit === 'kg' ? 'lbs' : 'kg'));
    };

    return (
        <div className="max-w-lg mx-auto mt-1 relative">
            <div className="text-xs font-semibold text-orange-600 mb-2">Body Record</div>
                        
            <div className="p-4 bg-yellow-50 rounded-lg shadow-md">
                {goal ? (
                    <div className="mb-4">
                        <div className="flex justify-between max-md:flex-col">
                            <div className='md:flex md:flex-col'>
                                <span className="text-xs">Goal Weight: </span>
                                <span className='font-bold'>{unit === 'kg' ? goal.goal_weight : goal.goal_weight ? parseFloat(convertWeight(goal.goal_weight, 'lbs')).toFixed(0) : ' - '} {unit}</span>
                            </div>
                            <div className='md:flex md:flex-col'>
                                <span className="text-xs">Goal Body Fat: </span>
                                <span className='font-bold'>{goal.goal_body_fat !== null ? goal.goal_body_fat : ' - '}%</span>
                            </div>
                            <div className='md:flex md:flex-col'>
                                <span className="text-xs">Target Date: </span>
                                <span className='text-xs font-bold'>{goal.target_date ? format(parseISO(goal.target_date), 'yyyy, MMMM do') : ' - '}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center mb-4">
                        <a href='/dashboard/goal/' className="text-blue-500 underline">Set Goal</a>
                    </div>
                )}
                <form onSubmit={formik.handleSubmit} className="flex items-center justify-between space-x-2 max-sm:flex-col">
                    <div className="flex items-center space-x-1">
                        <label htmlFor="weight" className="block text-base max-sm:text-xs font-medium text-gray-700">
                            Weight: 
                        </label>
                        <input
                            type="number"
                            id="weight"
                            name="weight"
                            value={formik.values.weight !== null ? formik.values.weight.toString() : ''}
                            onChange={handleWeightChange}
                            onBlur={formik.handleBlur}
                            className={clsx(
                                "font-bold block w-16 rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
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
                        <label htmlFor="body_fat" className="block text-base max-sm:text-xs font-medium text-gray-700">
                            Body Fat: 
                        </label>
                        <input
                            type="number"
                            id="body_fat"
                            name="body_fat"
                            value={formik.values.body_fat !== null ? formik.values.body_fat.toString() : ''}
                            onChange={handleBodyFatChange}
                            onBlur={formik.handleBlur}
                            className={clsx(
                                "font-bold block w-16 rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                                {
                                    "border-2 border-red-500 bg-red-100 text-red-800":
                                        formik.touched.body_fat && formik.errors.body_fat,
                                }
                            )}
                            autoComplete="off"
                        />
                        <span className="text-sm">%</span>
                    </div>

                    <div className='flex items-center gap-2 '>
                        <div className="text-center mt-4">
                            <button
                                type="submit"
                                className="inline-flex justify-center py-1 px-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Save
                            </button>
                        </div>

                        <div className="text-center mt-4">
                        <button
                            type="button"
                            onClick={toggleUnit}
                            className="ml-2 p-1 border border-indigo-600 shadow-sm text-xs font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            show in {unit === 'kg' ? 'lbs' : 'kg'}
                        </button>
                        </div>
                    </div>
                </form>
                
            </div>
        </div>
    );
};

export default DynamicDetailForm;
