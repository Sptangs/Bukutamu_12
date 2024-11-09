// src/Chart.js
import React, { useEffect, useState } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = ({ data }) => {
  // Chart for sales data
  const [chartData, setChartData] = useState({
    labels: [], // months
    datasets: [
      {
        label: 'Digital Goods',
        backgroundColor: 'rgba(60,141,188,0.9)',
        borderColor: 'rgba(60,141,188,0.8)',
        data: [], // Sales data
      },
      {
        label: 'Electronics',
        backgroundColor: 'rgba(210, 214, 222, 1)',
        borderColor: 'rgba(210, 214, 222, 1)',
        data: [], // Sales data
      },
    ],
  });

  // Function to update chart data
  const updateChartData = () => {
    // Here you can map the incoming data into the chart format
    setChartData((prevData) => ({
      ...prevData,
      labels: data.labels,
      datasets: prevData.datasets.map((dataset, index) => ({
        ...dataset,
        data: data.salesData[index], // Update with your sales data
      })),
    }));
  };

  useEffect(() => {
    if (data) {
      updateChartData();
    }
  }, [data]);

  return (
    <>
      <div className="col-md-6">
        <h3>Sales Overview</h3>
        <Line data={chartData} />
      </div>
      <div className="col-md-6">
        <h3>Sales Distribution</h3>
        <Doughnut data={chartData} />
      </div>
    </>
  );
};

export default Chart;
