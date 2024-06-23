// src/components/auth/Logout.tsx

import React from 'react';
import { setToast, resetToast } from '@/store/slices/toast.slice';
import { useAppDispatch } from '@/store';
import { MdOutlineDeleteForever } from "react-icons/md";
import { deleteExerciseSet } from '@/backend_api/exercise/deleteExerciseSet';
import { resetEditExercise } from '@/store/slices/exercise.slice';
import { setSetLoading } from '@/store/slices/load.slice';

interface Props {
    id:number
}

const DeleteExerciseSetButton: React.FC<Props> = ({id}) => {
    const dispatch = useAppDispatch()
    const handleDeleteExercise = async () => {
        try {
            dispatch(setSetLoading(true))
            const data = await deleteExerciseSet(id);
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
                dispatch(resetEditExercise())
            }
        } catch (error) {
            console.error('Error deleting exercise set:', error);
            dispatch(setToast({ message: 'An error occurred while deleting the exercise set.', type: "error" }));
            setTimeout(() => dispatch(resetToast()), 3000);
        } finally {
            dispatch(setSetLoading(false))
        }
    };

    return (
    <div className="flex items-center gap-x-2 p-2 ">
        <button  className="hover:text-red-800 transition" onClick={handleDeleteExercise}>
            <MdOutlineDeleteForever size={15} />
        </button>
    </div>
    );
};

export default DeleteExerciseSetButton;
