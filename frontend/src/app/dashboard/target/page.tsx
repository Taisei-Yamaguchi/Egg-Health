import GoalDetailForm from "@/components/user_detail/GoalDetailForm";
import BasicGoalNav from "@/components/navigation/BasicGoalNav";
import Ads from "@/components/main/Ads";

const TargetPage: React.FC= async ()=>{    
    return (
        <>
        <BasicGoalNav/>
        <div className="flex justify-between max-sm:flex-col">
            <div className="w-5/6 max-sm:w-full">
                <GoalDetailForm/>
            </div>
            <div className="w-1/6 h-[400px] w-[300px] max-sm:w-full max-sm:h-[150px]">
            <Ads/>
            </div>
        </div>
        <div className="flex">
                <div className="w-1/3 h-[180px] max-sm:w-1/2 border">
                    <Ads/>
                </div>
                <div className="w-1/3 h-[180px] max-sm:w-1/2 border">
                    <Ads/>
                </div>
            </div>
        </>
    );
}

export default TargetPage