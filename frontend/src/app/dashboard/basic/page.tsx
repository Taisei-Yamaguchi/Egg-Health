import StaticDetailForm from "@/components/user_detail/StaticDetailForm";
import LatestWeightForm from "@/components/user_detail/LatestWeightForm";

const BasicPage: React.FC= async ()=>{    
    return (
        <div className="my-20">
            <LatestWeightForm/>
            <StaticDetailForm/>
        </div>
    );
}

export default BasicPage