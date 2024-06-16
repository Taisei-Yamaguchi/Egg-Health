import React from 'react';

interface MonsterGrowBarProps {
    grow_points: number;
}

const MonsterGrowBar: React.FC<MonsterGrowBarProps> = ({ grow_points }) => {
    const MAX_LEVEL = 600;
    const LEVEL_INTERVAL = 100;
    const levels = Math.min(Math.floor(grow_points / LEVEL_INTERVAL), MAX_LEVEL / LEVEL_INTERVAL);
    const isCompletelyGrown = grow_points >= MAX_LEVEL;
    const percentage = isCompletelyGrown ? 100 : Math.min((grow_points % LEVEL_INTERVAL) / LEVEL_INTERVAL * 100, 100);
    const barColor = isCompletelyGrown ? 'bg-yellow-300' : 'bg-green-200';

    return (
        <div className="flex items-center space-x-2 w-full">
            <div className="w-full bg-gray-200 rounded-full h-4">
                <div className={`h-4 rounded-full ${barColor}`} style={{ width: `${percentage}%` }}></div>
            </div>
            <span className="text-base font-medium">
                {isCompletelyGrown ? 'Max' : `Lv.${levels + 1}`}
            </span>
        </div>
    );
};

export default MonsterGrowBar;
