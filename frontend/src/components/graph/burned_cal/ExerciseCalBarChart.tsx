// components/ExerciseCalBarChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { registerables } from 'chart.js';
import { Chart } from 'chart.js';
import { GoalDetail } from '@/interfaces/user_detail.inteface';
import Annotation from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(Annotation);
Chart.register(ChartDataLabels);
Chart.register(...registerables);

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

    const roundedGoalExerciseCal = goalExerciseCal !== null ? Math.round(goalExerciseCal) : null;

    // Determine the color of each bar based on the exercise data
    const backgroundColors = exerciseData.map((exercise) => {
        if (goalExerciseCal !== null && exercise !== null && exercise >= goalExerciseCal - 200 && exercise <= goalExerciseCal + 200) {
            return 'rgba(255, 165, 0, 0.2)';  // オレンジ色
        } else if (goalExerciseCal !== null && exercise !== null && exercise > goalExerciseCal + 200) {
            return 'rgba(255, 165, 0, 0.2)';  // オレンジ色
        } else {
            return 'rgba(173, 216, 230, 0.2)';  // 薄い青色
        }
    });

    const borderColors = exerciseData.map((exercise) => {
        if (goalExerciseCal !== null && exercise !== null && exercise >= goalExerciseCal - 200 && exercise <= goalExerciseCal + 200) {
            return 'rgba(255, 165, 0, 1)';  // オレンジ色
        } else if (goalExerciseCal !== null && exercise !== null && exercise > goalExerciseCal + 200) {
            return 'rgba(255, 165, 0, 1)';  // オレンジ色
        } else {
            return 'rgba(173, 216, 230, 1)';  // 薄い青色
        }
    });

    // Chart.jsのデータとオプション
    const chartData: ChartData<'bar'> = {
        labels,
        datasets: [
            {
                data: exerciseData,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    };

    const maxExerciseData = Math.max(...exerciseData);
    let maxBound: number;
    if (goalExerciseCal !== null) {
        maxBound = Math.max(goalExerciseCal + 400, maxExerciseData + 400);
    } else {
        maxBound = maxExerciseData + 200;
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
                        const date = new Date(labels[index]);
                        const month = date.getUTCMonth() + 1;
                        const day = date.getUTCDate();
                        return `${month}/${day}`;
                    },
                },
                grid: {
                    display: false,
                },
                offset: true,
            },
            y: {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: 'Burned Calories (kcal)',
                },
                beginAtZero: true,
                max: maxBound,
            },
        },
        plugins: {
            annotation: typeof goalExerciseCal === 'number' ? {
                annotations: {
                    line1: {
                        type: 'line',
                        yMin: goalExerciseCal,
                        yMax: goalExerciseCal,
                        borderColor: 'rgba(255, 140, 0, 1)',  // 濃いめのオレンジ色
                        borderWidth: 2,
                    }
                }
            } : undefined,
            legend: {
                display: false,  // これでラベルを非表示にする
            },
            datalabels: {
                display: function (context: any) {
                    const exercise = context.dataset.data[context.dataIndex];
                    if (typeof exercise === 'number') {
                        return goalExerciseCal !== null && (exercise >= goalExerciseCal - 200 && exercise <= goalExerciseCal + 200 || exercise > goalExerciseCal + 200);
                    }
                    return false;
                },
                align: 'end',
                anchor: 'end',
                backgroundColor: 'rgba(255, 165, 0, 0.8)',  // オレンジ色
                borderRadius: 4,
                color: 'white',
                font: {
                    weight: 'bold',
                },
                formatter: function () {
                    return 'Good!';
                }
            }
        },
        layout: {
            padding: {
                right: 20,
                left: 20,
            }
        }
    };

    return (
        <div className="relative min-w-[355px]" >
            {roundedGoalExerciseCal !== null && (
                <div className="w-full text-center text-gray-700 py-2 z-10">
                    Goal Daily Burned Calories: {roundedGoalExerciseCal} kcal
                </div>
            )}
            <Bar data={chartData} options={options} height={200} className='border' />
        </div>
    );
};

export default ExerciseCalBarChart;
