"use client";

import { getCurrentDateFormatted, getZonedDate, formatZonedDate } from "@/helper/getTodayDate";
import RecordNav from "@/components/navigation/RecordNav";
import SelectDateChange from "@/components/navigation/SelectDateChange";
import Step1FoodSearchComponent from "@/components/meal/Step1Component";
import Step2FoodSelectComponent from "@/components/meal/Step2Component";
import Step3MealRegisterComponent from "@/components/meal/Step3Component";
import MealManagementComponent from "@/components/meal/MealManagementComponent";
import DailyCalsNutrients2 from "@/components/user_detail/DailyCalsNutrients2";
import Ads from "@/components/main/Ads";
import { useEffect } from "react";

type Props = {
    params: { meal_type: "Breakfast" | "Lunch" | "Dinner" | "Snack", date: string };
};

const MealPage: React.FC<Props> = ({ params: { meal_type, date } }) => {    
    // const today = getZonedDate(new Date());
    const todayFormatted = getCurrentDateFormatted();
    const futureDate = getZonedDate(new Date());
    futureDate.setDate(futureDate.getDate() + 2);
    const futureDateFormatted = formatZonedDate(futureDate, 'yyyy-MM-dd');

    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
    const isValidDateExistence = isValidDate && !isNaN(Date.parse(date));
    const isFutureDateValid = isValidDateExistence && date <= futureDateFormatted;

    const selectedDate = isFutureDateValid ? date : todayFormatted;

    const selectedMealType = ["Breakfast", "Lunch", "Dinner", "Snack"].includes(meal_type) ? meal_type : "Breakfast";

    return (
        <>
            <DailyCalsNutrients2 date={selectedDate}/>
            <SelectDateChange date={selectedDate}/>
            
            <RecordNav date={selectedDate}/>
            <div className="flex">
                <div className="flex w-5/6 max-lg:w-full max-lg:flex-col-reverse">
                    <div className="w-1/2 max-lg:w-full">
                        {/* Step1: Food Search */}
                        <Step1FoodSearchComponent />
                        {/* Step2 Food Select */}
                        <Step2FoodSelectComponent date={selectedDate} meal_type={selectedMealType}/>
                        {/* Step3 Meal Register */}
                        <Step3MealRegisterComponent date={selectedDate} meal_type={selectedMealType}/>    
                    </div>
                    <div className="lg:hidden flex ">
                        <div className="w-1/3 max-sm:w-1/2 h-[180px] border">
                            <Ads/>
                        </div>
                        <div className="w-1/3 max-sm:w-1/2 h-[180px] border">
                            <Ads/>
                        </div>
                    </div>
                    
                    <div className="w-1/2 max-lg:w-full">
                        <MealManagementComponent date={selectedDate} meal_type={selectedMealType} />
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
                <div className="w-1/3 h-[180px] max-sm:w-1/2 border">
                    <Ads/>
                </div>
                <div className="w-1/3 h-[180px] max-sm:w-1/2 border">
                    <Ads/>
                </div>
            </div>
        </>
    );
}

export default MealPage;
