import RenderMeals from "@/components/meal/RenderMeals";
import RenderExercises from "@/components/exercise/RenderExercises";
import DynamicDetailForm from "@/components/user_detail/DynamicDetailForm";
import { getCurrentDateFormatted } from "@/helper/getTodayDate";
// import { useAppDispatch } from "@/store";
// import { setDate } from "@/store/slices/select_date.slice";
import RecordNav from "@/components/navigation/RecordNav";
import SelectDateChange from "@/components/navigation/SelectDateChange";

type Props = {
    params: { date: string };
};

const RecordPage: React.FC<Props> = async ({params: {date}})=>{ 
    // const dispatch = useAppDispatch()
    const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];
    const todayFormatted = getCurrentDateFormatted();
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
    const isValidDateExistence = isValidDate && !isNaN(Date.parse(date));
    const selectedDate = isValidDateExistence ? date : todayFormatted;
    // dispatch(setDate(selectedDate))

    return (
        <>
            <RecordNav date={selectedDate}/>
            <SelectDateChange date={selectedDate}/>
            <div className="my-20">
                <DynamicDetailForm date={selectedDate}/>
                {mealTypes.map((type) => (
                    <div key={type} className="mb-10">
                        <h2 className="text-2xl font-semibold">{type}</h2>
                        <RenderMeals date={selectedDate} meal_type={type} />
                    </div>
                ))}
                <div className="mb-10">
                    <h2 className="text-2xl font-semibold">Exercise</h2>
                    <RenderExercises date={selectedDate} />
                </div>
            </div>
        </>
        
    );
}

export default RecordPage;
