import RenderMealsByType from "@/components/meal/RenderMealByType";
import { FoodForm } from "@/components/meal/FoodForm";
import CustomFoodList from "@/components/meal/CustomFoodList";
import HistoryFoodList from "@/components/meal/HistoryFoodList";
import OftenFoodList from "@/components/meal/OftenFoodList";
import MealRegisterForm from "@/components/meal/MealRegisterForm";
import MealEditForm from "@/components/meal/MealEditForm";
type Props = {
	params: { meal_type:"Breakfast" | "Lunch" | "Dinner" | "Snack", date: string };
};

const MealPage: React.FC<Props> = async ({params: {meal_type,date}})=>{    
    return (
        <div className="my-20 flex">
            <div className="w-1/2">
                <FoodForm/>
                <div className="flex justify-between">
                    <CustomFoodList/>
                    <HistoryFoodList/>
                    <OftenFoodList />
                </div>
                <MealRegisterForm meal_date={date} meal_type={meal_type}/>
            </div>
            <div className="w-1/2">
                <h2 className="text-2xl font-semibold">{meal_type}</h2>
                <RenderMealsByType meal_date={date} meal_type={meal_type} />
                <MealEditForm />
            </div>
        </div>
    );
}

export default MealPage