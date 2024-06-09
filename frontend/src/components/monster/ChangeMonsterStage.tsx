'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { fetchSelectedMonster } from '@/backend_api/monster/fetchSelectedMonster';
import { Monster } from '@/interfaces/monster.interface';
import { updateMonsterStage } from '@/backend_api/monster/updateMonsterStage';

type MonsterResponse = { monster: Monster, selected_stage: 0 | 1 | 2 | 3 | 4 | 5 }
interface Props {
    monsterRes: MonsterResponse | null;
}

const ChangeMonsterStage: React.FC<Props> = ({ monsterRes }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleChangeStage = async () => {
        if (!monsterRes) return;

        const nextStage = (monsterRes.selected_stage + 1) % 6 as 0 | 1 | 2 | 3 | 4 | 5;

        try {
            const response = await updateMonsterStage({ selected_stage: nextStage });
            if ('error' in response) {
                dispatch(setToast({ message: response.error, type: 'error' }));
                setTimeout(() => dispatch(resetToast()), 3000);
            } else {
                dispatch(setToast({ message: 'Monster stage updated successfully!', type: 'success' }));
                setTimeout(() => dispatch(resetToast()), 3000);
                
            }
        } catch (error) {
            console.error('Error updating monster stage:', error);
            dispatch(setToast({ message: 'An error occurred while updating monster stage', type: 'error' }));
            setTimeout(() => dispatch(resetToast()), 3000);
        }
    };

    if (!monsterRes || monsterRes.monster.grow_points < 600) {
        return null; // grow_pointsが600未満の場合、コンポーネントを表示しない
    }

    return (
        <div className="max-w-xl mx-auto mt-4 p-4 bg-yellow-50 rounded-lg shadow-md text-sm">
            <button
                onClick={handleChangeStage}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
                Change Stage
            </button>
        </div>
    );
};

export default ChangeMonsterStage;
