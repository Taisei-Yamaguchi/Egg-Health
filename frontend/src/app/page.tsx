import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowDown } from 'react-icons/fa';

const Home = () => {
  return (
    <div className='mx-0 border'>
      <Head>
        <title>Wellness Mons - Diet and Exercise Management App</title>
        <meta name="description" content="Wellness Mons helps you manage your diet and exercise while growing your monster towards your goals. Available for free!" />
        <meta name="keywords" content="diet management, exercise management, monster, health, fitness, diet, PFC balance, calorie management" />
        <meta name="author" content="Wellness Mons" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.ico" />
      </Head>
      <header className="relative bg-gray-200 mt-14 max-md:mt-0">
        <img src="/landing-bg.png" alt="landing background" className="w-full opacity-30 max-md:h-[300px]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
          <h1 className="text-4xl font-bold mb-4 text-shadow text-gray-600">Wellness Mons</h1>
          <p className="text-xl mb-6 text-shadow text-black w-3/4 ">Manage your diet and exercise while growing your monster towards your goals!</p>
          <div className="flex space-x-4">
            <Link href="/signup" legacyBehavior>
              <a className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">Sign Up (for free)</a>
            </Link>
            <Link href="/login" legacyBehavior>
              <a className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Sign In</a>
            </Link>
          </div>
        </div>
      </header>
      <main className="p-4 mt-0 mx-0">
        <section id="intro" className="py-8 bg-yellow-50 mb-10 text-center items-center flex justify-between max-md:flex-col">
          <div className='flex flex-col w-1/2 max-md:w-full items-center hover:scale-105'>
            <h2 className="text-2xl font-bold mb-4">What is Wellness Mons?</h2>
            <div className='p-4 flex w-4/5 items-center justify-between rounded-lg shadow-lg max-md:flex-col'>
              <p className='w-4/5 '>
                Wellness Mons is a diet and exercise management app that helps you reach your goals by growing your monster. It's free to use, and by entering basic information and goals, you can accurately track your daily calorie balance and PFC balance, comparing it with your goals.
              </p>
              <Image src="/icon.png" alt="Wellness Mons " width={100} height={70} className="mx-auto mt-4"/>
            </div>
          </div>
          <Image src="/dashboard-page.png" alt="Wellness Mons dashboard page" width={360} height={260} className="mx-auto mt-4 rounded-lg shadow-lg hover:scale-105"/>
        </section>
        <section id="features" className="mb-10">
          <div className="flex flex-row-reverse items-center space-x-4 max-md:flex-col">
            <div className='w-1/2 max-md:w-full p-4 flex flex-col items-center hover:scale-105'>
              <h2 className="text-2xl font-bold mb-4 text-center">App Features</h2>
              <div className="w-4/5 p-4 shadow-lg rounded-lg">
                <ul className="list-disc list-inside text-left">
                  <li>Calorie intake calculated from meal data</li>
                  <li>Calorie consumption calculated from BMR, other calories, TEF, and exercise calories</li>
                  <li>Accurate tracking of calorie balance and PFC balance</li>
                  <li>Grow your monster by keeping daily records</li>
                  <li>Visualize weight changes and calorie balance with graphs</li>
                </ul>
              </div>
            </div>
            <div className='flex max-lg:flex-col max-md:flex-row max-sm:flex-col justify-center space-x-4 mt-4 w-1/2 max-md:w-full items-center'>
              <div className="w-full p-1 self-start">
                <Image src="/meal-page.png" alt="Wellness Mons meal page" width={300} height={200} className="rounded-lg shadow-lg hover:scale-105"/>
              </div>
              <div className="w-full p-1 self-end">
                <Image src="/exercise-page.png" alt="Wellness Mons exercise page" width={300} height={200} className="rounded-lg shadow-lg hover:scale-105"/>
              </div>
            </div>
          </div>
        </section>
        <section id="premium" className="mb-10 bg-yellow-50 py-10">
          <h2 className="text-2xl font-bold mb-4 text-center">Premium Plan</h2>
          <p className="text-center ">
            By subscribing to the Premium Plan, you can use the following features:
          </p>
          <div className="flex flex-wrap justify-center items-center space-x-4">
            <div className="w-full md:w-1/2 p-2">
              <ul className="list-disc list-inside text-left">
                <li>The "often" feature allows you to register frequently used foods and workouts</li>
                <li>The "latest" feature allows you to reuse the latest records</li>
                <li>The "Set" feature allows you to pre-set meals and exercises, recording them with a single click</li>
              </ul>
              <p className="mt-4">
                By subscribing to the Premium +α Plan, you can unlock and grow multiple monsters in addition to the features of the Premium Plan!
              </p>
            </div>
          </div>
        </section>
        <section id="download" className="mb-10 text-center">
          <h2 className="text-2xl font-bold mb-4">Download the App</h2>
          <p>
            iOS and Android versions are currently under development! Please wait a little longer.
          </p>
        </section>
      </main>
      <footer className="text-center py-6 bg-white border-t">
        <FaArrowDown className="mx-auto text-3xl text-orange-500" />
        <p className="text-lg font-semibold text-gray-600 my-4">Sign up now and start your journey towards better health!</p>
        <Link href="/signup" legacyBehavior>
          <a className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">Sign Up (for free)</a>
        </Link>
      </footer>
    </div>
  );
};

export default Home;
