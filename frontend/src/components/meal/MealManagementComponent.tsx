'use client';

import { useEffect, useState } from 'react';
import RenderMealsByType from './RenderMealByType';
import MealEditForm from './MealEditForm';

interface MealManagementComponentProps {
    date: string;
    meal_type: "Breakfast" | "Lunch" | "Dinner" | "Snack";
}

const MealManagementComponent: React.FC<MealManagementComponentProps> = ({ date, meal_type }) => {
    return (
        <>
        <hr></hr>
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md space-y-4 max-md:mt-3">
            <div className="mb-4">
                <h2 className="text-base font-semibold">Manage Your Meals</h2>
            </div>
            <div className="space-y-4">
                <RenderMealsByType date={date} meal_type={meal_type} />
                <MealEditForm />
            </div>
        </div>
        <hr></hr>
        </>
    );
};

export default MealManagementComponent;
