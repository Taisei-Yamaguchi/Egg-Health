"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { fetchWorkoutsHistory } from '@/backend_api/exercise/fetchWorkoutsHistory';
import { Workout } from '@/interfaces/exercise.interface';
import { setUsedWorkout } from '@/store/slices/exercise.slice';
import { useAppSelector } from '@/store';
import { RootState } from '@/store';
import { setSelectWorkoutList } from '@/store/slices/exercise.slice';

const HistoryWorkoutButton: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [isExpanded, setIsExpanded] = useState(false); // State to manage expanded/collapsed state
    const history_workout_loading = useAppSelector((state: RootState) => state.load.history_workout_loading) as boolean;

    const handleFetchData = async () => {
        try {
            const response = await fetchWorkoutsHistory();
            if ('error' in response) {
                dispatch(setToast({ message: response.error, type: 'error' }));
                setTimeout(() => dispatch(resetToast()), 3000);
                return;
            }
            if ('message' in response) {
                dispatch(setSelectWorkoutList(response.data));
                }
        } catch (error) {
            console.error('Error fetching history workouts:', error);
        }
    };

    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="cursor-pointer" onClick={handleFetchData}>
                <div className="p-4 bg-white shadow rounded-lg flex items-center justify-between">
                    <p className="text-lg font-semibold">History</p>
                </div>
            </div>
        </div>
    );
};

export default HistoryWorkoutButton;
