'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { useFormik } from 'formik';
import Link from 'next/link';
import * as yup from 'yup';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { fetchStatic } from '@/backend_api/user_detail/fetchStatic';
import { createUpdateStatic } from '@/backend_api/user_detail/createUpdateStatic';
import { useAppSelector } from '@/store';
import { StaticDetail } from '@/interfaces/user_detail.inteface';
import { RootState } from '@/store';
import { setExerciseLoading, setHistoryWorkoutLoading } from '@/store/slices/load.slice';

const formSchema = yup.object({
    tall: yup.number()
        .min(50, 'Tall must be at least 50')
        .max(240, 'Tall must be at most 240')
        .required('Tall is required'),
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
    active_level: yup.mixed<'low' | 'middle' | 'high'>()
        .oneOf(['low', 'middle', 'high'], 'Invalid active level')
        .required('Active level is required')
});

type FormData = {
    tall: number | null;
    birthday: string | null;
    sex: "male" | "female" | null;
    bmr: number | null;
    active_level: 'low' | 'middle' | 'high' | null
};

const StaticDetailForm: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [initialStaticDetail, setInitialStaticDetail] = useState<StaticDetail | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchStatic();
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                } else if ('message' in response) {
                    setInitialStaticDetail(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                dispatch(setToast({ message: 'An error occurred while fetching data.', type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        formik.setFieldValue('tall', initialStaticDetail?.tall ?? null);
        formik.setFieldValue('birthday', initialStaticDetail?.birthday ?? null);
        formik.setFieldValue('sex', initialStaticDetail?.sex ?? 'female');
        formik.setFieldValue('bmr', initialStaticDetail?.bmr ?? null);
        formik.setFieldValue('active_level', initialStaticDetail?.active_level ?? 'low');
    }, [initialStaticDetail]);

    const initialValues: FormData = {
        tall: null,
        birthday: null,
        sex: null,
        bmr: null,
        active_level: null,
    };

    const formik = useFormik<FormData>({
        initialValues: initialValues,
        validationSchema: formSchema,
        onSubmit: async (formData) => {
            try {
                const data = await createUpdateStatic(formData);
                if ('error' in data) {
                    dispatch(setToast({ message: data.error, type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                } else if ('message' in data) {
                    dispatch(setToast({ message: data.message, type: "success" }));
                    setTimeout(() => dispatch(resetToast()), 4000);
                }
            } catch (error) {
                console.error('Error saving data:', error);
                dispatch(setToast({ message: 'An error occurred while saving data.', type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
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

    return (
        <div className="max-w-md mx-auto mt-10 border">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="tall" className="block text-sm font-medium text-gray-700">
                        Tall
                    </label>
                    <input
                        type="number"
                        id="tall"
                        name="tall"
                        value={formik.values.tall ?? ''}
                        onChange={handleTallChange}
                        onBlur={formik.handleBlur}
                        className={clsx(
                            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                            {
                                "border-2 border-red-500 bg-red-100 text-red-800":
                                    formik.touched.tall && formik.errors.tall,
                            }
                        )}
                        autoComplete="off"
                    />
                    {formik.errors.tall && formik.touched.tall && (
                        <p className="text-red-500 ml-1 my-3">{formik.errors.tall}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="bmr" className="block text-sm font-medium text-gray-700">
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
                            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                            {
                                "border-2 border-red-500 bg-red-100 text-red-800":
                                    formik.touched.bmr && formik.errors.bmr,
                            }
                        )}
                        autoComplete="off"
                    />
                    {formik.errors.bmr && formik.touched.bmr && (
                        <p className="text-red-500 ml-1 my-3">{formik.errors.bmr}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
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
                            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                            {
                                "border-2 border-red-500 bg-red-100 text-red-800":
                                    formik.touched.birthday && formik.errors.birthday,
                            }
                        )}
                        autoComplete="off"
                    />
                    {formik.errors.birthday && formik.touched.birthday && (
                        <p className="text-red-500 ml-1 my-3">{formik.errors.birthday}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="sex" className="block text-sm font-medium text-gray-700">
                        Sex
                    </label>
                    <select
                        id="sex"
                        name="sex"
                        value={formik.values.sex ?? ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={clsx(
                            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                            {
                                "border-2 border-red-500 bg-red-100 text-red-800":
                                    formik.touched.sex && formik.errors.sex,
                            }
                        )}
                    >
                        <option value="" label="Select sex" />
                        <option value="male" label="Male" />
                        <option value="female" label="Female" />
                    </select>
                    {formik.errors.sex && formik.touched.sex && (
                        <p className="text-red-500 ml-1 my-3">{formik.errors.sex}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="active_level" className="block text-sm font-medium text-gray-700">
                        Active Level
                    </label>
                    <select
                        id="active_level"
                        name="active_level"
                        value={formik.values.active_level ?? ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={clsx(
                            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                            {
                                "border-2 border-red-500 bg-red-100 text-red-800":
                                    formik.touched.active_level && formik.errors.active_level,
                            }
                        )}
                    >
                        <option value="" label="Select active level" />
                        <option value="low" label="Low" />
                        <option value="middle" label="Middle" />
                        <option value="high" label="High" />
                    </select>
                    {formik.errors.active_level && formik.touched.active_level && (
                        <p className="text-red-500 ml-1 my-3">{formik.errors.active_level}</p>
                    )}
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

export default StaticDetailForm;
