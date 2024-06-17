'use client';

import MonsterListComponent from "@/components/monster/MonstersListComponent";

const MonsterPage: React.FC = () => { 
    return (
        <>
            
            <div className="flex justify-center mt-6 w-full border max-sm:flex-col">
                <div className="w-5/6 flex flex-col items-center max-sm:w-full">
                    <MonsterListComponent/>
                </div>
                <div className="w-1/6 ml-4 max-sm:w-full max-sm:h-[100px] max-sm:ml-0">
                    <div className="w-full h-full bg-slate-100">ads</div>
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

export default MonsterPage
