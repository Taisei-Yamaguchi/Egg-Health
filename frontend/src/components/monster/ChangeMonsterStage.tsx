'use client';

import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { Monster } from '@/interfaces/monster.interface';
import { updateMonsterStage } from '@/backend_api/monster/updateMonsterStage';
import { setMonsterLoading } from '@/store/slices/load.slice';

type MonsterResponse = { monster: Monster, selected_stage: 0 | 1 | 2 | 3 | 4 | 5 }
interface Props {
    monsterRes: MonsterResponse | null;
}

const ChangeMonsterStage: React.FC<Props> = ({ monsterRes }) => {
    const dispatch = useAppDispatch();

    const handleChangeStage = async () => {
        if (!monsterRes) return;

        const nextStage = (monsterRes.selected_stage + 1) % 6 as 0 | 1 | 2 | 3 | 4 | 5;

        try {
            dispatch(setMonsterLoading(true))
            const response = await updateMonsterStage({ selected_stage: nextStage });
            if ('error' in response) {
                dispatch(setToast({ message: response.error, type: 'error' }));
                setTimeout(() => dispatch(resetToast()), 3000);
            } else {
                dispatch(setToast({ message: 'Monster stage updated successfully!', type: 'success' }));
                setTimeout(() => dispatch(resetToast()), 3000);
                
            }
        } catch (error) {
            // console.error('Error updating monster stage:', error);
            dispatch(setToast({ message: 'An error occurred while updating monster stage', type: 'error' }));
            setTimeout(() => dispatch(resetToast()), 3000);
        } finally{
            dispatch(setMonsterLoading(false))
        }
    };

    if (!monsterRes || monsterRes.monster.grow_points < 600) {
        return null; 
    }

    return (
        <button
            onClick={handleChangeStage}
            className="bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600 text-[10px] m-2"
        >
            Change Stage
        </button>
    );
};

export default ChangeMonsterStage;
