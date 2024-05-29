import { DynamicDetail, GoalDetail } from '@/interfaces/user_detail.inteface';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
import { useEffect } from 'react';
import { fillMissingDates } from '@/helper/modifyDynamicForGraph';
import Annotation from 'chartjs-plugin-annotation';
Chart.register(Annotation);
Chart.register(...registerables);

interface Props {
    data: DynamicDetail[];
    period: string;
    goal: GoalDetail | null | undefined;
}

const LineWeightChart: React.FC<Props> = ({ data, period, goal }) => {
    const modifiedData = fillMissingDates(data, period);
    // weightの最小値と最大値を取得
    const weightValues = modifiedData.map(item => item.weight).filter((value): value is number => value !== null && value !== undefined);
    const minWeight = Math.min(...weightValues);
    const maxWeight = Math.max(...weightValues);
    const goalWeight = goal?.goal_weight ?? null;
    // グラフ用のデータ
    const chartData = {
        labels: modifiedData.map(item => item.date),
        datasets: [
            {
                label: 'Weight',
                data: modifiedData.map(item => item.weight),
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1,
                yAxisID: 'y-weight',
                spanGaps: true,
            },
        ],
    };

    const minBound = Math.max(0, minWeight - 20); // 最小値の範囲
    const maxBound = maxWeight + 20; // 最大値の範囲

    let minToUse = minBound;
    let maxToUse = maxBound;

    if (typeof goalWeight === 'number') {
        if (goalWeight < minBound) {
            minToUse = Math.max(0, goalWeight - 10); // min未満にならないように制約を加える
        } else if (goalWeight > maxBound) {
            maxToUse = goalWeight + 10; // max以上にならないように制約を加える
        }
    }
    
    const options = {
        scales: {
            x: {
                type: 'category',
                title: {
                    display: true,
                    text: 'Date',
                },
                ticks: {
                    callback: function (value: any, index: number, values: any) {
                        // 'yyyy-mm-dd'の形式から 'mm/dd' 形式に変換
                        const date = new Date(chartData.labels[index]);
                        const month = date.getUTCMonth() + 1;
                        const day = date.getUTCDate();
                        return `${month}/${day}`;
                    },
                },
            },
            'y-weight': { // weight用のY軸設定
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: 'Weight (kg)',
                },
                min: minToUse,
                max: maxToUse,
            },
        },
        plugins: {
            annotation: typeof goalWeight === 'number' ? {
                annotations: {
                    line1: {
                        type: 'line',
                        yMin: goalWeight,
                        yMax: goalWeight,
                        borderColor: 'rgba(255, 0, 0, 0.5',
                        borderWidth: 2,
                    }
                }
            } : undefined
        }
    } as any;
    

    return (
        <Line 
            data={chartData} 
            options={options} 
            height={300} 
            className='border'
        />
    );
};

export default LineWeightChart;
