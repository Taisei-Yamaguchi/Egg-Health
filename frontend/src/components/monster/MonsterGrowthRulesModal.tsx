// MonsterGrowthRulesModal.tsx

import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const MonsterGrowthRulesModal: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <button 
                type="button"
                onClick={openModal}
                className="border-b text-purple-600 hover:text-purple-400 text-xs">
                * Monster Growth Rules
            </button>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
                    <div className="bg-white rounded-lg shadow-lg p-6 z-10 relative w-3/4">
                        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500">
                            <FaTimes className="text-xl" />
                        </button>
                        <h1 className='text-xl font-bold m-4'>Monster Growth Rules</h1>
                        <div className="text-base text-gray-500">
                            <ul>
                                <li>1. Monsters grow based on your daily inputs.</li>
                                <li>2. The closer your records are to your goal intake and goal burn calories, the more your monster will grow.</li>
                                <li>3. The currently selected monster will grow with your progress.</li>
                                <li>4. If you want to grow different monsters, unlock and select new ones from the monster list (Premium+ plan).</li>
                                <li>5. Each monster goes through 6 growth stages.</li>
                                <li>6. Once a monster reaches its maximum level, you can freely change its appearance to any of its growth stages on the dashboard!</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MonsterGrowthRulesModal;
