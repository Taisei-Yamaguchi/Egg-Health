"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { fetchDynamicGraph } from '@/backend_api/user_detail/fetchDynamic';
import { DynamicDetail, GoalDetail } from '@/interfaces/user_detail.inteface';
import LineBodyFatChart from './LineBodyFatChart';
import { fetchGoal } from '@/backend_api/user_detail/fetchGoal';

const RenderLineBodyFat: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [data, setData] = useState<DynamicDetail[]>([]);
    const [goal, setGoal] = useState<GoalDetail | null>(null);
    const [period, setPeriod] = useState<string>('2weeks');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchDynamicGraph();
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: 'error' }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                    return;
                }
                if ('message' in response) {
                    setData(response.data);
                }
            } catch (error) {
                // console.error('Error fetching graph data:', error);
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
                    setGoal(response.data);
                }
            } catch (error) {
                // console.error('Error fetching data:', error);
                dispatch(setToast({ message: 'An error occurred while fetching Weight & Body Fat.', type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
            }
        };

        fetchData();
    }, []);

    const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPeriod(e.target.value);
    };

    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-md p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-center mb-4">Body Fat Graph</h2>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                        <label htmlFor="period" className="mr-2 text-gray-700 text-xs">Display period:</label>
                        <select
                            id="period"
                            value={period}
                            onChange={handlePeriodChange}
                            className="border border-gray-300 rounded-md px-2 py-1"
                        >
                            <option value="2weeks">2 Weeks</option>
                            <option value="1month">1 Month</option>
                            <option value="3months">3 Months</option>
                            <option value="6months">6 Months</option>
                            <option value="12months">12 Months</option>
                            <option value="24months">24 Months</option>
                        </select>
                    </div>
                </div>
            </div>
            <LineBodyFatChart data={data} period={period} goal={goal} />
        </div>
    );
};

export default RenderLineBodyFat;
