"use client";

import CustomWorkoutButton from "@/components/exercise/CustomWorkoutButton";
import HistoryWorkoutButton from "@/components/exercise/HistoryWorkoutButton";
import DefaultWorkoutByType from "@/components/exercise/DefaultWorkoutBytype";
import SelectWorkoutList from "@/components/exercise/SelectWorkoutList";
import OftenWorkoutListButton from "@/components/exercise/OftenWorkoutListButton";

import ExercisePreRegisterForm from "@/components/exercise/ExercisePreRegisterForm";
import { useAppDispatch, useAppSelector } from "@/store";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { ExerciseSet } from "@/interfaces/exercise.interface";
import { setToast, resetToast } from "@/store/slices/toast.slice";
import { fetchExerciseSet } from "@/backend_api/exercise/fetchExerciseSet";
import RenderExercisePres from "@/components/exercise/RenderExercisePres";
import EditExerciseSetName from "@/components/exercise/EditExerciseSetName";
import ExercisePreEditForm from "@/components/exercise/ExercisePreEditForm";

type Props = {
    params: { id: number };
};

const ExerciseSetPage: React.FC<Props> = ({ params: { id } }) => {
    const dispatch = useAppDispatch();
    const exercise_loading = useAppSelector((state: RootState) => state.load.exercise_loading) as boolean;
    const [exerciseSet, setExerciseSet] = useState<ExerciseSet | null>(null);

    useEffect(() => {
        const fetchData = () => {
            fetchExerciseSet(id)
                .then(response => {
                    if ('error' in response) {
                        dispatch(setToast({ message: response.error, type: "error" }));
                        setTimeout(() => dispatch(resetToast()), 3000);
                        return;
                    }
                    if ('message' in response) {
                        setExerciseSet(response.data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching exercises:', error);
                });
        };
        fetchData();
    }, [exercise_loading, dispatch, id]);

    return (
        <>
            {exerciseSet &&(<EditExerciseSetName id={id} name={exerciseSet?.exercise_set_name}/>)}
            <div className="flex">
                <div className="flex w-5/6">
                    <div className="w-1/2">
                        <DefaultWorkoutByType />
                        <div className="flex">
                            <CustomWorkoutButton />
                            <HistoryWorkoutButton />
                            <OftenWorkoutListButton />
                        </div>
                        <SelectWorkoutList />
                        <ExercisePreRegisterForm exercise_set_id={id} />
                    </div>
                    <div className="w-1/2">
                        {exerciseSet &&(
                            <RenderExercisePres exercise_pres={exerciseSet?.exercise_pres}/>
                        )}
                        <ExercisePreEditForm />
                    </div>
                </div>
                <div className="w-1/6 h-[400px] bg-slate-200">
                    ads
                </div>
            </div>
            <div className="flex">
                <div className="w-1/3 h-[200px] bg-slate-200 border">
                    ads
                </div>
                <div className="w-1/3 h-[200px] bg-slate-200 border">
                    ads
                </div>
            </div>
            <div className="w-full h-[400px] bg-yellow-200">
                footer
            </div>
        </>
    );
}

export default ExerciseSetPage;
