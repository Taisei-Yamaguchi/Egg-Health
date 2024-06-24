import { FC } from 'react';
import type { Metadata } from "next";
import "./globals.css";
import 'tailwindcss/tailwind.css'
import { Providers } from '@/store';
import ToastNotification from '@/components/toast/toastNotification';
import TopNav from '@/components/navigation/topNav';
import { cookies } from 'next/headers';
import { Montserrat } from 'next/font/google';
import Footer from '@/components/main/Footer';
import AdBanner from '@/components/main/AdBanner';

// const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Wellness Mons",
  description: "Wellness Mons helps you manage your diet and exercise while growing your monster towards your goals. Available for free!",
};

type Props = {
	children: React.ReactNode;
};

const RootLayout: FC<Props> = ({ children }) => {
  //* Get the token, account from the cookies
  const cookiesStore = cookies();

	return (
		<html lang="en">
			<body className={montserrat.className}>
				<Providers>
          <ToastNotification>
            <main>
              <TopNav />
              {children}
            </main>
          </ToastNotification>
				</Providers>
        <Footer/>
        <AdBanner/>
			</body>
		</html>
	);
};
export default RootLayout;
