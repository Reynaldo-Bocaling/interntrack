import React, { useEffect, useState } from "react";

import { FcCalendar } from "react-icons/fc";
import { FaClipboardList } from "react-icons/fa";
import { BsCalendar2CheckFill, BsCalendarMinusFill } from "react-icons/bs";
import LineChart from "./components/charts/LineChart";
import Piechart from "./components/charts/PieChart";
import Calendar from "./components/calendar/Calendar";
function Dashboard() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);
  const getMonthName = (date) => {
    return date.toLocaleString("en-US", { month: "long" });
  };

  // total box
  const totalCountBox = [
    {
      label: "All",
      count: 200,
      icon: FaClipboardList,
      textColor: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      label: "Present today",
      count: 160,
      icon: BsCalendar2CheckFill,
      textColor: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      label: "Absent today",
      count: 40,
      icon: BsCalendarMinusFill,
      textColor: "text-red-500",
      bgColor: "bg-red-100",
    },
  ];
  return (
    <div className="min-h-full w-full">
      <div className="m-1 ">
        <div className="flex gap-[2%] mt-1 min-h-[550px]">
          {/* dashboard content */}
          <main className="flex flex-col w-[65%] gap-2 relative  overflow-hidden">
            {/* title */}
            <div className="left-content flex flex-col gap-2">
              <h1 className="text-xl font-bold tracking-wider text-gray-700">
                Trainor overview
              </h1>
              <small className="text-blue-500 font-semibold tracking-wider">
                Trainor Dashboard
              </small>
            </div>
            <div className="total-count h-32 flex items-center justify-between py-3">
              {totalCountBox.map((totalItems, index) => (
                <div
                  key={index}
                  className="h-full w-[32%] flex items-center gap-5 bg-white rounded-lg p-5 shadow-2xl shadow-blue-50"
                >
                  <span
                    className={`${totalItems.bgColor} ${totalItems.textColor} h-9 w-9 flex items-center justify-center   rounded-md `}
                  >
                    <totalItems.icon size={20} />
                  </span>
                  <div>
                    <h1 className="text-xl text-gray-600 font-semibold tracking-wider mb-2">
                      {totalItems.count}
                    </h1>
                    <p className="text-gray-500 text-sm tracking-wide">
                      {totalItems.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="graph-box h-80 p-4 shadow-lg bg-white shadow-gray-200 rounded-md overflow-hidden">
              <h1 className=" text-base      font-semibold text-gray-700 ">
                Weekly hours spent
              </h1>
              <LineChart />
            </div>

                <div className="text-gray-700 text-sm tracking-wider mt-3">
                  Charting Your Growth: <span className="font-semibold">InternTrack</span> - Your OJT Journey Begins Here
                </div>
            
            {/* add rgba color background */}
         

          </main>
          <div className="right-side w-[31%] flex flex-col gap-[3%]">
            <div className="min-h-[60%] max-w-full p-4 bg-white shadow-lg shadow-green-50 rounded-md">
              <div className="text-sm font-medium tracking-wide mb-2 flex items-center gap-1">
                {" "}
                <FcCalendar />
                Date
              </div>
              <Calendar />
            </div>
            <div className="h-[35%] max-w-full p-4 bg-white shadow-lg shadow-gray-100 rounded-md">
            <Piechart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
