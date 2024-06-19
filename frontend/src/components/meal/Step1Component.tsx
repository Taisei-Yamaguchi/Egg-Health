'use client';

import SearchFatsecretFoodComponent from './SearchFatsecretFoodComponent';
import CustomFoodButton from './CustomFoodButton';
import HistoryFoodButton from './HistoryFoodButton';
import OftenFoodListButton from './OftenFoodListButton';
import MealSetListButton from './MealSetListButton';
import { FoodForm } from './FoodForm';
import { CreateMealSetButton } from './CreateMealSetButton';

const Step1FoodSearchComponent = () => {
    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
            <div className="mb-4">
                <h2 className="text-base font-semibold">Step 1: Search for Food</h2>
            </div>
            <SearchFatsecretFoodComponent />
            <div className="flex">
                <div className='mr-1'>
                    <CustomFoodButton />
                </div>
                <div className='mr-1'>
                    <HistoryFoodButton />
                </div>
                <div className='mr-1'>
                    {/* <OftenFoodListButton /> */}
                </div>
                <div className='mr-1'>
                    {/* <MealSetListButton /> */}
                </div>
            </div>
            <div className="flex">
                <div className='mr-1'>
                    <FoodForm />
                </div>
                <div className='mr-1'>
                    {/* <CreateMealSetButton /> */}
                </div>
            </div>
        </div>
    );
};

export default Step1FoodSearchComponent
