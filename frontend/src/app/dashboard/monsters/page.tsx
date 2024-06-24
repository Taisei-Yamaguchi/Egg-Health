'use client';

import MonsterListComponent from "@/components/monster/MonstersListComponent";
import Ads from "@/components/main/Ads";
const MonsterPage: React.FC = () => { 
    return (
        <>
            
            <div className="flex justify-center mt-6 w-full border max-md:flex-col">
                <div className="w-5/6 flex flex-col items-center max-sm:w-full">
                    <MonsterListComponent/>
                </div>
                <div className="w-1/6 ml-4 max-md:w-full h-[400px] w-[300px] max-md:h-[150px]">
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

export default MonsterPage
