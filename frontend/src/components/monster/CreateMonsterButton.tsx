'use client';

import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { createMonster } from '@/backend_api/monster/createMonster';

interface Props {
    monsterType: "Normal" | "Premium" | "Cat"
}

const CreateMonsterButton: React.FC<Props> = ({ monsterType }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleCreate = async () => {
        try {
            const response = await createMonster({ monster_type: monsterType });
            if ('error' in response) {
                dispatch(setToast({ message: response.error, type: 'error' }));
                setTimeout(() => dispatch(resetToast()), 3000);
            } else {
                dispatch(setToast({ message: 'Monster created successfully!', type: 'success' }));
                setTimeout(() => dispatch(resetToast()), 3000);
                router.refresh();
            }
        } catch (error) {
            console.error('Error creating monster:', error);
            dispatch(setToast({ message: 'An error occurred while creating monster', type: 'error' }));
            setTimeout(() => dispatch(resetToast()), 3000);
        }
    };

    return (
        <button
            onClick={handleCreate}
            className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-700 text-xs flex items-center"
        >
            Release
            <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11V7a4 4 0 10-8 0v4M6 11V7m0 8h.01M18 11h.01M5 15h.01M19 15h.01M12 19v-4m-7 4h14a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2z"></path>
            </svg>
        </button>
    );
};

export default CreateMonsterButton;
