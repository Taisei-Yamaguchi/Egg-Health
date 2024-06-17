import { getCurrentDateFormatted } from "@/helper/getTodayDate";
import RecordNav from "@/components/navigation/RecordNav";
import SelectDateChange from "@/components/navigation/SelectDateChange";
import Step1WorkoutSearchComponent from "@/components/exercise/Step1Component";
import Step2SelectWorkoutComponent from "@/components/exercise/Step2Component";
import Step3RegisterExerciseComponent from "@/components/exercise/Step3Component";
import ExerciseManagementComponent from "@/components/exercise/ExerciseManagementComponent";

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
                <div className="flex w-5/6 max-md:w-full max-md:flex-col-reverse">
                    <div className="w-1/2 max-md:w-full">
                        {/* Step1 Search Workout */}
                        <Step1WorkoutSearchComponent />

                        {/* Step2 Select Workout */}
                        <Step2SelectWorkoutComponent date={selectedDate}/>

                        {/* Step3 Register Exercise */}
                        <Step3RegisterExerciseComponent date={selectedDate}/>
                    </div>
                    <div className="w-full h-[200px] bg-slate-200 md:hidden">
                        ads
                    </div>
                    <div className="w-1/2 max-md:w-full">
                        <ExerciseManagementComponent date={selectedDate}/>
                    </div>
                </div>
                <div className="w-1/6 h-[400px] bg-slate-200 max-md:hidden">
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
        </>
    );
}

export default ExercisePage;
