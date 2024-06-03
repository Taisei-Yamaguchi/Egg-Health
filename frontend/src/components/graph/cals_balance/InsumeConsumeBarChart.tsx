// components/IntakeConsumeBarChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { registerables } from 'chart.js';
import { Chart } from 'chart.js';

Chart.register(...registerables);

interface Props {
    data: {
        date: string;
        sum_intake_cal: number;
        sum_exercise_cal: number;
    }[];
    bmr: number;
    other: number;
}

const IntakeConsumeBarChart: React.FC<Props> = ({ data, bmr, other }) => {
    // ラベルとデータを作成
    const labels = data.map(item => item.date);
    const intakeData = data.map(item => item.sum_intake_cal);
    const consumeData = data.map(item => item.sum_exercise_cal);
    const bmrData = data.map(() => bmr); 
    const tefData = data.map(item => item.sum_intake_cal * 0.1); 
    const otherData = data.map(() => other); 

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
            {
                label: 'BMR',
                data: bmrData,
                backgroundColor: 'rgba(255, 140, 0, 0.5)', // 少しグレーを混ぜたオレンジ
                borderColor: 'rgba(255, 140, 0, 1)', 
                borderWidth: 1,
                stack: 'consumeStack',
            },
            {
                label: 'Exercise Calories',
                data: consumeData,
                backgroundColor: 'rgba(255, 99, 71, 0.4)',  // 赤オレンジ（少し濃く）
                borderColor: 'rgba(255, 99, 71, 1)', 
                borderWidth: 1,
                stack: 'consumeStack',
            },
            {
                label: 'Thermic Effect of Food',
                data: tefData,
                backgroundColor: 'rgba(255, 69, 0, 0.1)', // 赤ベース（少し薄く）
                borderColor: 'rgba(255, 69, 0, 1)', 
                borderWidth: 1,
                stack: 'consumeStack',
            },
            {
                label: 'Other',
                data: otherData,
                backgroundColor: 'rgba(255, 159, 64, 0.2)', // オレンジがかった赤
                borderColor: 'rgba(255, 159, 64, 1)',  
                borderWidth: 1,
                stack: 'consumeStack',
            },
        ],
    };

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
                    text: 'Calorie (kcal)',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="relative w-full min-w-96" >
            <Bar data={chartData} options={options} height={300} className='border' />
        </div>
    )
};

export default IntakeConsumeBarChart;
