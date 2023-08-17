// components/Charts/ApexChart.jsx
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = ({ data, options }) => {
  return (
    <div id="chart">
      <ReactApexChart options={options} series={data} type="area" height={350} />
    </div>
  );
};

export default ApexChart;
