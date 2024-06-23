import React from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { useAppDispatch } from '@/store';
import { setToast, resetToast } from '@/store/slices/toast.slice';
import { setExerciseLoading } from '@/store/slices/load.slice';
import { setCustomWorkoutLoading } from '@/store/slices/load.slice';
import { deleteWorkout } from '@/backend_api/exercise/deleteWorkout';

interface Props {
    id: number;
}

const DeleteWorkoutButton: React.FC<Props> = ({ id }) => {
    const dispatch = useAppDispatch();

    const handleDeleteWorkout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action will delete the custom activity and all associated exercises. Do you really want to proceed?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    dispatch(setExerciseLoading(true));
                    dispatch(setCustomWorkoutLoading(true))
                    const data = await deleteWorkout(id);
                    if ('error' in data) {
                        dispatch(setToast({ message: data.error, type: 'error' }));
                    } else if ('detail' in data) {
                        dispatch(setToast({ message: data.detail, type: 'error' }));
                    } else if ('message' in data) {
                        dispatch(setToast({ message: data.message, type: 'success' }));
                    }
                } catch (error) {
                    // console.error('Error deleting workout:', error);
                    dispatch(setToast({ message: 'An error occurred while deleting the activity.', type: 'error' }));
                } finally {
                    dispatch(resetToast());
                    dispatch(setExerciseLoading(false));
                    dispatch(setCustomWorkoutLoading(false))
                }
            }
        });
    };

    return (
        <div className="flex items-center gap-x-2 p-2">
            <button className="hover:text-red-800 transition" onClick={handleDeleteWorkout}>
                <MdOutlineDeleteForever size={15} />
            </button>
        </div>
    );
};

export default DeleteWorkoutButton;
