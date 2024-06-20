'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { fetchStatic } from '@/backend_api/user_detail/fetchStatic';
import { createUpdateStatic } from '@/backend_api/user_detail/createUpdateStatic';
import { StaticDetail } from '@/interfaces/user_detail.inteface';
import { RootState } from '@/store';
import ActiveLevelModal from './ActiveLevelModal';

const formSchema = yup.object({
    tall: yup.number()
        .min(0.5, 'Height must be at least 0.5 m or 1.6 ft')
        .max(7.8, 'Height must be at most 2.4 m or 7.8 ft')
        .required('Height is required'),
    birthday: yup.date()
        .nullable()
        .required('Birthday is required'),
    sex: yup.mixed<'male' | 'female'>()
        .oneOf(['male', 'female'], 'Invalid sex')
        .required('Sex is required'),
    bmr: yup.number()
        .nullable()
        .min(10, 'BMR must be at least 10')
        .max(6000, 'BMR must be at most 6000'),
    active_level: yup.mixed<'very low' | 'low' | 'middle' | 'high' | 'very high'>()
        .oneOf(['very low', 'low', 'middle', 'high', 'very high'], 'Invalid active level')
        .required('Active level is required')
});

type FormData = {
    tall: number | null;
    birthday: string | null;
    sex: "male" | "female" | null;
    bmr: number | null;
    active_level: 'very low' | 'low' | 'middle' | 'high' | 'very high';
};

