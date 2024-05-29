'use client';

import { usePathname, useRouter } from 'next/navigation';
import { format, addDays, subDays, isValid } from 'date-fns';
import { getCurrentDateFormatted } from '@/helper/getTodayDate';
import { useEffect, useState } from 'react';

type SelectDateChangeProps = {
    date: string;
};

const SelectDateChange: React.FC<SelectDateChangeProps> = ({ date }) => {
    const pathname = usePathname() || '/';
    const router = useRouter();

    const todayFormatted = getCurrentDateFormatted();
    const [selectedDate, setSelectedDate] = useState(todayFormatted);

    useEffect(() => {
        if (date && /^\d{4}-\d{2}-\d{2}$/.test(date) && isValid(new Date(date))) {
            setSelectedDate(date);
        }
    }, [date]);

    const previousDate = format(subDays(new Date(selectedDate), 0), 'yyyy-MM-dd');
    const nextDate = format(addDays(new Date(selectedDate), 2), 'yyyy-MM-dd');

    const handleNavigation = (newDate: string) => {
        const basePath = pathname.split('/').slice(0, -1).join('/');
        const newPath = `${basePath}/${newDate}`;
        router.push(newPath);
    };

    return (
        <nav className="bg-yellow-100 shadow-md">
            <ul className="flex justify-around py-4">
                <li>
                    <button onClick={() => handleNavigation(previousDate)} className="text-gray-800 hover:text-gray-600">
                        ← Previous Day
                    </button>
                </li>
                <li>
                    <span className="text-gray-800 font-bold">{selectedDate}</span>
                </li>
                <li>
                    <button onClick={() => handleNavigation(nextDate)} className="text-gray-800 hover:text-gray-600">
                        Next Day →
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default SelectDateChange;
