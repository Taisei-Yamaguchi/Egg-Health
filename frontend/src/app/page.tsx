import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowDown } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';

const Home = () => {
  return (
    <div className='mx-0 border'>
      <Head>
        <title>Wellness Mons - Diet and Exercise Management App</title>
        <meta name="description" content="Wellness Mons helps you manage your diet and exercise while growing your monster towards your goals. Available for free!" />
        <meta name="keywords" 
          content="wellness mons, wellness, diet management, meal management, exercise management, monster, health, fitness, diet, meal, exercise, PFC balance, 
          calorie management, fitness app, burned calories, calories burned, intake calories, calories intake, tdee calculator, bmr calculator, basal metabolic rate calculator, metabolic rate calculator, weight loss programs, lose weight fast, lose weight, weight loss tips, free workout apps, pfc, carbs, meal, exercise, monsters, healthy eating" 
        />
        <meta name="author" content="Wellness Mons" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.ico" />
      </Head>
      <header className="relative bg-gray-200 mt-14 max-md:mt-0">
        <img src="/landing-bg.png" alt="landing background" className="w-full opacity-30 max-md:h-[300px]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
          <h1 className="text-5xl max-md:text-3xl font-bold mb-4 text-shadow text-gray-600 flex items-center justify-center">
            <Image src="/icon.png" alt="Wellness Mons " width={60} height={40} className="mx-auto max-md:w-[40px] w-auto h-auto"/>
            Wellness Mons
          </h1>
          <p className="text-xl max-sm:text-lg mb-6 text-shadow text-black w-3/4 font-semibold border-b">Manage your diet and exercise while growing your monster towards your goals!</p>
          <div className="flex space-x-4">
            <Link href="/signup" legacyBehavior>
              <a className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transform transition-transform hover:scale-110">Sign Up (for free)</a>
            </Link>
            <Link href="/signin" legacyBehavior>
              <a className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transform transition-transform hover:scale-110">Sign In</a>
            </Link>
          </div>
        </div>
      </header>
      <main className="p-4 mt-0 mx-0 max-sm:p-1">
        {/* what is wellness mons */}
        <section id="intro" className="py-8 bg-white mb-10 text-center items-center flex justify-between max-md:flex-col">
          <div className='flex flex-col w-2/3 max-md:w-full items-center hover:scale-105'>
            <h2 className="text-4xl font-bold mb-4 max-md:text-2xl transform transition-transform hover:scale-105">What is Wellness Mons?</h2>
            <div className='p-4 flex w-4/5 items-center justify-between rounded-lg shadow-lg max-md:flex-col'>
              <p className='w-full text-2xl text-left p-2 max-md:text-lg'>
                <span className='font-bold text-4xl text-yellow-500 max-md:text-2xl'>Wellness Mons  </span>
                is a diet and exercise management app that helps you reach your goals by growing <span className='font-bold '>your monster</span>. 
                It's <span className='font-bold'>free to use</span>! 
              </p>
            </div>
          </div>
          <Image src="/dashboard-page.png" alt="Wellness Mons dashboard page" width={360} height={260} className="mx-auto mt-4 rounded-lg shadow-lg hover:scale-105 w-auto h-auto"/>
        </section>

        {/* monster grow system */}
        <section id="premium" className="mb-10 bg-yellow-50 py-10">
          <h2 className="text-2xl font-bold mb-4 text-center transform transition-transform hover:scale-105">Monster Growth !?</h2>
          <p className="text-center font-semibold">Have fun growing your monster and achieve your ideal body!</p>
          <div className="flex flex-wrap justify-center items-center space-x-4 mt-4">
            <div className="w-[800px] flex justify-between items-center max-sm:w-full rounded-lg shadow-lg">
              <div className='flex flex-col items-center'>
                <span className='text-xl font-bold'>Egg</span>
                <Image src="/monster-growth1.png" alt="Wellness Mons Monster Egg" width={200} height={200} className="rounded-lg max-md:w-[160px] w-auto h-auto"/>
              </div>
              <FaArrowRight className="mx-0 text-3xl text-gray-500"/>
              <div className='flex flex-col items-center max-sm:hidden'>
                <span className='text-xl font-bold'>Baby</span>
                <Image src="/monster-growth2.png" alt="Wellness Mons Monster Baby" width={200} height={200} className="rounded-lg max-md:w-[160px] w-auto h-auto"/>
              </div>
              <FaArrowRight className="mx-0 text-3xl text-gray-500 max-sm:hidden"/>
              <div className='flex flex-col items-center'>
                <span className='text-xl font-bold'>Adult</span>
                <Image src="/monster-growth3.png" alt="Wellness Mons Monster Adult" width={200} height={200} className="rounded-lg max-md:w-[160px] w-auto h-auto"/>
              </div>
            </div>
            <p className="mt-4 w-3/4 max-sm:w-full text-sm">
              Entering your meal, exercise, and weight data will help your monster grow. 
              Additionally, if your daily intake and burned calories are 
              <span className='font-semibold text-base'> close to your goals</span>,  
              your monster will grow even more. Keep up with your daily records and watch your 
              monster reach its full potential!
            </p>
          </div>
        </section>

        {/* app features */}
        <section id="features" className="mb-6">
          <div className="flex flex-row-reverse items-center space-x-2 max-md:flex-col">
            <div className='w-2/3 max-md:w-full flex flex-col items-center hover:scale-105'>
              <h2 className="text-2xl font-bold mb-4 text-center transform transition-transform hover:scale-105">App Features</h2>
              <div className="w-4/5 p-8 max-md:p-4 shadow-lg rounded-lg">
                <ul className="list-disc list-inside text-left max-md:text-sm">
                  <li>Intake calories calculated from meal data</li>
                  <li>Burned calories calculated from BMR, TEF, exercise calories and other calories</li>
                  <li>Accurate tracking of calorie balance and PFC balance</li>
                  <li>Grow your monster by keeping daily records</li>
                  <li>Visualize weight changes and calorie balance with graphs</li>
                  <li>Automatically calculates your Basal Metabolic Rate (BMR) based on your personal details, acting as a bmr calculator.</li>
                  <li>You can see  "how many calories should be burned a day" and "how many calories should you intake a day" based on your goal.</li>
                </ul>
              </div>
            </div>
            <div className='flex flex-col max-md:flex-row max-sm:flex-col space-x-4 mt-4 w-1/3 max-md:w-full items-center'>
              <Image src="/meal-page.png" alt="Wellness Mons meal page" width={300} height={200} className="rounded-lg shadow-lg hover:scale-105 w-auto h-auto"/>
              <Image src="/exercise-page.png" alt="Wellness Mons exercise page" width={300} height={200} className="rounded-lg shadow-lg hover:scale-105 w-auto h-auto"/>
            </div>
          </div>
        </section>

        {/* how to use */}
        <section id="how-to-use" className="mb-10 bg-white py-10 flex flex-col items-center mx-4">
          <h2 className="text-2xl font-bold mb-4 text-center transform transition-transform hover:scale-105">How to Use</h2>
          <div className="flex flex-col space-y-4 w-2/3 max-sm:w-full">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold">1. </span>
              <p className="text-lg">Sign up or sign in</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold">2. </span>
              <p className="text-lg">Enter your personal details and goals at first</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold">3. </span>
              <p className="text-lg">Record your meal, exercise, and weight data daily</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold">4. </span>
              <p className="text-lg">Watch your monster grow based on your records from two days ago!</p>
            </div>
          </div>
        </section>

        {/* premium plan */}
        <section id="premium" className="mb-10 bg-yellow-50 py-10">
          <h2 className="text-2xl font-bold mb-4 text-center transform transition-transform hover:scale-105">Premium Plan (under development)</h2>
          <p className="text-center">Premium features are currently under development! Please wait a little longer.</p>
          <p className="text-center">The premium features will be as follows (subject to change).</p>
          <p className="text-center mt-6">By subscribing to the <span className='font-semibold'>Premium Plan</span>, you can use the following features:</p>
          <div className="flex flex-wrap justify-center items-center space-x-4">
            <div className="w-full md:w-1/2 p-2">
              <ul className="list-disc list-inside text-left">
                <li>The "Often" feature allows you to register frequently used foods and activities</li>
                <li>The "Latest" feature allows you to reuse the latest records</li>
                <li>The "Set" feature allows you to pre-set meals and exercises, recording them with a single click</li>
              </ul>
              <p className="mt-4">By subscribing to the <span className='font-semibold'>Premium＋ Plan</span>, you can unlock and grow multiple monsters in addition to the features of the Premium Plan!</p>
            </div>
          </div>
        </section>

        {/* mobile app */}
        <section id="download" className="mb-10 text-center">
          <h2 className="text-2xl font-bold mb-4 transform transition-transform hover:scale-105">Download the App (under development)</h2>
          <p>iOS and Android versions are currently under development! Please wait a little longer.</p>
        </section>
      </main>
      <footer className="text-center py-6 bg-white border-t">
        <FaArrowDown className="mx-auto text-3xl text-orange-500 animate-bounce"/>
        <p className="text-lg font-semibold text-gray-600 my-4">Sign up now and start your journey towards better health!</p>
        <Link href="/signup" legacyBehavior>
          <a className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transform transition-transform hover:scale-110">Sign Up For Free</a>
        </Link>
      </footer>
    </div>
  );
};

export default Home;
