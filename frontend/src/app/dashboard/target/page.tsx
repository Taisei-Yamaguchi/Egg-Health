import GoalDetailForm from "@/components/user_detail/GoalDetailForm";
import BasicGoalNav from "@/components/navigation/BasicGoalNav";
const TargetPage: React.FC= async ()=>{    
    return (
        <>
        <BasicGoalNav/>
        <div className="flex justify-between">
            <div className="w-2/3">
                <GoalDetailForm/>
            </div>
            <div className="w-1/3 h-[400px] w-[300px] bg-gray-100">
            ads
            </div>
        </div>
        </>
    );
}

export default TargetPage