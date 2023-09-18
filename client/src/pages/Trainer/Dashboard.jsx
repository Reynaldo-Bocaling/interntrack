import React, { useEffect, useState } from "react";

import { FcCalendar } from "react-icons/fc";
import { FaClipboardList } from "react-icons/fa";
import { BsCalendar2CheckFill, BsCalendarMinusFill } from "react-icons/bs";
import LineChart from '../../components/charts/LineChart'

import Calendar from "../../components/calendar/Calendar";
import { Link } from "react-router-dom";

function Dashboard() {
  const totalCountBox = [
    {
      label: "All",
      url: '/student-list' ,
      count: 50,
      icon: FaClipboardList,
      textColor: "text-blue-500",
      bgColor: "bg-blue-100",
      shadow: "shadow-blue-50"
    },
    {
      label: "Present today",
      url: '/daily-logs',
      count: 35,
      icon: BsCalendar2CheckFill,
      textColor: "text-green-500",
      bgColor: "bg-green-100",
      shadow: "shadow-green-50"
    },
    {
      label: "Absent today",
      url: '/',
      count: 15,
      icon: BsCalendarMinusFill,
      textColor: "text-red-500",
      bgColor: "bg-red-100",
      shadow: "shadow-red-50"
    },
  ];


  // dummydata for charts
  const DummyData = [
    {
      name: 'absent',
      data: [21, 30, 18, 41, 32],
      color: '#ff0000',
      fillColor: 'rgba(255, 0, 0, 0.3)',
    },
    {
      name: 'present',
      data: [8, 25, 38, 20, 24],
      color: '#1a75ff',
      fillColor: 'rgba(26, 117, 255, 0.3)',
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
                  <Link to={totalItems.url} className="absolute top-2 right-4 text-[0.67rem] text-blue-500 font-medium">View</Link>
                </div>
              ))}
            </div>

            {/* graph */}
            <div className="graph-box h-auto p-4 pr-2 shadow-lg bg-white shadow-slate-200 rounded-md border border-gray-100">
              <h1 className=" text-base font-semibold text-gray-700 ">
              Weekly Attendance Overview
              </h1>
              <LineChart data={DummyData} sizeHeight={350} />
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
              {/* <Piechart /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
