// app/admin/dashboard/ChartComponent.tsx

'use client';  // This is the directive that marks the component as a Client Component

import { useRef } from 'react';  // Now you can safely use useRef

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function ChartComponent() {
  const chartRef = useRef(null);  // This is where you can now safely use useRef

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Courses Published',
        data: [20, 30, 50, 70, 90],
        backgroundColor: 'rgba(59, 130, 246, 0.7)', // Blue color
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Course Publication Over Time',
      },
    },
  };

  return <Bar ref={chartRef} data={data} options={options} />;
}
