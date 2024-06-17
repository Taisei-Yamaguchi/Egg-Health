"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { ExerciseSet } from "@/interfaces/exercise.interface";
import { setToast, resetToast } from "@/store/slices/toast.slice";
import { fetchExerciseSet } from "@/backend_api/exercise/fetchExerciseSet";
import RenderExercisePres from "@/components/exercise/RenderExercisePres";
import EditExerciseSetName from "@/components/exercise/EditExerciseSetName";
import ExercisePreEditForm from "@/components/exercise/ExercisePreEditForm";

import ExerciseSetStep1 from "@/components/exercise/ExerciseSetStep1";
import ExerciseSetStep2 from "@/components/exercise/ExerciseSetStep2";
import ExerciseSetStep3 from "@/components/exercise/ExerciseSetStep3";
import ExerciseSetmanagement from "@/components/exercise/ExerciseSetManagement";

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
            <h1 className="text-3xl font-bold">Exercise Set</h1>
            <div className="flex">
                <div className="flex w-5/6 max-lg:w-full max-lg:flex-col-reverse">
                    <div className="w-1/2 max-lg:w-full">
                        {/* step1 */}
                        <ExerciseSetStep1 />
                        {/* step2 */}
                        <ExerciseSetStep2 />
                        {/* step3 */}
                        <ExerciseSetStep3 exercise_set_id={id}/>
                    </div>
                    <div className="w-full h-[200px] bg-slate-200 lg:hidden">
                        ads
                    </div>
                    <div className="w-1/2 max-lg:w-full">
                        {exerciseSet &&(
                            <ExerciseSetmanagement exerciseSet={exerciseSet}/>
                        )}
                    </div>
                </div>
                <div className="w-1/6 ml-4 max-lg:hidden h-[400px] w-[300px] bg-gray-100">
                    <div className="w-full h-full bg-slate-100">ads</div>
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
        </>
    );
}

export default ExerciseSetPage;
