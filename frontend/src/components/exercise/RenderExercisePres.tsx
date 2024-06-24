'use client';
import React , { useEffect ,useState}from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store';

import ToggleOftenWorkoutButton from './ToggleOftenWorkoutButton'; // Import the ToggleOftenWorkoutButton
import { ExercisePre } from '@/interfaces/exercise.interface';
import { setEditExercisePre } from '@/store/slices/exercise.slice';
import DeleteExercisePreButton from './DeleteExercisePre';

interface Props {
    exercise_pres: ExercisePre[]
}

const RenderExercisePres: React.FC<Props> = ({exercise_pres})=>{
    const router = useRouter();
    const dispatch = useAppDispatch();

    const selectEditExercisePre= async (exercise_pre:ExercisePre) => {
        dispatch(setEditExercisePre(exercise_pre))
        // resetUsedFood()
    };

    return (
        <>
        <div className="sm:mx-auto md:w-full sm:max-w-sm ">
            <span className='text-base font-medium'>Exercise Set</span>
        </div>
        <div className="p-4 lg:mx-auto sm:w-full lg:max-w-sm max-h-[357px] overflow-y-auto border">
            {exercise_pres.length > 0 ? (
                <table className="min-w-full divide-y divide-red-200 border border-red-400">
                    <thead className="bg-red-100">
                        <tr>
                            <th className="px-2 py-1 text-left text-xs font-medium text-green-800">item</th>
                            <th className="px-2 py-1 text-center text-xs font-medium text-green-800">mins</th>
                            <th className="px-2 py-1 text-center text-xs font-medium text-green-800">kcal</th>
                            <th className="px-2 py-1 text-center text-xs font-medium text-green-800">often</th>
                            <th className="px-2 py-1 text-center text-xs font-medium text-green-800">delete</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-red-200">
                        {exercise_pres.map((exercise) => (
                            <tr key={exercise.id} className="whitespace-nowrap" >
                                <td className="px-2 py-1 text-xs font-medium text-gray-900 w-32">
                                    <button className='w-[120px] hover:border-b' onClick={()=>selectEditExercisePre(exercise)}>
                                        <div className='overflow-ellipsis overflow-hidden whitespace-nowrap'>{exercise.workout.name}</div>
                                    </button>
                                </td>
                                <td className="px-2 py-1 text-center text-xs text-gray-900">
                                    {exercise.mins !== null ? (
                                        <>
                                            {exercise.mins}
                                        </>
                                    ) : (
                                        "Serving information not available"
                                    )}
                                </td>
                                <td className="px-2 py-1 text-center text-xs text-gray-900">
                                    -
                                </td>
                                <td className="px-2 py-1 text-center text-xs text-gray-900">
                                    <ToggleOftenWorkoutButton workout_id={exercise.workout.id} />
                                </td>
                                <td className="px-2 py-1 text-center text-xs text-red-600">
                                    <DeleteExercisePreButton id={exercise.id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-500">No exercises created for this exercise set.</p>
            )}
        </div>
    </>
    );
}

export default RenderExercisePres;
