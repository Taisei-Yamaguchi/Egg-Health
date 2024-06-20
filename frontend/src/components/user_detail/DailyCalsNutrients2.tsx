'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { fetchDailyCalsNutrients } from '@/backend_api/user_detail/fetchDailyCalsNutrients';
import { useAppSelector } from '@/store';
import { RootState } from '@/store';

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
    const [isModalOpen, setIsModalOpen] = useState(false);
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
            <button
                className="text-gray-700 text-xs hover:border-b border-color-black ml-4"
                onClick={() => setIsModalOpen(true)}
            >
                How we handle Cals?
            </button>
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

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50" onClick={() => setIsModalOpen(false)}></div>
                    <div className="bg-white rounded-lg shadow-lg p-6 z-10 relative w-3/4">
                        <h1 className='text-xl font-bold m-4'>How we handle cals?</h1>
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 text-gray-500">×</button>
                        <div className="text-xs text-gray-500">
                            <p>
                                1. Intake cal is calculated from your meal data.
                            </p>
                            <p>
                                2. Consume cal is the sum of BMR (Basal Metabolic Rate), other cal (calculated from BMR and active level), TEF (Thermic Effect of Food), and exercise cal (calories burned from daily exercise records).
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

export default DailyCalsNutrients2;
