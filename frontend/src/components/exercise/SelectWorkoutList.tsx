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
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex flex-col mt-4 h-60 overflow-y-auto transition-all duration-500">
                {select_workout_list.length > 0 ? (
                    select_workout_list.map(workout => (
                        <button key={workout.id} className="p-4 bg-white shadow rounded-lg mb-2 border" onClick={() => selectWorkout(workout)}>
                            <p className="text-sm font-semibold">{workout.name}</p>
                        </button>
                    ))
                ) : (
                    <p className="text-gray-500">No workout yet</p>
                )}
            </div>        
        </div>
    );
};

export default SelectWorkoutList;
