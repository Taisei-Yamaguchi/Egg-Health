import { getCurrentDateFormatted } from "@/helper/getTodayDate";
import RecordNav from "@/components/navigation/RecordNav";
import SelectDateChange from "@/components/navigation/SelectDateChange";
import Step1FoodSearchComponent from "@/components/meal/Step1Component";
import Step2FoodSelectComponent from "@/components/meal/Step2Component";
import Step3MealRegisterComponent from "@/components/meal/Step3Component";
import MealManagementComponent from "@/components/meal/MealManagementComponent";

type Props = {
    params: { meal_type: "Breakfast" | "Lunch" | "Dinner" | "Snack", date: string };
};

const MealPage: React.FC<Props> = async ({params: {meal_type, date}})=>{    
    const today = new Date();
    const todayFormatted = getCurrentDateFormatted();
    const futureDate = new Date(today);
    futureDate.setDate(futureDate.getDate() + 2);
    const futureDateFormatted = futureDate.toISOString().split('T')[0];

    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
    const isValidDateExistence = isValidDate && !isNaN(Date.parse(date));
    const isFutureDateValid = isValidDateExistence && date <= futureDateFormatted;

    const selectedDate = isFutureDateValid ? date : todayFormatted;

    const selectedMealType = ["Breakfast", "Lunch", "Dinner", "Snack"].includes(meal_type) ? meal_type : "Breakfast";
    
    return (
        <>
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
                    <div className="w-full h-[200px] bg-slate-200 lg:hidden">
                        
                    </div>
                    <div className="w-1/2 max-lg:w-full">
                        <MealManagementComponent date={selectedDate} meal_type={selectedMealType} />
                    </div>
                </div>
                <div className="w-1/6 ml-4 max-lg:hidden h-[400px] w-[300px] bg-gray-100">
                    <div className="w-full h-full bg-slate-100">ads</div>
                </div>
            </div>
            <div className="flex">
                <div className="w-1/3 h-[200px] bg-slate-200 border">
                    
                </div>
                <div className="w-1/3 h-[200px] bg-slate-200 border">
                    
                </div>
            </div>
        </>
    );
}

export default MealPage;
