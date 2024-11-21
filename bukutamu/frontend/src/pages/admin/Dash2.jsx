// src/pages/admin/Dashboard2.jsx
import React, { useState, useEffect } from 'react';
import Chart from './LineChart'; // Adjust the import path if necessary


const Dashboard2 = () => {
  // Sample data for the chart
  const [chartData, setChartData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May'],
    salesData: [
      [30, 50, 70, 90, 110], // Digital Goods
      [20, 40, 60, 80, 100], // Electronics
    ],
  });

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Dashboard 2</h2>
      <div className="row">
        {/* Chart Section */}
        <div className="col-lg-6 col-md-12 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Sales Overview</h5>
              <Chart data={chartData} />
            </div>
          </div>
        </div>
        {/* Additional sections for more charts or data */}
        <div className="col-lg-6 col-md-12 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Sales Distribution</h5>
              <Chart data={chartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard2;
