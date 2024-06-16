'use client';

import { FC } from 'react';
import ExerciseRegisterForm from './ExerciseRegisterForm';

interface Step3Props {
    date: string;
}

const Step3RegisterExerciseComponent: FC<Step3Props> = ({ date }) => {
    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
            <div className=" mb-4">
                <h2 className="text-base font-semibold">Step 3: Register Exercise</h2>
            </div>
            <ExerciseRegisterForm date={date} />
        </div>
    );
};

export default Step3RegisterExerciseComponent;
