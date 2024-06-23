import React from 'react';

const BmiTable: React.FC = () => {
    return (
        <div className="max-w-xl mx-auto p-6 mt-4 bg-white rounded-lg shadow-md text-left">
        <h2 className="text-2xl font-bold mb-6">BMI Classification</h2>
        <table className="min-w-full bg-white">
            <thead>
            <tr>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
                BMI (kg/m<sup>2</sup>)
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-500 tracking-wider">
                Classification <span className='tex-xs'>(WHO standard)</span>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td className="py-2 px-4 border-b border-gray-200">{"< 18.5"}</td>
                <td className="py-2 px-4 border-b border-gray-200">Underweight</td>
            </tr>
            <tr>
                <td className="py-2 px-4 border-b border-gray-200">18.5 &le; BMI &lt; 25.0</td>
                <td className="py-2 px-4 border-b border-gray-200">Normal range</td>
            </tr>
            <tr>
                <td className="py-2 px-4 border-b border-gray-200">25.0 &le; BMI &lt; 30.0</td>
                <td className="py-2 px-4 border-b border-gray-200">Overweight</td>
            </tr>
            <tr>
                <td className="py-2 px-4 border-b border-gray-200">30.0 &le; BMI &lt; 35.0</td>
                <td className="py-2 px-4 border-b border-gray-200">Obese Class I</td>
            </tr>
            <tr>
                <td className="py-2 px-4 border-b border-gray-200">35.0 &le; BMI &lt; 40.0</td>
                <td className="py-2 px-4 border-b border-gray-200">Obese Class II</td>
            </tr>
            <tr>
                <td className="py-2 px-4 border-b border-gray-200">&ge; 40.0</td>
                <td className="py-2 px-4 border-b border-gray-200">Obese Class III</td>
            </tr>
            </tbody>
        </table>
        <p className="mt-4 text-sm text-gray-600">
            Note: The BMI classification is not a diagnostic tool. It should be used as a guideline. It does not take into account factors such as gender, age, and muscle mass, which can influence overall health.
        </p>
        </div>
    );
};

export default BmiTable;
