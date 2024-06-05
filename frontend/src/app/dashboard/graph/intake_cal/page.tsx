import RenderIntakeCalBar from "@/components/graph/intake_cal/RenderIntakeCalBar";
const IntakeCalGraphPage: React.FC= async ()=>{    
    return (
        <div className="flex justify-between">
            <div className="w-3/4">
            <RenderIntakeCalBar/>
            </div>
            <div className="w-1/4 h-[400px] w-[200px] bg-gray-100">
            ads
            </div>
        </div>
    );
}

export default IntakeCalGraphPage