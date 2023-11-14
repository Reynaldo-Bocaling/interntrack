// components/Charts/ApexChart.jsx
import React from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = ({ data, sizeHeight, years }) => {
  const options = {
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "category",
      categories: years,
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={data}
        type="area"
        height={sizeHeight}
      />
    </div>
  );
};

export default ApexChart;
