'use client';

import RenderMealPres from './RenderMealPres';
import MealPreEditForm from './MealPreEditForm';
import { MealSet } from '@/interfaces/meal.interface';
import EditMealSetName from './EditMealSetName';

interface MealManagementComponentProps {
    mealSet:MealSet
}

const MealSetManagement: React.FC<MealManagementComponentProps> = ({ mealSet}) => {
    return (
        <>
        <hr></hr>
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md space-y-4 max-md:mt-3">
            <div className="mb-4">
                <EditMealSetName id={mealSet.meal_set_id} name={mealSet?.meal_set_name}/>
            </div>
            <div className="space-y-4">
                <RenderMealPres meal_pres={mealSet.meal_pres}/>
                <MealPreEditForm />
            </div>
        </div>
        <hr></hr>
        </>
    );
};

export default MealSetManagement;
