import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const OurServicesPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Our Services | Wellness Mons</title>
                <meta name="description" content="Discover the range of services offered by Wellness Mons, including our Wellness App, BMR Calculator, Exercise Calories Calculator, and BMI Calculator." />
                <meta name="keywords" content="Wellness Mons services, BMR calculator, exercise calories calculator, BMI calculator, fitness app, health services" />
                <meta name="author" content="Wellness Mons" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/icon.ico" />
            </Head>
            <div className="max-w-4xl mx-auto p-6 mt-14 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6">Our Services</h1>
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Wellness Mons App</h2>
                    <p className="mb-4">
                        Our flagship Wellness Mons App is designed to help you track your fitness journey with ease. Set goals, monitor your progress, and keep track of your diet and exercise routines. 
                    </p>
                    <Link href="/">
                        <span className="text-blue-500 underline">Learn more and sign up</span>
                    </Link>
                </div>
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">BMR Calculator</h2>
                    <p className="mb-4">
                        Calculate your Basal Metabolic Rate (BMR) to understand how many calories your body needs at rest. Our BMR Calculator is easy to use and provides accurate results based on your personal data.
                    </p>
                    <Link href="/bmr-calculator">
                        <span className="text-blue-500 underline">Try our BMR Calculator</span>
                    </Link>
                </div>
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Exercise Calories Calculator</h2>
                    <p className="mb-4">
                        Find out how many calories you burn during your activities. Our Exercise Calories Calculator uses your weight, workout duration, and selected exercise type to provide accurate calorie burn estimates.
                    </p>
                    <Link href="/exercise-calories-calculator">
                        <span className="text-blue-500 underline">Use the Exercise Calories Calculator</span>
                    </Link>
                </div>
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">BMI Calculator</h2>
                    <p className="mb-4">
                        Determine your Body Mass Index (BMI) to understand your body weight category. Our BMI Calculator is straightforward and provides precise results to help you maintain a healthy weight.
                    </p>
                    <Link href="/bmi-calculator">
                        <span className="text-blue-500 underline">Try our BMI Calculator</span>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default OurServicesPage;
