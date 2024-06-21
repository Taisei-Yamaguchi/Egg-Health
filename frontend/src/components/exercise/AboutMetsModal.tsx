'use client';

import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const AboutMets = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div>
            <button onClick={openModal} className="text-blue-500 hover:text-blue-700 underline">
                What is METs?
            </button>
            {modalIsOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                            <FaTimes className="text-xl" />
                        </button>
                        <h2 className="text-xl font-bold mb-4">About METs</h2>
                        <p className="mb-4">
                            METs (Metabolic Equivalents) is a measure of the energy cost of physical activities.
                        </p>
                        <h3 className="text-lg font-semibold mb-2">Calculation Formula:</h3>
                        <p className="mb-4">
                            The formula to calculate burned calories  is:
                            <br />
                            <code className="block bg-gray-100 p-2 rounded mt-2">
                                Burned Calories= MET value × weight (kg) × time (hours) × 1.05
                            </code>
                        </p>
                        <h3 className="text-lg font-semibold mb-2">Example:</h3>
                        <p className="mb-4">
                            If a person weighs 80 kg and runs at a MET value of 11 for 10 minutes:
                            <br />
                            <code className="block bg-gray-100 p-2 rounded mt-2">
                            Burned Calories = 11 × 80 kg × (10/60) hours × 1.05 = 154(kcal)
                            </code>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AboutMets;
