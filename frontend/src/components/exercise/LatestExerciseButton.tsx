"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import { resetToast, setToast } from "@/store/slices/toast.slice";
import { setExerciseLoading } from "@/store/slices/load.slice";
import { createExerciseWithLatest } from "@/backend_api/exercise/createExercisesWithLatest";
import { fetchLatestExercises } from "@/backend_api/exercise/fetchLatestExercises";
import { Exercise } from "@/interfaces/exercise.interface";
import { MdHistory } from "react-icons/md";  // Import the icon
import { useAppSelector } from "@/store";
import { RootState } from "@/store";

interface Props {
    date: string;
}

const LatestExerciseButton: React.FC<Props> = ({ date}) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [latestExercises, setLatestExercises] = useState<Exercise[]>([]);
    const [isHovered, setIsHovered] = useState(false);
    const license = useAppSelector((state: RootState) => state.license.license);
    
    useEffect(() => {
        if (!license || license === 'free') {
            // console.log('This feature is for premium users.');
            return;
        }
        const fetchData = async () => {
            try {
                const response = await fetchLatestExercises();
                if ("error" in response) {
                    dispatch(setToast({ message: response.error, type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                    return;
                } else if ("message" in response) {
                    setLatestExercises(response.data);
                }
            } catch (error) {
                // console.error("Error fetching latest exercises:", error);
            }
        };
        fetchData();
    }, [dispatch,license]);

    const handleCreateExercise = async () => {
        if (!license || license === 'free') {
            // console.log('This feature is for premium users.');
            return;
        }
        try {
            dispatch(setExerciseLoading(true));
            const response = await createExerciseWithLatest({
                date: date,
            });
            if ("error" in response) {
                dispatch(setToast({ message: response.error, type: "error" }));
                setTimeout(() => dispatch(resetToast()), 3000);
                return;
            } else if ("message" in response) {
                dispatch(setToast({ message: response.message, type: "success" }));
                setTimeout(() => dispatch(resetToast()), 4000);
            }
        } catch (error) {
            // console.error("Error registering exercise:", error);
            dispatch(setToast({ message: "An error occurred while registering the exercise.", type: "error" }));
            setTimeout(() => dispatch(resetToast()), 3000);
        } finally {
            dispatch(setExerciseLoading(false));
        }
    };

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button
                className=" flex items-center justify-center p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                onClick={handleCreateExercise}
            >
                <MdHistory size={20} /> 
            </button>
            {isHovered && (
                <div className="absolute z-10 p-2 bg-white border-2 border-blue-500 rounded shadow-lg w-64 ml-2 mt-2">
                    <div className="border-2 border-blue-500 p-2 rounded-md bg-blue-50">
                        <ul>
                            {latestExercises.map((exercise, index) => (
                                <li key={index} className="text-xs text-gray-700 truncate">
                                    {exercise.workout.name}
                                </li>
                            ))}
                            {!license || license === 'free' &&(
                                <div className="font-bold">
                                    This is for premium
                                </div>)}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LatestExerciseButton;
