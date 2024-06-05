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

type Props = {
    params: { date: string };
};

const RecordPage: React.FC<Props> = ({ params: { date } }) => { 
    const dispatch = useAppDispatch();
    const todayFormatted = getCurrentDateFormatted();
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
    const isValidDateExistence = isValidDate && !isNaN(Date.parse(date));
    const selectedDate = isValidDateExistence ? date : todayFormatted;
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
            <SelectDateChange date={selectedDate} />
            <RecordNav date={selectedDate} />
            <div className="flex justify-center mt-6 w-full border">
                <div className="w-5/6 flex flex-col items-center">
                    <div className="p-4 bg-yellow-100 rounded-lg shadow-md mb-4 w-full">
                        <div className="text-xs font-semibold text-orange-600 mb-2">Calories & PFC Data</div>
                        <DailyCalsNutrients date={selectedDate} goal={goal} />
                    </div>
                    <div className="p-4 bg-yellow-100 rounded-lg shadow-md mb-4 w-full">
                        <div className="text-xs font-semibold text-orange-600 mb-2">Body Record</div>
                        <DynamicDetailForm date={selectedDate} goal={goal}/>
                    </div>
                    <div className="p-4 bg-yellow-100 rounded-lg shadow-md mb-4 w-full">
                        <RenderMeals date={selectedDate} />
                        <RenderExercises date={selectedDate} />
                    </div>
                </div>
                <div className="w-1/6 ml-4">
                    <div className="w-full h-full bg-slate-100">ads</div>
                </div>
            </div>
            <div className="w-full h-[200px] bg-yellow-100">
                footer
            </div>
        </>
    );
}

export default RecordPage;
