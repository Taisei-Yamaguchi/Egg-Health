"use client";

import RenderMealsByType from "@/components/meal/RenderMealByType";
import { FoodForm } from "@/components/meal/FoodForm";
import CustomFoodButton from "@/components/meal/CustomFoodButton";
import HistoryFoodButton from "@/components/meal/HistoryFoodButton";
import MealRegisterForm from "@/components/meal/MealRegisterForm";
import MealEditForm from "@/components/meal/MealEditForm";
import { getCurrentDateFormatted } from "@/helper/getTodayDate";
import RecordNav from "@/components/navigation/RecordNav";
import SelectDateChange from "@/components/navigation/SelectDateChange";
import SearchFatsecretFoodComponent from "@/components/meal/SearchFatsecretFoodComponent";
import OftenFoodListButton from "@/components/meal/OftenFoodListButton";
import MealSetListButton from "@/components/meal/MealSetListButton";
import MealSetList from "@/components/meal/MealSetList";
import { CreateMealSetButton } from "@/components/meal/CreateMealSetButton";
import SelectFoodList from "@/components/meal/SelectFoodList";
import MealPreRegisterForm from "@/components/meal/MealPreRegisterForm";
import MealPreRegisterFormByFatSecret from "@/components/meal/MealPreRegisterFormByFatSecret";
import { fetchMealSet } from "@/backend_api/meal/fetchMealSet";
import { useAppDispatch } from "@/store";
import { useAppSelector } from "@/store";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { MealSet } from "@/interfaces/meal.interface";
import { setToast, resetToast } from "@/store/slices/toast.slice";
import RenderMealPres from "@/components/meal/RenderMealPres";
import MealPreEditForm from "@/components/meal/MealPreEditForm";
import EditMealSetName from "@/components/meal/EditMealSetName";

type Props = {
    params: { id: number };
};

const MealSetPage: React.FC<Props> = ({ params: { id } }) => {
    const dispatch = useAppDispatch();
    const meal_loading = useAppSelector((state: RootState) => state.load.meal_loading) as boolean;
    const [mealSet, setMealSet] = useState<MealSet | null>(null);

    useEffect(() => {
        const fetchData = () => {
            fetchMealSet(id)
                .then(response => {
                    if ('error' in response) {
                        dispatch(setToast({ message: response.error, type: "error" }));
                        setTimeout(() => dispatch(resetToast()), 3000);
                        return;
                    }
                    if ('message' in response) {
                        setMealSet(response.data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching meals:', error);
                });
        };
        fetchData();
    }, [meal_loading, dispatch, id]);

    return (
        <>
            {/* <SelectDateChange date={selectedDate}/> */}
            {/* <RecordNav date={selectedDate}/> */}
            {mealSet &&(<EditMealSetName id={id} name={mealSet?.meal_set_name}/>)}
            <div className="flex">
                <div className="flex w-5/6">
                    <div className="w-1/2">
                        <SearchFatsecretFoodComponent />
                        <div className="flex ">
                            <CustomFoodButton />
                            <HistoryFoodButton />
                            <OftenFoodListButton />
                        </div>

                        <SelectFoodList />
                        <MealPreRegisterForm meal_set_id={id} />
                        <MealPreRegisterFormByFatSecret meal_set_id={id} />
                    </div>
                    <div className="w-1/2">
                        {mealSet?.meal_pres && (
                            <RenderMealPres meal_pres={mealSet?.meal_pres} />
                        )}
                        <MealPreEditForm />
                    </div>
                </div>
                <div className="w-1/6 h-[400px] bg-slate-200">
                    ads
                </div>
            </div>
            <div className="flex">
                <div className="w-1/3 h-[200px] bg-slate-200 border">
                    ads
                </div>
                <div className="w-1/3 h-[200px] bg-slate-200 border">
                    ads
                </div>
            </div>
            <div className="w-full h-[400px] bg-yellow-200">
                footer
            </div>
        </>
    );
}

export default MealSetPage;
