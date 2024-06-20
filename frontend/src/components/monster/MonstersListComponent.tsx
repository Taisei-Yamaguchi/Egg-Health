// 'use client';

// import { useEffect, useState } from 'react';
// import { useAppDispatch } from '@/store';
// import { resetToast, setToast } from '@/store/slices/toast.slice';
// import { fetchMonstersList } from '@/backend_api/monster/fetchMonstersList';
// import { Monster } from '@/interfaces/monster.interface';
// import ChangeSelectedMonsterTypeButton from './ChangeSelectedMonsterTypeButton';
// import CreateMonsterButton from './CreateMonsterButton';
// import MonsterGrowBar from './MonsterGrowBar';
// import { useAppSelector } from '@/store';
// import { RootState } from '@/store';

// type MonsterResponse = { 
//     normal_monster: Monster | null, 
//     premium_monster: Monster | null,
//     cat_monster: Monster | null,
//     selected_stage: 0 | 1 | 2 | 3 | 4 | 5, 
//     selected_type: "Normal" | "Premium" | "Cat" };
    
// const MonsterListComponent: React.FC = () => {
//     const dispatch = useAppDispatch();
//     const [monsterRes, setMonsterRes] = useState<MonsterResponse | null>(null);
//     const monster_loading = useAppSelector((state: RootState) => state.load.monster_loading) as boolean;
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const openModal = () => setIsModalOpen(true);
//     const closeModal = () => setIsModalOpen(false);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetchMonstersList();
//                 if ('error' in response) {
//                     dispatch(setToast({ message: response.error, type: 'error' }));
//                     setTimeout(() => dispatch(resetToast()), 3000);
//                 } else if ('message' in response) {
//                     setMonsterRes(response.data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 dispatch(setToast({ message: 'An error occurred while fetching monsters', type: 'error' }));
//                 setTimeout(() => dispatch(resetToast()), 3000);
//             }
//         };
//         fetchData();
//     }, [dispatch,monster_loading]);

//     const getImageUrl = (monsterType: "Normal" | "Premium" | "Cat", growPoints: number) => {
//         const base = monsterType === 'Premium' ? '/images/2-' : monsterType === 'Cat' ? '/images/3-' : '/images/1-';
//         const stage = 
//             growPoints < 100 ? 0 :
//             growPoints < 200 ? 1 :
//             growPoints < 300 ? 2 :
//             growPoints < 400 ? 3 :
//             growPoints < 500 ? 4 : 5;
//         return `${base}${['egg', 'baby', 'young', 'adolescent', 'adult', 'final'][stage]}.png`;
//     };

//     const renderMonsterCard = (monster: Monster | null, monsterType: "Normal" | "Premium" | "Cat") => {
//         const isLocked = !monster;
//         const growPoints = monster ? monster.grow_points : 0;
//         const imageUrl = getImageUrl(monsterType, growPoints);
//         return (
//             <div className="relative bg-white p-2 rounded-lg shadow-sm text-center">
//                 <div className="relative w-28 h-28 mx-auto mb-1">
//                     <img src={imageUrl} alt="Monster" className={`w-full h-full object-contain ${isLocked ? 'opacity-25' : ''}`} />
//                     {growPoints >= 600 && !isLocked && (
//                         <div className="absolute top-0 left-0 transform -translate-y-full bg-green-500 text-white text-xs px-1 py-0.5 rounded-bl-lg">
//                             Fully Grown!
//                         </div>
//                     )}
//                     {isLocked && (
//                         <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                             <span className="text-gray-200 text-3xl">🔒</span>
//                         </div>
//                     )}
//                 </div>
//                 <div className="mt-2">
//                     <p className="text-xs font-semibold"> {monsterType}</p>
//                     {monster && <MonsterGrowBar grow_points={growPoints}/> }
                    
//                     {!isLocked && (monster?.monster_type === monsterRes?.selected_type ? (
//                         <p className="text-xs text-blue-500 mt-1">Selected Now</p>
//                     ) : (
//                         <ChangeSelectedMonsterTypeButton monsterType={monsterType} />
//                     ))}
//                     {isLocked && (
//                         <CreateMonsterButton monsterType={monsterType} />
//                     )}
//                 </div>
//             </div>
//         );
//     };

