'use client';

// import { portFoliosFetch } from '@/api/portfolios.fetch';
// import { logout } from '@/app/login/actions/logout.action';
// import { User } from '@/interfaces';
import { useAppSelector } from '@/store';
// import { resetAuth, setAuth } from '@/store/slices/auth.slice';
import { setToast } from '@/store/slices/toast.slice';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdLogout } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';

// type Props = {
// 	authenticatedUser: User;
// };

const TopNav: React.FC = () => {
	const dispatch = useDispatch();
	// const { user } = useAppSelector((state) => state.auth);
	const pathname = usePathname();
	const router = useRouter();
	const [rightMenuOpen, setRightMenuOpen] = useState(false);
	const [centerMenuOpen, setCenterMenuOpen] = useState(false);

	const toggleRightMenu = () => {
		setRightMenuOpen(!rightMenuOpen);
	};

	// const handleLogout = () => {
	// 	dispatch(setToast({ message: "You've been logged out successfully 👍", type: 'success' }));
	// 	dispatch(resetAuth());
	// 	logout();
	// 	router.refresh();
	// 	router.push('/login');
	// };

	return (
		<header className="fixed pt-2 top-0 left-0 right-0 z-50 h-14 flex w-full items-center justify-between bg-blue-700 p-2">
			<div className="flex items-center space-x-2">
				<button type="button" className="text-3xl asideOpen">
					<i className="bx bx-menu"></i>
				</button>
				<div className="font-bold text-white">Egg Health</div>
			</div>

			<div
				className={clsx("flex items-center justify-center", {
					"h-[300px]": centerMenuOpen,
				})}
				onMouseLeave={() => setCenterMenuOpen(false)}
			>
				
			</div>

			<div>
				<button
					type="button"
					className="overflow-hidden flex justify-center items-center gap-x-2"
					onClick={toggleRightMenu}
				>
					<span className="text-white font-medium">Login</span>
					{/* {!user?.imageUrl ? (
						<UserIcon className="w-10 h-10 text-gray-300 rounded-full border border-white p-2" />
					) : (
						<img
							className="w-10 h-10 rounded-full border border-white p-1 object-cover object-top"
							src={user.imageUrl}
							alt={user.name}
						/>
					)} */}
				</button>

				<div
					className={`${
						rightMenuOpen ? '' : 'hidden'
					} absolute right-2 mt-1 w-48 divide-y divide-gray-200 rounded-md border border-gray-200 bg-white shadow-md`}
					x-show="profileOpen"
					x-transition="true"
				>
					{/* <div className="flex flex-col space-y-3 p-2 text-md">
						{pathname !== `/admin/users/profile/${user?.id}` ? (
							<Link
								href={`/admin/users/profile/${user?.id}`}
								className="transition text-slate-700 hover:text-blue-400"
								onClick={toggleRightMenu}
							>
								show profile
							</Link>
						) : (
							<span className="text-gray-300 cursor-not-allowed">show profile</span>
						)}
					</div> */}

					<div className="flex items-center gap-x-2 p-2 ">
						<MdLogout size={20} />
						<button  className="hover:text-blue-600 transition">
							logout
						</button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default TopNav;
