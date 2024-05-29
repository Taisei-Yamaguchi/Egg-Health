'use client';

import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const GraphNav: React.FC = () => {
	const pathname = usePathname();
	return (
		<nav className="bg-green-100 shadow-md">
			<ul className="flex justify-around py-4">
				<li>
					<a href="/dashboard/graph/weight" className={clsx("border-b text-gray-500 hover:text-gray-400", { "font-bold": pathname === "/dashboard/graph/weight" })}>
						Weight
					</a>
				</li>
				<li>
					<a href="/dashboard/graph/body_fat" className={clsx("border-b text-gray-500 hover:text-gray-400", { "font-bold": pathname === "/dashboard/graph/body_fat" })}>
						Body Fat 
					</a>
				</li>
				<li>
					<a href="/dashboard/graph/intake_cal" className={clsx("border-b text-gray-500 hover:text-gray-400", { "font-bold": pathname === "/dashboard/graph/intake_cal"})}>
						Intake Calories
					</a>
				</li>
				<li>
					<a href="/dashboard/graph/exercise_cal" className={clsx("border-b text-gray-500 hover:text-gray-400", { "font-bold": pathname === "/dashboard/graph/exercise_cal" })}>
						Exercise Calories
					</a>
				</li>
                <li>
					<a href="/dashboard/graph/cals_balance" className={clsx("border-b text-gray-500 hover:text-gray-400", { "font-bold": pathname === "/dashboard/graph/cals_balance" })}>
						Calories Balance
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default GraphNav;
