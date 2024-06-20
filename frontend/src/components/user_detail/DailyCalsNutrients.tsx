'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { fetchDailyCalsNutrients } from '@/backend_api/user_detail/fetchDailyCalsNutrients';
import { GoalDetail } from '@/interfaces/user_detail.inteface';

interface Props {
    date: string;
    goal: GoalDetail | null;
}

type CalsNutrients = {
    sum_intake_cal: number,
    sum_intake_protein: number,
    sum_intake_fat: number,
    sum_intake_carbs: number,
    total_consume_cal: number,
}

const DailyCalsNutrients: React.FC<Props> = ({ date, goal }) => {
    const dispatch = useAppDispatch();
    const [calsNutrients, setCalsNutrients] = useState<CalsNutrients | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchDailyCalsNutrients(date);
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                } else if ('message' in response) {
                    setCalsNutrients(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                dispatch(setToast({ message: 'An error occurred while fetching calories & nutrients', type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
            }
        };

        fetchData();
    }, [date, dispatch]);

    const getCalDiffClass = (diff: number) => {
        if (diff >= -200 && diff <= 200) {
            return 'text-green-500';
        }
        return diff > 0 ? 'text-red-500' : 'text-blue-500';
    }

    const formatDiff = (diff: number) => {
        return diff > 0 ? `+${Math.round(diff)}` : `${Math.round(diff)}`;
    }

    const renderPfcBalance = (goalType: string) => {
        switch (goalType) {
            case 'diet':
                return {
                    protein: 0.4,
                    fat: 0.3,
                    carbs: 0.3,
                    label: (
                        <div className='max-md:flex max-md:flex-col'>
                            <span className="text-gray-500 text-[10px]">Ideal PFC Balance for Diet: </span>
                            <span className="font-bold">Protein 40%, Fat 30%, Carbs 30%</span>
                        </div>
                    )
                };
            case 'maintain':
                return {
                    protein: 0.3,
                    fat: 0.3,
                    carbs: 0.4,
                    label: (
                        <div className='max-md:flex max-md:flex-col'>
                            <span className="text-gray-500 text-[10px]">Ideal PFC Balance for Maintenance: </span>
                            <span className="font-bold">Protein 30%, Fat 30%, Carbs 40%</span>
                        </div>
                    )
                };
            case 'bulk':
                return {
                    protein: 0.3,
                    fat: 0.2,
                    carbs: 0.5,
                    label: (
                        <div className='max-md:flex max-md:flex-col'>
                            <span className="text-gray-500 text-[10px]">Ideal PFC Balance for Bulking: </span>
                            <span className="font-bold">Protein 30%, Fat 20%, Carbs 50%</span>
                        </div>
                    )
                };
            default:
                return null;
        }
    }

    const getPercentage = (part: number, total: number) => {
        if (total === 0) return '0%';
        return `${((part / total) * 100).toFixed(1)}%`;
    }

    const isCloseToIdeal = (actual: number, ideal: number) => {
        return Math.abs(actual - ideal) <= ideal * 0.1;
    }

    const totalIntake = calsNutrients
        ? calsNutrients.sum_intake_protein +
        calsNutrients.sum_intake_fat +
        calsNutrients.sum_intake_carbs
        : 0;

    const actualPfc = totalIntake ? (
        {
            protein: calsNutrients ? calsNutrients.sum_intake_protein / totalIntake : 0,
            fat: calsNutrients ? calsNutrients.sum_intake_fat / totalIntake : 0,
            carbs: calsNutrients ? calsNutrients.sum_intake_carbs / totalIntake : 0,
        }
    ) : { protein: 0, fat: 0, carbs: 0 };

    const idealPfc = goal ? renderPfcBalance(goal.goal_type) : null;

    return (
        <div className="max-w-lg mx-auto mt-1 relative">
            <div className="text-xs font-semibold text-orange-600 mb-2">Calories & PFC Data</div>
            <button
                className="text-gray-700 text-xs hover:border-b border-color-black ml-4"
                onClick={() => setIsModalOpen(true)}
            >
                How do we handle calories?
            </button>
            <div className="max-w-lg mx-auto mt-1 relative p-4 bg-yellow-50 rounded-lg shadow-md text-xs w-full">
                {calsNutrients && (
                    <>
                        {goal && goal.goal_intake_cal !== null && goal.goal_consume_cal !== null ? (
                            <>
                                <div className='flex justify-between mb-2'>
                                    <div className="flex flex-col items-center">
                                        <span className="text-gray-500 text-[10px] max-md:text-[8px]"> <span className='font-semibold'>Goal Daily Intake</span> Calories</span>
                                        <span className="font-bold">{Math.round(goal.goal_intake_cal)} kcal</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-gray-500 text-[10px] max-md:text-[8px]">Current  <span className='font-semibold'>Intake</span> Calories</span>
                                        <span className="font-bold">{Math.round(calsNutrients.sum_intake_cal)} kcal</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-gray-500 text-xs">→</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-gray-500 text-[10px] ">Difference</span>
                                        <span className={clsx(getCalDiffClass(calsNutrients.sum_intake_cal - goal.goal_intake_cal), "font-bold text-lg")}>
                                            {formatDiff(calsNutrients.sum_intake_cal - goal.goal_intake_cal)} kcal
                                        </span>
                                    </div>
                                </div>
                                <div className='flex justify-between mb-2'>
                                    <div className="flex flex-col items-center">
                                        <span className="text-gray-500 text-[10px] max-md:text-[8px]"> <span className='font-semibold'>Goal Daily Burned</span> Calories</span>
                                        <span className="font-bold">{Math.round(goal.goal_consume_cal)} kcal</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-gray-500 text-[10px] max-md:text-[8px]">Current <span className='font-semibold'>Burned</span> Calorie </span>
                                        <span className="font-bold">{Math.round(calsNutrients.total_consume_cal)} kcal</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-gray-500 text-xs">→</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-gray-500 text-[10px]">Difference</span>
                                        <span className={clsx(getCalDiffClass(calsNutrients.total_consume_cal - goal.goal_consume_cal), "font-bold text-lg")}>
                                            {formatDiff(calsNutrients.total_consume_cal - goal.goal_consume_cal)} kcal
                                        </span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center">
                                <a href='/dashboard/goal/' className="text-blue-500 underline">Set your Goal!</a>
                            </div>
                        )}

                        {/* PFC */}
                        <div className='border m-0 p-1 shadow-md rounded-lg'>
                            <div className='flex justify-between items-center'>
                                <div>
                                    <span className="text-gray-500 text-[10px]">Protein: </span>
                                    <span className="font-bold text-xs">{Math.round(calsNutrients.sum_intake_protein)} g ({getPercentage(calsNutrients.sum_intake_protein, totalIntake)})</span>
                                </div>
                                <div>
                                    <span className="text-gray-500 text-[10px]">Fat: </span>
                                    <span className="font-bold text-xs">{Math.round(calsNutrients.sum_intake_fat)} g ({getPercentage(calsNutrients.sum_intake_fat, totalIntake)})</span>
                                </div>
                                <div>
                                    <span className="text-gray-500 text-[10px]">Carbs: </span>
                                    <span className="font-bold text-xs">{Math.round(calsNutrients.sum_intake_carbs)} g ({getPercentage(calsNutrients.sum_intake_carbs, totalIntake)})</span>
                                </div>
                                {goal && idealPfc && isCloseToIdeal(actualPfc.protein, idealPfc.protein) &&
                                    isCloseToIdeal(actualPfc.fat, idealPfc.fat) &&
                                    isCloseToIdeal(actualPfc.carbs, idealPfc.carbs) &&
                                    (
                                        <div className="text-green-500 font-bold text-[10px] ml-2">Good!</div>
                                    )}
                            </div>
                            <div className="mt-4">
                                {goal ? (
                                    <div>
                                        {idealPfc?.label}
                                    </div>
                                ) : (
                                    <a href='/dashboard/goal/' className="text-blue-500 underline">Set your Goal!</a>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50" onClick={() => setIsModalOpen(false)}></div>
                    <div className="bg-white rounded-lg shadow-lg p-6 z-10 relative w-3/4">
                        <h1 className='text-xl font-bold m-4'>How do we handle calories?</h1>
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 text-gray-500">×</button>
                        <div className="text-xs text-gray-500">
                            <p>
                                1. Calorie intake is calculated from your meal data.
                            </p>
                            <p>
                                2. Calorie burn is the sum of BMR (Basal Metabolic Rate), other calories (calculated from BMR and active level), TEF (Thermic Effect of Food), and exercise calories (calories burned from daily exercise records).
                            </p>
                            <p>
                                3. Try to bring these values closer to your goals!
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DailyCalsNutrients;
