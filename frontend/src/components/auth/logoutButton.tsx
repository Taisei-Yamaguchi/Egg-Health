"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store';
import { setToast, resetToast } from '@/store/slices/toast.slice';
import { resetAuth } from '@/store/slices/auth.slice';
import { MdLogout } from 'react-icons/md';

const LogoutButton: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.status !== 200) {
                dispatch(setToast({ message: data.error || data.detail, type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
            } else {
                dispatch(setToast({ message: "You've been logged out successfully 👍", type: 'success' }));
                setTimeout(() => dispatch(resetToast()), 500);
                dispatch(resetAuth());
                
            }
        } catch (error) {
            // console.error('Error logging out:', error);
            dispatch(setToast({ message: 'Logout failed', type: "error" }));
            setTimeout(() => dispatch(resetToast()), 3000);
        } finally{
            router.push('/');
        }
    };

    return (
        <div className="flex items-center gap-x-2 p-2">
            <MdLogout size={20} />
            <button onClick={handleLogout} className="hover:text-yellow-600 transition">Logout</button>
        </div>
    );
};

export default LogoutButton;
