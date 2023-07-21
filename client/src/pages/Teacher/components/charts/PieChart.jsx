import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { UserData } from './ChartData';

function PieChart() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.day),
    datasets: [
      {
        label: "Hours spent",
        data: UserData.map((data) => data.hoursSpent),
        backgroundColor: [
          "rgba(32, 153, 254, 0.4)",
          "rgba(255, 33, 145, 0.4)",
          "rgba(255, 247, 33, 0.4)",
          "rgba(33, 255, 43, 0.4)",
          "rgba(212, 33, 255, 0.3)"
         
          // Add more colors here if needed
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  });

  return <Pie 
  data={userData}
  options={{
    responsive: true,
    maintainAspectRatio: true,
    animation: {
      duration: 300,
    },
  }}
   />;
}

export default PieChart;
