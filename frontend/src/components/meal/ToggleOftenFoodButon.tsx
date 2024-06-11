import React, { useEffect, useState } from 'react';
import { setToast, resetToast } from '@/store/slices/toast.slice';
import { useAppDispatch } from '@/store';
import { toggleOftenFood } from '@/backend_api/meal/toggleOftenFood';
import { fetchOftenFoodCheck } from '@/backend_api/meal/fetchOftenFoodCheck';
import { MdCheckBox } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { Food } from '@/interfaces/meal.interface';
import { FatSecretFood } from '@/interfaces/meal.interface';
import { setMealLoading, setOftenFoodLoading } from '@/store/slices/load.slice';

interface FoodProps {
    food: Food;
}

interface FatSecretFoodProps {
    fatsecret_food: FatSecretFood;
}

type Props = FoodProps | FatSecretFoodProps;

const ToggleOftenFoodButton: React.FC<Props> = (props) => {
    const dispatch = useAppDispatch();
    const [isOften, setIsOften] = useState(false);

    useEffect(() => {
        const fetchOftenStatus = async () => {
            const data = await fetchOftenFoodCheck();
            if ('error' in data) {
                dispatch(setToast({ message: data.error, type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
                return;
            }
            else if ('detail' in data) {
                dispatch(setToast({ message: data.detail, type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
                return;
            }

            if ('food' in props) {
                setIsOften(data.data.some((item: any) => item.food === props.food.id));
            } else {
                setIsOften(data.data.some((item: any) => item.fatsecret_food === props.fatsecret_food.id));
            }
        };

        fetchOftenStatus();
    }, [props, dispatch]);

    const toggleOften = async () => {
        try {
            dispatch(setMealLoading(true));
            dispatch(setOftenFoodLoading(true));
            let data;
            if ('food' in props) {
                data = await toggleOftenFood({ "food_id": props.food.id });
            } else {
                data = await toggleOftenFood({ "fatsecret_food_id": props.fatsecret_food.id });
            }

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
            console.error('Error toggling often food:', error);
            dispatch(setToast({ message: 'An error occurred while toggling often food.', type: "error" }));
            setTimeout(() => dispatch(resetToast()), 3000);
        } finally {
            dispatch(setMealLoading(false));
            dispatch(setOftenFoodLoading(false));
        }
    };

    return (
        <div className="flex items-center gap-x-2 p-2 ">
            <button onClick={toggleOften} className="hover:text-yellow-600 transition">
                {isOften ? <MdCheckBox size={20} /> : <MdCheckBoxOutlineBlank size={20} />}
            </button>
        </div>
    );
};

export default ToggleOftenFoodButton;
