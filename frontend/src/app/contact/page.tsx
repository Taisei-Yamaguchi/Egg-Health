import React from 'react';

const ContactPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 mt-14">
            <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
            <p className="mb-4">
                For any inquiries, please contact us at <a href="mailto:wellnessmons.test@gmail.com" className="text-blue-500 underline">wellnessmons.test@gmail.com</a>.
            </p>
        </div>
    );
};

export default ContactPage;
