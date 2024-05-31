import { WorkoutForm } from "@/components/exercise/WorkoutForm";
import CustomWorkoutList from "@/components/exercise/CustomWorkoutList";
import HistoryWorkoutList from "@/components/exercise/HistoryWorkoutList";
import RenderExercises from "@/components/exercise/RenderExercises";
import ExerciseRegisterForm from "@/components/exercise/ExerciseRegisterForm";
import ExerciseEditForm from "@/components/exercise/ExerciseEditForm";
import { getCurrentDateFormatted } from "@/helper/getTodayDate";
import RecordNav from "@/components/navigation/RecordNav";
import SelectDateChange from "@/components/navigation/SelectDateChange";
import DefaultWorkoutByType from "@/components/exercise/DefaultWorkoutBytype";

type Props = {
    params: { date: string };
};

const ExercisePage: React.FC<Props> = async ({params: {date}})=>{    
    const todayFormatted = getCurrentDateFormatted();
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
    const isValidDateExistence = isValidDate && !isNaN(Date.parse(date));
    const selectedDate = isValidDateExistence ? date : todayFormatted;

    return (
        <>
            <RecordNav date={selectedDate} />
            <SelectDateChange date={selectedDate}/>
            <div className="my-20 flex">
                <div className="w-1/2">
                    <WorkoutForm/>
                    <DefaultWorkoutByType/>
                    <div className="flex justify-between">
                        <CustomWorkoutList/>
                        <HistoryWorkoutList/>
                    </div>
                    <ExerciseRegisterForm date={selectedDate}/>
                </div>
                <div className="w-1/2">
                    <RenderExercises date={selectedDate}/>
                    <ExerciseEditForm />
                </div>
            </div>
        </>
    );
}

export default ExercisePage;
