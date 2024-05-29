import RenderMeals from "@/components/meal/RenderMeals";
import DynamicDetailForm from "@/components/user_detail/DynamicDetailForm";

type Props = {
	params: { date: string };
};

const RecordPage: React.FC<Props> = async ({params: {date}})=>{    
	const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

    return (
        <div className="my-20">
            <DynamicDetailForm date={date}/>
            {mealTypes.map((type) => (
                <div key={type} className="mb-10">
                    <h2 className="text-2xl font-semibold">{type}</h2>
                    <RenderMeals date={date} meal_type={type} />
                </div>
            ))}
        </div>
    );
}

export default RecordPage