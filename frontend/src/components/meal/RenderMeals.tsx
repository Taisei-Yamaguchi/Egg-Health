'use client';
import React , { useEffect ,useState}from 'react';
import { useRouter } from 'next/navigation';

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';

import { fetchMeals } from '@/backend_api/meal/fetchMeals';
import { Meal } from '@/interfaces/meal.interface';
import DeleteMealButton from './DeleteMeal';
// import ToggleOftenFoodButton from './ToggleOftenFoodButon';

interface Props {
    date: string;
    meal_type: string;
}

const RenderMeals: React.FC<Props> = ({date,meal_type})=>{
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [meals, setMeals] = useState<Meal[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchMeals(date,meal_type);
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                    return;
                }if ('message' in response) {
                    setMeals(response.data);
                }
            } catch (error) {
                console.error('Error fetching meals:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    {meals.length > 0 ? (
        meals.map((meal) => (
            <div key={meal.id} className="p-4 bg-white shadow rounded-lg">
                {/* meal with custom food */}
                {meal.food && !meal.fat_secret_food && (
                    <>
                        <h3 className="text-lg font-semibold">{meal.food.name}</h3>
                        <p>
                            {meal.servings !== null ? (
                                `${meal.servings} (servings)`
                            ) : meal.grams !== null ? (
                                `${meal.grams} (g)`
                            ) : (
                                "Serving information not available"
                            )}
                        </p>
                        <p>
                            {meal.intake_cal} kcal
                        </p>
                        {/* <ToggleOftenFoodButton food={meal.food}/> */}
                        <DeleteMealButton id={meal.id}/>
                    </>
                )}
                {/* meal with fat_secret_food */}
                {!meal.food && meal.fat_secret_food && (
                    <>
                    <h3 className="text-lg font-semibold">
                    <div>
                        {meal.fat_secret_food.name}
                    </div>
                    </h3>
                    <div className='flex justify-between'>
                        <p>
                            {meal.servings !== null ? (
                                `${meal.servings} ${meal.fat_secret_food.unit}`
                            ) : meal.grams !== null ? (
                                `${meal.grams} (g)`
                            ) : (
                                "Serving information not available"
                            )}
                        </p>
                        <p>
                            {meal.intake_cal} kcal
                        </p>
                        {/* <ToggleOftenFoodButton food={meal.food}/> */}
                        <DeleteMealButton id={meal.id}/>
                    </div>
                </>
                )}
            </div>
        ))
    ) : (
        <p className="text-gray-500">No meals recorded for {meal_type}.</p>
    )}
</div>

    );
}

export default RenderMeals