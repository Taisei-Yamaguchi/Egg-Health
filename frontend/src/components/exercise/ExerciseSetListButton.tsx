"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import { resetToast, setToast } from "@/store/slices/toast.slice";
import { useAppSelector } from "@/store";
import { RootState } from "@/store";
import { fetchExerciseSetList } from "@/backend_api/exercise/fetchExerciseSetList";
import { resetSelectWorkoutList } from "@/store/slices/exercise.slice";
import { setExerciseSetList } from "@/store/slices/exercise.slice";

const ExerciseSetListButton: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleFetchData = async () => {
        try {
        const response = await fetchExerciseSetList();
        if ("error" in response) {
            dispatch(setToast({ message: response.error, type: "error" }));
            setTimeout(() => dispatch(resetToast()), 3000);
            return;
        }
        if ("message" in response) {
            dispatch(resetSelectWorkoutList())
            dispatch(setExerciseSetList(response.data));
        }
        } catch (error) {
        console.error("Error fetching exercise set list:", error);
        }
    };

    return (
        <button
            className="cursor-pointer p-3 bg-gradient-to-b from-cyan-300 to-cyan-500 shadow-md rounded-lg flex flex-col items-center"
            onClick={handleFetchData}
            >
            <p className="text-base font-bold text-gray-800 shadow-text text-white ">Exercise Set</p>
        </button>
    );
};

export default ExerciseSetListButton;
