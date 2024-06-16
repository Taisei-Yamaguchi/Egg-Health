'use client';

import SelectFoodList from './SelectFoodList';
import MealSetList from './MealSetList';


const MealSetStep2: React.FC = () => {
    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
            <div className="mb-4">
                <h2 className="text-base font-semibold">Step 2: Select Foods for Your Meal</h2>
            </div>
            <div className="space-y-4">
                <SelectFoodList />
            </div>
        </div>
    );
};

export default MealSetStep2
