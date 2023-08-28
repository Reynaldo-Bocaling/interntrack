import React, { useEffect, useState } from "react";
import { TbUsersGroup } from "react-icons/tb";
import { FcCalendar } from "react-icons/fc";
import { LiaUsersSolid } from "react-icons/lia";
import { PiDotsThreeCircle } from "react-icons/pi";
import { BsDot } from "react-icons/bs";
import LineCHart from "../../components/charts/LineChart";
import pic from "../../assets/images/dp.png";
import { Link } from "react-router-dom";
import DateNow from "../../components/Dates/DateNow";
import Avatar from "@mui/material/Avatar";

const Dashboard = () => {
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

  return (
    <div className="min-h-full w-full">
      <div className="m-1 ">
        <div className="w-full flex flex-col">

          <div className="left-content flex  items-center justify-between">
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

        {/* count */}
        <div className="my-5 min-h-[150px] w-full  rounded-lg flex items-center justify-between px-5">
          <div className="w-[30%] h-[140px] rounded-lg bg-white shadow-xl shadow-red-50 border border-slate-100"></div>
          <div className="w-[30%] h-[140px] rounded-lg bg-white shadow-xl shadow-blue-50 border border-slate-100"></div>
          <div className="w-[30%] h-[140px] rounded-lg bg-white shadow-xl shadow-blue-50 border border-slate-100"></div>
        </div>
        {/* <div className="min-h-[170px] w-full bg-yellow-5002">

        </div> */}
        {/* <div className="min-h-[170px] w-full bg-blue-5002"> */}

        {/* </div> */}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
