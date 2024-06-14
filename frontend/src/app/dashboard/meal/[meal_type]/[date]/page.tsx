import RenderMealsByType from "@/components/meal/RenderMealByType";
import { FoodForm } from "@/components/meal/FoodForm";
import CustomFoodButton from "@/components/meal/CustomFoodButton";
import HistoryFoodButton from "@/components/meal/HistoryFoodButton";
import MealRegisterForm from "@/components/meal/MealRegisterForm";
import MealEditForm from "@/components/meal/MealEditForm";
import { getCurrentDateFormatted } from "@/helper/getTodayDate";
import RecordNav from "@/components/navigation/RecordNav";
import SelectDateChange from "@/components/navigation/SelectDateChange";
import SearchFatsecretFoodComponent from "@/components/meal/SearchFatsecretFoodComponent";
import MealRegisterFormByFatSecret from "@/components/meal/MealRegisterFormByFatSecret";
import SelectFoodList from "@/components/meal/SelectFoodList";
import OftenFoodListButton from "@/components/meal/OftenFoodListButton";
import MealSetListButton from "@/components/meal/MealSetListButton";
import MealSetList from "@/components/meal/MealSetList";
import { CreateMealSetButton } from "@/components/meal/CreateMealSetButton";
import Step1Component from "@/components/meal/Step1Component";
import Step2Component from "@/components/meal/Step2Component";
import Step3Component from "@/components/meal/Step3Component";
import MealManagementComponent from "@/components/meal/MealManagementComponent";

type Props = {
    params: { meal_type: "Breakfast" | "Lunch" | "Dinner" | "Snack", date: string };
};

const MealPage: React.FC<Props> = async ({params: {meal_type, date}})=>{    
    const todayFormatted = getCurrentDateFormatted();
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
    const isValidDateExistence = isValidDate && !isNaN(Date.parse(date));
    const selectedDate = isValidDateExistence ? date : todayFormatted;

    const selectedMealType = ["Breakfast", "Lunch", "Dinner", "Snack"].includes(meal_type) ? meal_type : "Breakfast";

    return (
        <>
            <SelectDateChange date={selectedDate}/>
            <RecordNav date={selectedDate}/>
            <div className="flex">
                <div className="flex w-5/6 max-md:w-full max-md:flex-col-reverse">
                    <div className="w-1/2 max-md:w-full">
                        {/* Step1: Food Search */}
                        <Step1Component />
                        {/* Step2 Food Select */}
                        <Step2Component date={selectedDate} meal_type={selectedMealType}/>
                        {/* Step3 Meal Register */}
                        <Step3Component date={selectedDate} meal_type={selectedMealType}/>    
                    </div>
                    <div className="w-full h-[200px] bg-slate-200 md:hidden">
                        ads
                    </div>
                    <div className="w-1/2 max-md:w-full">
                        <MealManagementComponent date={selectedDate} meal_type={selectedMealType} />
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
            <div className="w-full h-[400px] bg-yellow-200">
                footer
            </div>
        </>
    );
}

export default MealPage;
