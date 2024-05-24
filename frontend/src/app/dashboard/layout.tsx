import { FC, ReactNode } from 'react';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: "Dashboard",
    description: "This is the dashboard for Egg Health.",
};

const DashboardLayout: FC<{children: ReactNode}> = async ({ children }) => {

  //* Get the token from the cookies
    const cookiesStore = cookies();
    const token = cookiesStore.get('token');
    const id = cookiesStore.get('id')?.toString(); // Convert to string
    const nickname = cookiesStore.get('nickname')?.toString(); // Convert to string
    const username = cookiesStore.get('username')?.toString(); 

    if (!id || !nickname || !username || !token) {
        return redirect('/login')
    }
    return (
        <div className="mt-10">
            {children}
        </div>
    );
};

export default DashboardLayout;
