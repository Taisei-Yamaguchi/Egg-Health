"use client";

import { fetchMealSet } from "@/backend_api/meal/fetchMealSet";
import { useAppDispatch } from "@/store";
import { useAppSelector } from "@/store";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { MealSet } from "@/interfaces/meal.interface";
import { setToast, resetToast } from "@/store/slices/toast.slice";

import MealSetStep1 from "@/components/meal/MealSetStep1";
import MealSetStep2 from "@/components/meal/MealSetStep2";
import MealSetStep3 from "@/components/meal/MealSetStep3";
import MealSetManagement from "@/components/meal/MealSetManagement";
import Ads from "@/components/main/Ads";

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
            <h1 className="text-3xl font-bold">Meal Set</h1>
            <div className="flex">
                <div className="flex w-5/6 max-lg:w-full max-lg:flex-col-reverse">
                    <div className="w-1/2 max-lg:w-full">
                        {/* step1 */}
                        <MealSetStep1 />
                        {/* step2 */}
                        <MealSetStep2 />
                        {/* step3 */}
                        <MealSetStep3 id={id} />
                    </div>
                    <div className="lg:hidden flex ">
                        <div className="w-1/3 max-sm:w-1/2 h-[180px] border">
                            <Ads/>
                        </div>
                        <div className="w-1/3 max-sm:w-1/2 h-[180px] border">
                            <Ads/>
                        </div>
                    </div>
                    <div className="w-1/2 max-lg:w-full">
                        {mealSet && (
                            <MealSetManagement mealSet={mealSet}/>
                        )}
                    </div>
                </div>
                <div className="w-1/6 ml-4 max-lg:hidden ">
                    <div className="h-[200px] w-[200px] border">
                        <Ads/>
                    </div>
                    <div className="h-[200px] w-[200px] border">
                        <Ads/>
                    </div>
                    <div className="h-[200px] w-[200px] border">
                        <Ads/>
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="w-1/3 h-[180px] max-sm:w-1/2 border">
                    <Ads/>
                </div>
                <div className="w-1/3 h-[180px] max-sm:w-1/2 border">
                    <Ads/>
                </div>
            </div>
        </>
    );
}

export default MealSetPage;
