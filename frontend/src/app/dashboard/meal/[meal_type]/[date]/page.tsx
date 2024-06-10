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
                <div className="flex w-5/6">
                    <div className="w-1/2">
                        <SearchFatsecretFoodComponent />
                        <div className="flex ">
                            <CustomFoodButton/>
                            <HistoryFoodButton/>
                            <OftenFoodListButton />
                            <MealSetListButton/>
                        </div>
                        <FoodForm/>
                        <SelectFoodList/>
                        <MealSetList date={date} meal_type={meal_type}/>
                        <MealRegisterForm date={selectedDate} meal_type={selectedMealType}/>
                        <MealRegisterFormByFatSecret date={selectedDate} meal_type={selectedMealType}/>
                    </div>
                    <div className="w-1/2">
                        <RenderMealsByType date={selectedDate} meal_type={selectedMealType} />
                        <MealEditForm />
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

export default MealPage;
