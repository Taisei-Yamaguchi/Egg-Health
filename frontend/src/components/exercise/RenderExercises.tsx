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
import { setEditExercise } from '@/store/slices/exercise_form.slice';
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
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {exercises.length > 0 ? (
                exercises.map((exercise) => (
                    <div key={exercise.id} className="p-4 bg-white shadow rounded-lg">
                        <h3 className="text-lg font-semibold">
                        <button onClick={() => selectEditExercise(exercise)}>
                            {exercise.workout.name} ({exercise.workout.type})
                        </button>
                        </h3>
                        <p>
                            {exercise.mins} mins 
                        </p>
                        <p>
                            {exercise.consume_cal} kcal
                        </p>
                        {/* <ToggleOftenFoodButton food={meal.food}/> */}
                        <DeleteExerciseButton id={exercise.id}/>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No exercises recorded.</p>
            )}
        </div>
    );
}

export default RenderExercises