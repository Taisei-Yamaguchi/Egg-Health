import { FC } from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'tailwindcss/tailwind.css'
import { Providers } from '@/store';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Egg Health",
  description: "Grow yourself and pet on diet.",
};

type Props = {
	children: React.ReactNode;
};

const RootLayout: FC<Props> = ({ children }) => {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<main>
						{children}
					</main>
				</Providers>
			</body>
		</html>
	);
};
export default RootLayout;
