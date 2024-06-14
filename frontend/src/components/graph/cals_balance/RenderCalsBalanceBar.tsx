"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';

import IntakeConsumeBarChart from './InsumeConsumeBarChart';
import { fetchMealExerciseCal } from '@/backend_api/user_detail/fetchMealExerciseCal';
import { fetchBMR } from '@/backend_api/user_detail/fetchBMRCal';

type BMRData = {
    bmr: number, 
    active_level: "very low" | "low" | "middle" | "high" | "very high",
    other_cal: number
} 

const RenderCalsBalanceBar: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [data, setData] = useState<{date:string, sum_exercise_cal:number, sum_intake_cal: number}[]>([]);
    const [bmrDatas, setBmrDatas] = useState<BMRData | null>(null)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchMealExerciseCal();
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: 'error' }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                    return;
                }
                if ('message' in response) {
                    setData(response.data);
                }
            } catch (error) {
                console.error('Error fetching graph data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchBMR();
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                } else if ('message' in response) {
                    // dispatch(setToast({ message: response.message, type: "success" }));
                    // setTimeout(() => dispatch(resetToast()), 4000);
                    setBmrDatas(response.data)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                dispatch(setToast({ message: 'An error occurred while fetching graph data.', type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
            }
        };
    
        fetchData();
    }, []);

    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {bmrDatas &&(
                <IntakeConsumeBarChart data={data} bmr={bmrDatas.bmr} other={bmrDatas.other_cal}/>
            )}
        </div>
    );
};

export default RenderCalsBalanceBar;
