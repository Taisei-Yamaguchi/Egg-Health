"use client";
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppSelector } from '@/store';
import { RootState } from '@/store';

const ExerciseCalorieCalculator: React.FC = () => {
    const selectedWorkout = useAppSelector((state: RootState) => state.workout_exercise.used_workout);
    const [calories, setCalories] = useState<number | null>(null);

    const formik = useFormik({
        initialValues: {
            weight: '',
            weightUnit: 'kg',
            duration: '',
        },
        validationSchema: Yup.object({
            weight: Yup.number()
                .required('Weight is required')
                .positive('Weight must be a positive number'),
            duration: Yup.number()
                .required('Duration is required')
                .positive('Duration must be a positive number'),
        }),
        onSubmit: (values) => {
            if (!selectedWorkout) {
                alert('Please select a workout');
                return;
            }

            let weightInKg = parseFloat(values.weight);
            if (values.weightUnit === 'lbs') {
                weightInKg = weightInKg * 0.453592;
            }

            const caloriesBurned = 1.05 * weightInKg * parseFloat(values.duration) / 60 * selectedWorkout.mets;
            setCalories(caloriesBurned);
        },
    });

    return (
        <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md">
            
            {selectedWorkout && (
                <div className="mb-4">
                    <h2 className="text-xl font-semibold capitalize">Selected Workout: {selectedWorkout.name}</h2>
                    <p>METS: {selectedWorkout.mets}</p>
                </div>
            )}
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Weight</label>
                    <div className="flex">
                        <input
                            type="text"
                            name="weight"
                            value={formik.values.weight}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="border p-2 rounded-l w-full"
                        />
                        <select
                            name="weightUnit"
                            value={formik.values.weightUnit}
                            onChange={formik.handleChange}
                            className="border p-2 rounded-r"
                        >
                            <option value="kg">kg</option>
                            <option value="lbs">lbs</option>
                        </select>
                    </div>
                    {formik.touched.weight && formik.errors.weight ? (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.weight}</div>
                    ) : null}
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Duration (minutes)</label>
                    <input
                        type="text"
                        name="duration"
                        value={formik.values.duration}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="border p-2 rounded w-full"
                    />
                    {formik.touched.duration && formik.errors.duration ? (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.duration}</div>
                    ) : null}
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Calculate Calories
                </button>
            </form>
            {calories !== null && (
                <div className="mt-4">
                    <h2 className="text-2xl font-semibold">Predicted Calories Burned is
                <br></br>{calories.toFixed(2)} (kcal)</h2>
                </div>
            )}
        </div>
    );
};

export default ExerciseCalorieCalculator;
