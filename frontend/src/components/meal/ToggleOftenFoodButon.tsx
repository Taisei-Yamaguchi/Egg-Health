// src/components/auth/Logout.tsx

import React from 'react';
import { setToast, resetToast } from '@/store/slices/toast.slice';
import { useAppDispatch } from '@/store';
import { toggleOftenFood } from '@/backend_api/meal/toggleOftenFood';
import { MdCheckBox } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { Food } from '@/interfaces/meal.interface';
import { setMealLoading, setOftenFoodLoading } from '@/store/slices/load.slice';

interface Props {
    food:Food
}

const ToggleOftenFoodButton: React.FC<Props> = ({food}) => {
    const dispatch = useAppDispatch()
    const toggleOften= async () => {
        try {
            dispatch(setMealLoading(true))
            dispatch(setOftenFoodLoading(true))
            const data = await toggleOftenFood(food.id);
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
            }
        } catch (error) {
            console.error('Error toggling often food:', error);
            dispatch(setToast({ message: 'An error occurred while toggling often food.', type: "error" }));
            setTimeout(() => dispatch(resetToast()), 3000);
        } finally {
            dispatch(setMealLoading(false))
            dispatch(setOftenFoodLoading(false))
        }
        
    };

    return (
    <div className="flex items-center gap-x-2 p-2 ">
        <span>often</span>
        <button onClick={toggleOften} className="hover:text-yellow-600 transition">
            {food.often?(
            <>
                <MdCheckBox size={20}/>
            </>):(
            <>
                <MdCheckBoxOutlineBlank size={20}/>
            </>)}
        </button>
    </div>
    );
};

export default ToggleOftenFoodButton;
