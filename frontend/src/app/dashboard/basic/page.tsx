import StaticDetailForm from "@/components/user_detail/StaticDetailForm";
import LatestWeightForm from "@/components/user_detail/LatestWeightForm";
import BasicGoalNav from "@/components/navigation/BasicGoalNav";

const BasicPage: React.FC= async ()=>{    
    return (
        <>
        <BasicGoalNav/>
        <div className="flex justify-between">
            <div className="w-2/3">
                <LatestWeightForm/>
                <StaticDetailForm/>
            </div>
            <div className="w-1/3 h-[400px] w-[300px] bg-gray-100">
            ads
            </div>
        </div>
        </>
    );
}

export default BasicPage