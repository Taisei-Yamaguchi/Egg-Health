'use client';

import MealPreRegisterForm from "./MealPreRegisterForm";
import MealPreRegisterFormByFatSecret from "./MealPreRegisterFormByFatSecret";

interface Step3ComponentProps {
    id:number
}

const MealSetStep3: React.FC<Step3ComponentProps> = ({ id }) => {
    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
            <div className="mb-4">
                <h2 className="text-base font-semibold">Step 3: Register Your Meal</h2>
            </div>
            <div className="space-y-4">
                <MealPreRegisterForm meal_set_id={id} />
                <MealPreRegisterFormByFatSecret meal_set_id={id} />
            </div>
        </div>
    );
};

export default MealSetStep3
