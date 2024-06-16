'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { fetchMonstersList } from '@/backend_api/monster/fetchMonstersList';
import { Monster } from '@/interfaces/monster.interface';
import ChangeSelectedMonsterTypeButton from './ChangeSelectedMonsterTypeButton';
import CreateMonsterButton from './CreateMonsterButton';
import MonsterGrowBar from './MonsterGrowBar';
import { useAppSelector } from '@/store';
import { RootState } from '@/store';

type MonsterResponse = { 
    normal_monster: Monster | null, 
    premium_monster: Monster | null,
    cat_monster: Monster | null,
    selected_stage: 0 | 1 | 2 | 3 | 4 | 5, 
    selected_type: "Normal" | "Premium" | "Cat" };
    
const MonsterListComponent: React.FC = () => {
    const dispatch = useAppDispatch();
    const [monsterRes, setMonsterRes] = useState<MonsterResponse | null>(null);
    const monster_loading = useAppSelector((state: RootState) => state.load.monster_loading) as boolean;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchMonstersList();
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: 'error' }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                } else if ('message' in response) {
                    setMonsterRes(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                dispatch(setToast({ message: 'An error occurred while fetching monsters', type: 'error' }));
                setTimeout(() => dispatch(resetToast()), 3000);
            }
        };
        fetchData();
    }, [dispatch,monster_loading]);

    const getImageUrl = (monsterType: "Normal" | "Premium" | "Cat", growPoints: number) => {
        const base = monsterType === 'Premium' ? '/images/2-' : monsterType === 'Cat' ? '/images/3-' : '/images/1-';
        const stage = 
            growPoints < 100 ? 0 :
            growPoints < 200 ? 1 :
            growPoints < 300 ? 2 :
            growPoints < 400 ? 3 :
            growPoints < 500 ? 4 : 5;
        return `${base}${['egg', 'baby', 'young', 'adolescent', 'adult', 'final'][stage]}.png`;
    };

    const renderMonsterCard = (monster: Monster | null, monsterType: "Normal" | "Premium" | "Cat") => {
        const isLocked = !monster;
        const growPoints = monster ? monster.grow_points : 0;
        const imageUrl = getImageUrl(monsterType, growPoints);
        return (
            <div className="relative bg-white p-2 rounded-lg shadow-sm text-center">
                <div className="relative w-28 h-28 mx-auto mb-1">
                    <img src={imageUrl} alt="Monster" className={`w-full h-full object-contain ${isLocked ? 'opacity-25' : ''}`} />
                    {growPoints >= 600 && !isLocked && (
                        <div className="absolute top-0 left-0 transform -translate-y-full bg-green-500 text-white text-xs px-1 py-0.5 rounded-bl-lg">
                            Fully Grown!
                        </div>
                    )}
                    {isLocked && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <span className="text-gray-200 text-3xl">🔒</span>
                        </div>
                    )}
                </div>
                <div className="mt-2">
                    <p className="text-xs font-semibold"> {monsterType}</p>
                    <MonsterGrowBar grow_points={growPoints}/>
                    {!isLocked && (monster?.monster_type === monsterRes?.selected_type ? (
                        <p className="text-xs text-blue-500 mt-1">Selected Now</p>
                    ) : (
                        <ChangeSelectedMonsterTypeButton monsterType={monsterType} />
                    ))}
                    {isLocked && (
                        <CreateMonsterButton monsterType={monsterType} />
                    )}
                </div>
            </div>
        );
    };

    if (!monsterRes) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto mt-4 p-4 bg-yellow-50 rounded-lg shadow-md text-sm">
            <h2 className="text-center text-2xl font-bold mb-4">Monster Encyclopedia</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {renderMonsterCard(monsterRes.normal_monster, 'Normal')}
                {renderMonsterCard(monsterRes.premium_monster, 'Premium')}
                {renderMonsterCard(monsterRes.cat_monster, 'Cat')}
                {/* Coming Soon Section */}
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={`coming-soon-${index}`} className="bg-gray-200 p-4 rounded-lg shadow-sm text-center">
                        <div className="w-32 h-32 mx-auto flex items-center justify-center mb-2">
                            <span className="text-lg font-bold">Coming Soon!</span>
                        </div>
                        <div className="mt-2">
                            <p className="text-xs font-semibold">???</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MonsterListComponent;
