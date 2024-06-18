"use client";
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { resetUsedWorkout, setUsedWorkout } from '@/store/slices/exercise.slice';
import { RootState } from '@/store';
import { Workout } from '@/interfaces/exercise.interface';
import ToggleOftenWorkoutButton from './ToggleOftenWorkoutButton';
import AboutMets from './AboutMetsModal';
import DeleteWorkoutButton from './DeleteWorkout';

const SelectWorkoutList: React.FC = () => {
    const dispatch = useAppDispatch();
    const select_workout_list = useAppSelector((state: RootState) => state.workout_exercise.select_workout_list);
    
    const selectWorkout = (selectedWorkout: Workout) => {
        dispatch(setUsedWorkout(selectedWorkout)); // Dispatch the selected workout
    };

    return (
        <>{select_workout_list && (
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white border border-gray-300 rounded-md">
                <div className="bg-red-100 px-4 py-2 text-left text-xs font-medium text-gray-500 rounded-t-md flex">
                    <span className='mr-4'>Select Workout</span>
                    <AboutMets/>
                </div>
                <div className="flex flex-col h-56 overflow-y-auto">
                    {select_workout_list.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200">
                            <tbody className="bg-white divide-y divide-gray-200">
                                {select_workout_list.map((workout) => (
                                    <tr key={workout.id} className="hover:bg-gray-100 cursor-pointer">
                                        <td className="px-4 py-2 text-sm text-gray-900 w-32 " onClick={() => selectWorkout(workout)}>
                                            <div className="overflow-ellipsis overflow-hidden whitespace-nowrap">{workout.name}</div>
                                            <div className='flex items-center'>
                                                <span className='text-xs font-semibold'>({workout.mets}METs)</span>
                                                {workout.custom &&(<DeleteWorkoutButton id={workout.id}/>)}
                                            </div>
                                        </td>
                                        
                                        <td className="px-4 py-2 text-sm text-gray-900 flex">
                                            <ToggleOftenWorkoutButton workout_id={workout.id} />
                                        </td>
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
        )}</>
    );
};

export default SelectWorkoutList;
