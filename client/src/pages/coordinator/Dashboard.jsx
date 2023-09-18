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

          <section className="grid grid-cols-6 py-5 gap-4">
            <div className="col-span-3 grid grid-cols-2 gap-3">
              {countBox.map((item, index) => (
                <div
                  key={index}
                  className={`h-[110px] flex flex-col gap-3 bg-white rounded-lg p-5 shadow-2xl ${item.ShadowColor} border border-[#ecf0f1]`}
                >
                  <div className="h-full flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold">
                        {item.totalCount}
                      </span>
                      <small className="text-xs text-gray-500 tracking-wide">
                        {item.label}
                      </small>
                    </div>
                    <div className={`${item.iconBackground} p-2 rounded-lg`}>
                      <item.icon size={18} />
                    </div>
                  </div>

                  {item.extraText && (
                    <div className="text-xs flex items-center justify-between mt-1">
                      {item.extraText.map((text, i) => (
                        <p key={i} className={text.color}>
                          {text.label}:{" "}
                          <span className="font-medium">{text.totalCount}</span>
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="col-span-3 bg-white rounded-lg shadow-xl shadow-blue-50 border border-[#ecf0f1] ">
            <p className="text-base font-semibold mt-3 ml-3">
                Student Hours rate per week
              </p>
            <LineChart data={DummyData} sizeHeight={200} />
            </div>
            <div className="col-span-2 bg-white rounded-lg shadow-xl p-3 shadow-blue-50 border border-[#ecf0f1] flex flex-col items-center justify-center">
              <p className="text-lg font-semibold">Student Completion Rate</p>
              <div className="max-w-[220px] w-full p-4 ">
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage} %`}
                  styles={{
                    path: { stroke: `#20D117` },
                    trail: { stroke: "#E4F5E4", strokeWidth: 10 },
                    text: {
                      fill: `#333`,
                      fontSize: `1rem`,
                      fontWeight: 600,
                      dominantBaseline: "middle",
                      textAnchor: "middle",
                    },
                  }}
                  strokeWidth={10}
                />
              </div>
            </div>
            <div className="col-span-4 bg-white rounded-lg p-3 shadow-xl shadow-slate-50 border border-[#ecf0f1]">
              <p className="text-base font-semibold">
                Recent Teacher Registered
              </p>

              <div className="mt-3 bg-white rounded-lg shadow-lg shadow-slate-50 border border-[#ecf0f1] overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="h-12 bg-[#f1f4f5]">
                      <th className="text-left pl-3 font-semibold text-sm">
                        #
                      </th>
                      <th className="text-left pl-3 font-semibold text-sm w-[250px]">
                        Name
                      </th>
                      <th className="text-left pl-3 font-semibold text-sm">
                        Contact
                      </th>
                      <th className="text-center font-semibold text-sm">
                        Specializations
                      </th>
                      <th className="text-center font-semibold text-sm">
                        Total Students
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTeacher.map((item, index) => (
                      <tr
                        key={index}
                        className="h-12 border-b border-[#ecf0f1]"
                      >
                        <td className="text-left pl-3 text-sm">{index + 1}</td>
                        <td className="text-left pl-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Avatar alt="Image profile" sx={{ width: 32, height: 32 }}  src={pic} />
                            {item.name}
                          </div>
                        </td>
                        <td className="text-left pl-3 text-sm">
                          {item.contact}
                        </td>
                        <td className="text-center text-sm">
                          {item.specializations}
                        </td>
                        <td className="text-center text-sm">
                          {item.totalStudent}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
