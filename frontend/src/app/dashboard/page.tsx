"use client"
import MealExerciseLinks from "@/components/dashboard/MealExerciseLinks";
import { getCurrentDateFormatted } from "@/helper/getTodayDate";
import RenderLineWeight from "@/components/graph/weight_fat/RenderLineWeight";
import DailyCalsNutrients from "@/components/user_detail/DailyCalsNutrients";
import { GoalDetail } from "@/interfaces/user_detail.inteface";
import { fetchGoal } from "@/backend_api/user_detail/fetchGoal";
import { useEffect,useState } from "react";
import { useAppDispatch } from "@/store";
import { setToast } from "@/store/slices/toast.slice";
import { resetToast } from "@/store/slices/toast.slice";
import Calendar from "@/components/dashboard/Calendar";
import UserInfoComponent from "@/components/dashboard/UserInfoComponent";

export default function Dashboard() {
	const dispatch = useAppDispatch()
	const currentDate = getCurrentDateFormatted();
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
            <div className="flex justify-center mt-6 w-full border">
                <div className="w-full flex flex-row items-center max-sm:flex-col">
				    <div className="p-4 bg-yellow-100 rounded-lg shadow-md mb-4 w-full flex">
                        <div className="w-3/4">
                            <UserInfoComponent goal={goal}/>
                            <MealExerciseLinks date={currentDate}/>
                            <DailyCalsNutrients date={currentDate} goal={goal}/>
                        </div>
                        <div className="w-1/4">
                            <img src="/1-adolescent.png" className="w-full"  alt="monster1-egg"/>
                        </div>
                    </div>
                    <div className="w-1/6 ml-4 h-full max-sm:w-full max-sm:h-[150px]">
                        <div className="w-full h-full bg-slate-100">ads</div>
                    </div>
                    {/* <div className="p-4 bg-yellow-100 rounded-lg shadow-md mb-4 w-full">
                        <div className="text-xs font-semibold text-orange-600 mb-2">Calories & PFC Data</div>
                        <DailyCalsNutrients date={selectedDate} goal={goal} />
                    </div>
                    <div className="p-4 bg-yellow-100 rounded-lg shadow-md mb-4 w-full">
                        <div className="text-xs font-semibold text-orange-600 mb-2">Body Record</div>
                        <DynamicDetailForm date={selectedDate} goal={goal}/>
                    </div> */}
                </div>
            </div>
            <div className="p-4 bg-yellow-100 rounded-lg shadow-md mb-4 w-full flex">
                    <RenderLineWeight />
					<Calendar />
            </div>
            <div className="w-full h-[200px] bg-yellow-100">
                footer
            </div>
        </>
	);
}