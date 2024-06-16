'use client';

import React from 'react';
import ExercisePreRegisterForm from './ExercisePreRegisterForm';

interface Props {
    exercise_set_id: number;
}

const ExerciseSetStep3: React.FC<Props> = ({ exercise_set_id }) => {
    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
            <div className="mb-4">
                <h2 className="text-base font-semibold">Step 3: Register Exercise</h2>
            </div>
            <ExercisePreRegisterForm exercise_set_id={exercise_set_id} />
        </div>
    );
};

export default ExerciseSetStep3;
