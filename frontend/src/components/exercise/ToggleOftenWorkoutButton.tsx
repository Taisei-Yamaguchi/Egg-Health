import React, { useEffect, useState } from 'react';
import { setToast, resetToast } from '@/store/slices/toast.slice';
import { useAppDispatch } from '@/store';
import { toggleOftenWorkout } from '@/backend_api/exercise/toggleOftenWorkout';
import { fetchOftenWorkouts } from '@/backend_api/exercise/fetchOftenWorkouts';
import { MdCheckBox } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { setExerciseLoading, setOftenWorkoutLoading } from '@/store/slices/load.slice';

type Props = {
    workout_id: number;
};

const ToggleOftenWorkoutButton: React.FC<Props> = ({ workout_id }) => {
    const dispatch = useAppDispatch();
    const [isOften, setIsOften] = useState(false);

    useEffect(() => {
        const fetchOftenStatus = async () => {
            const data = await fetchOftenWorkouts();
            if ('error' in data) {
                dispatch(setToast({ message: data.error, type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
                return;
            } else if ('detail' in data) {
                dispatch(setToast({ message: data.detail, type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
                return;
            }

            setIsOften(data.data.some((item: any) => item.id === workout_id));
        };

        fetchOftenStatus();
    }, [workout_id, dispatch]);

    const toggleOften = async () => {
        try {
            dispatch(setExerciseLoading(true));
            dispatch(setOftenWorkoutLoading(true));
            const data = await toggleOftenWorkout({ workout_id });

            if ('error' in data) {
                dispatch(setToast({ message: data.error, type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
                return;
            } else if ('detail' in data) {
                dispatch(setToast({ message: data.detail, type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
                return;
            } else if ('message' in data) {
                dispatch(setToast({ message: data.message, type: "success" }));
                setTimeout(() => dispatch(resetToast()), 3000);
                setIsOften(!isOften);
            }
        } catch (error) {
            console.error('Error toggling often workout:', error);
            dispatch(setToast({ message: 'An error occurred while toggling often workout.', type: "error" }));
            setTimeout(() => dispatch(resetToast()), 3000);
        } finally {
            dispatch(setExerciseLoading(false));
            dispatch(setOftenWorkoutLoading(false));
        }
    };

    return (
        <div className="flex items-center gap-x-2 p-2">
            <button onClick={toggleOften} className="hover:text-yellow-600 transition">
                {isOften ? <MdCheckBox size={20} /> : <MdCheckBoxOutlineBlank size={20} />}
            </button>
        </div>
    );
};

export default ToggleOftenWorkoutButton;
