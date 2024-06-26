'use client';

import React from 'react';
import DefaultWorkoutByType from './DefaultWorkoutBytype';
import CustomWorkoutButton from './CustomWorkoutButton';
import HistoryWorkoutButton from './HistoryWorkoutButton';
import OftenWorkoutListButton from './OftenWorkoutListButton';

const ExerciseSetStep1: React.FC = () => {
    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
            <div className="mb-4">
                <h2 className="text-base font-semibold">Step 1: Search for Activity</h2>
            </div>
            <DefaultWorkoutByType />
            <div className="flex">
                <div className='mr-1'>
                    <CustomWorkoutButton />
                </div>
                <div className='mr-1'>
                    <HistoryWorkoutButton />
                </div>
                <div className='mr-1'>
                    <OftenWorkoutListButton />
                </div>
            </div>
        </div>
    );
};

export default ExerciseSetStep1;
