import React from "react";
import ReactApexChart from "react-apexcharts";

const CustomizedPieChart = ({ data, labels, colors, title }) => {
  const options = {
    chart: {
      type: "donut",
    },
    colors: colors,
    labels: labels,
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: title,
              fontSize: "14px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 600,
              color: "#333",
            },
            value: {
              show: true,
              color: "#2ECC71",
              fontSize: "22px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 400,
              offsetY: 5,
            },
            name: {
              offsetY: -15, 
            },
          },
        },
      },
    },
    legend: {
      position: "right",
      offsetY: 50,
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
