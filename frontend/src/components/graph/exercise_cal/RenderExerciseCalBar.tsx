"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { GoalDetail } from '@/interfaces/user_detail.inteface';
import { fetchExerciseCal } from '@/backend_api/user_detail/fetchExerciseCal';
import { fetchGoal } from '@/backend_api/user_detail/fetchGoal';
import ExerciseCalBarChart from './ExerciseCalBarChart';

const RenderExerciseCalBar: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [data, setData] = useState<{date:string, sum_exercise_cal:number}[]>([]);
    const [goal, setGoal] = useState<GoalDetail |null>(null)
    // const [period, setPeriod] = useState<string>('2weeks');
    // const [isExpanded, setIsExpanded] = useState(false); // State to manage expanded/collapsed state
    // const custom_food_loading = useAppSelector((state: RootState) => state.load.custom_food_loading) as boolean;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchExerciseCal();
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
                const response = await fetchGoal();
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                } else if ('message' in response) {
                    // dispatch(setToast({ message: response.message, type: "success" }));
                    // setTimeout(() => dispatch(resetToast()), 4000);
                    setGoal(response.data)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                dispatch(setToast({ message: 'An error occurred while fetching Weight & Body Fat.', type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
            }
        };
    
        fetchData();
    }, []);

    // const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setPeriod(e.target.value); 
    // };

    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <select value={period} onChange={handlePeriodChange} className="my-4 border border-gray-300 rounded-md px-2 py-1">
                <option value="2weeks">2 Weeks</option>
                <option value="1month">1 Month</option>
                <option value="3months">3 Months</option>
                <option value="6months">6 Months</option>
                <option value="12months">12 Months</option>
                <option value="24months">24 Months</option>
            </select> */}
            <ExerciseCalBarChart data={data} goal={goal}/>
        </div>
    );
};

export default RenderExerciseCalBar;
