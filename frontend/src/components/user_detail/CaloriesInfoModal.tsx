// CaloriesInfoModal.tsx

import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const CaloriesInfoModal: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    if (!isModalOpen) {
        return (
            <button 
                type="button"
                onClick={openModal}
                className="text-gray-700 text-xs hover:border-b border-color-black ml-4">
                How do we handle calories?
            </button>
        );
    }

    return (
        <>
            <button 
                type="button"
                onClick={openModal}
                className="text-gray-700 text-xs hover:border-b border-color-black ml-4">
                How do we handle calories?
            </button>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
                <div className="bg-white rounded-lg shadow-lg p-6 z-10 relative w-3/4">
                    <h1 className='text-xl font-bold m-4'>How do we handle calories?</h1>
                    <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500">
                        <FaTimes className="text-xl" />
                    </button>
                    <div className="text-xs text-gray-500">
                        <p>
                            1. Calorie intake is calculated from your meal data.
                        </p>
                        <p>
                            2. Calorie burn is the sum of BMR (Basal Metabolic Rate), other calories (calculated from BMR and active level), TEF (Thermic Effect of Food), and exercise calories (calories burned from daily exercise records).
                        </p>
                        <p>
                            3. Try to bring these values closer to your goals!
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CaloriesInfoModal;
