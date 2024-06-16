'use client';

import React from 'react';
import RenderExercisePres from './RenderExercisePres';
import ExercisePreEditForm from './ExercisePreEditForm';
import { ExerciseSet } from '@/interfaces/exercise.interface';
import EditExerciseSetName from './EditExerciseSetName';

interface Props {
    exerciseSet: ExerciseSet ;
}

const ExerciseSetmanagement: React.FC<Props> = ({ exerciseSet }) => {
    return (
        <>
        <hr></hr>
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md space-y-4 max-md:mt-3">
            <div className="mb-4">
                <EditExerciseSetName id={exerciseSet.exercise_set_id} name={exerciseSet?.exercise_set_name}/>
            </div>
            <div className="space-y-4">
                <RenderExercisePres exercise_pres={exerciseSet.exercise_pres} />
                <ExercisePreEditForm />
            </div>
        </div>
        <hr></hr>
        </>
    );
};

export default ExerciseSetmanagement;
