'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { fetchExercises } from '@/backend_api/exercise/fetchExercises';
import { Exercise } from '@/interfaces/exercise.interface';
import DeleteExerciseButton from '../exercise/DeleteExercise';
import { setEditExercise } from '@/store/slices/exercise.slice';
import { useAppSelector } from '@/store';
import { RootState } from '@/store';
import LatestExerciseButton from '../exercise/LatestExerciseButton';

interface Props {
    date: string;
}

const RenderExercises: React.FC<Props> = ({ date }) => {
    const dispatch = useAppDispatch();
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const exercise_loading = useAppSelector((state: RootState) => state.load.exercise_loading) as boolean;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchExercises(date);
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                    return;
                } if ('message' in response) {
                    setExercises(response.data);
                }
            } catch (error) {
                // console.error('Error fetching exercises:', error);
            }
        };
        fetchData();
    }, [exercise_loading, date, dispatch]);

    const selectEditExercise = async (exercise: Exercise) => {
        dispatch(setEditExercise(exercise));
    };

    const calculateTotalCalories = (exercises: Exercise[]) => {
        return exercises.reduce((total, exercise) => total + (exercise.consume_cal || 0), 0);
    };

    return (
        <div className="max-w-4xl mx-auto mt-4">
            <div className="mb-8 p-4 bg-yellow-50 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-base font-semibold">
                        <div className='flex items-center'>
                            {/* <LatestExerciseButton date={date}/> */}
                            <span className='ml-2'>
                            Exercise 
                            </span>
                        </div>
                        {exercises.length > 0 && (
                            <span className="text-sm text-gray-500">
                                (Total {Math.round(calculateTotalCalories(exercises))} kcal)
                            </span>
                        )}
                    </h2>
                    <a href={`/dashboard/exercise/${date}`} className="text-blue-500 underline text-xs">Record Exercise</a>
                </div>
                {exercises.length > 0 ? (
                    <div className="bg-white p-4 rounded-lg shadow">
                        {exercises.map((exercise) => (
                            <div key={exercise.id} className="flex justify-between items-center border-b border-gray-200 py-2">
                                <div className="w-1/2 max-md:text-xs">
                                    <button className="text-left w-full hover:underline" onClick={() => selectEditExercise(exercise)}>
                                        <div className='overflow-ellipsis overflow-hidden whitespace-nowrap'>{exercise.workout.name}</div>
                                    </button>
                                </div>
                                <div className="w-1/4 text-center max-md:hidden">
                                    {exercise.mins !== null ? (
                                        <>
                                            {exercise.mins} mins
                                        </>
                                    ) : (
                                        "Information not available"
                                    )}
                                </div>
                                <div className="w-1/6 text-center max-md:text-xs">
                                    <strong>{typeof exercise.consume_cal === 'number' && Math.round(exercise.consume_cal)}</strong> kcal
                                </div>
                                <div className="w-1/12 text-center text-red-600">
                                    <DeleteExerciseButton id={exercise.id} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-sm">No exercises recorded.</p>
                )}
            </div>
        </div>
    );
}

export default RenderExercises;
