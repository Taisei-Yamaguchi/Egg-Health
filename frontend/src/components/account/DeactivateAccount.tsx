import React from 'react';
import Swal from 'sweetalert2';
import { useAppDispatch } from '@/store';
import { useRouter } from 'next/navigation';
import { resetAuth } from '@/store/slices/auth.slice';

const DeactivateAccount: React.FC = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleDeleteUser = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't possibly be able to revert this! If you want to reuse this account, you need to contact us.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "gray",
            confirmButtonText: "Yes, deactivate it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch('/api/deactivate', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        dispatch(resetAuth());
                        router.push('/');
                    } else {
                        const data = await response.json();
                        Swal.fire("Error", data.error || data.detail || 'Failed to deactivate account', "error");
                    }
                } catch (error) {
                    console.error('Error deactivating account:', error);
                    Swal.fire("Error", 'Failed to deactivate account', "error");
                }
            }
        });
    };

    return (
        <div className="w-full">
            <button
                onClick={handleDeleteUser}
                className="flex w-full md:w-[50%] h-14 lg:h-auto justify-center items-center rounded-md bg-red-600 px-3 py-1.5 text-lg lg:text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
                deactivate
            </button>
        </div>
    );
};

export default DeactivateAccount;
