'use client';

import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, addDays, isSameDay, isBefore, isAfter, differenceInDays } from 'date-fns';
import { checkInputStatusByMonth } from '@/backend_api/user_detail/checkInputStatus';
import { useAppDispatch } from '@/store';
import { setToast, resetToast } from '@/store/slices/toast.slice';
import { FaCheck } from 'react-icons/fa';

type MonthData = {
    date: string,
    meal: boolean,
    exercise: boolean,
    weight: boolean
}

const Calendar: React.FC = () => {
    const dispatch = useAppDispatch();
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(startOfMonth(today));
    const [selectedDate, setSelectedDate] = useState(today);
    const [inputStatus, setInputStatus] = useState<MonthData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const monthStr = format(currentMonth, 'yyyy-MM');
            try {
                const response = await checkInputStatusByMonth(monthStr);
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                } else if ('message' in response) {
                    setInputStatus(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                dispatch(setToast({ message: 'An error occurred while fetching input status.', type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
            }
        };

        fetchData();
    }, [currentMonth, dispatch]);

    useEffect(() => {
        setCurrentMonth(startOfMonth(today));
    }, []);

    const nextMonth = () => {
        const nextMonth = addMonths(currentMonth, 1);
        if (!isAfter(nextMonth, today)) {
            setCurrentMonth(nextMonth);
        }
    };

    const prevMonth = () => {
        const prevMonth = subMonths(currentMonth, 1);
        if (!isBefore(prevMonth, subMonths(today, 3))) {
            setCurrentMonth(prevMonth);
        }
    };

    const renderHeader = () => {
        const isNextDisabled = !isBefore(addMonths(currentMonth, 1), today);
        const isPrevDisabled = !isAfter(subMonths(currentMonth, 1), subMonths(today, 3));

        return (
            <div className="flex justify-between items-center mb-4">
                {!isPrevDisabled && (
                    <button
                        onClick={prevMonth}
                        className="hover:scale-105 px-2 py-1 bg-green-300 text-green-800 rounded-md shadow-sm text-xs"
                    >
                        Previous
                    </button>
                )}
                <div className="text-md font-semibold">{format(currentMonth, 'yyyy MMMM')}</div>
                {!isNextDisabled && (
                    <button
                        onClick={nextMonth}
                        className=" hover:scale-105 px-2 py-1 bg-green-300 text-green-800 rounded-md shadow-sm text-xs"
                    >
                        Next
                    </button>
                )}
            </div>
        );
    };

    const renderRows = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);

        const rows = [];
        let day = monthStart;

        while (day <= monthEnd) {
            const formattedDay = format(day, 'yyyy-MM-dd');
            const inputForDay = inputStatus.find(item => item.date === formattedDay);
            const isFuture = differenceInDays(day, today) > 1;
            const isTomorrow = differenceInDays(day, today) === 1;

            rows.push(
                <div
                    className={`flex justify-between items-center py-1 ${isSameDay(day, today) ? 'bg-yellow-300' : ''}`}
                    key={day.toString()}
                    onClick={() => !isFuture && setSelectedDate(day)}
                >
                    <span className={`w-1/5 text-left text-xs pl-2 ${isFuture ? 'text-gray-400' : ''}`}>
                        {format(day, 'd (EEE)')}
                    </span>
                    <span className={`w-1/10 text-center text-xs ${isFuture ? 'text-gray-400' : ''} flex justify-center items-center`}>
                        {inputForDay?.meal ? <FaCheck className="text-green-500" /> : '-'}
                    </span>
                    <span className={`w-1/10 text-center text-xs ${isFuture ? 'text-gray-400' : ''} flex justify-center items-center`}>
                        {inputForDay?.exercise ? <FaCheck className="text-green-500" /> : '-'}
                    </span>
                    <span className={`w-1/10 text-center text-xs ${isFuture ? 'text-gray-400' : ''} flex justify-center items-center`}>
                        {inputForDay?.weight ? <FaCheck className="text-green-500" /> : '-'}
                    </span>
                    <span className={`w-1/5 text-center text-xs ${isFuture ? 'text-gray-400' : ''}`}>
                        {isFuture ? '-' : (
                            <a href={`/dashboard/record/${formattedDay}`} className="text-blue-500 hover:text-blue-700 transition-colors">
                                record
                            </a>
                        )}
                    </span>
                </div>
            );
            day = addDays(day, 1);
        }
        return <div>{rows}</div>;
    };

    return (
        <div className="mx-auto mt-4 p-4 bg-white rounded-lg shadow-md h-full w-[350px]">
            {renderHeader()}
            <div className="flex justify-between items-center mb-2 font-semibold text-xs">
                <span className="w-1/5 text-left pl-2">Date</span>
                <span className="w-1/10 text-center">Meal</span>
                <span className="w-1/10 text-center">Exercise</span>
                <span className="w-1/10 text-center">Weight</span>
                <span className="w-1/5 text-center">Record</span>
            </div>
            {renderRows()}
        </div>
    );
};

export default Calendar;
