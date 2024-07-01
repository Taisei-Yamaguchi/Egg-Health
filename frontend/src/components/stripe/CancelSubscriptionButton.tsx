"use client";
import React from 'react';
import Swal from 'sweetalert2';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { cancelSubscription } from '@/backend_api/license/cancelSubscription';

const CancelSubscriptionButton: React.FC = () => {
    const dispatch = useAppDispatch();

    const handleCancel = async () => {
        try {
            const response = await cancelSubscription();
            if ('error' in response) {
                dispatch(setToast({ message: response.error, type: 'error' }));
                setTimeout(() => dispatch(resetToast()), 3000);
                return;
            }
            if ('message' in response) {
                dispatch(setToast({ message: response.message, type: 'success' }));
                setTimeout(() => dispatch(resetToast()), 3000);
                setTimeout(() => {
                    window.location.reload();
                }, 3000); // Add a slight delay before reloading
            }
        } catch (error) {
            dispatch(setToast({ message: 'Some error happened.', type: 'error' }));
            setTimeout(() => dispatch(resetToast()), 3000);
        }
    };

    const confirmCancel = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to stop your subscription? This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "gray",
            confirmButtonText: "Yes, stop it!"
        }).then((result) => {
            if (result.isConfirmed) {
                handleCancel();
            }
        });
    };

    return (
        <button
            className="w-[200px] h-[30px] cursor-pointer p-1 bg-red-500 hover:bg-red-600 rounded-lg items-center"
            onClick={confirmCancel}
        >
            <p className="text-sm font-bold text-white shadow-text">Stop my subscription</p>
        </button>
    );
};

export default CancelSubscriptionButton;
