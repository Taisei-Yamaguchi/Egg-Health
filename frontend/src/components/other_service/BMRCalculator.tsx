"use client";

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const BMRCalculator: React.FC = () => {
    const formik = useFormik({
        initialValues: {
            weight: '',
            height: '',
            age: '',
            sex: 'male',
            weightUnit: 'kg',
            heightUnit: 'cm',
        },
        validationSchema: Yup.object({
            weight: Yup.number()
                .required('This value is required.')
                .positive('Must be greater than zero.'),
            height: Yup.number()
                .required('This value is required.')
                .positive('Must be greater than zero.'),
            age: Yup.number()
                .required('This value is required.')
                .positive('Must be greater than zero.'),
        }),
        onSubmit: (values) => {
            let weightInKg = Number(values.weight);
            let heightInCm = Number(values.height);

            if (values.weightUnit === 'lb') {
                weightInKg = weightInKg * 0.453592;
            }

            if (values.heightUnit === 'ft') {
                heightInCm = heightInCm * 30.48;
            }

            let bmr;
            if (values.sex === 'female') {
                bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * Number(values.age) - 161;
            } else {
                bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * Number(values.age) + 5;
            }

            setBmrResult(bmr.toFixed(2));
        },
    });

    const [bmrResult, setBmrResult] = React.useState<string | null>(null);

    return (
        <div className="max-w-xl mx-auto p-6 mt-4 bg-white rounded-lg shadow-md text-left">
            
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Weight</label>
                    <div className="flex">
                        <input
                            type="text"
                            name="weight"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.weight}
                            className="border p-2 rounded-l w-full"
                        />
                        <select
                            name="weightUnit"
                            onChange={formik.handleChange}
                            value={formik.values.weightUnit}
                            className="border p-2 rounded-r"
                        >
                            <option value="kg">kg</option>
                            <option value="lb">lb</option>
                        </select>
                    </div>
                    {formik.touched.weight && formik.errors.weight ? (
                        <div className="text-red-500 text-xs mt-1">{formik.errors.weight}</div>
                    ) : null}
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Height</label>
                    <div className="flex">
                        <input
                            type="text"
                            name="height"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.height}
                            className="border p-2 rounded-l w-full"
                        />
                        <select
                            name="heightUnit"
                            onChange={formik.handleChange}
                            value={formik.values.heightUnit}
                            className="border p-2 rounded-r"
                        >
                            <option value="cm">cm</option>
                            <option value="ft">ft</option>
                        </select>
                    </div>
                    {formik.touched.height && formik.errors.height ? (
                        <div className="text-red-500 text-xs mt-1">{formik.errors.height}</div>
                    ) : null}
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Age</label>
                    <input
                        type="text"
                        name="age"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.age}
                        className="border p-2 rounded w-full"
                    />
                    {formik.touched.age && formik.errors.age ? (
                        <div className="text-red-500 text-xs mt-1">{formik.errors.age}</div>
                    ) : null}
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Gender</label>
                    <select
                        name="sex"
                        onChange={formik.handleChange}
                        value={formik.values.sex}
                        className="border p-2 rounded w-full"
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Calculate BMR
                </button>
            </form>

            {bmrResult !== null && (
                <div className="mt-4">
                    <h2 className="text-2xl font-semibold">
                        Your BMR is estimated: <br />
                        {bmrResult} kcal/day
                    </h2>
                </div>
            )}
        </div>
    );
};

export default BMRCalculator;
