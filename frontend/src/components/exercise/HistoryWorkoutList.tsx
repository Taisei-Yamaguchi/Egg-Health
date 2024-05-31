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

const HistoryWorkoutList: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [isExpanded, setIsExpanded] = useState(false); // State to manage expanded/collapsed state
    const history_workout_loading = useAppSelector((state: RootState) => state.load.history_workout_loading) as boolean;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchWorkoutsHistory();
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: 'error' }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                    return;
                }
                if ('message' in response) {
                    setWorkouts(response.data);
                }
            } catch (error) {
                console.error('Error fetching history workouts:', error);
            }
        };
        fetchData();
    }, [history_workout_loading]);

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
                    <p className="text-lg font-semibold">Workout in History</p>
                    {isExpanded ? <FaEyeSlash /> : <FaEye />}
                </div>
            </div>
            {isExpanded && ( // Conditional rendering based on isExpanded state
                <div className="mt-4 transition-all duration-500 flex-col">
                    {workouts.length > 0 ? (
                        workouts.map((workout) => (
                            <button key={workout.id} className='border w-full' onClick={() => selectWorkout(workout)}>
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

export default HistoryWorkoutList;
