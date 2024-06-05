'use client';
import React , { useEffect ,useState}from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';

import { Exercise } from '@/interfaces/exercise.interface';
import { fetchExercises } from '@/backend_api/exercise/fetchExercises';
import DeleteExerciseButton from './DeleteExercise';
// import ToggleOftenFoodButton from './ToggleOftenFoodButon';
// import { resetUsedFood } from '@/store/slices/meal_form.slice';
import { setEditExercise } from '@/store/slices/exercise.slice';
import { useAppSelector } from '@/store';
import { RootState } from '@/store';

interface Props {
    date: string;
}

const RenderExercises: React.FC<Props> = ({date})=>{
    const router = useRouter();
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
                }if ('message' in response) {
                    setExercises(response.data);
                }
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        };
        fetchData();
    }, [exercise_loading]);

    const selectEditExercise= async (exercise:Exercise) => {
        dispatch(setEditExercise(exercise))
        // resetUsedFood()
    };

    return (
        <>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
            <span className='text-sm'>{date}  </span>  
            <span className='text-base font-medium'>Exercise</span>
        </div>
        <div className="p-4 sm:mx-auto sm:w-full sm:max-w-sm h-72 overflow-y-auto border">
            {exercises.length > 0 ? (

                <table className="min-w-full divide-y divide-red-200 border border-red-400">
                <thead className="bg-red-100">
                    <tr>
                        <th className="px-2 py-1 text-left text-xs font-medium text-green-800">item</th>
                        <th className="px-2 py-1 text-center text-xs font-medium text-green-800">mins</th>
                        <th className="px-2 py-1 text-center text-xs font-medium text-green-800">kcal</th>
                        <th className="px-2 py-1 text-center text-xs font-medium text-green-800">delete</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-red-200">
                    {exercises.map((exercise) => (
                        <tr key={exercise.id} className="whitespace-nowrap" >
                            <td className="px-2 py-1 text-xs font-medium text-gray-900 w-32">
                                <button className='w-[120px] hover:border-b' onClick={() => selectEditExercise(exercise)}>
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
                                <strong>{typeof exercise.consume_cal === 'number' && Math.round(exercise.consume_cal)}</strong> kcal
                            </td>
                            <td className="px-2 py-1 text-center text-xs text-red-600">
                                <DeleteExerciseButton id={exercise.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            ) : (
                <p className="text-gray-500">No exercises recorded.</p>
            )}
        </div>
    </>
    );
}

export default RenderExercises