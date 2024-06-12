import StaticDetailForm from "@/components/user_detail/StaticDetailForm";
import LatestWeightForm from "@/components/user_detail/LatestWeightForm";
import BasicGoalNav from "@/components/navigation/BasicGoalNav";

const BasicPage: React.FC= async ()=>{    
    return (
        <>
        <BasicGoalNav/>
        <div className="flex justify-between">
            <div className="w-5/6">
                <LatestWeightForm/>
                <StaticDetailForm/>
            </div>
            <div className="w-1/6 h-[400px] w-[300px] bg-gray-100">
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
        <div className="w-full h-[200px] bg-yellow-100">
            footer
        </div>
        </>
    );
}

export default BasicPage