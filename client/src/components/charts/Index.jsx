// components/Main/Main.jsx
import React from 'react';
import ApexChart from './Chart';

const index = ({ data }) => {
  const options = {
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'category',
      categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
  };

  return (
    <div>
      <ApexChart data={data} options={options} />
    </div>
  );
};

export default index;
