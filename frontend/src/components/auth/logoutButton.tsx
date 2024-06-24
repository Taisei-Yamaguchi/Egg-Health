// src/components/auth/Logout.tsx

import React from 'react';
import { useRouter } from 'next/navigation';
import { deleteCookie, getCookie } from 'cookies-next';
import { fetchLogout } from '@/backend_api/auth/fetchLogout';
import { setToast, resetToast } from '@/store/slices/toast.slice';
import { useAppDispatch } from '@/store';
import { MdLogout } from 'react-icons/md';
import { resetAuth } from '@/store/slices/auth.slice';

const LogoutButton: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch()

    const handleLogout = async () => {
        const data = await fetchLogout();
        if ('error' in data) {
            dispatch(setToast({ message: data.error, type: "error" }));
            setTimeout(() => dispatch(resetToast()), 3000);
            return;
        }

        if ('detail' in data) {
            dispatch(setToast({ message: data.detail, type: "error" }));
            setTimeout(() => dispatch(resetToast()), 3000);
            return;
        }

        if ('message' in data){
            // dispatch(setToast({ message: data.message, type: "success" }));
            dispatch(setToast({ message: "You've been logged out successfully 👍", type: 'success' }));
            setTimeout(() => dispatch(resetToast()), 500);
            deleteCookie('token');
            deleteCookie('id');
            deleteCookie('nickname');
            deleteCookie('username');
            deleteCookie('license');
            
            dispatch(resetAuth())
            return router.push('/');
        }
    };

    return (
    <div className="flex items-center gap-x-2 p-2 ">
        <MdLogout size={20} />
        <button onClick={handleLogout} className="hover:text-yellow-600 transition">Logout</button>
    </div>
    );
};

export default LogoutButton;
