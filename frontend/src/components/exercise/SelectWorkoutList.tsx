"use client"
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { setUsedWorkout } from '@/store/slices/exercise.slice';
import { RootState } from '@/store';
import { Workout } from '@/interfaces/exercise.interface';

const SelectWorkoutList: React.FC = () => {
    const dispatch = useAppDispatch();
    const select_workout_list = useAppSelector((state: RootState) => state.workout_exercise.select_workout_list);

    const selectWorkout = (selectedWorkout: Workout) => {
        dispatch(setUsedWorkout(selectedWorkout)); // Dispatch the selected workout
    };

    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white border border-gray-300 rounded-md">
                <div className="bg-red-100 px-4 py-2 text-left text-xs font-medium text-gray-500 rounded-t-md">
                    Select Workout
                </div>
                <div className="flex flex-col h-56 overflow-y-auto">
                    {select_workout_list.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200">
                            <tbody className="bg-white divide-y divide-gray-200">
                                {select_workout_list.map((workout) => (
                                    <tr key={workout.id} className="hover:bg-gray-100 cursor-pointer" onClick={() => selectWorkout(workout)}>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{workout.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500 p-4">No workout yet</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SelectWorkoutList;
