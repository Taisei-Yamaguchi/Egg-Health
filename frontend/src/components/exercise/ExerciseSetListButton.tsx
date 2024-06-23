"use client";
import React, { useEffect } from "react";
import { useAppDispatch } from "@/store";
import { resetToast, setToast } from "@/store/slices/toast.slice";
import { fetchExerciseSetList } from "@/backend_api/exercise/fetchExerciseSetList";
import { resetSelectWorkoutList } from "@/store/slices/exercise.slice";
import { setExerciseSetList } from "@/store/slices/exercise.slice";
import { useAppSelector } from "@/store";
import { RootState } from "@/store";

const ExerciseSetListButton: React.FC = () => {
    const dispatch = useAppDispatch();
    const license = useAppSelector((state: RootState) => state.license.license);
    const set_loading = useAppSelector((state: RootState) => state.load.set_loading);
    
    useEffect(()=>{
        if(set_loading){
            handleFetchData()
        }
    },[set_loading,dispatch])

    const handleFetchData = async () => {
        if(!license || license =='free'){
            console.log('this is for premium')
            return
        }
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
            className="w-[60px] h-[50px]  cursor-pointer p-3 bg-gradient-to-b from-cyan-300 to-cyan-500 hover:from-cyan-400 hover:to-cyan-600 shadow-md rounded-lg flex flex-col items-center"
            onClick={handleFetchData}
            >
                <p className="text-[10px] font-normal text-white shadow-text"> Exercise</p>
                <p className="text-sm font-bold text-white shadow-text">Set</p>
        </button>
    );
};

export default ExerciseSetListButton;
