'use client';

import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { getCurrentDateFormatted } from '@/helper/getTodayDate';

const DashboardNav: React.FC = () => {
	const pathname = usePathname();
	const currentDate = getCurrentDateFormatted();

	return (
		<nav className="bg-yellow-100 shadow-md">
			<ul className="flex justify-around py-4">
				<li>
					<a href="/dashboard" className={clsx("border-b text-gray-500 hover:text-gray-400", { "font-bold": pathname === "/dashboard" })}>
						Dashboard
					</a>
				</li>
				<li>
					<a href={`/dashboard/record/${currentDate}`} className={clsx("border-b text-gray-500 hover:text-gray-400", { "font-bold": pathname.startsWith("/dashboard/record/") || pathname.startsWith("/dashboard/meal/") || pathname.startsWith("/dashboard/exercise/") })}>
						Daily Record
					</a>
				</li>
				<li>
					<a href="/dashboard/graph/weight" className={clsx("border-b text-gray-500 hover:text-gray-400", { "font-bold": pathname.startsWith("/dashboard/graph/") })}>
						Graph
					</a>
				</li>
				<li>
					<a href="/dashboard/basic" className={clsx("border-b text-gray-500 hover:text-gray-400", { "font-bold": pathname === "/dashboard/basic" || pathname === "/dashboard/target" })}>
						Goal & Basic Settings
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default DashboardNav;