//     if (!monsterRes) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="max-w-5xl mx-auto mt-4 p-4 bg-yellow-50 rounded-lg shadow-md text-sm">
//             <h2 className="text-center text-2xl font-bold mb-4">Monster Encyclopedia</h2>
//             <button className="self-center border-b text-purple-600 hover:text-purple-400 text-sm mb-8" onClick={openModal}>
//                 * Monster Growth Rules
//             </button>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//                 {renderMonsterCard(monsterRes.normal_monster, 'Normal')}
//                 {renderMonsterCard(monsterRes.premium_monster, 'Premium')}
//                 {renderMonsterCard(monsterRes.cat_monster, 'Cat')}
//                 {/* Coming Soon Section */}
//                 {Array.from({ length: 3 }).map((_, index) => (
//                     <div key={`coming-soon-${index}`} className="bg-gray-200 p-4 rounded-lg shadow-sm text-center">
//                         <div className="w-32 h-32 mx-auto flex items-center justify-center mb-2">
//                             <span className="text-lg font-bold">Coming Soon!</span>
//                         </div>
//                         <div className="mt-2">
//                             <p className="text-xs font-semibold">???</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             {isModalOpen && (
//                 <div className="fixed inset-0 flex items-center justify-center z-50">
//                     <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
//                     <div className="bg-white rounded-lg shadow-lg p-6 z-10 relative w-3/4">
//                         <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500">×</button>
//                         <h1 className='text-xl font-bold m-4'>Monster Growth Rules</h1>
//                         <div className="text-base text-gray-500">
//                             <ul>
//                                 <li>1. Monsters grow based on your daily inputs.</li>
//                                 <li>2. The closer your records are to your goal intake and goal consume calories, the more your monster will grow.</li>
//                                 <li>3. The currently selected monster will grow with your progress.</li>
//                                 <li>4. If you want to grow different monsters, unlock and select new ones from the monster list (Premium plan).</li>
//                                 <li>5. Each monster goes through 6 growth stages.</li>
//                                 <li>6. Once a monster reaches its maximum level, you can freely change its appearance to any of its growth stages on the dashboard!</li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MonsterListComponent;
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
    selected_stage: 0 | 1 | 2 | 3 | 4 | 5, 
    selected_type: "Normal" | "Premium" | "Cat" 
};

const MonsterListComponent: React.FC = () => {
    const dispatch = useAppDispatch();
    const [monsterRes, setMonsterRes] = useState<MonsterResponse | null>(null);
    const monster_loading = useAppSelector((state: RootState) => state.load.monster_loading) as boolean;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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
    }, [dispatch, monster_loading]);

    const getImageUrl = (monsterType: "Normal", growPoints: number) => {
        const base = '/images/1-';
        const stage = 
            growPoints < 100 ? 0 :
            growPoints < 200 ? 1 :
            growPoints < 300 ? 2 :
            growPoints < 400 ? 3 :
            growPoints < 500 ? 4 : 5;
        return `${base}${['egg', 'baby', 'young', 'adolescent', 'adult', 'final'][stage]}.png`;
    };

    const renderMonsterCard = (monster: Monster | null, monsterType: "Normal") => {
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
                    {monster && <MonsterGrowBar grow_points={growPoints}/> }
                    
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
            <button className="self-center border-b text-purple-600 hover:text-purple-400 text-sm mb-8" onClick={openModal}>
                * Monster Growth Rules
            </button>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {renderMonsterCard(monsterRes.normal_monster, 'Normal')}
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
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
                    <div className="bg-white rounded-lg shadow-lg p-6 z-10 relative w-3/4">
                        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500">×</button>
                        <h1 className='text-xl font-bold m-4'>Monster Growth Rules</h1>
                        <div className="text-base text-gray-500">
                            <ul>
                                <li>1. Monsters grow based on your daily inputs.</li>
                                <li>2. The closer your records are to your goal intake and goal burn calories, the more your monster will grow.</li>
                                <li>3. The currently selected monster will grow with your progress.</li>
                                <li>4. If you want to grow different monsters, unlock and select new ones from the monster list (Premium+ plan).</li>
                                <li>5. Each monster goes through 6 growth stages.</li>
                                <li>6. Once a monster reaches its maximum level, you can freely change its appearance to any of its growth stages on the dashboard!</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MonsterListComponent;
