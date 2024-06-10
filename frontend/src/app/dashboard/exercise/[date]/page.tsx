import { WorkoutForm } from "@/components/exercise/WorkoutForm";
import CustomWorkoutButton from "@/components/exercise/CustomWorkoutButton";
import HistoryWorkoutButton from "@/components/exercise/HistoryWorkoutButton";
import RenderExercises from "@/components/exercise/RenderExercises";
import ExerciseRegisterForm from "@/components/exercise/ExerciseRegisterForm";
import ExerciseEditForm from "@/components/exercise/ExerciseEditForm";
import { getCurrentDateFormatted } from "@/helper/getTodayDate";
import RecordNav from "@/components/navigation/RecordNav";
import SelectDateChange from "@/components/navigation/SelectDateChange";
import DefaultWorkoutByType from "@/components/exercise/DefaultWorkoutBytype";
import SelectWorkoutList from "@/components/exercise/SelectWorkoutList";
import OftenWorkoutListButton from "@/components/exercise/OftenWorkoutListButton";
import ExerciseSetListButton from "@/components/exercise/ExerciseSetListButton";
import ExerciseSetList from "@/components/exercise/ExerciseSetList";

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
            <SelectDateChange date={selectedDate}/>
            <RecordNav date={selectedDate} />
            <div className="flex">
                <div className="flex w-5/6">
                    <div className="w-1/2">
                        <DefaultWorkoutByType/>
                        <div className="flex ">
                            <CustomWorkoutButton/>
                            <HistoryWorkoutButton/>
                            <OftenWorkoutListButton/>
                            <ExerciseSetListButton/>
                        </div>
                        <WorkoutForm/>
                        <SelectWorkoutList/>
                        <ExerciseSetList date={selectedDate}/>
                        <ExerciseRegisterForm date={selectedDate}/>
                    </div>
                    <div className="w-1/2">
                        <RenderExercises date={selectedDate}/>
                        <ExerciseEditForm />
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

export default ExercisePage;
