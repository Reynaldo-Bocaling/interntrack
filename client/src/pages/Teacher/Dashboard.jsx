import React, { useEffect, useState } from "react";
import {FiUsers} from 'react-icons/fi'
import { FcCalendar } from "react-icons/fc";
import { PiDotsThreeCircle } from "react-icons/pi";
import { BsDot } from "react-icons/bs";
import ChartContainer from '../../components/charts'
import pic from '../../assets/images/dp.png'
import { Link } from "react-router-dom";

function Dashboard() {
  const totalCountBox = [
   
    {
      label: "Trainer",
      url: '/daily-logs',
      count: 2,
      textColor: "text-blue-500",
      bgColor: "bg-blue-100",
      shadow: "shadow-blue-50"
    },
    {
      label: "Student",
      url: '/',
      count: 40,
      textColor: "text-green-500",
      bgColor: "bg-green-100",
      shadow: "shadow-green-50"
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
          <main className="flex flex-col w-[64%] gap-2 relative ">
            {/* title */}
            <div className="left-content flex flex-col gap-2">
              <h1 className="text-xl font-semibold tracking-wider text-gray-700">
                Teacher overview
              </h1>
              <small className="text-blue-500 font-semibold tracking-wider">
                Teacher Dashboard
              </small>
            </div>

            {/* count */}
            <div className="total-count flex justify-between gap-5 py-3 ">

              <div className="bg-white w-full h-full rounded-lg p-5 shadow-2xl border shadow-blue-50 border-slate-100">

              </div>

              <div className="right flex flex-col gap-3">
                {totalCountBox.map((totalItems, index) => (
                  <div
                    key={index}
                    className={`${totalItems.shadow} relative h-24 w-[280px] flex items-center gap-5 bg-white rounded-lg p-5 py-7 shadow-2xl border border-slate-100`}
                  >
                   

                    <div>
                    <p className="text-gray-500 text-lg tracking-wider font-medium mb-2">
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
            <div className="graph-box h-auto p-4 pr-2 shadow-lg bg-white shadow-slate-100 rounded-md border border-gray-100">
              <h1 className=" text-base font-semibold text-gray-700 ">
                Weekly Attendance Overview
              </h1>
              <ChartContainer data={DummyData} />
            </div>
          </main>



          {/* right side */}
          <div className="right-side w-[35%] flex flex-col gap-[3%] ">
            
            <div className="relative min-h-[15%] max-w-full flex items-center gap-5 p-4 bg-white shadow-2xl shadow-blue-50 rounded-md border px-7  border-slate-100">
              <div className="h-[50px] w-[50px] rounded-full overflow-hidden shadow-lg p-2 border border-slate-100">
                <img src={pic} alt="error" />
              </div>

              <div>
                <h4 className="text-xl font-semibold tracking-wider">Alex Cochanco</h4>
                <small className="text-blue-500 font-medium tracking-wide">Coordinator</small>
              </div>


              <button className="absolute top-5 right-3 text-blue-500 text-xs font-medium tracking-wide">View</button>


            </div>

            


            <div className="min-h-[30%] max-w-full p-4 bg-white shadow-2xl shadow-red-50 rounded-md border border-slate-100">
              <header className="flex justify-between mb-3">
               <div className="left flex flex-col gap-3">
                <small className="font-medium tracking-wide">Student Hours </small>
                  <h2 className="text-xl font-semibold tracking-wider">72%</h2>
               </div>

               <div className="right flex flex-col gap-3 items-center">
                <small className="font-medium tracking-wide">Top 3 Higher hours rate</small>
                <div className="flex items-center gap-2">
                  <img src={pic} alt="error" className="h-[40px] w-[40px] bg-yellow-400 p-1 rounded-full" />
                  <img src={pic} alt="error" className="h-[40px] w-[40px] bg-violet-400 p-1 rounded-full" />
                  <img src={pic} alt="error" className="h-[40px] w-[40px] bg-green-400 p-1 rounded-full" />
                </div>
               </div>
              </header>

              <main>
                <div className="left"></div>
                <div className="right"></div>
              </main>
             
            </div>

            {/* piechart */}
            <div className="h-[65%] max-w-full p-4 bg-white shadow-lg shadow-slate-100 rounded-md border border-slate-100">
              <div className="flex items-center">
                <span className="text-gray-500 tracking-wide">Active now</span>
                <BsDot size={23} className="text-green-500"/>
              </div>

              <div className="mt-5">
                <ul className="list-none flex flex-col gap-4">
                  <li className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={pic} alt="error" className="h-[40px] w-[40px] bg-yellow-400 p-1 rounded-full" />
                      <div className="font-medium tracking-wide">Reynaldo F. Bocaling</div>
                    </div>
                    <PiDotsThreeCircle size={23} className="text-gray-500" />
                  </li>
                  <li className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                    <img src={pic} alt="error" className="h-[40px] w-[40px] bg-violet-400 p-1 rounded-full" />
                      <div className="font-medium tracking-wide">Reynaldo F. Bocaling</div>
                    </div>
                    <PiDotsThreeCircle size={23} className="text-gray-500" />
                  </li>
                  <li className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                    <img src={pic} alt="error" className="h-[40px] w-[40px] bg-green-400 p-1 rounded-full" />
                      <div className="font-medium tracking-wide">Reynaldo F. Bocaling</div>
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
