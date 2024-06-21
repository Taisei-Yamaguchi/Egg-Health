"use client"
import React, { useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { fetchCustomWorkouts } from '@/backend_api/exercise/fetchCustomWorkout';
import { setSelectWorkoutList } from '@/store/slices/exercise.slice';
import { resetExerciseSetList } from '@/store/slices/exercise.slice';
import { useAppSelector } from '@/store';
import { RootState } from '@/store';

const CustomWorkoutButton: React.FC = () => {
    const dispatch = useAppDispatch();
    const custom_workout_loading  = useAppSelector((state: RootState) => state.load.custom_workout_loading);

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

    useEffect(()=>{
        handleFetchData()
    },[custom_workout_loading,dispatch])
    
    return (
        <button
            className="w-[60px] h-[50px] cursor-pointer p-3 bg-gradient-to-b from-orange-300 to-orange-500 hover:from-orange-400 hover:to-orange-600 shadow-md rounded-lg flex flex-col items-center"
            onClick={handleFetchData}
            >
            <p className="text-sm font-bold text-white shadow-text">Custom</p>
            <p className="text-[10px] font-normal text-white shadow-text"> Activities</p>
        </button>
    );
};

export default CustomWorkoutButton;
