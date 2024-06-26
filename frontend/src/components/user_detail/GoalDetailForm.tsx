'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { createUpdateGoal } from '@/backend_api/user_detail/createUpdateGoal';
import { fetchGoal } from '@/backend_api/user_detail/fetchGoal';
import { fetchLatestWeight } from '@/backend_api/user_detail/fetchLatestWeight';
import { fetchStatic } from '@/backend_api/user_detail/fetchStatic';
import { GoalDetail } from '@/interfaces/user_detail.inteface';
import { FaRunning, FaWeight, FaBalanceScale } from "react-icons/fa";
import { GiMuscleUp } from 'react-icons/gi';

const formSchema = yup.object().shape({
    goal_weight: yup
        .number()
        .required('Goal Weight is required')
        .typeError('Goal Weight must be a number')
        .min(10, "Goal Weight must be at least 10")
        .max(400, "Goal Weight must be at most 400"),
    goal_body_fat: yup
        .number()
        .nullable()
        .typeError('Goal Body Fat must be a number')
        .min(1, "Goal Body Fat must be at least 1")
        .max(60, "Goal Body Fat must be at most 60"),
    goal_intake_cal: yup
        .number()
        .nullable()
        .typeError('Goal Daily Intake Calories must be a number')
        .min(500, "Goal Daily Intake Calories must be at least 500")
        .max(8000, "Goal Daily Intake Calories must be at most 8000"),
    goal_consume_cal: yup
        .number()
        .nullable()
        .typeError('Goal Daily Burned Calories must be a number')
        .min(10, "Goal Daily Burned Calories must be at least 10")
        .max(6000, "Goal Daily Burned Calories must be at most 6000"),
    target_date: yup
        .number()
        .required("Goal period is required")
        .typeError('Goal period must be a valid number between 1 and 12')
        .min(1, "Goal period must be at least 1 month")
        .max(12, "Goal period must be at most 12 months"),
    goal_type: yup
        .string()
        .required('Goal Type is required')
});

type FormData = {
    goal_weight: number | null;
    goal_body_fat: number | null;
    goal_intake_cal: number | null;
    goal_consume_cal: number | null;
    target_date: number | null;
    goal_type: 'diet' | 'maintain' | 'bulk';
};

