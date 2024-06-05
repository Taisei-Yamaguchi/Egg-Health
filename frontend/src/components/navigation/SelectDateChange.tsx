'use client';

import { usePathname, useRouter } from 'next/navigation';
import { format, addDays, subDays, isValid, parseISO } from 'date-fns';
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
        if (date && /^\d{4}-\d{2}-\d{2}$/.test(date) && isValid(parseISO(date))) {
            setSelectedDate(date);
        }
    }, [date]);

    const previousDate = format(subDays(parseISO(selectedDate), 1), 'yyyy-MM-dd');
    const nextDate = format(addDays(parseISO(selectedDate), 1), 'yyyy-MM-dd');

    const handleNavigation = (newDate: string) => {
        const basePath = pathname.split('/').slice(0, -1).join('/');
        const newPath = `${basePath}/${newDate}`;
        router.push(newPath);
    };

    const formattedSelectedDate = format(parseISO(selectedDate), 'yyyy, MMMM do');

    return (
        <nav className="bg-yellow-400 shadow-md rounded-full my-2 mx-auto w-[280px] max-w-lg">
            <ul className="flex justify-between items-center py-1">
                <li>
                    <button onClick={() => handleNavigation(previousDate)} className="text-white font-medium px-2 py-1 rounded-full bg-yellow-400 hover:bg-yellow-500 text-xs"
                    style={{ fontSize: '0.625rem' }}
                    >
                        Previous Day
                    </button>
                </li>
                <li>
                    <span className="text-white font-bold text-sm">
                        {formattedSelectedDate}
                    </span>
                </li>
                <li>
                    <button onClick={() => handleNavigation(nextDate)} className="text-white font-medium px-2 py-1 rounded-full bg-yellow-400 hover:bg-yellow-500 text-xs"
                    style={{ fontSize: '0.625rem' }}
                    >
                        Next Day
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default SelectDateChange;
