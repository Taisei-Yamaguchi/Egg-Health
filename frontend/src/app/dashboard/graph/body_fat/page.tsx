import RenderLineBodyFat from "@/components/graph/weight_fat/RenderLineBodyFat";
const BodyFatGraphPage: React.FC= async ()=>{    
    return (
        <div className="flex justify-between">
            <div className="w-2/3">
            <RenderLineBodyFat/>
            </div>
            <div className="w-1/3 h-[400px] w-[300px] bg-gray-100">
            ads
            </div>
        </div>
    );
}

export default BodyFatGraphPage