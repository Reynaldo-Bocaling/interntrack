import React, { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi";
import { FcCalendar } from "react-icons/fc";
import { PiBuildingsBold } from "react-icons/pi";
import { HiOutlineBookOpen } from "react-icons/hi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { CircularProgressbar } from "react-circular-progressbar";
import pic from "../../assets/images/dp.png";
import { Link } from "react-router-dom";
import DateNow from "../../components/Dates/DateNow";
import Avatar from "@mui/material/Avatar";
import LineChart from "../../components/charts/LineChart";
import coverDirector from "../../assets/images/DirectorCover.png";
import ApexCharts from "react-apexcharts";
import { getCompanyList, getCoordinatorList, getDirector, getStudentList, getTeacherList } from "../../api/Api";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

const Dashboard = () => {
  const formattedDate = format(new Date(), "yyyy-MM-dd");


  const {
    data: getDirectorInfo
  } = useQuery({
    queryKey: ["getCompanyList"],
    queryFn: getDirector,
  });


  const {
    data: company
  } = useQuery({
    queryKey: ["getCompanyList"],
    queryFn: getCompanyList,
  });

  const {
    data: StudentList,
    
  } = useQuery({
    queryKey: ["getStudentList"],
    queryFn: getStudentList,
  });


  const {
    data: coordinatorList,
  } = useQuery({
    queryKey: ["getCoordinatorList"],
    queryFn: getCoordinatorList,
  });

  const  {
    data: teacherList
  } = useQuery({
    queryKey: ["getTeacherList"],
    queryFn: getTeacherList
  });

  
  const getTime = StudentList 
  ? StudentList.flatMap(({timesheet}) => timesheet)
  .find((item)=> item.date === formattedDate)
  : []
  

  const getWeek = StudentList 
  ? StudentList.flatMap(({ timesheet }) => timesheet)
    .filter((item) => item.week === getTime?.week)
    .map(({ date, totalHours }) => ({
      date: format(new Date(date), "dd"),
      day: format(new Date(date), "EEEE"),
      totalHours
    }))
    .reduce((acc, { day, totalHours }) => {
      if (['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(day)) {
        acc[day] = (acc[day] || 0) + totalHours;
      }
      return acc;
    }, {})
  : {};
  
 

  const totalStudent = StudentList ? StudentList.length : [];
  const totalCoordinator = coordinatorList ? coordinatorList.length : [];
  const totalTeacher = teacherList ? teacherList.length : [];
  const companyList = company ? company.length : [];


  const graphData = [
    {
      name: "Hours",
      data: Object.values(getWeek),
      color: "#00C6FD",
      fillColor: "rgba(255, 0, 0, 0.3)",
    },
  ];

  const countBox = [
    {
      label: "Student",
      totalCount: totalStudent,
      icon: FiUsers,
      iconBackground: "text-sky-500 bg-sky-100",
      ShadowColor: "shadow-red-50",
      extraText: [
        { label: "Assigned", totalCount: 150, color: "text-green-500" },
        { label: "Unassigned", totalCount: 50, color: "text-red-500" },
      ],
    },
    {
      label: "Coordinator",
      totalCount: totalCoordinator,
      icon: FiUsers,
      iconBackground: "text-green-500 bg-green-100",
      ShadowColor: "shadow-green-50",
    },
    {
      label: "Teacher",
      totalCount: totalTeacher,
      icon: FiUsers,
      iconBackground: "text-violet-500 bg-violet-100",
      ShadowColor: "shadow-red-50",
    },
    {
      label: "Company",
      totalCount: companyList,
      icon: PiBuildingsBold,
      iconBackground: "text-orange-500 bg-orange-100",
      ShadowColor: "shadow-blue-50",
      extraText: [
        { label: "Available slots", totalCount: 55, color: "text-green-500" },
      ],
    },
  ];


  const percentage = 75;

  return (
    <>
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
      <div className="grid grid-cols-6 grid-rows-3 gap-3">
        <div className="relative col-span-4 h-[170px] bg-white rounded-lg p-3 shadow-xl overflow-hidden shadow-[#f4f2f2] border border-[#ecf0f1]">
          <img
            src={coverDirector}
            alt=""
            className="absolute -top-3 right-1 w-[200px]"
          />

          <div className="p-3">
            <p className="">
              Hello, <span className="font-semibold capitalize tracking-wide">{getDirectorInfo?.firstname}</span>
            </p>
            <p className="text-xs text-gray-500 max-w-[70%] w-full mt-3 tracking-wider">
              Your centralized control for overseeing OJT programs, tracking
              trainee progress, and accessing vital data and resources to ensure
              a successful training experience."
            </p>
            <button className="bg-sky-100 text-sky-500 text-xs font-medium py-2 px-8 mt-4 rounded-lg">
              View
            </button>
          </div>
        </div>
        <div className="col-span-4 row-span-2 bg-white rounded-lg  p-2 shadow-xl shadow-blue-50 border border-[#ecf0f1]">
          <p className="text-base font-semibold mt-5 ml-4 mb-3">
            Student Hours rate per week
          </p>
          <div>
            <LineChart data={graphData} sizeHeight={260} />
          </div>
        </div>
        <div className="col-span-2 col-start-5 row-span-2 row-start-1 grid grid-cols-2 gap-3">
          {countBox.map((item, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg p-5 shadow-md shadow-[#f2f4f5] border border-[#ecf0f1]"
            >
              <BiDotsVerticalRounded className="absolute right-3 top-3" />
              <div className={`${item.iconBackground} p-2 rounded-lg w-[33px]`}>
                <item.icon size={18} />
              </div>
              <p className="text-xs text-gray-500 tracking-wide mt-5 mb-2">
                {item.label}
              </p>
              <span className="text-lg font-bold">{item.totalCount}</span>
              {item.extraText && (
                <div className=" absolute  left-2 text-xs flex items-center justify-between gap-2 mt-1">
                  {item.extraText.map((text, i) => (
                    <p
                      key={i}
                      className={`${text.color} flex flex-col items-center justify-center`}
                    >
                      {text.label}:{" "}
                      <span className="font-medium">{text.totalCount}</span>
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="col-span-2 col-start-5 row-span-1 row-start-3 bg-white rounded-lg p-3 shadow-xl shadow-blue-50 border border-[#ecf0f1]">
          {/* <p className="text-base font-semibold mt-3 ml-3">
                Student Hours rate per week
              </p>
            <LineChart data={graphData} sizeHeight={100} /> */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
