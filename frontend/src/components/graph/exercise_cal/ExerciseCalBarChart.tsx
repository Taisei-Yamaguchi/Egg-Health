import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { GoalDetail } from '@/interfaces/user_detail.inteface';
import { registerables } from 'chart.js';
import { Chart } from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';
Chart.register(...registerables);
Chart.register(Annotation);

interface Props {
    data: {
        date: string;
        sum_exercise_cal: number;
    }[];
    goal: GoalDetail | null | undefined;
}

const ExerciseCalBarChart: React.FC<Props> = ({ data, goal }) => {
    const labels = data.map(item => item.date);
    const exerciseData = data.map(item => item.sum_exercise_cal);
    const goalExerciseCal = goal?.goal_consume_cal ?? null;
    
    // Chart.jsのデータとオプション
    const chartData: ChartData<'bar'> = {
        labels,
        datasets: [
            {
                label: 'Exercise Calories',
                data: exerciseData,
                backgroundColor: 'rgba(255, 99, 71, 0.4)',  // 赤オレンジ（少し濃く）
                borderColor: 'rgba(255, 99, 71, 1)', 
                borderWidth: 1,
            }
        ],
    };

    const maxExerciseData = Math.max(...exerciseData);
    let maxBound: number;
    if (goalExerciseCal !== null) {
        maxBound = Math.max(goalExerciseCal + 200, maxExerciseData + 100);
    } else {
        maxBound = maxExerciseData + 100;
    }

    // グラフに表示する横線の設定
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
                    text: 'Exercise Calorie (kcal)',
                },
                beginAtZero: true,
                max: maxBound
            }
        },
        plugins: {
            annotation: typeof goalExerciseCal === 'number' ? {
                annotations: {
                    line1: {
                        type: 'line',
                        yMin: goalExerciseCal,
                        yMax: goalExerciseCal,
                        borderColor: 'rgb(255, 99, 132)',
                        borderWidth: 2,
                    }
                }
            } : undefined
        }
    };

    return <Bar data={chartData} options={options} height={300} />;
};

export default ExerciseCalBarChart;
