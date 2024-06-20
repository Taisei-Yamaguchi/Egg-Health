'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { fetchGoal } from '@/backend_api/user_detail/fetchGoal';
import { fetchStatic } from '@/backend_api/user_detail/fetchStatic';
import { fetchLatestWeight } from '@/backend_api/user_detail/fetchLatestWeight';
import { GoalDetail, StaticDetail } from '@/interfaces/user_detail.inteface';
import { FaHeartbeat, FaBullseye, FaWeight, FaUtensils, FaRunning, FaWalking, FaRunning as FaLowRunning, FaDumbbell, FaBiking, FaSwimmer, FaBalanceScale } from 'react-icons/fa';
import { GiMuscleUp } from 'react-icons/gi';

const GoalConfirm: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [goalDetail, setGoalDetail] = useState<GoalDetail | null>(null);
    const [staticDetail, setStaticDetail] = useState<StaticDetail | null>(null);
    const [latestWeight, setLatestWeight] = useState<number | null>(null);
    const [unit, setUnit] = useState<'kg' | 'lbs'>('lbs'); // State to manage unit

    // fetch static details
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchStatic();
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                } else if ('message' in response) {
                    setStaticDetail(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                dispatch(setToast({ message: 'An error occurred while fetching Static Detail.', type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
            }
        };
        fetchData();
    }, []);

    // fetch latest weight
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
                dispatch(setToast({ message: 'An error occurred while fetching Latest Weight.', type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
            }
        };
        fetchData();
    }, []);

    // fetch goal
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchGoal();
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                } else if ('message' in response) {
                    setGoalDetail(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                dispatch(setToast({ message: 'An error occurred while fetching Goal.', type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
            }
        };
        fetchData();
    }, []);

    const toggleUnit = () => {
        setUnit((prevUnit) => (prevUnit === 'kg' ? 'lbs' : 'kg'));
    };

    const convertWeight = (weight: number) => {
        if (unit === 'kg') {
            return weight;
        } else {
            return (weight * 2.20462).toFixed(0);
        }
    };

    const convertPace = (pace: number) => {
        if (unit === 'kg') {
            return pace.toFixed(1);
        } else {
            return (pace * 2.20462).toFixed(1);
        }
    };

    if (!latestWeight || !goalDetail || !staticDetail) {
        return (
            <div className="max-w-lg mx-auto mt-10 p-6 bg-yellow-100 rounded-lg shadow-md text-center text-sm">
                Please complete your Personal Details first. 
                <div>
                    <a href="/dashboard/personal-details" className="text-blue-500 underline mr-2"> Go to Personal Details</a>
                    <a href="/dashboard/goal" className="text-blue-500 underline"> Go to Goal Setting</a>
                </div>
            </div>
        );
    }

    const getActivityLevelIcon = (level: string) => {
        switch (level) {
            case 'very low':
                return <FaWalking className="w-6 h-6 mr-2 text-green-600" />;
            case 'low':
                return <FaLowRunning className="w-6 h-6 mr-2 text-green-600" />;
            case 'moderate':
                return <FaDumbbell className="w-6 h-6 mr-2 text-green-600" />;
            case 'high':
                return <FaBiking className="w-6 h-6 mr-2 text-green-600" />;
            case 'very high':
                return <FaSwimmer className="w-6 h-6 mr-2 text-green-600" />;
            default:
                return <FaHeartbeat className="w-6 h-6 mr-2 text-green-600" />;
        }
    };

    const getActivityLevelLabel = (level: string) => {
        switch (level) {
            case 'very low':
                return 'No Exercise';
            case 'low':
                return 'Rare Exercise';
            case 'moderate':
                return 'Moderate Exercise';
            case 'high':
                return 'Frequent Exercise';
            case 'very high':
                return 'Daily Exercise';
            default:
                return 'Unknown';
        }
    };

    const getGoalTypeIcon = (type: string) => {
        switch (type) {
            case 'diet':
                return <FaRunning className="w-6 h-6 mr-2 text-green-600" />;
            case 'maintain':
                return <FaBalanceScale className="w-6 h-6 mr-2 text-green-600" />;
            case 'bulk':
                return <GiMuscleUp className="w-6 h-6 mr-2 text-green-600" />;
            default:
                return <FaBullseye className="w-6 h-6 mr-2 text-green-600" />;
        }
    };

    const getGoalTypeLabel = (type: string) => {
        switch (type) {
            case 'diet':
                return 'Diet';
            case 'maintain':
                return 'Maintain';
            case 'bulk':
                return 'Bulk';
            default:
                return 'Unknown';
        }
    };

    const weightDifference = (latestWeight - goalDetail.goal_weight).toFixed(1);
    const weightDifferenceSign = parseFloat(weightDifference) > 0 ? '-' : '+';
    const today = new Date();
    const targetDate = goalDetail.target_date ? new Date(goalDetail.target_date) : null;
    const monthsDifference = targetDate ? (targetDate.getFullYear() - today.getFullYear()) * 12 + (targetDate.getMonth() - today.getMonth()) : 0;
    const weightChangePace = monthsDifference > 0 ? (goalDetail.goal_weight - latestWeight) / monthsDifference : 'N/A';
    const weightChangePaceLabel = monthsDifference <= 0 ? '-' : `${weightDifferenceSign}${typeof weightChangePace === 'number' ? convertPace(Math.abs(weightChangePace)) : weightChangePace} ${unit}/month`;
    const weightChangePaceWarning = typeof weightChangePace === 'number' && weightChangePace < 0 && Math.abs(weightChangePace) > (latestWeight * 0.04);

    return (
        <div className="max-w-5xl mx-auto mt-10 p-6 bg-yellow-100 rounded-lg shadow-md text-xs w-full">
            <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-2">Goals and Progress</h2>
                <a href="/dashboard/personal-details" className="text-blue-500 underline mr-2">Edit Personal Details</a>
                <a href="/dashboard/goal" className="text-blue-500 underline">Edit Goals</a>
                <button onClick={toggleUnit} className="ml-2 p-1 bg-blue-500 text-white rounded">
                    Show in {unit === 'kg' ? 'lbs' : 'kg'}
                </button>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex justify-between items-center border-b pb-2 max-md:col-span-2">
                        <span className="text-lg font-semibold">Current Weight</span>
                        <span className="text-2xl font-bold">{convertWeight(latestWeight)} {unit}</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2 max-md:col-span-2">
                        <span className="text-lg font-semibold">Goal Weight</span>
                        <span className="text-2xl font-bold">{convertWeight(goalDetail.goal_weight)} {unit}</span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b pb-2 col-span-2">
                        <span className="text-lg font-semibold">Goal Set Date ➔ Target Date</span>
                        <span className="text-lg font-bold">{goalDetail.set_date} ➔ {goalDetail.target_date}</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2 col-span-2">
                        <span className="text-lg font-semibold">Monthly Weight Change Pace</span>
                        <span className={`text-2xl font-bold ${typeof weightChangePace === 'number' && weightChangePace > 0 ? 'text-red-500' : 'text-blue-500'}`}>
                            {weightChangePaceLabel}
                        </span>
                    </div>
                    {weightChangePaceWarning && (
                        <div className="col-span-2 text-red-500">
                            Warning: Losing more than 3-4% of your body weight per month can be harmful to your health.
                        </div>
                    )}
                    <div className="flex justify-between items-center border-b pb-2 col-span-2">
                        <span className="text-lg font-semibold">Activity Level</span>
                        <div className="flex items-center">
                            {getActivityLevelIcon(staticDetail.active_level)}
                            <span className="font-bold text-lg">{getActivityLevelLabel(staticDetail.active_level)}</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2 col-span-2">
                        <span className="text-lg font-semibold">Goal Type</span>
                        <div className="flex items-center">
                            {getGoalTypeIcon(goalDetail.goal_type)}
                            <span className="font-bold text-lg">{getGoalTypeLabel(goalDetail.goal_type)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mb-4 p-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center">
                    <FaWeight className="w-6 h-6 mr-2 text-green-600" />
                    <span className="text-lg font-semibold">Weight Remaining to Reach Your Goal</span>
                </div>
                <span className={`text-2xl font-bold ${parseFloat(weightDifference) > 0 ? 'text-red-500' : 'text-blue-500'}`}>
                    {weightDifferenceSign}{convertWeight(Math.abs(parseFloat(weightDifference)))} {unit}
                </span>
            </div>
            <div className="flex justify-between items-center mb-4 p-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center">
                    <FaUtensils className="w-6 h-6 mr-2 text-green-600" />
                    <span className="text-lg font-semibold">Goal Daily Intake Calories</span>
                </div>
                <span className="text-2xl font-bold">{goalDetail.goal_intake_cal ? Math.round(goalDetail.goal_intake_cal) : 'N/A'} kcal</span>
            </div>
            <div className="flex justify-between items-center mb-4 p-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center">
                    <FaRunning className="w-6 h-6 mr-2 text-green-600" />
                    <span className="text-lg font-semibold">Goal Daily Burned Calories</span>
                </div>
                <span className="text-2xl font-bold">{goalDetail.goal_consume_cal ? Math.round(goalDetail.goal_consume_cal) : 'N/A'} kcal</span>
            </div>
        </div>
    );
};

export default GoalConfirm;
