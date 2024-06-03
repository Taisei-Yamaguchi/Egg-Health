import RenderExerciseCalBar from "@/components/graph/exercise_cal/RenderExerciseCalBar";
const ExerciseCalGraphPage: React.FC= async ()=>{    
    return (
        <div className="flex justify-between">
            <div className="w-3/4">
            <RenderExerciseCalBar/>
            </div>
            <div className="w-1/4 h-[400px] w-[200px] bg-gray-100">
            ads
            </div>
        </div>
    );
}

export default ExerciseCalGraphPage