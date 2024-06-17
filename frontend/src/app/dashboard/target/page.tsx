import GoalDetailForm from "@/components/user_detail/GoalDetailForm";
import BasicGoalNav from "@/components/navigation/BasicGoalNav";
const TargetPage: React.FC= async ()=>{    
    return (
        <>
        <BasicGoalNav/>
        <div className="flex justify-between max-sm:flex-col">
            <div className="w-5/6 max-sm:w-full">
                <GoalDetailForm/>
            </div>
            <div className="w-1/6 h-[400px] w-[300px] bg-gray-100 max-sm:w-full max-sm:h-[150px]">
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
        </>
    );
}

export default TargetPage