const GoalDetailForm: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [initialGoalDetail, setInitialGoalDetail] = useState<GoalDetail | null>(null);
    const [latestWeight, setLatestWeight] = useState<number | null>(null);
    const [tdee, setTdee] = useState<number | null | undefined>(null);
    const [showIntakeField, setShowIntakeField] = useState(false);
    const [showConsumeField, setShowConsumeField] = useState(false);
    const [calculatedTargetDate, setCalculatedTargetDate] = useState<string | null>(null);
    const [unit, setUnit] = useState<'kg' | 'lbs'>('lbs'); // 初期値を 'lbs' に設定

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchStatic();
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                } else if ('message' in response) {
                    setTdee(response.data?.tdee);
                }
            } catch (error) {
                // console.error('Error fetching data:', error);
                dispatch(setToast({ message: 'An error occurred while fetching TDEE.', type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchLatestWeight();
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                } else if ('data' in response) {
                    if (response.data !== null) {
                        setLatestWeight(parseFloat(convertWeight(response.data, 'lbs')));
                    }
                }
            } catch (error) {
                // console.error('Error fetching data:', error);
                dispatch(setToast({ message: 'An error occurred while fetching Current Weight.', type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
            }
        };

        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetchGoal();
            if ('error' in response) {
                dispatch(setToast({ message: response.error, type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
            } else if ('message' in response) {
                setInitialGoalDetail(response.data);
                if (response.data !== null && response.data.goal_intake_cal) {
                    setShowIntakeField(true);
                }
                if (response.data !== null && response.data.goal_consume_cal) {
                    setShowConsumeField(true);
                }
                if (response.data?.target_date) {
                    setCalculatedTargetDate(response.data.target_date);
                }
            }
        } catch (error) {
            // console.error('Error fetching data:', error);
            dispatch(setToast({ message: 'An error occurred while fetching Goal.', type: "error" }));
            setTimeout(() => dispatch(resetToast()), 3000);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (initialGoalDetail) {
            formik.setFieldValue('goal_weight', initialGoalDetail.goal_weight ? parseFloat(convertWeight(initialGoalDetail.goal_weight, 'lbs')) : null); // 初期値を 'lbs' に変換
            formik.setFieldValue('goal_body_fat', initialGoalDetail.goal_body_fat);
            formik.setFieldValue('goal_intake_cal', initialGoalDetail.goal_intake_cal);
            formik.setFieldValue('goal_consume_cal', initialGoalDetail.goal_consume_cal);
            formik.setFieldValue('target_date', initialGoalDetail.target_date);
            formik.setFieldValue('goal_type', initialGoalDetail.goal_type ?? 'diet');
        }
    }, [initialGoalDetail]);

    const initialValues: FormData = {
        goal_weight: null,
        goal_body_fat: null,
        goal_intake_cal: null,
        goal_consume_cal: null,
        target_date: null,
        goal_type: 'maintain'
    };

    const convertWeight = (weight: number, toUnit: 'kg' | 'lbs') => {
        if (toUnit === 'kg') {
            return (weight / 2.20462).toFixed(1); // lbs to kg
        } else {
            return (weight * 2.20462).toFixed(0); // kg to lbs
        }
    };

    const formik = useFormik<FormData>({
        initialValues: initialValues,
        validationSchema: formSchema,
        onSubmit: async (formData) => {
            try {
                const weightInKg = unit === 'kg' ? formData.goal_weight : formData.goal_weight ? parseFloat(convertWeight(formData.goal_weight, 'kg')) : null;

                const targetDate = new Date();
                targetDate.setMonth(targetDate.getMonth() + (formData.target_date ?? 0));
                const formattedDate = targetDate.toISOString().split('T')[0];

                const data = await createUpdateGoal({
                    ...formData,
                    goal_weight: weightInKg,
                    target_date: formattedDate,
                });
                if ('error' in data) {
                    dispatch(setToast({ message: data.error, type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                } else if ('message' in data) {
                    dispatch(setToast({ message: data.message, type: "success" }));
                    setTimeout(() => dispatch(resetToast()), 1000);
                    router.push('/dashboard/goal/confirm')
                }
            } catch (error) {
                // console.error('Error saving Goal:', error);
                dispatch(setToast({ message: 'An error occurred while saving Goal.', type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
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

    const handleTargetDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        formik.setFieldValue('target_date', value === "" ? null : parseInt(value));
        const newTargetDate = new Date();
        newTargetDate.setMonth(newTargetDate.getMonth() + (parseInt(value) || 0));
        setCalculatedTargetDate(newTargetDate.toISOString().split('T')[0]);
    };

    const handleGoalTypeChange = (goalType: 'diet' | 'maintain' | 'bulk') => {
        formik.setFieldValue('goal_type', goalType);
    };

    const toggleUnit = () => {
        if (formik.values.goal_weight !== null) {
            const convertedWeight = parseFloat(convertWeight(formik.values.goal_weight, unit === 'kg' ? 'lbs' : 'kg'));
            formik.setFieldValue('goal_weight', convertedWeight);
        }
        setUnit((prevUnit) => (prevUnit === 'kg' ? 'lbs' : 'kg'));
    };

    return (
        <div className="max-w-lg mx-auto mt-2 p-6 bg-white rounded-lg shadow-md">
            {latestWeight && tdee ? (
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <label htmlFor="goal_weight" className="block text-sm font-medium text-gray-700 w-1/3">
                            Current Weight
                        </label>
                        <div className="w-2/3 py-1.5 text-gray-900 text-lg sm:text-lg sm:leading-6 font-semibold">
                            {unit === 'kg' ? parseFloat(convertWeight(latestWeight, 'kg')) : latestWeight} {unit}
                        </div>
                        <button
                            type="button"
                            onClick={toggleUnit}
                            className="ml-2 p-1 border border-indigo-600 shadow-sm text-xs font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Show in {unit === 'kg' ? 'lbs' : 'kg'}
                        </button>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <label htmlFor="goal_weight" className="block text-sm font-medium text-gray-700 w-1/3">
                            Goal Weight
                        </label>
                        <input
                            type="number"
                            id="goal_weight"
                            name="goal_weight"
                            value={formik.values.goal_weight ?? ''}
                            onChange={handleGoalWeightChange}
                            onBlur={formik.handleBlur}
                            className={clsx(
                                "block w-2/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6",
                                {
                                    "border-2 border-red-500 bg-red-100 text-red-800":
                                        formik.touched.goal_weight && formik.errors.goal_weight,
                                }
                            )}
                            autoComplete="off"
                        />
                        <span className="ml-2 text-lg font-medium text-gray-700">{unit}</span>
                    </div>
                    {formik.errors.goal_weight && formik.touched.goal_weight && (
                        <p className="text-red-500 ml-1 my-3">{formik.errors.goal_weight}</p>
                    )}
                    <div className="flex items-center space-x-4">
                        <label htmlFor="goal_body_fat" className="block text-sm font-medium text-gray-700 w-1/3">
                            Goal Body Fat
                        </label>
                        <input
                            type="number"
                            id="goal_body_fat"
                            name="goal_body_fat"
                            value={formik.values.goal_body_fat ?? ''}
                            onChange={handleGoalBodyFatChange}
                            onBlur={formik.handleBlur}
                            className={clsx(
                                "block w-2/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6",
                                {
                                    "border-2 border-red-500 bg-red-100 text-red-800":
                                        formik.touched.goal_body_fat && formik.errors.goal_body_fat,
                                }
                            )}
                            autoComplete="off"
                        />
                        <span className="ml-2 text-lg font-medium text-gray-700">%</span>
                    </div>
                    {formik.errors.goal_body_fat && formik.touched.goal_body_fat && (
                        <p className="text-red-500 ml-1 my-3">{formik.errors.goal_body_fat}</p>
                    )}
                    <div className="flex items-center space-x-4">
                        <label htmlFor="target_date" className="block text-sm font-medium text-gray-700 w-1/3">
                            Goal Period <span className='text-xs'> (months)</span>
                        </label>
                        <span className="ml-0 text-xs text-gray-500 max-sm:flex max-sm:flex-col">
                            <span>Today:</span> 
                            <span>{new Date().toISOString().split('T')[0]}</span>
                        </span>
                        <select
                            id="target_date"
                            name="target_date"
                            value={formik.values.target_date ?? ''}
                            onChange={handleTargetDateChange}
                            onBlur={formik.handleBlur}
                            className={clsx(
                                "block w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6",
                                {
                                    "border-2 border-red-500 bg-red-100 text-red-800":
                                        formik.touched.target_date && formik.errors.target_date,
                                }
                            )}
                            autoComplete="off"
                        >
                            <option value="">How long?</option>
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1} months
                                </option>
                            ))}
                        </select>
                    </div>
                    {formik.errors.target_date && formik.touched.target_date && (
                        <p className="text-red-500 ml-1 my-3">{formik.errors.target_date}</p>
                    )}
                    <div className="flex items-center space-x-4">
                        <label htmlFor="goal_type" className="block text-sm font-medium text-gray-700 w-1/3">
                            Goal Type
                        </label>
                        <div className="flex space-x-2 max-sm:space-x-1 w-2/3">
                            <button
                                type="button"
                                onClick={() => handleGoalTypeChange('diet')}
                                className={clsx(
                                    "flex items-center justify-center w-1/3 py-2 px-1 rounded-md border border-gray-300",
                                    { "bg-blue-500 text-white": formik.values.goal_type === 'diet' }
                                )}
                            >
                                <FaRunning className="mr-1" />
                                <span className='text-sm'>Diet</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleGoalTypeChange('maintain')}
                                className={clsx(
                                    "flex items-center justify-center w-1/2 py-2 px-1 rounded-md border border-gray-300",
                                    { "bg-blue-500 text-white": formik.values.goal_type === 'maintain' }
                                )}
                            >
                                <FaBalanceScale className="mr-1" />
                                <span className='text-sm'>Maintain</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleGoalTypeChange('bulk')}
                                className={clsx(
                                    "flex items-center justify-center w-1/3 py-2 px-1 rounded-md border border-gray-300",
                                    { "bg-blue-500 text-white": formik.values.goal_type === 'bulk' }
                                )}
                            >
                                <GiMuscleUp className="mr-1" />
                                <span className='text-sm'>Bulk</span>
                            </button>
                        </div>
                    </div>
                    {formik.errors.goal_type && formik.touched.goal_type && (
                        <p className="text-red-500 ml-1 my-3">{formik.errors.goal_type}</p>
                    )}
                    {showIntakeField ? (
                        <div className="flex items-center space-x-4">
                            <label htmlFor="goal_intake_cal" className="block text-sm font-medium text-gray-700 w-1/3">
                                Goal Daily Intake Calories
                            </label>
                            <input
                                type="number"
                                id="goal_intake_cal"
                                name="goal_intake_cal"
                                value={typeof formik.values.goal_intake_cal === 'number' ? Math.round(formik.values.goal_intake_cal) : ''}
                                onChange={handleGoalIntakeChange}
                                onBlur={formik.handleBlur}
                                className={clsx(
                                    "block w-2/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6",
                                    {
                                        "border-2 border-red-500 bg-red-100 text-red-800":
                                            formik.touched.goal_intake_cal && formik.errors.goal_intake_cal,
                                    }
                                )}
                                autoComplete="off"
                            />
                            <span className="ml-2 text-lg font-medium text-gray-700">kcal</span>
                        </div>
                    ) : (
                        <div>
                            <button
                                type="button"
                                onClick={() => setShowIntakeField(true)}
                                className="text-blue-500 underline"
                            >
                                Enter Goal Daily Intake Calories
                            </button>
                        </div>
                    )}
                    {formik.errors.goal_intake_cal && formik.touched.goal_intake_cal && (
                        <p className="text-red-500 ml-1 my-3">{formik.errors.goal_intake_cal}</p>
                    )}
                    {showConsumeField ? (
                        <div className="flex items-center space-x-4">
                            <label htmlFor="goal_consume_cal" className="block text-sm font-medium text-gray-700 w-1/3">
                                Goal Daily Burned Calories
                            </label>
                            <input
                                type="number"
                                id="goal_consume_cal"
                                name="goal_consume_cal"
                                value={typeof formik.values.goal_consume_cal === 'number' ? Math.round(formik.values.goal_consume_cal) : ''}
                                onChange={handleGoalConsumeChange}
                                onBlur={formik.handleBlur}
                                className={clsx(
                                    "block w-2/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6",
                                    {
                                        "border-2 border-red-500 bg-red-100 text-red-800":
                                            formik.touched.goal_consume_cal && formik.errors.goal_consume_cal,
                                    }
                                )}
                                autoComplete="off"
                            />
                            <span className="ml-2 text-lg font-medium text-gray-700">kcal</span>
                        </div>
                    ) : (
                        <div>
                            <button
                                type="button"
                                onClick={() => setShowConsumeField(true)}
                                className="text-blue-500 underline"
                            >
                                Enter Goal Daily Burned Calories
                            </button>
                        </div>
                    )}
                    {formik.errors.goal_consume_cal && formik.touched.goal_consume_cal && (
                        <p className="text-red-500 ml-1 my-3">{formik.errors.goal_consume_cal}</p>
                    )}
                    <div className="text-xs text-gray-500">
                        If you do not enter Goal Daily Intake Calories or Goal Daily Burned Calories, they will be calculated based on your body information and goal weight.
                    </div>
                    <div className="col-span-2 text-xs text-gray-500">
                        Warning: Losing more than 3-4% of your body weight per month can be harmful to your health.
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="ml-4 py-1 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save
                        </button>
                    </div>
                </form>
            ) : (
                <>
                <div>Please set weight and personal details first</div>
                <a href="/dashboard/personal-details" className="text-blue-500 underline mr-2"> Go to Personal Details</a>
                    
                </>
            )}
        </div>
    );
}

export default GoalDetailForm;
