import { DynamicDetail, GoalDetail } from '@/interfaces/user_detail.inteface';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
import { fillMissingDates } from '@/helper/modifyDynamicForGraph';
import Annotation from 'chartjs-plugin-annotation';
Chart.register(Annotation);
Chart.register(...registerables);

interface Props {
    data: DynamicDetail[];
    period: string;
    goal: GoalDetail | null | undefined;
    unit: string;
}

const convertWeight = (weight: number | null, unit: string): number | null => {
    if (weight === null) return null;
    return unit === 'lbs' ? parseFloat((weight * 2.20462).toFixed(1)) : weight;
};

const LineWeightChart: React.FC<Props> = ({ data = [], period, goal, unit }) => {
    const modifiedData = fillMissingDates(data, period);
    const weightValues = modifiedData.map(item => convertWeight(item.weight, unit)).filter((value): value is number => value !== null && value !== undefined);
    const minWeight = Math.min(...weightValues);
    const maxWeight = Math.max(...weightValues);
    const goalWeight = goal?.goal_weight ?? null;

    const chartData = {
        labels: modifiedData.map(item => item.date),
        datasets: [
            {
                label: 'Weight',
                data: modifiedData.map(item => convertWeight(item.weight, unit)),
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1,
                yAxisID: 'y-weight',
                spanGaps: true,
            },
        ],
    };

    const minBound = Math.max(0, minWeight - 20);
    const maxBound = maxWeight + 20;

    let minToUse = minBound;
    let maxToUse = maxBound;

    if (typeof goalWeight === 'number') {
        if (convertWeight(goalWeight, unit)! < minBound) {
            minToUse = Math.max(0, convertWeight(goalWeight, unit)! - 10);
        } else if (convertWeight(goalWeight, unit)! > maxBound) {
            maxToUse = convertWeight(goalWeight, unit)! + 10;
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
            'y-weight': {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: `Weight (${unit})`,
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
                        yMin: convertWeight(goalWeight, unit)!,
                        yMax: convertWeight(goalWeight, unit)!,
                        borderColor: 'rgba(255, 0, 0, 0.5)',
                        borderWidth: 2
                    }
                }
            } : undefined
        }
    } as any;

    return (
        <div className="relative">
            {goalWeight !== null && (
                <div className=" w-full text-center text-gray-700 py-2 z-10">
                    Goal Weight: {convertWeight(goalWeight, unit)?.toFixed(2)} {unit}
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

export default LineWeightChart;
