"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { GoalDetail } from '@/interfaces/user_detail.inteface';
import IntakeCalBarChart from './IntakeCalBarChart';

import { fetchGoal } from '@/backend_api/user_detail/fetchGoal';
import { fetchIntakeCal } from '@/backend_api/user_detail/fetchIntakeCal';

const RenderIntakeCalBar: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [data, setData] = useState<{ date: string, sum_intake_cal: number }[]>([]);
    const [goal, setGoal] = useState<GoalDetail | null>(null)
    const [period, setPeriod] = useState<string>('2weeks');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchIntakeCal();
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

    return (
        <div className="flex justify-center">
            <div className="w-full p-4">
                <IntakeCalBarChart data={data} goal={goal} />
            </div>
        </div>
    );
};

export default RenderIntakeCalBar;
