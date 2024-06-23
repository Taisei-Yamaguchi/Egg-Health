import React from 'react';
import Head from 'next/head';
import BMRCalculator from '@/components/other_service/BMRCalculator';
import Ads from '@/components/main/Ads';

const BMRPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>BMR Calculator | Wellness Mons</title>
                <meta name="description" content="Calculate your Basal Metabolic Rate (BMR) using the Wellness Mons BMR Calculator. Enter your weight, height, age, and sex to get started." />
                <meta name="keywords" content="BMR calculator, basal metabolic rate, health calculator" />
                <meta name="author" content="Wellness Mons" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/icon.ico" />
            </Head>
            <div className="min-h-full bg-gray-100 py-10 mt-8">
                <div className='flex items-center max-md:flex-col text-center'>
                    <div className='w-2/3 max-md:w-full '>
                        <h1 className="text-3xl font-bold mb-6">BMR Calculator</h1>
                        <BMRCalculator />
                        <div className="mt-6 text-center">
                            <p className="text-lg">Want to achieve your fitness goals faster?</p>
                            <a href="/signup" className="bg-blue-500 text-white p-2 rounded mt-4 inline-block hover:scale-105">
                                Sign Up for Wellness Mons
                            </a>
                            <p className="mt-4 text-lg">Want to know more about our services?</p>
                            <a href="/" className="bg-green-500 text-white p-2 rounded mt-4 inline-block hover:scale-105">
                                Visit Our Landing Page
                            </a>
                        </div>
                    </div>
                    <div className='w-1/6 flex flex-col max-md:w-full max-md:flex-row max-md:flex-wrap'>
                        <div className='h-[180px] w-[300px]'>
                            <Ads/>
                        </div>
                        <div className='h-[180px] w-[300px]'>
                            <Ads/>
                        </div>
                        <div className='h-[180px] w-[300px]'>
                            <Ads/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BMRPage;
