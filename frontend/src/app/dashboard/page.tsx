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
import RenderSelectedMonster from "@/components/monster/RenderSelectedMonster";
import { fetchSelectedMonster } from "@/backend_api/monster/fetchSelectedMonster";
import { Monster } from "@/interfaces/monster.interface";
import ChangeMonsterStage from "@/components/monster/ChangeMonsterStage";
import { useAppSelector } from "@/store";
import { RootState } from "@/store";

type MonsterResponse = { monster: Monster, selected_stage: 0|1|2|3|4|5 }

export default function Dashboard() {
	const dispatch = useAppDispatch()
	const currentDate = getCurrentDateFormatted();
	const [goal, setGoal] = useState<GoalDetail | null>(null);
    const [monsterRes, setMonsterRes] = useState<MonsterResponse | null>(null);
    const monster_loading = useAppSelector((state: RootState) => state.load.monster_loading) as boolean;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchSelectedMonster();
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                } else if ('message' in response) {
                    setMonsterRes(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                dispatch(setToast({ message: 'An error occurred while fetching monster data', type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
            }
        };
        fetchData();
    }, [dispatch,monster_loading]);

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
                <div className="w-full flex flex-row items-center max-md:flex-col">
				    <div className="p-4 bg-yellow-100 rounded-lg shadow-md mb-4 w-full flex max-md:flex-col-reverse max-md:items-center">
                        <div className="w-3/4 max-md:w-full">
                            <UserInfoComponent goal={goal}/>
                            <MealExerciseLinks date={currentDate}/>
                            <DailyCalsNutrients date={currentDate} goal={goal}/>
                        </div>
                        <div className="w-1/2  max-md:w-full flex items-center self-start">
                            <div className="w-full max-md:w-1/2 max-md:self-start">
                                <RenderSelectedMonster monsterRes={monsterRes}/>
                                <ChangeMonsterStage monsterRes={monsterRes}/>
                                <a className="border-b text-purple-600 hover:text-purple-400" href="/dashboard/monsters">Monsters list</a>
                            </div>
                            <div className="w-1/2 h-[150px] md:hidden mx-1">
                                <div className="w-full h-full bg-slate-100">ads</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/6 ml-4 h-full max-md:w-full max-md:h-[150px]">
                        <div className="w-full h-full bg-slate-100">ads</div>
                    </div>
                </div>
            </div>
            <div className="p-4 bg-yellow-100 rounded-lg shadow-md mb-4 w-full flex max-md:flex-col">
                <div>
                    <div className="text-center py-2">
                        <a href="/dashboard/graph/weight" className="text-blue-500 underline text-sm">
                            See more graphs
                        </a>
                    </div>
                    <RenderLineWeight />
                </div>
				<Calendar />
            </div>
            <div className="flex">
                <div className="w-1/3 h-[200px] bg-slate-200 border">
                    ads
                </div>
                <div className="w-1/3 h-[200px] bg-slate-200 border">
                    ads
                </div>
            </div>
            <div className="w-full h-[200px] bg-yellow-100">
                footer
            </div>
        </>
	);
}