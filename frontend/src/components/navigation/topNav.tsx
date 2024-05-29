'use client';

// import { portFoliosFetch } from '@/api/portfolios.fetch';
// import { logout } from '@/app/login/actions/logout.action';
import { Account } from '@/interfaces/account.interface';
import { useAppSelector } from '@/store';
// import { resetAuth, setAuth } from '@/store/slices/auth.slice';
import { setToast } from '@/store/slices/toast.slice';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { IoSettingsSharp } from "react-icons/io5";
import { setAuth } from '@/store/slices/auth.slice';
import { useCookies } from 'react-cookie';
import LogoutButton from '../auth/logoutButton';

type Props = {
	authenticatedUser: Account;
};

const TopNav: React.FC = () => {
	const dispatch = useDispatch();
    const [cookies] = useCookies(['id', 'nickname', 'username']);

	const { account } = useAppSelector((state) => state.auth);
	const pathname = usePathname();
	const router = useRouter();
	const [rightMenuOpen, setRightMenuOpen] = useState(false);
	const [centerMenuOpen, setCenterMenuOpen] = useState(false);

    useEffect(() => {
        const id = cookies.id;
        const nickname = cookies.nickname;
        const username = cookies.username;

        const cookie_account = (id && nickname && username) 
            ? { id: id, nickname: nickname, username: username } 
            : null;
        if (cookie_account) {
            dispatch(setAuth(cookie_account));
        }
    }, []);

	const toggleRightMenu = () => {
		setRightMenuOpen(!rightMenuOpen);
	};

    const toggleCenterMenu = () => {
		setCenterMenuOpen(!centerMenuOpen);
	};

	return (
		<header className="fixed pt-2 top-0 left-0 right-0 z-50 h-14 flex w-full items-center justify-between bg-yellow-400 p-2">
			<div className="flex items-center space-x-2">
				<button type="button" className="text-3xl asideOpen">
					<i className="bx bx-menu"></i>
				</button>
				<div className="font-bold text-white text-2xl">Egg Health</div>
                <div className="text-white font-medium border-b">
                    <a
                        href="/articles"
                        className="bg-yellow-400 text-center text-gray-100 font-bold text-sm block p-5 px-z py-2 hover:bg-yellow-300 active:bg-blue-100 cursor-pointer rounded-md "
                    >
					Articles
					</a>
                </div>
			</div>
			<div
				className={clsx("flex items-center justify-center", {
					"h-[300px]": centerMenuOpen,
				})}
				onMouseLeave={() => setCenterMenuOpen(false)}
			>
                <div className="relative group">
                    <button
                            id="dropdown-button"
                            className="inline-flex w-[138px] relative justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-yellow-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-orange-500"
                            onClick={toggleCenterMenu}
                        >
                            <span className="h-2 text-white">My Records</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 ml-2 -mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    clipRule="evenodd"
                                    d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                />
                            </svg>
                    </button>
				    <div
						id="dropdown-menu"
						className={`${
							centerMenuOpen ? '' : 'hidden h-0'
						} flex flex-col gap-y-2 absolute left-0 my-2 rounded-md shadow-lg bg-yellow-500 ring-1 ring-black ring-opacity-5 p-1 space-y-1 max-h-[300px] overflow-hidden overflow-y-auto scrollbar-hide`}
					>
						<a
							href="/dashboard/record"
							className="bg-yellow-400 text-center text-gray-100 font-bold text-sm block p-5 px-z py-2 hover:bg-yellow-300 active:bg-blue-100 cursor-pointer rounded-md "
						>
							Daily Record
						</a>
						<hr />
                        <a
							href="/dashboard/graph/weight"
							className="bg-yellow-400 text-center text-gray-100 font-bold text-sm block p-5 px-z py-2 hover:bg-yellow-300 active:bg-blue-100 cursor-pointer rounded-md "
						>
							Graph
						</a>
						<hr />
                        <a
							href="/dashboard/target"
							className="bg-yellow-400 text-center text-gray-100 font-bold text-sm block p-5 px-z py-2 hover:bg-yellow-300 active:bg-blue-100 cursor-pointer rounded-md "
						>
							Target & Basic
						</a>
					</div>
                </div>
			</div>

			<div>
                {!account ? (
                    <div className="flex items-center space-x-2">
                        <button className="hover:text-yellow-600 transition"><a href="/signup">Signup</a></button>
                        <button className="hover:text-yellow-600 transition"><a href="/login">Signin</a></button>
                    </div>
                ) : (
                    <>
                        <button
                            type="button"
                            className="overflow-hidden flex justify-center items-center gap-x-2"
                            onClick={toggleRightMenu}
                        >
                            <span className="text-white font-medium border-b">{account.nickname}</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 ml-2 -mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    clipRule="evenodd"
                                    d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                />
                            </svg>
                        </button>
                        <div
                            className={`${
                                rightMenuOpen ? '' : 'hidden'
                            } absolute right-2 mt-1 w-48 divide-y divide-gray-200 rounded-md border border-gray-200 bg-white shadow-md`}
                            x-show="profileOpen"
                            x-transition="true"
                        >
                            <div className='flex items-center gap-x-2 p-2 '>
                                <IoSettingsSharp size={20}/>
                                <button  className="hover:text-yellow-600 transition">Settings</button>
                            </div>
                            <LogoutButton/>
                        </div>
                    </>
                )}
            </div>    
		</header>
	);
};

export default TopNav;