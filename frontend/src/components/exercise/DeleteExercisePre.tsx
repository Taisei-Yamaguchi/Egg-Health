import React from 'react';
import { setToast, resetToast } from '@/store/slices/toast.slice';
import { useAppDispatch } from '@/store';
import { deleteExercisePre } from '@/backend_api/exercise/deleteExercisePre';
import { setExerciseLoading } from '@/store/slices/load.slice';
import { resetEditExercisePre } from '@/store/slices/exercise.slice';
import { MdOutlineDeleteForever } from "react-icons/md";

interface Props {
    id:number
}

const DeleteExercisePreButton: React.FC<Props> = ({id}) => {
    const dispatch = useAppDispatch()
    const handleDeleteExercise = async () => {
        try {
            dispatch(setExerciseLoading(true))
            const data = await deleteExercisePre(id);
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
                dispatch(resetEditExercisePre())
            }
        } catch (error) {
            console.error('Error deleting exercise:', error);
            dispatch(setToast({ message: 'An error occurred while deleting the exercise.', type: "error" }));
            setTimeout(() => dispatch(resetToast()), 3000);
        } finally {
            dispatch(setExerciseLoading(false))
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

export default DeleteExercisePreButton;