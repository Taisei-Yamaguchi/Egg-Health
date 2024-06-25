"use client"
import { getCurrentDateFormatted } from "@/helper/getTodayDate";
import RecordNav from "@/components/navigation/RecordNav";
import SelectDateChange from "@/components/navigation/SelectDateChange";
import Step1WorkoutSearchComponent from "@/components/exercise/Step1Component";
import Step2SelectWorkoutComponent from "@/components/exercise/Step2Component";
import Step3RegisterExerciseComponent from "@/components/exercise/Step3Component";
import ExerciseManagementComponent from "@/components/exercise/ExerciseManagementComponent";
import DailyCalsNutrients2 from "@/components/user_detail/DailyCalsNutrients2";
import Ads from "@/components/main/Ads";
import { useEffect } from "react";

type Props = {
    params: { date: string };
};

const ExercisePage: React.FC<Props> = async ({ params: { date } }) => {    
    const today = new Date();
    const todayFormatted = getCurrentDateFormatted();
    const futureDate = new Date(today);
    futureDate.setDate(futureDate.getDate() + 2);
    const futureDateFormatted = futureDate.toISOString().split('T')[0];

    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
    const isValidDateExistence = isValidDate && !isNaN(Date.parse(date));
    const isFutureDateValid = isValidDateExistence && date <= futureDateFormatted;

    const selectedDate = isFutureDateValid ? date : todayFormatted;

    useEffect(() => {
        const errorHandler = (event:any) => {
        if (event.message.includes('Minified React error')) {
            event.preventDefault();
        }
        };
    
        window.addEventListener('error', errorHandler);
    
        return () => {
        window.removeEventListener('error', errorHandler);
        };
    }, []);
    
    return (
        <>
            <DailyCalsNutrients2 date={selectedDate}/>
            <SelectDateChange date={selectedDate} />
            
            <RecordNav date={selectedDate} />
            <div className="flex">
                <div className="flex w-5/6 max-lg:w-full max-lg:flex-col-reverse">
                    <div className="w-1/2 max-lg:w-full">
                        {/* Step1 Search Workout */}
                        <Step1WorkoutSearchComponent />

                        {/* Step2 Select Workout */}
                        <Step2SelectWorkoutComponent date={selectedDate} />

                        {/* Step3 Register Exercise */}
                        <Step3RegisterExerciseComponent date={selectedDate} />
                    </div>
                    <div className="flex lg:hidden">
                        <div className="w-1/3 max-sm:w-1/2 h-[200px] border">
                            <Ads/>
                        </div>
                        <div className="w-1/3 max-sm:w-1/2 h-[200px]  border">
                            <Ads/>
                        </div>
                    </div>
                    <div className="w-1/2 max-lg:w-full">
                        <ExerciseManagementComponent date={selectedDate} />
                    </div>
                </div>
                <div className="w-1/6 ml-4 max-lg:hidden ">
                    <div className="h-[200px] w-[200px] border">
                        <Ads/>
                    </div>
                    <div className="h-[200px] w-[200px] border">
                        <Ads/>
                    </div>
                    <div className="h-[200px] w-[200px] border">
                        <Ads/>
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="w-1/3 max-sm:w-1/2 h-[200px] border">
                    <Ads/>
                </div>
                <div className="w-1/3 max-sm:w-1/2 h-[200px]  border">
                    <Ads/>
                </div>
            </div>
        </>
    );
}

export default ExercisePage;
