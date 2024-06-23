import React from 'react';
import Head from 'next/head';

const ArticlesPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Articles | Wellness Mons</title>
                <meta name="description" content="Discover insightful articles on diet, exercise, nutrition, and health. Stay tuned for upcoming articles from Wellness Mons." />
                <meta name="keywords" content="Wellness Mons articles, diet articles, exercise articles, nutrition articles, health articles" />
                <meta name="author" content="Wellness Mons" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/icon.ico" />
            </Head>
            <div className="max-w-4xl mx-auto p-6 mt-14 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6">Our Articles</h1>
                <p className="text-lg mb-6">
                    At Wellness Mons, we are committed to providing valuable insights and information on various topics related to diet, exercise, nutrition, and health. 
                    Although we do not have any completed articles at this moment, we are working diligently to bring you well-researched and engaging content soon.
                </p>
                <p className="text-lg mb-6">
                    Please stay tuned and check back often as we will be posting articles regularly. We appreciate your patience and look forward to sharing our knowledge and tips to help you achieve your wellness goals.
                </p>
                <div className="text-center mt-10">
                    <p className="text-lg">
                        Exciting content is on the way! Stay tuned for our first articles.
                    </p>
                </div>
            </div>
        </>
    );
};

export default ArticlesPage;
