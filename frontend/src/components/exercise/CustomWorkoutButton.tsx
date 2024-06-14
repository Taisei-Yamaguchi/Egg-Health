"use client"
import React from 'react';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { fetchCustomWorkouts } from '@/backend_api/exercise/fetchCustomWorkout';
import { setSelectWorkoutList } from '@/store/slices/exercise.slice';
import { resetExerciseSetList } from '@/store/slices/exercise.slice';

const CustomWorkoutButton: React.FC = () => {
    const dispatch = useAppDispatch();
    const handleFetchData = async () => {
        try {
            const response = await fetchCustomWorkouts();
            if ('error' in response) {
                dispatch(setToast({ message: response.error, type: 'error' }));
                setTimeout(() => dispatch(resetToast()), 3000);
                return;
            }
            if ('message' in response) {
                dispatch(resetExerciseSetList())
                dispatch(setSelectWorkoutList(response.data))
            }
        } catch (error) {
            console.error('Error fetching custom workouts:', error);
        }
    };

    return (
        <button
            className="w-[60px] h-[50px] cursor-pointer p-3 bg-gradient-to-b from-orange-300 to-orange-500 hover:from-orange-400 hover:to-orange-600 shadow-md rounded-lg flex flex-col items-center"
            onClick={handleFetchData}
            >
            <p className="text-sm font-bold text-white shadow-text">Custom</p>
            <p className="text-[10px] font-normal text-white shadow-text"> Workouts</p>
        </button>
    );
};

export default CustomWorkoutButton;
