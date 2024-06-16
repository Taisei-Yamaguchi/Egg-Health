'use client';

import SelectFoodList from './SelectFoodList';
import MealSetList from './MealSetList';

interface Step2ComponentProps {
    date: string;
    meal_type: "Breakfast" | "Lunch" | "Dinner" | "Snack"
}

const Step2FoodSelectComponent: React.FC<Step2ComponentProps> = ({ date, meal_type }) => {
    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
            <div className="mb-4">
                <h2 className="text-base font-semibold">Step 2: Select Foods for Your Meal</h2>
            </div>
            <div className="space-y-4">
                <SelectFoodList />
                <MealSetList date={date} meal_type={meal_type} />
            </div>
        </div>
    );
};

export default Step2FoodSelectComponent;
