'use client';

import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { getCurrentDateFormatted } from '@/helper/getTodayDate';
import { FaTachometerAlt, FaRegCalendarAlt, FaChartLine, FaBullseye } from 'react-icons/fa';

const DashboardNav: React.FC = () => {
	const pathname = usePathname();
	const currentDate = getCurrentDateFormatted();

	return (
		<nav className="bg-yellow-200 shadow-md">
			<ul className="flex justify-around py-4">
				<li className="group relative">
					<a href="/dashboard" className={clsx("flex items-center space-x-2 text-gray-700 hover:text-gray-500 transition-colors duration-300", { "font-bold": pathname === "/dashboard" })}>
						<FaTachometerAlt className="text-xl" />
						<span>Dashboard</span>
					</a>
					<div className="absolute left-0 right-0 mx-auto mt-1 w-0 h-1 bg-yellow-500 transition-all duration-300 group-hover:w-full"></div>
				</li>
				<li className="group relative">
					<a href={`/dashboard/record/${currentDate}`} className={clsx("flex items-center space-x-2 text-gray-700 hover:text-gray-500 transition-colors duration-300", { "font-bold": pathname.startsWith("/dashboard/record/") || pathname.startsWith("/dashboard/meal/") || pathname.startsWith("/dashboard/exercise/") })}>
						<FaRegCalendarAlt className="text-xl" />
						<span>Daily Record</span>
					</a>
					<div className="absolute left-0 right-0 mx-auto mt-1 w-0 h-1 bg-yellow-500 transition-all duration-300 group-hover:w-full"></div>
				</li>
				<li className="group relative">
					<a href="/dashboard/graph/weight" className={clsx("flex items-center space-x-2 text-gray-700 hover:text-gray-500 transition-colors duration-300", { "font-bold": pathname.startsWith("/dashboard/graph/") })}>
						<FaChartLine className="text-xl" />
						<span>Graph</span>
					</a>
					<div className="absolute left-0 right-0 mx-auto mt-1 w-0 h-1 bg-yellow-500 transition-all duration-300 group-hover:w-full"></div>
				</li>
				<li className="group relative">
					<a href="/dashboard/basic" className={clsx("flex items-center space-x-2 text-gray-700 hover:text-gray-500 transition-colors duration-300", { "font-bold": pathname === "/dashboard/basic" || pathname === "/dashboard/target" })}>
						<FaBullseye className="text-xl" />
						<span>Goal & Basic Settings</span>
					</a>
					<div className="absolute left-0 right-0 mx-auto mt-1 w-0 h-1 bg-yellow-500 transition-all duration-300 group-hover:w-full"></div>
				</li>
			</ul>
		</nav>
	);
};

export default DashboardNav;
