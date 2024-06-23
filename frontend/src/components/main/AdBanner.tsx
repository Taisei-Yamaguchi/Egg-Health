"use client"
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const AdBanner = () => {
    const currentPath = usePathname()

    const shouldShowAd = ['/bmi-calculator','/exercise-calories-calculator', '/bmr-calculator','/articles'].includes(currentPath) || currentPath.startsWith('/articles/');

    return (
        <div className={clsx('fixed bottom-0 h-[100px] bg-red-50 z-50 w-screen', {
        'hidden': !shouldShowAd,
        })}>
        広告
        </div>
    );
};

export default AdBanner;
