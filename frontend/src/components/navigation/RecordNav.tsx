'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { getCurrentDateFormatted } from '@/helper/getTodayDate';

interface RecordNavProps {
	date: string;
}

const RecordNav: React.FC<RecordNavProps> = ({ date }) => {
	const pathname = usePathname();
	const selectedDate = date || getCurrentDateFormatted();

	const navItems = [
		{ label: 'Record', href: `/dashboard/record/${selectedDate}` },
		{ label: 'Breakfast', href: `/dashboard/meal/Breakfast/${selectedDate}` },
		{ label: 'Lunch', href: `/dashboard/meal/Lunch/${selectedDate}` },
		{ label: 'Dinner', href: `/dashboard/meal/Dinner/${selectedDate}` },
		{ label: 'Snack', href: `/dashboard/meal/Snack/${selectedDate}` },
		{ label: 'Exercise', href: `/dashboard/exercise/${selectedDate}` }
	];

	return (
		<nav className="bg-yellow-100 shadow-md">
			<ul className="flex justify-around py-4">
				{navItems.map((item) => (
					<li key={item.label}>
						<a
							href={item.href}
							className={clsx(
								'text-gray-700 hover:text-gray-900',
								{
									'font-bold': pathname === item.href
								}
							)}
						>
							{item.label}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default RecordNav;
