import React from 'react';

const CookiePolicy: React.FC = () => {
  const lastUpdated = 'June 20, 2024'; // 手動で更新日を入力

    return (
        <div className="max-w-4xl mx-auto p-6 mt-14">
        <h1 className="text-3xl font-bold mb-4">Cookie Policy</h1>
        <p className="text-sm text-gray-600 mb-8">Last updated: {lastUpdated}</p>

        <h2 className="text-2xl font-semibold mb-4">1. What are Cookies?</h2>
        <p className="mb-4">
            Cookies are small text files that are stored on your device (computer, smartphone, or other devices) when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
        </p>

        <h2 className="text-2xl font-semibold mb-4">2. Purpose of Using Cookies</h2>
        <p className="mb-4">
            We use cookies to store information such as your nickname, email, authentication token, and other necessary information to ensure you can use our app comfortably. These cookies are stored during sign-up or sign-in and are deleted when you log out.
        </p>

        <h2 className="text-2xl font-semibold mb-4">3. User Responsibility</h2>
        <p className="mb-4">
            We are not responsible for any disadvantages or damages that may occur if the information stored in cookies is leaked due to user mistakes.
        </p>

        <h2 className="text-2xl font-semibold mb-4">4. User Consent</h2>
        <p className="mb-4">
            By using our app, you consent to the use of cookies in accordance with this Cookie Policy. If you do not agree to the use of cookies, you may disable cookies by adjusting your browser settings. Please note that disabling cookies may affect the functionality of our app.
        </p>

        <h2 className="text-2xl font-semibold mb-4">5. Managing and Deleting Cookies</h2>
        <p className="mb-4">
            Most web browsers allow some control of cookies through the browser settings. You can set your browser to refuse cookies or delete certain cookies. The methods for doing so vary from browser to browser, so please refer to your browser’s help section for instructions. Please note that if you block cookies, some features of our app may not function properly.
        </p>

        <h2 className="text-2xl font-semibold mb-4">6. Changes to the Cookie Policy</h2>
        <p className="mb-4">
            We regularly review and improve our use of cookies to ensure ongoing improvements. We may update this Cookie Policy as necessary. When changes are made, we will notify users through the app ,email or our website. By continuing to use the service after such changes, you agree to the revised Cookie Policy.
        </p>

        <p className="mb-4">If you have any questions about this Cookie Policy, please contact us.</p>
        </div>
    );
};

export default CookiePolicy;
