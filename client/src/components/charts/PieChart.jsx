import React from 'react';
import ReactApexChart from 'react-apexcharts';

const CustomizedPieChart = ({ data }) => {
  const options = {
    chart: {
      type: 'donut',
    },
    colors: ['#2ECC71', '#FFA500', '#FF5733'], // Green, Orange, Red
    labels: ['Hours Taken', 'Leave', 'Hours Remaining'],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: 'Total',
              fontSize: '14px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              color: '#333',
            },
            value: {
              show: true,
              color: '#2ECC71', // Change label color here
              fontSize: '22px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              offsetY: 5, // Add padding
            },
            name: {
              offsetY: -15, // Add padding
            },
          },
        },
      },
    },
    legend: {
      position: 'right',
      offsetY: 100,  
      offsetX: 0,  
    },
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={data} type="donut" />
    </div>
  );
};

export default CustomizedPieChart;
