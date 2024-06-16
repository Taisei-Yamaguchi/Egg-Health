'use client';

import { Monster } from '@/interfaces/monster.interface';
import MonsterGrowBar from './MonsterGrowBar';

type MonsterResponse = { monster: Monster, selected_stage: 0 | 1 | 2 | 3 | 4 | 5 }
interface Props {
    monsterRes: MonsterResponse | null;
}

const RenderSelectedMonster: React.FC<Props> = ({ monsterRes }) => {
    const getImageUrl = () => {
        if (!monsterRes) {
            return '/images/1-egg.png';
        }

        const { monster, selected_stage } = monsterRes;
        let prefix = '1-';

        switch (monster.monster_type) {
            case 'Premium':
                prefix = '2-';
                break;
            case 'Cat':
                prefix = '3-';
                break;
            case 'Normal':
            default:
                prefix = '1-';
                break;
        }

        if (monster.grow_points >= 600) {
            switch (selected_stage) {
                case 0:
                    return `/images/${prefix}egg.png`;
                case 1:
                    return `/images/${prefix}baby.png`;
                case 2:
                    return `/images/${prefix}young.png`;
                case 3:
                    return `/images/${prefix}adolescent.png`;
                case 4:
                    return `/images/${prefix}adult.png`;
                case 5:
                    return `/images/${prefix}final.png`;
                default:
                    return `/images/${prefix}egg.png`;
            }
        }

        if (monster.grow_points < 100) {
            return `/images/${prefix}egg.png`;
        } else if (monster.grow_points < 200) {
            return `/images/${prefix}baby.png`;
        } else if (monster.grow_points < 300) {
            return `/images/${prefix}young.png`;
        } else if (monster.grow_points < 400) {
            return `/images/${prefix}adolescent.png`;
        } else if (monster.grow_points < 500) {
            return `/images/${prefix}adult.png`;
        } else if (monster.grow_points < 600) {
            return `/images/${prefix}final.png`;
        }

        return `/images/${prefix}egg.png`;
    };

    const imageUrl = getImageUrl();

    return (
        <div className="max-w-xl mx-auto mt-4 p-4 bg-yellow-50 rounded-lg shadow-md text-sm">
            <img src={imageUrl} alt="Monster" className="mx-auto" />
            {monsterRes && (
                <div className='flex flex-col items-center'>
                    <p className="text-sm font-semibold"> {monsterRes.monster.monster_type}</p>
                    {/* <p>{monsterRes.monster.grow_points}</p> */}
                    <MonsterGrowBar grow_points={monsterRes.monster.grow_points}/>
                </div>
            )}
        </div>
    );
};

export default RenderSelectedMonster;
