import React, { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi";
import { FcCalendar } from "react-icons/fc";
import { PiBuildingsBold } from "react-icons/pi";
import { HiOutlineBookOpen } from "react-icons/hi";
import { CircularProgressbar } from "react-circular-progressbar";
import pic from "../../assets/images/dp.png";
import { Link } from "react-router-dom";
import DateNow from "../../components/Dates/DateNow";
import Avatar from "@mui/material/Avatar";
import LineChart from '../../components/charts/LineChart'

const Dashboard = () => {
  const countBox = [
    {
      label: "Student",
      totalCount: 200,
      icon: FiUsers,
      iconBackground: "text-sky-500 bg-sky-100",
      ShadowColor: "shadow-red-50",
      extraText: [
        { label: "Assigned", totalCount: 150, color: "text-green-500" },
        { label: "Unassigned", totalCount: 50, color: "text-red-500" },
      ],
    },
    {
      label: "Teacher",
      totalCount: 25,
      icon: FiUsers,
      iconBackground: "text-green-500 bg-green-100",
      ShadowColor: "shadow-green-50",
    },
    {
      label: "Courses",
      totalCount: 200,
      icon: HiOutlineBookOpen,
      iconBackground: "text-violet-500 bg-violet-100",
      ShadowColor: "shadow-red-50",
    },
    {
      label: "Company",
      totalCount: 200,
      icon: PiBuildingsBold,
      iconBackground: "text-orange-500 bg-orange-100",
      ShadowColor: "shadow-blue-50",
      extraText: [
        { label: "Available slots", totalCount: 55, color: "text-green-500" },
      ],
    },
  ];

  const currentTeacher = [
    {
      id: 1,
      name: "Reynaldo F. Bocaling",
      contact: 988282222,
      specializations: "Web",
      totalStudent: 40,
      status: 1,
    },
    {
      id: 2,
      name: "Reynaldo F. Bocaling",
      contact: 988282222,
      specializations: "Web",
      totalStudent: 40,
      status: 1,
    },
    {
      id: 3,
      name: "Reynaldo F. Bocaling",
      contact: 988282222,
      specializations: "Web",
      totalStudent: 40,
      status: 1,
    },
    {
      id: 4,
      name: "Reynaldo F. Bocaling",
      contact: 988282222,
      specializations: "Web",
      totalStudent: 40,
      status: 1,
    },
    {
      id: 5,
      name: "Reynaldo F. Bocaling",
      contact: 988282222,
      specializations: "Web",
      totalStudent: 40,
      status: 1,
    },
  ];

  const percentage = 75;


  // chart data
  const DummyData = [
    {
      name: 'Hours',
      data: [30, 50, 75, 100, 125],
      color: '#00C6FD',
      fillColor: 'rgba(255, 0, 0, 0.3)',
    }
  ];
  return (
    <div className="min-h-full w-full">
      <div className="m-1 ">
        <div className="w-full flex flex-col">
          <div className="left-content flex  items-center justify-between mb-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-semibold tracking-wider text-gray-700">
                Coordinator overview
              </h1>
              <small className="text-blue-500 font-semibold tracking-wider">
                Coordinator Dashboard
              </small>
            </div>
            <div className="flex items-center gap-3">
              <FcCalendar />
              <DateNow />
            </div>
          </div>

         <section className="grid grid-cols-4 grid-rows-5 gap-3">
            <div className="col-span-2 h-[150px] row-span-2 grid grid-cols-3 gap-[1.2px] bg-violet-100 rounded-lg shadow-xl overflow-hidden shadow-[#f4f2f2] border border-[#ecf0f1]">
              <div className="bg-white p-2 ">Student</div>
              <div className="bg-white p-2">Trainer</div>
              <div className="bg-white p-2">Teacher</div>
              <div className="bg-white p-2">Coordinator</div>
              <div className="bg-white p-2 ">Director</div>
              <div className="bg-white p-2">Company</div>
            </div>
            <div className="col-span-2 col-start-3 row-start-1 row-end-6 bg-white rounded-lg p-3 shadow-xl overflow-hidden shadow-[#f4f2f2] border border-[#ecf0f1]">fd</div>
            <div className="row-span-3 bg-white rounded-lg p-3 shadow-xl overflow-hidden shadow-[#f4f2f2] border border-[#ecf0f1]">fd</div>
            <div className="row-span-3 bg-white rounded-lg p-3 shadow-xl overflow-hidden shadow-[#f4f2f2] border border-[#ecf0f1]">fd</div>
         </section>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
