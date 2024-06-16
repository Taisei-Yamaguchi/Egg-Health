'use client';

import { useEffect, useState } from 'react';
import MealRegisterForm from './MealRegisterForm';
import MealRegisterFormByFatSecret from './MealRegisterFormByFatSecret';

interface Step3ComponentProps {
    date: string;
    meal_type: "Breakfast" | "Lunch" | "Dinner" | "Snack"
}

const Step3MealRegisterComponent: React.FC<Step3ComponentProps> = ({ date, meal_type }) => {
    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
            <div className="mb-4">
                <h2 className="text-base font-semibold">Step 3: Register Your Meal</h2>
            </div>
            <div className="space-y-4">
                <MealRegisterForm date={date} meal_type={meal_type} />
                <MealRegisterFormByFatSecret date={date} meal_type={meal_type} />
            </div>
        </div>
    );
};

export default Step3MealRegisterComponent;
