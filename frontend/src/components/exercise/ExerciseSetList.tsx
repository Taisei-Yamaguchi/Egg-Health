"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { useAppSelector } from '@/store';
import { RootState } from '@/store';
import CreateExerciseWithExerciseSetButton from './CreateExerciseWithExerciseSet';
import DeleteExerciseSetButton from './DeleteExerciseSet';
import AboutMets from './AboutMetsModal';

interface Props {
    date: string;
}

const ExerciseSetList: React.FC<Props> = ({ date }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const exercise_set_list = useAppSelector((state: RootState) => state.workout_exercise.exercise_set_list);
    const [hoveredExerciseSet, setHoveredExerciseSet] = useState<number | null>(null);

    return (
        <>
            {exercise_set_list && (
                <div className="lg:mx-auto lg:w-full lg:max-w-md">
                    <div className="bg-white border border-gray-300 rounded-md">
                        <div className="bg-red-100 px-4 py-2 text-left text-xs font-medium text-gray-500 rounded-t-md flex">
                            <span className='mr-4'>Select Exercise Set</span>
                            <AboutMets/>
                        </div>
                        <div className="flex flex-col h-56 overflow-y-auto">
                            {exercise_set_list.length > 0 ? (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {exercise_set_list.map((exercise_set) => (
                                            <tr
                                                key={exercise_set.exercise_set_id}
                                                className="relative hover:bg-gray-100"
                                                onMouseEnter={() => setHoveredExerciseSet(exercise_set.exercise_set_id)}
                                                onMouseLeave={() => setHoveredExerciseSet(null)}
                                            >
                                                <CreateExerciseWithExerciseSetButton
                                                    exercise_set={exercise_set}
                                                    date={date}
                                                />
                                                <td className="px-2 py-2 text-center text-xs text-gray-900">
                                                    <a href={`/dashboard/exercise-set/${exercise_set.exercise_set_id}`} className="text-blue-500 hover:underline">edit</a>
                                                </td>
                                                <td className="px-2 py-2 text-center text-xs text-red-600">
                                                    <DeleteExerciseSetButton id={exercise_set.exercise_set_id} />
                                                </td>
                                                {hoveredExerciseSet === exercise_set.exercise_set_id && (
                                                    <td colSpan={3} className="absolute top-full left-0 w-1/2 bg-white border-2 border-red-500 rounded shadow-lg z-10">
                                                        <div className="border-2 border-red-500 p-2 rounded-md bg-red-50">
                                                            <ul>
                                                                {exercise_set.exercise_pres.map((exercise_pre, index) => (
                                                                    <li key={index} className="text-xs text-gray-700 truncate">
                                                                        {exercise_pre.workout.name}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-gray-500 p-4">No exercise set created yet</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ExerciseSetList;
