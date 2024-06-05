'use client';

import React from 'react';
import { FaSun, FaCoffee, FaRunning, FaMoon, FaCloudSun, FaCheck } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import { checkInputStatus } from '@/backend_api/user_detail/checkInputStatus';
import { useState, useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { setToast } from '@/store/slices/toast.slice';
import { resetToast } from '@/store/slices/toast.slice';

interface Props {
    date: string;
}

type InputData = {
    check_breakfast: boolean,
    check_lunch: boolean,
    check_dinner: boolean,
    check_snack: boolean,
    check_exercise: boolean,
    check_weight: boolean,
    check_body_fat: boolean
}

const MealExerciseLinks: React.FC<Props> = ({ date }) => {
    const dispatch = useAppDispatch()
    const router = useRouter();
    const [inputStatus, setInputStatus] = useState<InputData | null>(null)
    const links = [
        { name: 'Breakfast', icon: <FaSun />, path: `/dashboard/meal/Breakfast/${date}`, check: 'check_breakfast' },
        { name: 'Lunch', icon: <FaCloudSun />, path: `/dashboard/meal/Lunch/${date}`, check: 'check_lunch' },
        { name: 'Dinner', icon: <FaMoon />, path: `/dashboard/meal/Dinner/${date}`, check: 'check_dinner' },
        { name: 'Snack', icon: <FaCoffee />, path: `/dashboard/meal/Snack/${date}`, check: 'check_snack' },
        { name: 'Exercise', icon: <FaRunning />, path: `/dashboard/exercise/${date}`, check: 'check_exercise' }
    ];
    const formattedDate = format(parseISO(date), 'yyyy, MMMM do');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await checkInputStatus(date);
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                } else if ('message' in response) {
                    setInputStatus(response.data)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                dispatch(setToast({ message: 'An error occurred while fetching Input status.', type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
            }
        };

        fetchData();
    }, [date, dispatch]);

    return (
        <div className="max-w-lg mx-auto mt-4 p-4 bg-yellow-100 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <button 
                    onClick={() => router.push(`/dashboard/record/${date}`)} 
                    className="px-2 py-1 bg-green-300 text-green-800 rounded-md shadow-sm text-sm"
                >
                    Today's Record
                </button>
                <span className="text-md font-semibold">{formattedDate}</span>
            </div>
            <div className="flex justify-between">
                {links.map((link, index) => (
                    <button 
                        key={index} 
                        onClick={() => router.push(link.path)} 
                        className="relative flex flex-col items-center p-2 bg-gradient-to-r from-orange-400 to-yellow-400 text-white rounded-lg shadow-lg w-1/5 mx-1 transform hover:scale-105 transition-transform"
                    >
                        <div className="text-2xl mb-1">{link.icon}</div>
                        <div className="text-sm font-semibold">{link.name}</div>
                        {inputStatus && inputStatus[link.check as keyof InputData] && (
                            <FaCheck className="absolute top-1 right-1 text-white bg-green-500 rounded-full p-1 text-xs" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MealExerciseLinks;
