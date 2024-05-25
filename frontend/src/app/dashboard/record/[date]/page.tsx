import RenderMeals from "@/components/meal/RenderMeals";

type Props = {
	params: { date: string };
};

const Record: React.FC<Props> = async ({params: {date}})=>{    
	const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

    return (
        <div className="my-20">
            {mealTypes.map((type) => (
                <div key={type} className="mb-10">
                    <h2 className="text-2xl font-semibold">{type}</h2>
                    <RenderMeals meal_date={date} meal_type={type} />
                </div>
            ))}
        </div>
    );
}

export default Record