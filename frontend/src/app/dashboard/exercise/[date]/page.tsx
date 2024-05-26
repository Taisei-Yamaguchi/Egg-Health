import { WorkoutForm } from "@/components/exercise/WorkoutForm";
import CustomWorkoutList from "@/components/exercise/CustomWorkoutList";
import HistoryWorkoutList from "@/components/exercise/HistoryWorkoutList";
import RenderExercises from "@/components/exercise/RenderExercises";
import ExerciseRegisterForm from "@/components/exercise/ExerciseRegisterForm";
import ExerciseEditForm from "@/components/exercise/ExerciseEditForm";

type Props = {
	params: { date: string };
};

const ExercisePage: React.FC<Props> = async ({params: {date}})=>{    
    return (
        <div className="my-20 flex">
            <div className="w-1/2">
                <WorkoutForm/>
                <div className="flex justify-between">
                    <CustomWorkoutList/>
                    <HistoryWorkoutList/>
                    {/* <OftenFoodList /> */}
                </div>
                <ExerciseRegisterForm exercise_date={date}/>
            </div>
            <div className="w-1/2">
                {/* <h2 className="text-2xl font-semibold">{meal_type}</h2> */}
                <RenderExercises exercise_date={date}/>
                <ExerciseEditForm />
            </div>
        </div>
    );
}

export default ExercisePage