'use client';

import SelectWorkoutList from './SelectWorkoutList';
import ExerciseSetList from './ExerciseSetList';

interface Step2ComponentProps {
    date: string;
}

const Step2SelectWorkoutComponent: React.FC<Step2ComponentProps> = ({ date }) => {
    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
            <div className="mb-4">
                <h2 className="text-base font-semibold">Step 2: Select Activity</h2>
            </div>
            <SelectWorkoutList />
            <ExerciseSetList date={date} />
        </div>
    );
};

export default Step2SelectWorkoutComponent;
