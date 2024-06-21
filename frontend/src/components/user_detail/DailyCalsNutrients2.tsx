'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { fetchDailyCalsNutrients } from '@/backend_api/user_detail/fetchDailyCalsNutrients';
import { useAppSelector } from '@/store';
import { RootState } from '@/store';
import CaloriesInfoModal from './CaloriesInfoModal';

interface Props {
    date: string;
}

type CalsNutrients = {
    sum_intake_cal: number,
    sum_intake_protein: number,
    sum_intake_fat: number,
    sum_intake_carbs: number,
    total_consume_cal: number,
}

const DailyCalsNutrients2: React.FC<Props> = ({ date }) => {
    const dispatch = useAppDispatch();
    const [calsNutrients, setCalsNutrients] = useState<CalsNutrients | null>(null);
    const meal_loading = useAppSelector((state: RootState) => state.load.meal_loading) as boolean;
    const exercise_loading = useAppSelector((state: RootState) => state.load.exercise_loading) as boolean;

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
                dispatch(setToast({ message: 'An error occurred while fetching cals & nutrients', type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
            }
        };

        fetchData();
    }, [date, dispatch,meal_loading,exercise_loading]);

    const getPercentage = (part: number, total: number) => {
        if (total === 0) return '0%';
        return `${((part / total) * 100).toFixed(1)}%`;
    }

    const defaultCalsNutrients = {
        sum_intake_cal: 0,
        sum_intake_protein: 0,
        sum_intake_fat: 0,
        sum_intake_carbs: 0,
        total_consume_cal: 0,
    };

    const calsData = calsNutrients || defaultCalsNutrients;

    const totalIntake = calsData.sum_intake_protein +
        calsData.sum_intake_fat +
        calsData.sum_intake_carbs;

    const actualPfc = totalIntake ? (
        {
            protein: calsData.sum_intake_protein / totalIntake,
            fat: calsData.sum_intake_fat / totalIntake,
            carbs: calsData.sum_intake_carbs / totalIntake,
        }
    ) : { protein: 0, fat: 0, carbs: 0 };

    return (
        <div className="max-w-lg mx-auto mt-1 relative">
            <CaloriesInfoModal />
            <div className="max-w-lg mx-auto mt-1 relative p-4 bg-yellow-100 rounded-lg shadow-md text-xs w-full">
                <div className='flex max-md:flex-col justify-between'>
                    <div className="flex justify-between items-center border-b pb-2 max-md:col-span-2">
                        <span className="text-sm font-semibold">Intake Calories</span>
                        <span className="text-base font-bold ml-4">{Math.round(calsData.sum_intake_cal)} kcal</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2 max-md:col-span-2">
                        <span className="text-sm font-semibold">Burned Calories</span>
                        <span className="text-base font-bold ml-4">{Math.round(calsData.total_consume_cal)} kcal</span>
                    </div>
                </div>

                {/* pfc */}
                <div className=' m-1 p-0'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <span className="text-gray-500 text-xs">Protein: </span>
                            <span className="font-bold text-sm">{Math.round(calsData.sum_intake_protein)} g ({getPercentage(calsData.sum_intake_protein, totalIntake)})</span>
                        </div>
                        <div>
                            <span className="text-gray-500 text-xs">Fat: </span>
                            <span className="font-bold text-sm">{Math.round(calsData.sum_intake_fat)} g ({getPercentage(calsData.sum_intake_fat, totalIntake)})</span>
                        </div>
                        <div>
                            <span className="text-gray-500 text-xs">Carbs: </span>
                            <span className="font-bold text-sm">{Math.round(calsData.sum_intake_carbs)} g ({getPercentage(calsData.sum_intake_carbs, totalIntake)})</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyCalsNutrients2;
