"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { Workout } from '@/interfaces/exercise.interface';
import { setUsedWorkout } from '@/store/slices/exercise.slice';
import { useAppSelector } from '@/store';
import { RootState } from '@/store';
import { setSelectWorkoutList } from '@/store/slices/exercise.slice';
import { fetchOftenWorkouts } from '@/backend_api/exercise/fetchOftenWorkouts';
import { resetExerciseSetList } from '@/store/slices/exercise.slice';

const OftenWorkoutListButton: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const handleFetchData = async () => {
        try {
            const response = await fetchOftenWorkouts();
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
            className="cursor-pointer p-3 bg-gradient-to-b from-green-300 to-green-500 shadow-md rounded-lg flex flex-col items-center"
            onClick={handleFetchData}
            >
            <p className="text-base font-bold text-gray-800 shadow-text text-white ">Often</p>
        </button>
    );
};

export default OftenWorkoutListButton;
