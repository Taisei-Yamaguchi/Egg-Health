'use client';

import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { getCurrentDateFormatted } from '@/helper/getTodayDate';
import { FaTachometerAlt, FaRegCalendarAlt, FaChartLine, FaBullseye } from 'react-icons/fa';
import { GiMonsterGrasp } from 'react-icons/gi'; // Import the monster icon
import { setLicense } from '@/store/slices/license.slice';
import { fetchLicenseType } from '@/backend_api/license/fetchLicenseType';
import { useAppDispatch } from '@/store';
import { useEffect, useState } from 'react';
import { setToast, resetToast } from '@/store/slices/toast.slice';

const DashboardNav: React.FC = () => {
    const dispatch = useAppDispatch()
    const pathname = usePathname();
    const currentDate = getCurrentDateFormatted();
    const [licenseType, setLicenseType] = useState<'free'|'premium'|'premium_plus' |null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchLicenseType();
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: 'error' }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                } else if ('message' in response) {
                    setLicenseType(response.license_type);
                    dispatch(setLicense(response.license_type));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                dispatch(setToast({ message: 'An error occurred while fetching license type', type: 'error' }));
                setTimeout(() => dispatch(resetToast()), 3000);
            }
        };
        fetchData();
    }, [dispatch]);

    return (
        <nav className="bg-yellow-200 shadow-md z-40">
            <div className="flex justify-between items-center p-2 max-sm:justify-center ">
                {licenseType && (
                    <div className="flex items-center space-x-2 ">
                        <span className={clsx(
                            'px-2 py-1 rounded-full  font-bold text-sm shadow-lg',
                            licenseType === 'free' && 'text-white bg-gradient-to-r from-orange-600 to-rose-800',
                            licenseType === 'premium' && 'text-black bg-gradient-to-r from-gray-200 to-gray-400',
                            licenseType === 'premium_plus' && 'text-black bg-gradient-to-r from-yellow-400 to-yellow-600'
                        )}>
                            {licenseType === 'free' && 'Free'}
                            {licenseType === 'premium' && 'Premium'}
                            {licenseType === 'premium_plus' && 'Premium+'}
                        </span>
                        {licenseType === 'free' &&
                        <a href="/dashboard/premium" className="text-blue-500 hover:underline text-sm">
                            See Premium Plans
                        </a>}
                    </div>
                )}
            </div>
            <ul className="flex justify-around py-4 max-sm:flex-col max-sm:mx-2 items-center">
                <li className="group relative my-2">
                    <a href="/dashboard" className={clsx("flex items-center space-x-2 text-gray-700 hover:text-gray-500 transition-colors duration-300", { "font-bold": pathname === "/dashboard" })}>
                        <FaTachometerAlt className="text-xl" />
                        <span>Dashboard</span>
                    </a>
                    <div className={clsx("absolute left-0 right-0 mx-auto mt-1 h-1 bg-yellow-500 transition-all duration-300", {
                        "w-full": pathname === "/dashboard",
                        "w-0 group-hover:w-full": pathname !== "/dashboard"
                    })}></div>
                </li>
                <li className="group relative my-2">
                    <a href={`/dashboard/record/${currentDate}`} className={clsx("flex items-center space-x-2 text-gray-700 hover:text-gray-500 transition-colors duration-300", { "font-bold": pathname.startsWith("/dashboard/record/") || pathname.startsWith("/dashboard/meal/") || pathname.startsWith("/dashboard/exercise/") })}>
                        <FaRegCalendarAlt className="text-xl" />
                        <span>Daily Record</span>
                    </a>
                    <div className={clsx("absolute left-0 right-0 mx-auto mt-1 h-1 bg-yellow-500 transition-all duration-300", {
                        "w-full": pathname.startsWith("/dashboard/record/") || pathname.startsWith("/dashboard/meal/") || pathname.startsWith("/dashboard/exercise/"),
                        "w-0 group-hover:w-full": !(pathname.startsWith("/dashboard/record/") || pathname.startsWith("/dashboard/meal/") || pathname.startsWith("/dashboard/exercise/"))
                    })}></div>
                </li>
                <li className="group relative my-2">
                    <a href="/dashboard/graph/weight" className={clsx("flex items-center space-x-2 text-gray-700 hover:text-gray-500 transition-colors duration-300", { "font-bold": pathname.startsWith("/dashboard/graph/") })}>
                        <FaChartLine className="text-xl" />
                        <span>Graph</span>
                    </a>
                    <div className={clsx("absolute left-0 right-0 mx-auto mt-1 h-1 bg-yellow-500 transition-all duration-300", {
                        "w-full": pathname.startsWith("/dashboard/graph/"),
                        "w-0 group-hover:w-full": !pathname.startsWith("/dashboard/graph/")
                    })}></div>
                </li>
                <li className="group relative my-2">
                    <a href="/dashboard/personal-details" className={clsx("flex items-center space-x-2 text-gray-700 hover:text-gray-500 transition-colors duration-300", { "font-bold": pathname === "/dashboard/personal-details" || pathname === "/dashboard/goal" || pathname === "/dashboard/goal/confirm" })}>
                        <FaBullseye className="text-xl" />
                        <span>Goal Settings</span>
                    </a>
                    <div className={clsx("absolute left-0 right-0 mx-auto mt-1 h-1 bg-yellow-500 transition-all duration-300", {
                        "w-full": pathname === "/dashboard/personal-details" || pathname === "/dashboard/goal" || pathname === "/dashboard/goal/confirm",
                        "w-0 group-hover:w-full": !(pathname === "/dashboard/personal-details" || pathname === "/dashboard/goal" || pathname === "/dashboard/goal/confirm")
                    })}></div>
                </li>
                <li className="group relative my-2">
                    <a href="/dashboard/monsters" className={clsx("flex items-center space-x-2 text-gray-700 hover:text-gray-500 transition-colors duration-300", { "font-bold": pathname === "/dashboard/monsters" })}>
                        <GiMonsterGrasp className="text-xl" />
                        <span>Monsters</span>
                    </a>
                    <div className={clsx("absolute left-0 right-0 mx-auto mt-1 h-1 bg-yellow-500 transition-all duration-300", {
                        "w-full": pathname === "/dashboard/monsters",
                        "w-0 group-hover:w-full": pathname !== "/dashboard/monsters"
                    })}></div>
                </li>
            </ul>
        </nav>
    );
};

export default DashboardNav;
