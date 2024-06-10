"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import { resetToast, setToast } from "@/store/slices/toast.slice";
import { ExerciseSet } from "@/interfaces/exercise.interface";
import { createExerciseWithExerciseSet } from "@/backend_api/exercise/createExerciseWithExerciseSet";
import { setExerciseLoading } from "@/store/slices/load.slice";

interface Props {
    date: string;
    exercise_set: ExerciseSet;
}

const CreateExerciseWithExerciseSetButton: React.FC<Props> = ({ date, exercise_set }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    
    const handleCreateExercise = async () => {
        try {
            dispatch(setExerciseLoading(true));
            const response = await createExerciseWithExerciseSet({
                date: date,
                exercise_set_id: exercise_set.exercise_set_id
            });
            if ("error" in response) {
                dispatch(setToast({ message: response.error, type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
                return;
            } else if ("message" in response) {
                dispatch(setToast({ message: response.message, type: "success" }));
                setTimeout(() => dispatch(resetToast()), 4000);
            }
        } catch (error) {
            dispatch(setToast({ message: "An error occurred while registering the exercise.", type: "error" }));
            setTimeout(() => dispatch(resetToast()), 3000);
        } finally {
            dispatch(setExerciseLoading(false));
        }
    };

    return (
        <td
            className="relative px-2 py-2 text-sm text-gray-900 truncate max-w-xs hover:text-gray-400 cursor-pointer"
            title={exercise_set.exercise_set_name}
            onClick={handleCreateExercise
            }
        >
            {exercise_set.exercise_set_name}
            
        </td>
    );
};

export default CreateExerciseWithExerciseSetButton;
