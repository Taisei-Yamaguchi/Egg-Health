'use client';

import { fetchGoal } from "@/backend_api/user_detail/fetchGoal";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store";
import { setToast, resetToast } from "@/store/slices/toast.slice";
import { Monster } from "@/interfaces/monster.interface";
import { fetchMonstersList } from "@/backend_api/monster/fetchMonstersList";
import MonsterListComponent from "@/components/monster/MonstersListComponent";

const MonsterPage: React.FC = () => { 
    return (
        <>
            
            <div className="flex justify-center mt-6 w-full border">
                <div className="w-5/6 flex flex-col items-center">
                    <MonsterListComponent/>
                </div>
                <div className="w-1/6 ml-4">
                    <div className="w-full h-full bg-slate-100">ads</div>
                </div>
            </div>
            <div className="w-full h-[200px] bg-yellow-100">
                footer
            </div>
        </>
    );
}

export default MonsterPage
