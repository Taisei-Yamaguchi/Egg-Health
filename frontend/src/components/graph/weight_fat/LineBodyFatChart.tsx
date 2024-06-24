import { DynamicDetail, GoalDetail } from '@/interfaces/user_detail.inteface';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
import { fillMissingDates } from '@/helper/modifyDynamicForGraph';
import Annotation from 'chartjs-plugin-annotation';
Chart.register(...registerables);
Chart.register(Annotation);

interface Props {
    data: DynamicDetail[];
    period: string;
    goal: GoalDetail | null | undefined;
}

const LineBodyFatChart: React.FC<Props> = ({ data, period, goal }) => {
    const modifiedData = fillMissingDates(data, period);
    const bodyFatValues = modifiedData.map(item => item.body_fat).filter((value): value is number => value !== null && value !== undefined);
    const minBodyFat = Math.min(...bodyFatValues);
    const maxBodyFat = Math.max(...bodyFatValues);
    const goalBodyFat = goal?.goal_body_fat ?? null;

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

    const minBound = Math.max(0, minBodyFat - 5);
    const maxBound = maxBodyFat + 5;

    let minToUse = minBound;
    let maxToUse = maxBound;

    if (typeof goalBodyFat === 'number') {
        if (goalBodyFat < minBound) {
            minToUse = Math.max(0, goalBodyFat - 3);
        } else if (goalBodyFat > maxBound) {
            maxToUse = goalBodyFat + 3;
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
                        const date = new Date(chartData.labels[index]);
                        const month = date.getUTCMonth() + 1;
                        const day = date.getUTCDate();
                        return `${month}/${day}`;
                    },
                    color: 'black'
                },
            },
            'y-bodyFat': {
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
                        label: {
                            content: `Goal: ${goalBodyFat}%`,
                            enabled: true,
                            position: "end",
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            color: 'rgb(75, 192, 192)',
                        }
                    }
                }
            } : undefined
        }
    } as any;

    return (
        <div className='relative'>
            {goalBodyFat !== null && (
                <div className=" w-full text-center text-gray-700 py-2 z-10">
                    Goal Body Fat: {goalBodyFat} %
                </div>
            )}
            <Line 
                data={chartData} 
                options={options} 
                height={300} 
                className='border'
                style={{ backgroundColor: 'rgba(245, 245, 220, 0.2)' }} 
            />
        </div>
    );
};

export default LineBodyFatChart;