const StaticDetailForm: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [initialStaticDetail, setInitialStaticDetail] = useState<StaticDetail | null>(null);
    const [showBmrField, setShowBmrField] = useState(false);
    const [isActiveLevelModalOpen, setIsActiveLevelModalOpen] = useState(false);
    const [isBmrModalOpen, setIsBmrModalOpen] = useState(false);
    const latestWeight = useAppSelector((state: RootState) => state.latest_weight.latest_weight);
    const [load, setLoad] = useState<Boolean>(false);
    const [unit, setUnit] = useState<'m' | 'ft'>('m'); // State to manage unit, default to m

    const convertTall = (tall: number, toUnit: 'm' | 'ft'): string => {
        if (toUnit === 'm') {
            return (tall / 100).toFixed(2); // cm to m
        } else {
            return (tall / 30.48).toFixed(2); // cm to ft
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetchStatic();
            if ('error' in response) {
                dispatch(setToast({ message: response.error, type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
            } else if ('message' in response) {
                setInitialStaticDetail(response.data);
                if (response.data !== null && response.data.bmr) {
                    setShowBmrField(true);
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            dispatch(setToast({ message: 'An error occurred while fetching data.', type: "error" }));
            setTimeout(() => dispatch(resetToast()), 3000);
        }
    };

    useEffect(() => {
        fetchData();
    }, [load]);

    useEffect(() => {
        if (initialStaticDetail) {
            formik.setFieldValue('tall', initialStaticDetail.tall ? parseFloat(convertTall(initialStaticDetail.tall, unit)) : null);
            formik.setFieldValue('birthday', initialStaticDetail.birthday ?? null);
            formik.setFieldValue('sex', initialStaticDetail.sex ?? 'female');
            formik.setFieldValue('bmr', initialStaticDetail.bmr !== null ? Math.round(initialStaticDetail.bmr) : null);
            formik.setFieldValue('active_level', initialStaticDetail.active_level ?? 'low');
        }
    }, [initialStaticDetail, unit]);

    const initialValues: FormData = {
        tall: null,
        birthday: null,
        sex: null,
        bmr: null,
        active_level: "very low",
    };

    const formik = useFormik<FormData>({
        initialValues: initialValues,
        validationSchema: formSchema,
        onSubmit: async (formData) => {
            try {
                setLoad(true);
                const data = await createUpdateStatic({
                    ...formData,
                    tall: unit === 'm' ? formData.tall ? formData.tall * 100 : null : formData.tall ? formData.tall * 30.48 : null, // Convert to cm before saving
                });
                if ('error' in data) {
                    dispatch(setToast({ message: data.error, type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                } else if ('message' in data) {
                    dispatch(setToast({ message: data.message, type: "success" }));
                    setTimeout(() => dispatch(resetToast()), 4000);
                    fetchData();
                }
            } catch (error) {
                console.error('Error saving data:', error);
                dispatch(setToast({ message: 'An error occurred while saving data.', type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
            } finally {
                setLoad(false);
            }
        },
    });

    const handleTallChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        formik.setFieldValue('tall', value === "" ? null : parseFloat(value));
    };

    const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        formik.setFieldValue('birthday', value === "" ? null : value);
    };

    const handleBmrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        formik.setFieldValue('bmr', value === "" ? null : parseFloat(value));
    };

    const toggleUnit = () => {
        if (formik.values.tall !== null) {
            const convertedTall = parseFloat(convertTall(formik.values.tall, unit === 'm' ? 'ft' : 'm'));
            formik.setFieldValue('tall', convertedTall);
        }
        setUnit((prevUnit) => (prevUnit === 'm' ? 'ft' : 'm'));
    };

    const getActiveLevelLabel = (level: string) => {
        switch (level) {
            case 'very low':
                return 'No Exercise';
            case 'low':
                return 'Rare Exercise';
            case 'middle':
                return 'Moderate Exercise';
            case 'high':
                return 'Frequent Exercise';
            case 'very high':
                return 'Daily Exercise';
            default:
                return 'Unknown';
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-4 p-6 bg-white rounded-lg shadow-md">
            {latestWeight ? (
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <button
                        type="button"
                        onClick={toggleUnit}
                        className="ml-2 p-1 border border-indigo-600 shadow-sm text-xs font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Input as {unit === 'm' ? 'ft' : 'm'}
                    </button>
                    <div className="flex items-center">
                        <label htmlFor="tall" className="block text-lg font-medium text-gray-700 mr-4">
                            Height
                        </label>
                        <input
                            type="number"
                            id="tall"
                            name="tall"
                            value={formik.values.tall ?? ''}
                            onChange={handleTallChange}
                            onBlur={formik.handleBlur}
                            className={clsx(
                                "block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6 pl-2",
                                {
                                    "border-2 border-red-500 bg-red-100 text-red-800":
                                        formik.touched.tall && formik.errors.tall,
                                }
                            )}
                            autoComplete="off"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700">{unit}</span>
                        {formik.errors.tall && formik.touched.tall && (
                            <p className="text-red-500 ml-1">{formik.errors.tall}</p>
                        )}
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="birthday" className="block text-lg font-medium text-gray-700 mr-4">
                            Birthday
                        </label>
                        <input
                            type="date"
                            id="birthday"
                            name="birthday"
                            value={formik.values.birthday ?? ''}
                            onChange={handleBirthdayChange}
                            onBlur={formik.handleBlur}
                            className={clsx(
                                "block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6 pl-2",
                                {
                                    "border-2 border-red-500 bg-red-100 text-red-800":
                                        formik.touched.birthday && formik.errors.birthday,
                                }
                            )}
                            autoComplete="off"
                        />
                        {formik.errors.birthday && formik.touched.birthday && (
                            <p className="text-red-500 ml-1">{formik.errors.birthday}</p>
                        )}
                    </div>
                    <div className="flex items-center">
                        <label className="block text-lg font-medium text-gray-700 mr-4">
                            Sex
                        </label>
                        <div className="flex items-center space-x-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="sex"
                                    value="male"
                                    checked={formik.values.sex === 'male'}
                                    onChange={formik.handleChange}
                                    className="form-radio"
                                />
                                <span className="ml-2">Male</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="sex"
                                    value="female"
                                    checked={formik.values.sex === 'female'}
                                    onChange={formik.handleChange}
                                    className="form-radio"
                                />
                                <span className="ml-2">Female</span>
                            </label>
                        </div>
                        {formik.errors.sex && formik.touched.sex && (
                            <p className="text-red-500 ml-1">{formik.errors.sex}</p>
                        )}
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="active_level" className="block text-lg font-medium text-gray-700 mr-4">
                            Active Level
                        </label>
                        <span className="mr-4 text-lg font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded">{getActiveLevelLabel(formik.values.active_level)}</span>
                        <button
                            type="button"
                            onClick={() => setIsActiveLevelModalOpen(true)}
                            className="px-2 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-300"
                        >
                            Select
                        </button>
                        {formik.errors.active_level && formik.touched.active_level && (
                            <p className="text-red-500 ml-1">{formik.errors.active_level}</p>
                        )}
                    </div>
                    {showBmrField && (
                        <div className="flex items-center">
                            <label htmlFor="bmr" className="block text-lg font-medium text-gray-700 mr-4">
                                BMR
                            </label>
                            <input
                                type="number"
                                id="bmr"
                                name="bmr"
                                value={formik.values.bmr ?? ''}
                                onChange={handleBmrChange}
                                onBlur={formik.handleBlur}
                                className={clsx(
                                    "block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6 pl-2",
                                    {
                                        "border-2 border-red-500 bg-red-100 text-red-800":
                                            formik.touched.bmr && formik.errors.bmr,
                                    }
                                )}
                                autoComplete="off"
                            />
                            <span className="ml-2 text-lg font-medium text-gray-700">kcal</span>
                            {formik.errors.bmr && formik.touched.bmr && (
                                <p className="text-red-500 ml-1">{formik.errors.bmr}</p>
                            )}
                        </div>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                        If you leave the BMR form empty and save, your BMR will be automatically estimated based on your body information.
                    </p>
                    {!showBmrField && (
                        <div>
                            <button
                                type="button"
                                onClick={() => setShowBmrField(true)}
                                className="text-blue-500 underline"
                            >
                                Enter BMR manually
                            </button>
                        </div>
                    )}
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="py-1 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save
                        </button>
                        <button 
                            type="button"
                            onClick={() => setIsBmrModalOpen(true)} 
                            className="text-gray-700 text-xs hover:border-b border-color-black ml-4">What is BMR?
                        </button>
                    </div>
                </form>
            ) : (
                <div>Please register weight first!</div>
            )}
            <ActiveLevelModal
                isOpen={isActiveLevelModalOpen}
                closeModal={() => setIsActiveLevelModalOpen(false)}
                activeLevel={formik.values.active_level}
                setFieldValue={formik.setFieldValue}
                handleBlur={formik.handleBlur}
            />
            {isBmrModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50" onClick={() => setIsBmrModalOpen(false)}></div>
                    <div className="bg-white rounded-lg shadow-lg p-6 z-10 relative w-3/4">
                        <h1 className='text-xl font-bold m-4'>What is BMR?</h1>
                        <button onClick={() => setIsBmrModalOpen(false)} className="absolute top-2 right-2 text-gray-500">×</button>
                        <div className="text-xs text-gray-500">
                            <p>
                                BMR (Basal Metabolic Rate) is the amount of energy expended while at rest in a neutrally temperate environment, in the post-absorptive state (meaning that the digestive system is inactive, which requires about 12 hours of fasting in humans).
                            </p>
                            <p>
                                In this app, BMR is calculated based on your weight, height, sex, and birthday. You can also manually input your BMR if you know it.
                            </p>
                            <p>
                                Since it is difficult to completely track all calories burned, this app estimates other calories based on BMR and active level, and adds them to your daily consumed calories. This app represents the basal metabolic rate as BMR.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StaticDetailForm;
