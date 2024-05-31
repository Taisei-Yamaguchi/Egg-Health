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

const CustomWorkoutList: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [isExpanded, setIsExpanded] = useState(false); // State to manage expanded/collapsed state
    const custom_workout_loading = useAppSelector((state: RootState) => state.load.custom_workout_loading) as boolean;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchCustomWorkouts();
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: 'error' }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                    return;
                }
                if ('message' in response) {
                    setWorkouts(response.data);
                }
            } catch (error) {
                console.error('Error fetching custom workouts:', error);
            }
        };
        fetchData();
    }, [custom_workout_loading]);

    // Function to toggle expanded state
    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const selectWorkout = (selectedWorkout: Workout) => {
        dispatch(setUsedWorkout(selectedWorkout)); // Dispatch the selected workout
    };

    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="cursor-pointer" onClick={toggleExpanded}>
                <div className="p-4 bg-white shadow rounded-lg flex items-center justify-between">
                    <p className="text-lg font-semibold">Custom Workout</p>
                    {isExpanded ? <FaEyeSlash /> : <FaEye />}
                </div>
            </div>
            {isExpanded && ( // Conditional rendering based on isExpanded state
                <div className="mt-4 transition-all duration-500 flex flex-col">
                    {workouts.length > 0 ? (
                        workouts.map((workout) => (
                            <button key={workout.id} className='border ' onClick={() => selectWorkout(workout)}>
                                <p>{workout.name}</p>
                            </button>
                        ))
                    ) : (
                        <p className="text-gray-500">No workout yet</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomWorkoutList;
