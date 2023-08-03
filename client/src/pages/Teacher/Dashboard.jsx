import React, { useEffect, useState } from "react";

import { FcCalendar } from "react-icons/fc";
import { FaClipboardList } from "react-icons/fa";
import { BsCalendar2CheckFill, BsCalendarMinusFill } from "react-icons/bs";
import LineChart from "../../components/charts/LineChart";
import Piechart from "../../components/charts/PieChart";
import Calendar from "../../components/calendar/Calendar";
import { Link } from "react-router-dom";

function Dashboard() {
  const totalCountBox = [
    {
      label: "All",
      count: 200,
      icon: FaClipboardList,
      textColor: "text-blue-500",
      bgColor: "bg-blue-100",
      shadow: "shadow-blue-50"
    },
    {
      label: "Present today",
      count: 160,
      icon: BsCalendar2CheckFill,
      textColor: "text-green-500",
      bgColor: "bg-green-100",
      shadow: "shadow-green-50"
    },
    {
      label: "Absent today",
      count: 40,
      icon: BsCalendarMinusFill,
      textColor: "text-red-500",
      bgColor: "bg-red-100",
      shadow: "shadow-red-50"
    },
  ];
  return (
    <div className="min-h-full w-full">
      <div className="m-1 ">
        <div className="flex gap-[2%] mt-1 min-h-[550px]">
          {/* dashboard content */}
          <main className="flex flex-col w-[65%] gap-2 relative ">
            {/* title */}
            <div className="left-content flex flex-col gap-2">
              <h1 className="text-xl font-semibold tracking-wider text-gray-700">
                Trainor overview
              </h1>
              <small className="text-blue-500 font-semibold tracking-wider">
                Trainor Dashboard
              </small>
            </div>
            

            {/* count */}
            <div className="total-count h-32 flex items-center justify-between py-3">
              {totalCountBox.map((totalItems, index) => (
                <div
                  key={index}
                  className={`${totalItems.shadow} relative h-full w-[32%] flex items-center gap-5 bg-white rounded-lg p-5 shadow-2xl border border-slate-100`}
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


                  {/* count link */}
                  <Link className="absolute top-2 right-4 text-[0.67rem] text-blue-500 font-medium">View</Link>
                </div>
              ))}
            </div>

            {/* graph */}
            <div className="graph-box h-auto p-4 shadow-lg  shadow-slate-200 rounded-md border border-gray-100">
              <h1 className=" text-base font-semibold text-gray-700 ">
                Weekly hours spent
              </h1>
              <LineChart />
            </div>
         
          </main>


          <div className="right-side w-[31%] flex flex-col gap-[3%]">
            <div className="min-h-[60%] max-w-full p-4 bg-white shadow-2xl shadow-blue-50 rounded-md border border-gray-100">
              <div className="text-sm font-medium tracking-wide mb-2 flex items-center gap-1">
                {" "}
                <FcCalendar />
                Date
              </div>
              <Calendar />
            </div>


            {/* piechart */}
            <div className="h-[35%] max-w-full p-4 bg-white shadow-lg shadow-slate-200 rounded-md border border-gray-100">
              <Piechart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
