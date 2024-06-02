// src/components/auth/Logout.tsx

import React from 'react';
import { setToast, resetToast } from '@/store/slices/toast.slice';
import { useAppDispatch } from '@/store';
import { deleteMeal } from '@/backend_api/meal/deleteMeal';
import { setMealLoading } from '@/store/slices/load.slice';
import { resetEditMeal } from '@/store/slices/meal.slice';
import { MdOutlineDeleteForever } from "react-icons/md";

interface Props {
    id:number
}

const DeleteMealButton: React.FC<Props> = ({id}) => {
    const dispatch = useAppDispatch()
    const handleDeleteMeal = async () => {
        try {
            dispatch(setMealLoading(true))
            const data = await deleteMeal(id);
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
                dispatch(resetEditMeal())
            }
        } catch (error) {
            console.error('Error deleting meal:', error);
            dispatch(setToast({ message: 'An error occurred while deleting the meal.', type: "error" }));
            setTimeout(() => dispatch(resetToast()), 3000);
        } finally {
            dispatch(setMealLoading(false))
        }
    };

    return (
    <div className="flex items-center gap-x-2 p-2 ">
        <button  className="hover:text-red-800 transition" onClick={handleDeleteMeal}>
            <MdOutlineDeleteForever size={15} />
        </button>
    </div>
    );
};

export default DeleteMealButton;
