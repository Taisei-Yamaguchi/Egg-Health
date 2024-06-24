import React from 'react';
import Head from 'next/head';
import BMICalculator from '@/components/other_service/BMICalculator';
import BmiTable from '@/components/other_service/BMITable';
import Ads from '@/components/main/Ads';

const BMIPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>BMI Calculator | Calculate Your Body Mass Index | Wellness Mons</title>
                <meta name="description" content="Use the Wellness Mons BMI Calculator to calculate your Body Mass Index. Enter your weight and height to get started and learn more about your health." />
                <meta name="keywords" content="BMI calculator, calculate BMI, Body Mass Index, health calculator, BMI, health, fitness" />
                <meta name="author" content="Wellness Mons" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/icon.ico" />
            </Head>
            <div className="min-h-full bg-gray-100 py-10 mt-8">
                <div className='flex items-center max-md:flex-col text-center'>
                    <div className='w-2/3 max-md:w-full '>
                        <h1 className="text-3xl font-bold mb-6">BMI Calculator</h1>
                        <p className="text-lg mb-6 max-w-xl text-left mx-10">Calculate your Body Mass Index (BMI) using our simple and effective BMI Calculator. Track your health and fitness goals with Wellness Mons.</p>
                        <BMICalculator />
                        <BmiTable/>
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
                        <div className='h-[180px] w-[300px]'>
                            <Ads/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BMIPage;
