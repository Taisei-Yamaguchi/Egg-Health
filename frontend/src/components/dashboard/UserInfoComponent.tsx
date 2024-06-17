'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { GoalDetail } from '@/interfaces/user_detail.inteface';
import { fetchBMR } from '@/backend_api/user_detail/fetchBMRCal';
import { fetchLatestWeight } from '@/backend_api/user_detail/fetchLatestWeight';
import { FaWalking, FaRunning as FaLowRunning, FaDumbbell,FaBiking, FaSwimmer, FaHeartbeat } from 'react-icons/fa';

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
    const [unit, setUnit] = useState<'kg' | 'lbs'>('lbs'); // Default to lbs

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

    const convertWeight = (weight: number, toUnit: 'kg' | 'lbs') => {
        if (toUnit === 'kg') {
            return (weight).toFixed(1); // lbs to kg
        } else {
            return (weight * 2.20462).toFixed(1); // kg to lbs
        }
    };

    const toggleUnit = () => {
        setUnit(prevUnit => prevUnit === 'kg' ? 'lbs' : 'kg');
    };

    const getActivityLevelIcon = (level: string) => {
        switch (level) {
            case 'very low':
                return <FaWalking className="w-6 h-6 mr-2 text-green-600" />;
            case 'low':
                return <FaLowRunning className="w-6 h-6 mr-2 text-green-600" />;
            case 'middle':
                return <FaDumbbell className="w-6 h-6 mr-2 text-green-600" />;
            case 'high':
                return <FaBiking className="w-6 h-6 mr-2 text-green-600" />;
            case 'very high':
                return <FaSwimmer className="w-6 h-6 mr-2 text-green-600" />;
            default:
                return <FaHeartbeat className="w-6 h-6 mr-2 text-green-600" />;
        }
    };

    const getActiveLevelLabel = (level: string) => {
        switch (level) {
            case 'very low':
                return 'No Exercise';
            case 'low':
                return 'Rare Exercise';
            case 'middle':
                return 'Moderate Exercise';
            case 'high':
                return 'Frequent Exercise';
            case 'very high':
                return 'Daily Exercise';
            default:
                return 'Unknown';
        }
    };

    const renderContent = () => {
        if (!goal || goal.goal_weight === null) {
            return (
                <div className="text-center py-2">
                    <a href="/dashboard/target/" className="text-blue-500 underline text-sm mx-2">
                        Set your Goal!
                    </a>
                    <a href="/dashboard/basic/" className="text-blue-500 underline text-sm mx-2">
                        Set your Basic Info!
                    </a>
                </div>
            );
        }

        if (latestWeight === null || bmrActiveLevel === null) {
            return (
                <div className="text-center py-2">
                    <a href="/dashboard/target/" className="text-blue-500 underline text-sm mx-2">
                        Set your Goal!
                    </a>
                    <a href="/dashboard/basic/" className="text-blue-500 underline text-sm mx-2">
                        Set your Basic Info!
                    </a>
                </div>
            );
        }

        return (
            <>
                <div className="text-center py-2">
                    <a href="/dashboard/target/" className="text-blue-500 underline text-sm mx-2">
                        Set your Goal!
                    </a>
                    <a href="/dashboard/basic/" className="text-blue-500 underline text-sm mx-2">
                        Set your Basic Info!
                    </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="bg-white p-2 rounded-lg shadow-md flex flex-col items-center">
                        <div className="font-semibold">Latest Weight</div>
                        <div className="text-lg font-bold">{unit === 'kg' ? latestWeight : parseFloat(convertWeight(latestWeight, 'lbs'))} {unit}</div>
                    </div>
                    <div className="bg-white p-2 rounded-lg shadow-md flex flex-col items-center">
                        <div className="font-semibold">Goal Weight</div>
                        <div className="text-lg font-bold">{unit === 'kg' ? goal.goal_weight : goal.goal_weight ? parseFloat(convertWeight(goal.goal_weight, 'lbs')) : '-'} {unit}</div>
                    </div>
                    <div className="bg-white p-2 rounded-lg shadow-md flex flex-col items-center">
                        <div className="font-semibold">Active Level</div>
                        <div className='flex items-center'>
                            <div>{getActivityLevelIcon(bmrActiveLevel.active_level)}</div>
                            <div className="text-lg font-bold">{getActiveLevelLabel(bmrActiveLevel.active_level)}</div>
                        </div>
                    </div>
                    <div className="bg-white p-2 rounded-lg shadow-md flex flex-col items-center">
                        <div className="font-semibold">BMR</div>
                        <div className="text-lg font-bold">{Math.round(bmrActiveLevel.bmr)} kcal</div>
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className="max-w-xl mx-auto mt-4 p-4 bg-yellow-50 rounded-lg shadow-md text-sm">
            {renderContent()}
            <div className="text-center mt-4">
                <button
                    type="button"
                    onClick={toggleUnit}
                    className="ml-2 p-1 border border-indigo-600 shadow-sm text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    show as {unit === 'kg' ? 'lbs' : 'kg'}
                </button>
            </div>
        </div>
    );
};

export default UserInfoComponent;
