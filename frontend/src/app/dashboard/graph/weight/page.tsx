import RenderLineWeight from "@/components/graph/weight_fat/RenderLineWeight";
const WeightGraphPage: React.FC= async ()=>{    
    return (
        <div className="flex justify-between">
            <div className="w-2/3">
            <RenderLineWeight/>
            </div>
            <div className="w-1/3 h-[400px] w-[300px] bg-gray-100">
            ads
            </div>
        </div>
    );
}

export default WeightGraphPage