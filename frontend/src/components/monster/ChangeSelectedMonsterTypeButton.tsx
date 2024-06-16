'use client';

import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { updateMonsterType } from '@/backend_api/monster/updateMonsterSelectedType';
import { setMonsterLoading } from '@/store/slices/load.slice';

interface Props {
    monsterType: "Normal" | "Premium" | "Cat"
}

const ChangeSelectedMonsterTypeButton: React.FC<Props> = ({ monsterType }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleChangeSelectedMonsterType = async () => {
        try {
            dispatch(setMonsterLoading(true))
            const response = await updateMonsterType({ selected_monster: monsterType });
            if ('error' in response) {
                dispatch(setToast({ message: response.error, type: 'error' }));
                setTimeout(() => dispatch(resetToast()), 3000);
            } else {
                dispatch(setToast({ message: 'Monster stage updated successfully!', type: 'success' }));
                setTimeout(() => dispatch(resetToast()), 3000);
                // 必要に応じてページをリロードするか、データを再取得します
                router.refresh();
            }
        } catch (error) {
            console.error('Error updating monster stage:', error);
            dispatch(setToast({ message: 'An error occurred while updating monster stage', type: 'error' }));
            setTimeout(() => dispatch(resetToast()), 3000);
        } finally{
            dispatch(setMonsterLoading(false))
        }
    };

    return (
        <button
            onClick={handleChangeSelectedMonsterType}
            className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-700 text-xs"
        >
            Select 
        </button>
    );
};

export default ChangeSelectedMonsterTypeButton;
