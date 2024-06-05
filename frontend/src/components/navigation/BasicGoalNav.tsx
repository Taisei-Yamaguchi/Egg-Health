'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const BasicGoalNav: React.FC = () => {
	const pathname = usePathname();

	const navItems = [
		{ label: 'Basic Information', href: '/dashboard/basic' },
		{ label: 'Goal', href: '/dashboard/target' },
	];

	return (
		<div className="w-full flex justify-start rounded-md border-b-2 border-yellow-100">
			<nav className="w-full">
				<ul className="flex flex-wrap space-x-1 py-1 px-1 w-full pb-0">
					{navItems.map((item) => (
						<li key={item.label} className="flex-none bg-yellow-100">
							<a
								href={item.href}
								className={clsx(
									'block py-1 px-1 text-center text-gray-700 rounded-t-md',
									'hover:bg-white hover:text-gray-900 border border-yellow-200 transition-all',
									'text-xs md:text-sm lg:text-base',
									{ 'bg-white text-gray-900 font-bold': pathname === item.href }
								)}
								style={{ minWidth: '60px' }}
							>
								{item.label}
							</a>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
};

export default BasicGoalNav;
