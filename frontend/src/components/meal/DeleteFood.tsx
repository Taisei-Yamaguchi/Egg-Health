import React from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { deleteFood } from '@/backend_api/meal/deleteFood';
import { useAppDispatch } from '@/store';
import { setToast, resetToast } from '@/store/slices/toast.slice';
import { setMealLoading } from '@/store/slices/load.slice';
import { setCustomFoodLoading } from '@/store/slices/load.slice';

interface Props {
    id: number;
}

const DeleteFoodButton: React.FC<Props> = ({ id }) => {
    const dispatch = useAppDispatch();

    const handleDeleteFood = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action will delete the food and all associated meals. Do you really want to proceed?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    dispatch(setMealLoading(true));
                    dispatch(setCustomFoodLoading(true))
                    const data = await deleteFood(id);
                    if ('error' in data) {
                        dispatch(setToast({ message: data.error, type: 'error' }));
                    } else if ('detail' in data) {
                        dispatch(setToast({ message: data.detail, type: 'error' }));
                    } else if ('message' in data) {
                        dispatch(setToast({ message: data.message, type: 'success' }));
                    }
                } catch (error) {
                    // console.error('Error deleting food:', error);
                    dispatch(setToast({ message: 'An error occurred while deleting the food.', type: 'error' }));
                } finally {
                    dispatch(resetToast());
                    dispatch(setMealLoading(false));
                    dispatch(setCustomFoodLoading(false))
                }
            }
        });
    };

    return (
        <div className="flex items-center gap-x-2 p-2">
            <button className="hover:text-red-800 transition" onClick={handleDeleteFood}>
                <MdOutlineDeleteForever size={15} />
            </button>
        </div>
    );
};

export default DeleteFoodButton;
