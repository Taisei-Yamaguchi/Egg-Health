'use client';

import MonsterListComponent from "@/components/monster/MonstersListComponent";

const MonsterPage: React.FC = () => { 
    return (
        <>
            
            <div className="flex justify-center mt-6 w-full border max-md:flex-col">
                <div className="w-5/6 flex flex-col items-center max-sm:w-full">
                    <MonsterListComponent/>
                </div>
                <div className="w-1/6 ml-4 max-md:w-full h-[400px] w-[300px] bg-gray-100 max-md:h-[150px]">
                    <div className="w-full h-full bg-slate-100">ads</div>
                </div>
            </div>
            <div className="flex">
                <div className="w-1/3 h-[200px] bg-slate-200 border">
                    
                </div>
                <div className="w-1/3 h-[200px] bg-slate-200 border">
                    
                </div>
            </div>
        </>
    );
}

export default MonsterPage
