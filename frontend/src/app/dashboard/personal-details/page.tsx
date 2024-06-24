import StaticDetailForm from "@/components/user_detail/StaticDetailForm";
import LatestWeightForm from "@/components/user_detail/LatestWeightForm";
import BasicGoalNav from "@/components/navigation/BasicGoalNav";
import Ads from "@/components/main/Ads";

const BasicPage: React.FC= async ()=>{    
    return (
        <>
        <BasicGoalNav/>
        <div className="flex justify-between max-sm:flex-col">
            <div className="w-5/6 max-sm:w-full">
                <LatestWeightForm/>
                <StaticDetailForm/>
            </div>
            <div className="flex sm:flex-col">
                <div className="w-1/6 h-[250px] w-[300px] max-sm:w-[400px] max-sm:h-[150px]">
                    <Ads/>
                </div>
                <div className="w-1/6 h-[250px] w-[300px] max-sm:w-[400px] max-sm:h-[150px]">
                    <Ads/>
                </div>
            </div>
        </div>
        <div className="flex">
                <div className="w-1/3 h-[200px] border max-sm:w-1/2">
                    <Ads/>
                </div>
                <div className="w-1/3 h-[200px] border max-sm:w-1/2">
                    <Ads/>
                </div>
            </div>
        </>
    );
}

export default BasicPage