// BmrInfoModal.tsx

import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const BmrInfoModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    if (!isOpen) {
        return (
            <button 
                type="button"
                onClick={openModal}
                className="text-gray-700 text-xs hover:border-b border-color-black ml-4">
                What is BMR?
            </button>
        );
    }

    return (
        <>
            <button 
                type="button"
                onClick={openModal}
                className="text-gray-700 text-xs hover:border-b border-color-black ml-4">
                What is BMR?
            </button>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
                <div className="bg-white rounded-lg shadow-lg p-6 z-10 relative w-3/4">
                    <h1 className='text-xl font-bold m-4'>What is BMR?</h1>
                    <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500">
                    <FaTimes className="text-xl" />
                    </button>
                    <div className="text-xs text-gray-500">
                        <p>
                            BMR (Basal Metabolic Rate) is the amount of energy expended while at rest in a neutrally temperate environment, in the post-absorptive state (meaning that the digestive system is inactive, which requires about 12 hours of fasting in humans).
                        </p>
                        <p>
                            In this app, BMR is calculated based on your weight, height, sex, and birthday. You can also manually input your BMR if you know it.
                        </p>
                        <p>
                            Since it is difficult to completely track all calories burned, this app estimates other calories based on BMR and active level, and adds them to your daily consumed calories. This app represents the basal metabolic rate as BMR.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BmrInfoModal;
