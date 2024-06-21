'use client';

import { useAppSelector } from '@/store';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IoSettingsSharp } from "react-icons/io5";
import { setAuth } from '@/store/slices/auth.slice';
import { useCookies } from 'react-cookie';
import LogoutButton from '../auth/logoutButton';
import { setLicense } from '@/store/slices/license.slice';

const TopNav: React.FC = () => {
	const dispatch = useDispatch();
    const [cookies] = useCookies(['id', 'nickname', 'username','license']);

	const { account } = useAppSelector((state) => state.auth);
	const [rightMenuOpen, setRightMenuOpen] = useState(false);

    useEffect(() => {
        const id = cookies.id;
        const nickname = cookies.nickname;
        const username = cookies.username;
        const license = cookies.license;

        const cookie_account = (id && nickname && username) 
            ? { id: id, nickname: nickname, username: username } 
            : null;
        if (cookie_account) {
            dispatch(setAuth(cookie_account));
        }
        if(license){
            dispatch(setLicense(license))
        }
    }, []);

	const toggleRightMenu = () => {
		setRightMenuOpen(!rightMenuOpen);
	};


	return (
		<header className="sm:fixed pt-2 top-0 left-0 right-0 z-50 h-14 flex w-full items-center justify-between bg-yellow-400 p-2 max-sm:flex-col max-sm:h-40">
			<div className="flex items-center space-x-2 max-sm:flex-col">
				<div className="font-bold text-white text-2xl">
                    <a
					href="/dashboard" className='flex items-center justify-center'
						><img src='/icon.png' alt='monster health logo' className='w-[40px]'/>
                        <img src='/wellness-mons.png' alt='wellness mons logo' className=' h-[30px] w-[auto] rounded-lg'/>    
                    </a>
                </div>
                <div className="text-white font-medium">
                    <a
                        href="/articles"
                        className="border-b bg-yellow-400 text-center text-gray-100 font-bold text-sm block p-5 px-z py-2 hover:bg-yellow-500 active:bg-blue-100 cursor-pointer rounded-md "
                    >
					Articles
					</a>
                </div>
			</div>

			<div>
                {!account ? (
                    <div className="flex items-center space-x-2 text-white font-medium ">
                        <button className="border-b bg-yellow-400 text-center text-gray-100 font-bold text-sm block p-5 px-z py-2 hover:bg-yellow-500 active:bg-blue-100 cursor-pointer rounded-md">
                            <a href="/signup">Signup (for free)</a>
                        </button>
                        <button className="border-b bg-yellow-400 text-center text-gray-100 font-bold text-sm block p-5 px-z py-2 hover:bg-yellow-500 active:bg-blue-100 cursor-pointer rounded-md">
                            <a href="/signin">Signin</a>
                        </button>
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
                            } absolute right-2 mt-1 w-48 divide-y divide-gray-200 rounded-md border border-gray-200 bg-white shadow-md z-50`}
                            x-show="profileOpen"
                            x-transition="true"
                        >
                            <div className='flex items-center gap-x-2 p-2 '>
                                <IoSettingsSharp size={20}/>
                                <a href='/dashboard/settings/'>
                                <button  className="hover:text-yellow-600 transition">Settings</button>
                                </a>
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
