'use client';

import React from 'react';
import SelectWorkoutList from './SelectWorkoutList';

const ExerciseSetStep2: React.FC = () => {
    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
            <div className="mb-4">
                <h2 className="text-base font-semibold">Step 2: Select Activity</h2>
            </div>
            <SelectWorkoutList />
        </div>
    );
};

export default ExerciseSetStep2;
