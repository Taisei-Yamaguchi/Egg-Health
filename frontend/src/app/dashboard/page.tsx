'use client';

import { useState, useEffect } from 'react';
import MealExerciseLinks from "@/components/dashboard/MealExerciseLinks";
import { getCurrentDateFormatted, getZonedDate, formatZonedDate } from "@/helper/getTodayDate";
import RenderLineWeight from "@/components/graph/weight_fat/RenderLineWeight";
import DailyCalsNutrients from "@/components/user_detail/DailyCalsNutrients";
import { GoalDetail } from "@/interfaces/user_detail.inteface";
import { fetchGoal } from "@/backend_api/user_detail/fetchGoal";
import { useAppDispatch, useAppSelector } from "@/store";
import { setToast, resetToast } from "@/store/slices/toast.slice";
import Calendar from "@/components/dashboard/Calendar";
import UserInfoComponent from "@/components/dashboard/UserInfoComponent";
import RenderSelectedMonster from "@/components/monster/RenderSelectedMonster";
import { fetchSelectedMonster } from "@/backend_api/monster/fetchSelectedMonster";
import { Monster } from "@/interfaces/monster.interface";
import ChangeMonsterStage from "@/components/monster/ChangeMonsterStage";
import { RootState } from "@/store";
import { CreateMealSetButton } from '@/components/meal/CreateMealSetButton';
import { CreateExerciseSetButton } from '@/components/exercise/CreateExerciseSetButton';
import Ads from '@/components/main/Ads';
import MonsterGrowthRulesModal from '@/components/monster/MonsterGrowthRulesModal';

type MonsterResponse = { monster: Monster, selected_stage: 0 | 1 | 2 | 3 | 4 | 5 };

export default function Dashboard() {
    const dispatch = useAppDispatch();
    const currentDate = getCurrentDateFormatted();
    // const today = getZonedDate(new Date());
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
    }, [dispatch, monster_loading]);

    useEffect(() => {
        const fetchGoalData = async () => {
            try {
                const response = await fetchGoal();
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                } else if ('message' in response) {
                    setGoal(response.data);
                }
            } catch (error) {
                console.error('Error fetching goal data:', error);
                dispatch(setToast({ message: 'An error occurred while fetching goal', type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
            }
        };
        fetchGoalData();
    }, [dispatch]);

    return (
        <>
            <div className="flex justify-center mt-6 w-full border">
                <div className="w-full flex flex-row items-center max-lg:flex-col">
                    <div className="p-4 bg-yellow-100 rounded-lg shadow-md mb-4 w-full flex max-md:flex-col-reverse max-md:items-center">
                        <div className="w-3/4 max-md:w-full">
                            <UserInfoComponent goal={goal}/>
                            <MealExerciseLinks date={currentDate}/>
                            <DailyCalsNutrients date={currentDate} goal={goal}/>
                            <div className="p-4 bg-yellow-100 rounded-lg shadow-md mb-4 w-full">
                                <div className="text-xs font-semibold text-orange-600 mb-2">New Meal Set & New Exercise Set</div>
                                <div className="max-w-lg mx-auto mt-1 relative py-4 px-12 bg-yellow-50 rounded-lg shadow-md text-xs w-full flex justify-between">
                                    <CreateMealSetButton/>
                                    <CreateExerciseSetButton/>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2 max-md:w-full flex items-center self-start md:flex-col">
                            <div className="w-full max-md:w-1/2 max-md:self-start">
                                <RenderSelectedMonster monsterRes={monsterRes}/>
                                <ChangeMonsterStage monsterRes={monsterRes}/>
                                <div className='flex gap-2 max-lg:flex-col items-center justify-center'>
                                    <button className="bg-purple-500 text-white px-2 py-1 rounded-lg hover:bg-purple-600 text-[10px] m-2">
                                        <a className="text-xs" href="/dashboard/monsters">Change the monster to grow</a>
                                    </button>
                                    <MonsterGrowthRulesModal />
                                </div>
                            </div>
                            <div className="w-1/2 h-[150px] mx-1 md:w-full max-md:h-3/4">
                                <Ads/>
                            </div>
                        </div>
                    </div>
                    <div className='flex lg:flex-col max-lg:w-full border justify-between'>
                        <div className="ml-4 max-lg:w-1/2 h-[200px] w-[300px] max-lg:h-[150px]">
                            <Ads/>
                        </div>
                        <div className="ml-4 max-lg:w-1/2 h-[200px] w-[300px] max-lg:h-[150px]">
                            <Ads/>
                        </div>
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
                <Calendar currentDate={currentDate}/>
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
