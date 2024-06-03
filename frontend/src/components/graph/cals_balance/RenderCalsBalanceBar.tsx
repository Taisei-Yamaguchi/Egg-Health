"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { GoalDetail } from '@/interfaces/user_detail.inteface';
import { fetchGoal } from '@/backend_api/user_detail/fetchGoal';
import IntakeConsumeBarChart from './InsumeConsumeBarChart';
import { fetchMealExerciseCal } from '@/backend_api/user_detail/fetchMealExerciseCal';
import { fetchBMR } from '@/backend_api/user_detail/fetchBMRCal';

const RenderCalsBalanceBar: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [data, setData] = useState<{date:string, sum_exercise_cal:number, sum_intake_cal: number}[]>([]);
    const [bmrDatas, setBmrDatas] = useState<{bmr:number, active_level: "low"|"middle"|"high"}|null>(null)
    const [otherCal, setOtherCal] = useState<number>(0)
    // const [period, setPeriod] = useState<string>('2weeks');
    // const [isExpanded, setIsExpanded] = useState(false); // State to manage expanded/collapsed state
    // const custom_food_loading = useAppSelector((state: RootState) => state.load.custom_food_loading) as boolean;

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

    useEffect(()=>{
        if(bmrDatas){
            switch (bmrDatas.active_level) {
                case 'low':
                    setOtherCal(bmrDatas.bmr*0.05)
                    break;
                case 'middle':
                    setOtherCal(bmrDatas.bmr*0.07)
                    break;
                case 'high':
                    setOtherCal(bmrDatas.bmr*0.1)
                    break;
                default:
                    setOtherCal(bmrDatas.bmr*0)
                    break;
            }
        }
    },[bmrDatas])

    // const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setPeriod(e.target.value); 
    // };

    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {bmrDatas &&(
                <IntakeConsumeBarChart data={data} bmr={bmrDatas.bmr} other={otherCal}/>
            )}
        </div>
    );
};

export default RenderCalsBalanceBar;
