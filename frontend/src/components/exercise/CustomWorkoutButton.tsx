"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { fetchCustomWorkouts } from '@/backend_api/exercise/fetchCustomWorkout';
import { Workout } from '@/interfaces/exercise.interface';
import { setUsedWorkout } from '@/store/slices/exercise.slice';
import { useAppSelector } from '@/store';
import { RootState } from '@/store';
import { setSelectWorkoutList } from '@/store/slices/exercise.slice';

const CustomWorkoutButton: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [isExpanded, setIsExpanded] = useState(false); // State to manage expanded/collapsed state
    const custom_workout_loading = useAppSelector((state: RootState) => state.load.custom_workout_loading) as boolean;

    const handleFetchData = async () => {
        try {
            const response = await fetchCustomWorkouts();
            if ('error' in response) {
                dispatch(setToast({ message: response.error, type: 'error' }));
                setTimeout(() => dispatch(resetToast()), 3000);
                return;
            }
            if ('message' in response) {
                dispatch(setSelectWorkoutList(response.data))
            }
        } catch (error) {
            console.error('Error fetching custom workouts:', error);
        }
    };

    return (
        <button
            className="cursor-pointer p-3 bg-gradient-to-b from-orange-300 to-orange-500 shadow-md rounded-lg flex flex-col items-center"
            onClick={handleFetchData}
            >
            <p className="text-base font-bold text-gray-800 shadow-text">My</p>
            <p className="text-xs font-normal text-gray-800 shadow-text">Custom workouts</p>
        </button>
    );
};

export default CustomWorkoutButton;
