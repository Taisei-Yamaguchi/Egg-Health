"use client";

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const BMICalculator: React.FC = () => {
    const [bmi, setBmi] = useState<number | null>(null);
    const [bmiCategory, setBmiCategory] = useState<string | null>(null);

    const formik = useFormik({
        initialValues: {
            weight: '',
            height: '',
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

            const heightInMeters = heightInCm / 100;
            const bmiValue = weightInKg / (heightInMeters * heightInMeters);
            setBmi(bmiValue);

            if (bmiValue < 18.5) {
                setBmiCategory('Underweight');
            } else if (bmiValue < 24.9) {
                setBmiCategory('Normal weight');
            } else if (bmiValue < 29.9) {
                setBmiCategory('Overweight');
            } else {
                setBmiCategory('Obesity');
            }
        },
    });

    return (
        <div className="max-w-xl mx-auto p-6 mt-4 bg-white rounded-lg shadow-md text-left">
            <h2 className="text-2xl font-bold mb-4">BMI Calculator</h2>
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

                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Calculate BMI
                </button>
            </form>

            {bmi !== null && (
                <div className="mt-4 p-4 bg-gray-100 rounded">
                    <h3 className="text-lg font-bold">Your BMI</h3>
                    <p>BMI: {bmi.toFixed(2)}</p>
                    <p>Category: {bmiCategory}</p>
                </div>
            )}
        </div>
    );
};

export default BMICalculator;
