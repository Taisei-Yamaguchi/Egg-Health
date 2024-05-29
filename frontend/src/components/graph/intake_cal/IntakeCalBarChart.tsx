// components/BarChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { registerables } from 'chart.js';
import { Chart } from 'chart.js';
import { GoalDetail } from '@/interfaces/user_detail.inteface';
import Annotation from 'chartjs-plugin-annotation';

Chart.register(Annotation);
Chart.register(...registerables);

interface Props {
    data: {
        date: string;
        sum_intake_cal: number;
    }[],
    goal: GoalDetail | null | undefined;
}

const IntakeCalBarChart: React.FC<Props> = ({ data ,goal}) => {
    const labels = data.map(item => item.date);
    const intakeData = data.map(item => item.sum_intake_cal);
    const goalIntakeCal = goal?.goal_intake_cal ?? null;

    // Chart.jsのデータとオプション
    const chartData: ChartData<'bar'> = {
        labels,
        datasets: [
            {
                label: 'Intake Calories',
                data: intakeData,
                backgroundColor: 'rgba(46, 204, 113, 0.2)',  // グリーンベースの色
                borderColor: 'rgba(46, 204, 113, 1)',       // グリーンベースの色
                borderWidth: 1,
            },
        ],
    };

    const maxIntakeData = Math.max(...intakeData);
    let maxBound: number;
    if (goalIntakeCal !== null) {
        maxBound = Math.max(goalIntakeCal + 1000, maxIntakeData + 100);
    } else {
        maxBound = maxIntakeData + 100;
    }

    const options: ChartOptions<'bar'> = {
        scales: {
            x: {
                type: 'category',
                title: {
                    display: true,
                    text: 'Date',
                },
                ticks: {
                    callback: function (value: any, index: number) {
                        // 'yyyy-mm-dd'の形式から 'mm/dd' 形式に変換
                        const date = new Date(labels[index]);
                        const month = date.getUTCMonth() + 1;
                        const day = date.getUTCDate();
                        return `${month}/${day}`;
                    },
                },
            },
            y: {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: 'Intake Calorie (kcal)',
                },
                beginAtZero: true,
                max: maxBound,
            },
        },
        plugins: {
            annotation: typeof goalIntakeCal === 'number' ? {
                annotations: {
                    line1: {
                        type: 'line',
                        yMin: goalIntakeCal,
                        yMax: goalIntakeCal,
                        borderColor: 'rgb(0, 128, 0)',
                        borderWidth: 2,
                    },
                    band: {
                        type: 'box',
                        yMin: goalIntakeCal - 200,
                        yMax: goalIntakeCal + 200,
                        backgroundColor: 'rgba(0, 128, 0, 0.1)', 
                        borderWidth: 0,
                    }
                }
            } : undefined
        }
    };

    return <Bar data={chartData} options={options} height={300}/>;
};

export default IntakeCalBarChart;
