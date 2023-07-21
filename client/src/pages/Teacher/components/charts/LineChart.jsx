import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { UserData } from './ChartData';
function LineChart() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.day),
    datasets: [
      {
        label: "Hours spent",
        data: UserData.map((data) => data.hoursSpent),
        backgroundColor:  "rgba(75,192,192,1)",
        borderWidth: 0,
        borderColor: "#6528F7",
        borderWidth: 2,
      },
    ],
  });

  return <Line 
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

export default LineChart;
