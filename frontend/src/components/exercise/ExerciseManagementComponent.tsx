'use client';

import { FC } from 'react';
import RenderExercises from './RenderExercises';
import ExerciseEditForm from './ExerciseEditForm';

interface ManageExercisesProps {
    date: string;
}

const ExerciseManagementComponent: FC<ManageExercisesProps> = ({ date }) => {
    return (
        <>
        <hr></hr>
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md space-y-4 max-md:mt-3">
            <div className="mb-4">
                <h2 className="text-base font-semibold">Manage Your Exercises</h2>
            </div>
            <div className="space-y-4">
                <RenderExercises date={date} />
                <ExerciseEditForm />
            </div>
        </div>
        <hr></hr>
        </>
    );
};

export default ExerciseManagementComponent
