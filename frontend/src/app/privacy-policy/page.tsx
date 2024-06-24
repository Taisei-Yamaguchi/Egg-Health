import React from 'react';

const PrivacyPolicy: React.FC = () => {
  const lastUpdated = 'June 20, 2024'; // 手動で更新日を入力

    return (
        <div className="max-w-4xl mx-auto p-6 mt-14">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-600 mb-8">Last updated: {lastUpdated}</p>

        <p className="mb-4">Welcome to Wellness Mons!</p>

        <p className="mb-4">
            At Wellness Mons, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our app and services. By accessing or using Wellness Mons, you agree to the terms of this Privacy Policy.
        </p>

        <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
        <p className="mb-4">
            When you use our app, we collect the following types of information:
        </p>
        <ul className="list-disc list-inside mb-4">
            <li>Email</li>
            <li>Nickname</li>
            <li>Body information (e.g., height, weight, body fat percentage)</li>
            <li>Diet information</li>
            <li>Exercise information</li>
            <li>Other information you provide through input forms within the app</li>
        </ul>
        <p className="mb-4">
            We will not disclose this information to third parties without your explicit consent, except as outlined in this Privacy Policy.
        </p>

        <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">
            We use the information you provide for the following purposes:
        </p>
        <ul className="list-disc list-inside mb-4">
            <li>To register and authenticate users</li>
            <li>To calculate usage fees and provide paid services</li>
            <li>To offer services such as goal setting, recording, and graph generation based on your body information, diet, and exercise details</li>
            <li>To respond to inquiries and provide customer support</li>
            <li>To charge fees for paid services</li>
            <li>To conduct research and marketing activities, ensuring the information is anonymized and processed statistically</li>
            <li>To address any violations of our terms, rules, and policies</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">3. Voluntary Provision and Accuracy of Information</h2>
        <p className="mb-4">
            Providing accurate and up-to-date personal information is essential. If you do not provide the required information, you may not be able to use certain features of our services. You are responsible for ensuring the accuracy and currency of the information you provide.
        </p>

        <h2 className="text-2xl font-semibold mb-4">4. Third-Party Disclosure</h2>
        <p className="mb-4">
            We do not disclose your personal information to third parties without your prior consent, except in the following cases:
        </p>
        <ul className="list-disc list-inside mb-4">
            <li>If we outsource all or part of the handling of personal information within the scope necessary to achieve the purpose of use</li>
            <li>If personal information is provided due to a merger or other business succession</li>
            <li>If cooperation with national or local government agencies is required by law, and obtaining user consent may hinder the execution of such operations</li>
            <li>Other cases permitted by the Personal Information Protection Law or other laws and regulations</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">5. User Consent</h2>
        <p className="mb-4">
            By using our app, website, and registering as a member, you agree to this Privacy Policy.
        </p>
        <h2 className="text-2xl font-semibold mb-4">6. Changes to the Privacy Policy</h2>
        <p className="mb-4">
            We regularly review and improve our handling of user information to ensure ongoing improvements. We may update this Privacy Policy as necessary. When changes are made, we will notify users through the app, email, or our website. By continuing to use the service after such changes, you agree to the revised Privacy Policy.
        </p>

        

        <p className="mb-4">If you have any questions about this Privacy Policy, please contact us.</p>
        </div>
    );
};

export default PrivacyPolicy;
