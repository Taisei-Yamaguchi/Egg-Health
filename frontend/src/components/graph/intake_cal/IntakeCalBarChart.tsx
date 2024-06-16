// components/IntakeCalBarChart.tsx
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
        sum_intake_cal: number;
    }[],
    goal: GoalDetail | null | undefined;
}

const IntakeCalBarChart: React.FC<Props> = ({ data, goal }) => {
    const labels = data.map(item => item.date);
    const intakeData = data.map(item => item.sum_intake_cal);
    const goalIntakeCal = goal?.goal_intake_cal ?? null;

    const roundedGoalIntakeCal = goalIntakeCal !== null ? Math.round(goalIntakeCal) : null;

    // Determine the color of each bar based on the intake data
    const backgroundColors = intakeData.map((intake) => {
        if (goalIntakeCal !== null && intake !== null && intake >= goalIntakeCal - 200 && intake <= goalIntakeCal + 200) {
            return 'rgba(255, 165, 0, 0.2)';  // オレンジ色
        } else if (goalIntakeCal !== null && intake !== null && intake > goalIntakeCal + 200) {
            return 'rgba(255, 99, 132, 0.2)';  // 赤色
        } else {
            return 'rgba(173, 216, 230, 0.2)';  // 薄い青色
        }
    });

    const borderColors = intakeData.map((intake) => {
        if (goalIntakeCal !== null && intake !== null && intake >= goalIntakeCal - 200 && intake <= goalIntakeCal + 200) {
            return 'rgba(255, 165, 0, 1)';  // オレンジ色
        } else if (goalIntakeCal !== null && intake !== null && intake > goalIntakeCal + 200) {
            return 'rgba(255, 99, 132, 1)';  // 赤色
        } else {
            return 'rgba(173, 216, 230, 1)';  // 薄い青色
        }
    });

    // Chart.jsのデータとオプション
    const chartData: ChartData<'bar'> = {
        labels,
        datasets: [
            {
                data: intakeData,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    };

    const maxIntakeData = Math.max(...intakeData);
    let maxBound: number;
    if (goalIntakeCal !== null) {
        maxBound = Math.max(goalIntakeCal + 1000, maxIntakeData + 400);
    } else {
        maxBound = maxIntakeData + 200;
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
                        borderColor: 'rgba(255, 140, 0, 1)',  // 濃いめのオレンジ色
                        borderWidth: 2,
                    },
                    band: {
                        type: 'box',
                        yMin: goalIntakeCal - 200,
                        yMax: goalIntakeCal + 200,
                        backgroundColor: 'rgba(255, 140, 0, 0.2)',  // 薄いオレンジ色
                        borderWidth: 0,
                    }
                }
            } : undefined,
            legend: {
                display: false,  
            },
            datalabels: {
                display: function (context: any) {
                    const intake = context.dataset.data[context.dataIndex];
                    if (typeof intake === 'number') {
                        return goalIntakeCal !== null && (intake >= goalIntakeCal - 200 && intake <= goalIntakeCal + 200 || intake > goalIntakeCal + 200);
                    }
                    return false;
                },
                align: 'end',
                anchor: 'end',
                backgroundColor: function (context: any) {
                    const intake = context.dataset.data[context.dataIndex];
                    if (goalIntakeCal !== null && typeof intake === 'number' && intake > goalIntakeCal + 200) {
                        return 'rgba(255, 99, 132, 0.8)';  // 赤色
                    }
                    return 'rgba(255, 165, 0, 0.8)';  // オレンジ色
                },
                borderRadius: 4,
                color: 'white',
                font: {
                    weight: 'bold',
                },
                formatter: function (value, context) {
                    const intake = context.dataset.data[context.dataIndex];
                    if (goalIntakeCal !== null && typeof intake === 'number' && intake > goalIntakeCal + 200) {
                        return 'Over!';
                    }
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
        <div className="relative min-w-[355px] " >
            {roundedGoalIntakeCal !== null && (
                <div className="w-full text-center text-gray-700 py-2 z-10">
                    Goal Intake Calories: {roundedGoalIntakeCal} kcal
                </div>
            )}
            <Bar data={chartData} options={options} height={200} className='border' />
        </div>
    );
};

export default IntakeCalBarChart;
