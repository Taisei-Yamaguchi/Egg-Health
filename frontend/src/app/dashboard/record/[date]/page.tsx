'use client';

import RenderMeals from "@/components/record/RenderMeals";
import RenderExercises from "@/components/record/RenderExercises";
import DynamicDetailForm from "@/components/user_detail/DynamicDetailForm";
import { getCurrentDateFormatted } from "@/helper/getTodayDate";
import RecordNav from "@/components/navigation/RecordNav";
import SelectDateChange from "@/components/navigation/SelectDateChange";
import DailyCalsNutrients from "@/components/user_detail/DailyCalsNutrients";
import { fetchGoal } from "@/backend_api/user_detail/fetchGoal";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store";
import { setToast, resetToast } from "@/store/slices/toast.slice";
import { GoalDetail } from "@/interfaces/user_detail.inteface";
import { CreateExerciseSetButton } from "@/components/exercise/CreateExerciseSetButton";
import { CreateMealSetButton } from "@/components/meal/CreateMealSetButton";
import DailyCalsNutrients2 from "@/components/user_detail/DailyCalsNutrients2";
import Ads from "@/components/main/Ads";

type Props = {
    params: { date: string };
};

const RecordPage: React.FC<Props> = ({ params: { date } }) => { 
    const dispatch = useAppDispatch();
    const today = new Date();
    const todayFormatted = getCurrentDateFormatted();
    const futureDate = new Date(today);
    futureDate.setDate(futureDate.getDate()+2);
    const futureDateFormatted = futureDate.toISOString().split('T')[0];

    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
    const isValidDateExistence = isValidDate && !isNaN(Date.parse(date));
    const isFutureDateValid = isValidDateExistence && date <= futureDateFormatted;

    const selectedDate = isFutureDateValid ? date : todayFormatted;
    const [goal, setGoal] = useState<GoalDetail | null>(null);

    useEffect(() => {
        const fetchGoalData = () => {
            fetchGoal()
                .then(response => {
                    if ('error' in response) {
                        dispatch(setToast({ message: response.error, type: "error" }));
                        setTimeout(() => dispatch(resetToast()), 3000);
                    } else if ('message' in response) {
                        setGoal(response.data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching goal data:', error);
                    dispatch(setToast({ message: 'An error occurred while fetching goal', type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                });
        };
        fetchGoalData();
    }, [dispatch]);

    return (
        <>
            <DailyCalsNutrients2 date={selectedDate}/>
            <SelectDateChange date={selectedDate} />
            
            <RecordNav date={selectedDate} />
            <div className="flex justify-center mt-6 w-full border">
                <div className="w-5/6 flex flex-col items-center">
                    <div className="p-4 bg-yellow-100 rounded-lg shadow-md mb-4 w-full">
                        <DynamicDetailForm date={selectedDate} goal={goal}/>
                    </div>
                    <div className="p-4 bg-yellow-100 rounded-lg shadow-md mb-4 w-full">
                        <DailyCalsNutrients date={selectedDate} goal={goal} />
                    </div>
                    {/* <div className="p-4 bg-yellow-100 rounded-lg shadow-md mb-4 w-full">
                        <div className="text-xs font-semibold text-orange-600 mb-2">New Meal Set & New Exercise Set</div>
                        <div className="max-w-lg mx-auto mt-1 relative py-4 px-12 bg-yellow-50 rounded-lg shadow-md text-xs w-full flex justify-between">
                            <CreateMealSetButton/>
                            <CreateExerciseSetButton/>
                        </div>
                    </div> */}
                    <div className="w-full flex">
                        <div className="w-1/2 h-[150px] ">
                            <Ads/>
                        </div>
                        <div className="w-1/2 h-[150px] ">
                            <Ads/>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-yellow-100 rounded-lg shadow-md mb-4 w-full">
                        <RenderMeals date={selectedDate} />
                        <RenderExercises date={selectedDate} />
                    </div>
                </div>
                <div className=" ml-4 max-lg:hidden flex flex-col justify-between">
                    <div className=" h-[200px] w-[300px] ">
                        <Ads/>
                    </div>
                    <div className=" h-[200px] w-[300px] ">
                        <Ads/>
                    </div>
                    <div className=" h-[200px] w-[300px] ">
                        <Ads/>
                    </div>
                    <div className=" h-[200px] w-[300px] ">
                        <Ads/>
                    </div>
                    <div className=" h-[200px] w-[300px] ">
                        <Ads/>
                    </div>
                </div>
                
            </div>
            <div className="flex">
                <div className="w-1/3 h-[200px]  border max-sm:w-1/2">
                    <Ads/>
                </div>
                <div className="w-1/3 h-[200px] border max-sm:w-1/2">
                    <Ads/>
                </div>
            </div>
        </>
    );
}

export default RecordPage;
