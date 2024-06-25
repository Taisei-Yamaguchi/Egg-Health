import React from 'react';

const FAQPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 mt-14">
            <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>

            <h2 className="text-2xl font-semibold mb-4">Q. How can I create an account?</h2>
            <p className="mb-4">A. To create an account, select "Sign Up" on the home screen, and fill in the required information. You can also sign up using your Google account.</p>

            <h2 className="text-2xl font-semibold mb-4">Q. How can I monitor Monster Growth?</h2>
            <p className="mb-4">
                A. You can check your monster's growth on the <a href="/dashboard" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Dashboard</a> and <a href="/dashboard/monsters" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Monsters</a> pages. The growth is reflected based on your daily food and exercise data. If you have set a goal, your monster will grow even more significantly if your actual daily intake calories and burned calories are close to the goal values.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Q. What should I do if I can't access my data due to a token mismatch?</h2>
            <p className="mb-4 flex flex-col">
                A. This issue can occur if you have logged out from one of your devices or browsers, causing the token on other devices or browsers to become invalid. In such cases, please try the following steps:
                <span className="list-decimal list-inside flex  flex-col">
                    <span className='font-semibold ml-4'>・Reload the page.</span>
                    <span className='font-semibold ml-4'>・Log out and log back in.</span>
                </span>
                If the issue persists, please contact our support team for further assistance.
            </p>
            <h2 className="text-2xl font-semibold mb-4">Q. How can I enter Meal and Exercise Data?</h2>
            <p className="mb-4">
                A. You can enter food and exercise data from the "Daily Record" section in the dashboard navigation. From there, you can enter your weight and body fat percentage, and navigate to the breakfast, lunch, dinner, snack, and exercise pages to input details of your intake and activities. The calories and nutrients will be calculated automatically.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Q. Is entering goals and personal details mandatory?</h2>
            <p className="mb-4">
                A. No, entering goals and personal details is not mandatory. However, not setting these may limit some of the services.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Q. Where can I set my goals and personal details?</h2>
            <p className="mb-4">
                A. You can set your goals and personal details from the "Goal Settings" page in the dashboard navigation.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Q. Can I input data for previous days?</h2>
            <p className="mb-4">
                A. Yes, you can input data for previous days. However, this data may not reflect in the monster's growth. Additionally, you cannot input data for more than two days into the future.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Q. What should I do if I want to reactivate my deactivated account?</h2>
            <p className="mb-4">
                A. If you want to reactivate your deactivated account, please contact our customer service team through the <a href="/contact" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Contact</a> page. Due to the rare nature of this situation, our support team will handle it manually.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Q. Additional Information</h2>
            <p className="mb-4">
                A. For more details, please review our <a href="/terms" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>, <a href="/privacy-policy" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>, <a href="/cookie-policy" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Cookie Policy</a> and <a href="/contact" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Contact</a>.
            </p>
        </div>
    );
};

export default FAQPage;
