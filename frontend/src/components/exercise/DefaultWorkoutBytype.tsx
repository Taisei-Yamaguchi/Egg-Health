"use client"
import { useEffect, useState } from 'react';
import { fetchDefaultWorkoutsByType } from '@/backend_api/exercise/fetchDefaultWorkout';
import { useAppDispatch } from '@/store';
import { setToast, resetToast } from '@/store/slices/toast.slice';
import { setSelectWorkoutList } from '@/store/slices/exercise.slice';
import { FaWalking, FaHeartbeat, FaBasketballBall, FaWater } from 'react-icons/fa';
import { MdSportsMartialArts, MdOutlineHouse } from "react-icons/md";
import { GiFishingPole } from "react-icons/gi";
import { MdOutlineSportsGymnastics } from "react-icons/md";
import { resetExerciseSetList } from '@/store/slices/exercise.slice';


const workoutTypes = [
  { type: 'Daily Living Activities', icon: MdOutlineHouse, label: 'Daily Living' },
  { type: 'Walking・Running', icon: FaWalking, label: 'Walking・Running' },
  { type: 'Cardio', icon: FaHeartbeat, label: 'Cardio' },
  { type: 'Fitness', icon: MdOutlineSportsGymnastics, label: 'Fitness' },
  { type: 'Ball Sports', icon: FaBasketballBall, label: 'Ball Sports' },
  { type: 'Martial Arts', icon: MdSportsMartialArts, label: 'Martial Arts' },
  { type: 'Water and Winter Sports', icon: FaWater, label: 'Water & Winter' },
  { type: 'Other', icon: GiFishingPole, label: 'Other' }
];

const DefaultWorkoutByType = () => {
  const dispatch = useAppDispatch();
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDefaultWorkoutsByType(selectedType);
        if ('error' in response) {
          dispatch(setToast({ message: response.error, type: 'error' }));
          setTimeout(() => dispatch(resetToast()), 3000);
          return;
        }
        if ('message' in response) {
          dispatch(resetExerciseSetList())
          dispatch(setSelectWorkoutList(response.data));
        }
      } catch (error) {
        // console.error('Error fetching default workouts:', error);
      }
    };
    if(selectedType !==''){
      fetchData();
    }
    
  }, [selectedType]);

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-1">
        {workoutTypes.map((workout) => (
          <button
            key={workout.type}
            onClick={() => handleTypeChange(workout.type)}
            className={`hover:scale-105 flex flex-col items-center justify-center w-20 h-20 p-0 rounded-md ${
              selectedType === workout.type ? 'bg-orange-500 text-white' : 'bg-yellow-200 text-gray-800'
            }`}
          >
            <workout.icon className="text-2xl m-1" />
            <span className="text-xs">{workout.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DefaultWorkoutByType;
