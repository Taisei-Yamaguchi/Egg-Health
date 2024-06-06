'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { GoalDetail } from '@/interfaces/user_detail.inteface';
import { fetchBMR } from '@/backend_api/user_detail/fetchBMRCal';
import { fetchLatestWeight } from '@/backend_api/user_detail/fetchLatestWeight';

interface Props {
    goal: GoalDetail | null;
}

type BMRActiveLevel = {
    bmr: number;
    active_level: string;
};

const UserInfoComponent: React.FC<Props> = ({ goal }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [bmrActiveLevel, setBmrActiveLevel] = useState<BMRActiveLevel | null>(null);
    const [latestWeight, setLatestWeight] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchBMR();
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                } else if ('message' in response) {
                    setBmrActiveLevel(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                dispatch(setToast({ message: 'An error occurred while fetching BMR data', type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
            }
        };
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchLatestWeight();
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                } else if ('message' in response) {
                    setLatestWeight(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                dispatch(setToast({ message: 'An error occurred while fetching weight data', type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
            }
        };
        fetchData();
    }, [dispatch]);

    const renderContent = () => {
        if (!goal || goal.goal_weight === null) {
            return (
                <div className="text-center py-2">
                    <a href="/dashboard/target/" className="text-blue-500 underline text-sm">
                        Set your Goal!
                    </a>
                </div>
            );
        }

        if (latestWeight === null || bmrActiveLevel === null) {
            return (
                <div className="text-center py-2">
                    <a href="/dashboard/basic/" className="text-blue-500 underline text-sm">
                        Set your Basic Information!
                    </a>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="bg-white p-2 rounded-lg shadow-md flex flex-col items-center">
                    <div className="font-semibold">Latest Weight</div>
                    <div className="text-lg font-bold">{latestWeight} kg</div>
                </div>
                <div className="bg-white p-2 rounded-lg shadow-md flex flex-col items-center">
                    <div className="font-semibold">Goal Weight</div>
                    <div className="text-lg font-bold">{goal.goal_weight} kg</div>
                </div>
                <div className="bg-white p-2 rounded-lg shadow-md flex flex-col items-center">
                    <div className="font-semibold">Active Level</div>
                    <div className="text-lg font-bold">{bmrActiveLevel.active_level}</div>
                </div>
                <div className="bg-white p-2 rounded-lg shadow-md flex flex-col items-center">
                    <div className="font-semibold">BMR</div>
                    <div className="text-lg font-bold">{Math.round(bmrActiveLevel.bmr)} kcal</div>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-xl mx-auto mt-4 p-4 bg-yellow-50 rounded-lg shadow-md text-sm">
            {renderContent()}
        </div>
    );
};

export default UserInfoComponent;
