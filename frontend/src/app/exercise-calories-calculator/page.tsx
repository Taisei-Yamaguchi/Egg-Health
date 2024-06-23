import React from 'react';
import Head from 'next/head';
import DefaultWorkoutByType from '@/components/exercise/DefaultWorkoutBytype';
import SelectWorkoutCalcList from '@/components/other_service/SelectWorkoutCalcList';
import ExerciseCalorieCalculator from '@/components/other_service/ExerciseCaloriesCalculator';
import Ads from '@/components/main/Ads';

const ExerciseCalculatorPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Exercise Calorie Calculator | Wellness Mons</title>
                <meta name="description" content="Calculate the calories burned during exercise using the Wellness Mons Exercise Calorie Calculator. Enter your weight, duration, and select your activity to get started." />
                <meta name="keywords" content="Exercise calorie calculator, calories burned, workout, fitness calculator, Wellness Mons, activity" />
                <meta name="author" content="Wellness Mons" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/icon.ico" />
            </Head>
            <div className="min-h-full bg-gray-100 py-10 mt-14 px-10">
            <h1 className="text-3xl font-bold mb-6">Exercise Calories Calculator</h1>
                <div className='flex items-center max-md:flex-col'>
                
                    <div className='w-2/3 max-md:w-full mx-4'>
                        <div className='flex flex-col text-left mb-4 w-3/4 max-sm:w-full'>   
                            <h2 className='text-base font-semibold mb-2'>Step1. Search for Activity</h2>
                            <DefaultWorkoutByType />
                        </div>
                        <div className='flex flex-col text-left mb-4 w-3/4 max-sm:w-full'>   
                            <h2 className='text-base font-semibold mb-2'>Step2. Select Activity</h2>
                            <SelectWorkoutCalcList />
                        </div>
                        <div className='flex flex-col text-left mb-4 w-3/4 max-sm:w-full'>   
                            <h2 className='text-base font-semibold mb-2'>Step3. Input these form</h2>
                            <ExerciseCalorieCalculator />
                        </div>
                        <div className="mt-6 text-center">
                            <p className="text-lg">Want to achieve your fitness goals faster?</p>
                            <a href="/signup" className="bg-blue-500 text-white p-2 rounded mt-4 inline-block">
                                Sign Up for Wellness Mons
                            </a>
                            <p className="mt-4 text-lg">Want to know more about our services?</p>
                            <a href="/" className="bg-green-500 text-white p-2 rounded mt-4 inline-block">
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

export default ExerciseCalculatorPage;
