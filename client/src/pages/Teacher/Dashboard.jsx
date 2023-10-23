import React, { useEffect, useState } from "react";
import { TbUsersGroup } from "react-icons/tb";
import { FcCalendar } from "react-icons/fc";
import { LiaUsersSolid } from "react-icons/lia";
import { PiDotsThreeCircle } from "react-icons/pi";
import { BsDot } from "react-icons/bs";
import LineChart from "../../components/charts/LineChart";
import pic from "../../assets/images/dp.png";
import { Link } from "react-router-dom";
import DateNow from "../../components/Dates/DateNow";

function Dashboard() {
  const totalCountBox = [
    {
      label: "Trainer",
      url: "/daily-logs",
      count: 25,
      textColor: "text-blue-500",
      shadow: "shadow-red-50",
    },
    {
      label: "Student",
      url: "/",
      count: 40,
      textColor: "text-green-500",
      shadow: "shadow-green-50",
    },
  ];

  // dummydata for charts
  const DummyData = [
    {
      name: "absent",
      data: [21, 30, 18, 41, 32],
      color: "#ff0000",
      fillColor: "rgba(255, 0, 0, 0.3)",
    },
    {
      name: "present",
      data: [8, 25, 38, 20, 24],
      color: "#1a75ff",
      fillColor: "rgba(26, 117, 255, 0.3)",
    },
  ];



  return (
    <div className="min-h-full w-full">
      <div className="m-1 ">
        <div className="flex gap-[2%] mt-1 min-h-[550px]">
          {/* dashboard content */}
          <main className="flex flex-col w-[64%] gap-2 relative ">
            {/* title */}
              <div className="left-content flex  items-center justify-between">
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-semibold tracking-wider text-gray-700">
                    Teacher overview
                  </h1>
                  <small className="text-blue-500 font-semibold tracking-wider">
                    Teacher Dashboard
                  </small>  
              </div>
              <div className="flex items-center gap-3">
                <FcCalendar />
                <DateNow />
              </div>
            </div>

            {/* total count */}
            <div className="total-count flex justify-between gap-5 py-3 ">
              <div className="felx flex-col gap-3 bg-white w-full h-full rounded-lg p-5 shadow-2xl border shadow-blue-50 border-slate-200">
                <div className="text-gray-500 text-md font-medium tracking-wide mb-5">
                  Student Assignment Status
                </div>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-3">
                    <div className="font-medium">Assigned: <span className="pl-8 font-semibold">{'80%'}</span></div>
                    <div className="h-2 w-full bg-gray-200 rounded-full">
                      <div className="h-full w-[80%] bg-blue-500 rounded-full"></div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="font-medium">Unassigned: <span className="pl-3 font-semibold">{'20%'}</span></div>
                    <div className="h-2 w-full bg-gray-200 rounded-full">
                      <div className="h-full w-[20%] bg-red-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="right flex flex-col gap-3">
                {totalCountBox.map((totalItems, index) => (
                  <div
                    key={index}
                    className={`${totalItems.shadow} relative h-24 w-[280px] flex items-center gap-5 bg-white rounded-lg p-5 py-7 shadow-2xl border border-slate-200`}
                  >
                    <div>
                      <p className="text-gray-500 text-md tracking-wider font-medium mb-2">
                        {totalItems.label}
                      </p>

                      <h1 className="text-2xl text-gray-800 font-semibold tracking-wider mb-2">
                        {totalItems.count}
                      </h1>
                    </div>

                    {/* count link */}
                    <Link
                      to={totalItems.url}
                      className="absolute top-2 right-4 text-[0.67rem] text-blue-500 font-medium"
                    >
                      View
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* graph */}
            <div className="graph-box h-auto p-4 pr-2  bg-white rounded-md border border-slate-200">
              <h1 className=" text-base font-semibold text-gray-700 ">
                Weekly Attendance Overview
              </h1>
              <LineChart data={DummyData} />
            </div>
          </main>

          {/* right side */}
          <div className="right-side w-[35%] flex flex-col gap-[2%] ">
            <div className="relative  max-w-full flex  flex-col p-4 bg-white shadow-2xl shadow-blue-50 rounded-md border px-7 py-7 border-slate-200">
              <div className="flex items-center gap-5">
                <div className="h-[50px] w-[50px] rounded-full overflow-hidden shadow-lg p-2 border border-slate-100">
                  <img src={pic} alt="error" />
                </div>

                <div>
                  <h4 className="text-xl font-semibold tracking-wider">
                    Alex Cochanco
                  </h4>
                  <small className="text-blue-500 font-medium tracking-wide">
                    Coordinator
                  </small>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex gap-5">
                    <LiaUsersSolid size={25} className="text-blue-400" />
                    <span className=" font-medium tracking-wide">Teacher</span>
                  </div>
                  <span className="pl-5 text-gray-700 text-lg font-semibold">15</span>
                </div>

                <div className="flex items-center justify-between ap-3">
                  <div className="flex gap-5">
                    <LiaUsersSolid size={25} className="text-blue-400" />
                    <span className=" font-medium tracking-wide">Trainer</span>
                  </div>
                 <span className="pl-5 text-gray-700 text-lg font-semibold">25</span>
                </div>

                <div className="flex items-center  justify-between">
                  <div className="flex gap-5">
                    <LiaUsersSolid size={25} className="text-blue-400" />
                    <span className=" font-medium tracking-wide">Student</span>
                  </div>
                 <span className="pl-5 text-gray-700 text-lg font-semibold">120</span>
                </div>
              </div>

              <button className="absolute top-5 right-3 text-blue-500 text-xs font-medium tracking-wide">
                View
              </button>
            </div>

            <div className=" max-w-full p-4 bg-white shadow-2xl shadow-red-50 rounded-md border border-slate-200">
              <header className="flex justify-between mb-3">
                <div className="left flex flex-col gap-3">
                  <small className="font-medium tracking-wide">
                    Student Hours{" "}
                  </small>
                  <h2 className="text-xl font-semibold tracking-wider">72%</h2>
                </div>

                <div className="right flex flex-col gap-3 items-center">
                  <small className="font-medium tracking-wide">
                    Top 3 Higher hours rate
                  </small>
                  <div className="flex items-center gap-2">
                    <img
                      src={pic}
                      alt="error"
                      className="h-[40px] w-[40px] bg-yellow-400 p-1 rounded-full"
                    />
                    <img
                      src={pic}
                      alt="error"
                      className="h-[40px] w-[40px] bg-violet-400 p-1 rounded-full"
                    />
                    <img
                      src={pic}
                      alt="error"
                      className="h-[40px] w-[40px] bg-green-400 p-1 rounded-full"
                    />
                  </div>
                </div>
              </header>

              <main>
                <div className="left"></div>
                <div className="right"></div>
              </main>
            </div>

            <div className="h-[65%] max-w-full p-4 bg-white shadow-lg shadow-slate-100 rounded-md border border-slate-200">
              <div className="flex items-center">
                <span className="text-gray-500 tracking-wide">Active now</span>
                <BsDot size={23} className="text-green-500" />
              </div>

              <div className="mt-5">
                <ul className="list-none flex flex-col gap-4">
                  <li className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={pic}
                        alt="error"
                        className="h-[40px] w-[40px] bg-yellow-400 p-1 rounded-full"
                      />
                      <div className="font-medium tracking-wide">
                        Reynaldo F. Bocaling
                      </div>
                    </div>
                    <PiDotsThreeCircle size={23} className="text-gray-500" />
                  </li>
                  <li className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={pic}
                        alt="error"
                        className="h-[40px] w-[40px] bg-violet-400 p-1 rounded-full"
                      />
                      <div className="font-medium tracking-wide">
                        Reynaldo F. Bocaling
                      </div>
                    </div>
                    <PiDotsThreeCircle size={23} className="text-gray-500" />
                  </li>
                  <li className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={pic}
                        alt="error"
                        className="h-[40px] w-[40px] bg-green-400 p-1 rounded-full"
                      />
                      <div className="font-medium tracking-wide">
                        Reynaldo F. Bocaling
                      </div>
                    </div>
                    <PiDotsThreeCircle size={23} className="text-gray-500" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
