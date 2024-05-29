import { DynamicDetail, GoalDetail } from '@/interfaces/user_detail.inteface';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
import { useEffect } from 'react';
import { fillMissingDates } from '@/helper/modifyDynamicForGraph';
import Annotation from 'chartjs-plugin-annotation';
Chart.register(...registerables);
Chart.register(Annotation)

interface Props {
    data: DynamicDetail[];
    period: string;
    goal: GoalDetail | null | undefined;
}

const LineBodyFatChart: React.FC<Props> = ({ data, period, goal }) => {
    const modifiedData = fillMissingDates(data, period);
    // body_fatの最小値と最大値を取得
    const bodyFatValues = modifiedData.map(item => item.body_fat).filter((value): value is number => value !== null && value !== undefined);
    const minBodyFat = Math.min(...bodyFatValues);
    const maxBodyFat = Math.max(...bodyFatValues);
    const goalBodyFat = goal?.goal_body_fat ?? null

    // グラフ用のデータ
    const chartData = {
        labels: modifiedData.map(item => item.date),
        datasets: [
            {
                label: 'Body Fat',
                data: modifiedData.map(item => item.body_fat),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                yAxisID: 'y-bodyFat',
                spanGaps: true,
            },
        ],
    };

    const minBound = Math.max(0, minBodyFat - 5); // 最小値の範囲
    const maxBound = maxBodyFat + 5; // 最大値の範囲

    let minToUse = minBound;
    let maxToUse = maxBound;

    if (typeof goalBodyFat === 'number') {
        if (goalBodyFat < minBound) {
            minToUse = Math.max(0, goalBodyFat - 3); // min未満にならないように制約を加える
        } else if (goalBodyFat > maxBound) {
            maxToUse = goalBodyFat + 3; // max以上にならないように制約を加える
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
            'y-bodyFat': { // body_fat用のY軸設定
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: 'Body Fat (%)',
                },
                min: minToUse,
                max: maxToUse
            },
        },
        plugins: {
            annotation: typeof goalBodyFat === 'number' ? {
                annotations: {
                    line1: {
                        type: 'line',
                        yMin: goalBodyFat,
                        yMax: goalBodyFat,
                        borderColor: 'rgb(75, 192, 192)',
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

export default LineBodyFatChart;
