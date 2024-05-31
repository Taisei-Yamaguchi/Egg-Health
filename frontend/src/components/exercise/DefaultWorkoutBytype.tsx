"use client"
import { use, useEffect, useState } from 'react';
import { fetchDefaultWorkoutsByType } from '@/backend_api/exercise/fetchDefaultWorkout';
import { Workout } from '@/interfaces/exercise.interface';
import { useAppDispatch } from '@/store';
import { setToast } from '@/store/slices/toast.slice';
import { resetToast } from '@/store/slices/toast.slice';
import { setUsedWorkout } from '@/store/slices/exercise.slice';

const DefaultWorkoutByType = () => {
    const dispatch = useAppDispatch()
    const [selectedType, setSelectedType] = useState('');
    const [workouts, setWorkouts] = useState<Workout[]>([]);

    useEffect(() => {
        if(selectedType===''){
            return
        }
        const fetchData = async () => {
            try {
                const response = await fetchDefaultWorkoutsByType(selectedType);
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: 'error' }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                    return;
                }
                if ('message' in response) {
                    setWorkouts(response.data);
                }
            } catch (error) {
                console.error('Error fetching default workouts:', error);
            }
        };
        fetchData();
    }, [selectedType]);

    const handleTypeChange = (type: string ) => {
        setSelectedType(type);
    };

    const selectWorkout = (selectedWorkout: Workout) => {
        dispatch(setUsedWorkout(selectedWorkout)); // Dispatch the selected workout
    };

    return (
        <div>
            <select onChange={(e) => handleTypeChange(e.target.value)}>
                <option value="">Select Type</option>
                <option value="Daily Living Activities">Daily Living Activities</option>
                <option value="Cardio">Cardio</option>
                <option value="Walking・Running">Walking・Running</option>
                <option value="Strength Training">Strength Training</option>
                <option value="Fitness">Fitness</option>
                <option value="Ball Sports">Ball Sports</option>
                <option value="Martial Arts">Martial Arts</option>
                <option value="Water and Winter Sports">Water and Winter Sports</option>
                <option value="Other">Other</option>
            </select>
            <div className='flex flex-col'>
                {workouts.map(workout => (
                    <button key={workout.id} className='border' onClick={() => selectWorkout(workout)}>
                        <p>{workout.name}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DefaultWorkoutByType;
