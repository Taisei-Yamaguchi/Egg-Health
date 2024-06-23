"use client"
import React from 'react';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { fetchWorkoutsHistory } from '@/backend_api/exercise/fetchWorkoutsHistory';
import { setSelectWorkoutList } from '@/store/slices/exercise.slice';
import { resetExerciseSetList } from '@/store/slices/exercise.slice';

const HistoryWorkoutButton: React.FC = () => {
    const dispatch = useAppDispatch();
    
    const handleFetchData = async () => {
        try {
            const response = await fetchWorkoutsHistory();
            if ('error' in response) {
                dispatch(setToast({ message: response.error, type: 'error' }));
                setTimeout(() => dispatch(resetToast()), 3000);
                return;
            }
            if ('message' in response) {
                dispatch(resetExerciseSetList())
                dispatch(setSelectWorkoutList(response.data));
            }
        } catch (error) {
            // console.error('Error fetching history workouts:', error);
        }
    };

    return (
        <button
            className="w-[60px] h-[50px] cursor-pointer p-2 bg-gradient-to-b from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 shadow-md rounded-lg flex flex-col items-center"
            onClick={handleFetchData}
        >
            <p className="text-[8px] font-normal text-white">Choose from</p>
            <p className="text-xs font-bold text-white shadow-text">History</p>
        </button>
    );
};

export default HistoryWorkoutButton;
