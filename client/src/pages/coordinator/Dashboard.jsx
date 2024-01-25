import React, { lazy,useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi";
import { FcCalendar } from "react-icons/fc";
import { PiBuildingsBold } from "react-icons/pi";
import { HiOutlineBookOpen } from "react-icons/hi";
import { CircularProgressbar } from "react-circular-progressbar";
import pic from "../../assets/images/dp.png";
import { Link } from "react-router-dom";
const DateNow = lazy(()=> import("../../components/Dates/DateNow"));
import Avatar from "@mui/material/Avatar";
import LineChart from "../../components/charts/LineChart";
import {
  getCampus,
  getCompanyList,
  getCoordinator,
  getStudentList,
} from "../../api/Api";
import { useQuery } from "@tanstack/react-query";
import picture from "../../assets/images/dp.png";
import { format } from "date-fns";

const Dashboard = () => {
  const formattedDate = format(new Date(), "yyyy-MM-dd");

  const { data, isLoading: coordinatorLoading } = useQuery({
    queryKey: ["coordinator"],
    queryFn: getCoordinator,
  });

  const { data: getCampusList, isLoading: campusLoading } = useQuery({
    queryKey: ["getCampusList"],
    queryFn: getCampus,
  });

  const { data: getCompany, isLoading: companyLoading } = useQuery({
    queryKey: ["getCompanyList"],
    queryFn: getCompanyList,
  });

  const { data: StudentList, isLoading: studentLoading } = useQuery({
    queryKey: ["getStudentList2"],
    queryFn: getStudentList,
  });

  const { data: getProgram, isLoading: programLoading } = useQuery({
    queryKey: ["getProgram"],
    queryFn: getCampus,
  });

 

  const getTeacher_id = data ? data.teacher?.map(({ id }) => id) : [];

  const filteredStudents = StudentList
    ? StudentList.filter((student) => {
        return getTeacher_id?.includes(student.teacher_id);
      }).filter((item) => item.deletedStatus === 0)
    : [];

  const getTime = filteredStudents
    ? filteredStudents
        .flatMap(({ timesheet }) => timesheet)
        .find((item) => item.date === formattedDate)
    : [];

  const getWeek = filteredStudents
    ? filteredStudents
        .flatMap(({ timesheet }) => timesheet)
        .filter((item) => item.week === getTime?.week)
        .map(({ date, totalHours }) => ({
          date: format(new Date(date), "dd"),
          day: format(new Date(date), "EEEE"),
          totalHours,
        }))
        .reduce((acc, { day, totalHours }) => {
          if (
            ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].includes(
              day
            )
          ) {
            acc[day] = (acc[day] || 0) + totalHours;
          }
          return acc;
        }, {})
    : {};

  const getTeacherList = data
    ? data.teacher.map(
        ({ firstname, lastname, contact, program, student }) => ({
          name: `${firstname} ${lastname}`,
          contact,
          program,
          totalStudent: student.length,
        })
      )
    : [];

  const programList = getProgram
    ? getProgram
        .flatMap(({ college }) => college?.flatMap(({ program }) => program))
        .map(({ trainingHours, program_description }) => ({
          trainingHours,
          program_description,
        }))
    : [];

    const totalAllHoursStudent = filteredStudents
    .map(({ program }) =>
      programList.find((item) => item.program_description === program)?.trainingHours
    )
    .filter((hours) => !isNaN(hours))
    .reduce((total, hours) => total + hours, 0);
  
  const totalHoursStudent = filteredStudents
    .flatMap(({ timesheet }) => timesheet)
    .filter((item) => item.logStatus === 1)
    .reduce((total, item) => total + item.totalHours, 0);
  
  // Check if totalAllHoursStudent is NaN or 0, then default to 0
  const percentage = Math.floor(
    (Math.round(totalHoursStudent) / (totalAllHoursStudent || 1)) * 100
  );
  

  const totalSTudent = filteredStudents.length;
  const totalTeacher = data?.teacher.length;
  const totalCourse = getCampusList
    ? getCampusList.flatMap(({ college }) => college).length
    : [];
  const totalCompany = getCompany ? getCompany.length : [];
  const currentTeacher = getTeacherList.slice(
    getTeacherList.length - 3,
    getTeacherList.length + 1
  );

  const totalAssign = `${
    filteredStudents.filter(
      (item) => item.trainer !== null && item.areaAssigned_id !== null
    ).length
  }`;
  const totalUnAssign = `${
    filteredStudents.filter(
      (item) => item.trainer === null && item.areaAssigned_id === null
    ).length
  }`;

  const countBox = [
    {
      label: "Student",
      totalCount: totalSTudent,
      icon: FiUsers,
      iconBackground: "text-sky-500 bg-sky-100",
      ShadowColor: "shadow-red-50",
      extraText: [
        { label: "Assigned", totalCount: totalAssign, color: "text-green-500" },
        {
          label: "Unassigned",
          totalCount: totalUnAssign,
          color: "text-red-500",
        },
      ],
    },
    {
      label: "Teacher",
      totalCount: totalTeacher,
      icon: FiUsers,
      iconBackground: "text-green-500 bg-green-100",
      ShadowColor: "shadow-green-50",
      extraText: [],
    },
    {
      label: "Courses",
      totalCount: totalCourse,
      icon: HiOutlineBookOpen,
      iconBackground: "text-violet-500 bg-violet-100",
      ShadowColor: "shadow-red-50",
      extraText: [],
    },
    {
      label: "Company",
      totalCount: totalCompany,
      icon: PiBuildingsBold,
      iconBackground: "text-orange-500 bg-orange-100",
      ShadowColor: "shadow-blue-50",
      extraText: [
        { label: "Available slots", totalCount: 55, color: "text-green-500" },
      ],
    },
  ];

  // chart data
  const graphData = [
    {
      name: "Hours",
      data: Object.values(getWeek),
      color: "#00C6FD",
      fillColor: "rgba(255, 0, 0, 0.3)",
    },
  ];




   if (
    (programLoading || studentLoading || companyLoading, coordinatorLoading)
  ) {
    return <center className="my-5 text-lg">Computing..</center>;
  }
  return (
    <div className="min-h-full w-full">
      <div className="m-1 ">
        <div className="w-full flex flex-col">
          <div className="left-content flex  items-center justify-between">
            <div className="flex flex-col gap-2">
              <h1 className=" text-base md:text-xl font-semibold tracking-wider text-gray-700">
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

          <section className="grid grid-cols-1 md:grid-cols-6 py-5 gap-4">
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
              <LineChart data={graphData} sizeHeight={200} />
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
              <p className="text-base font-semibold">Recent Teacher Added</p>

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
                        Program
                      </th>
                      <th className="text-center font-semibold text-sm">
                        Total Students
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTeacher?.map((item, index) => (
                      <tr
                        key={index}
                        className="h-12 border-b border-[#ecf0f1]"
                      >
                        <td className="text-left pl-3 text-sm">{index + 1}</td>
                        <td className="text-left pl-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Avatar
                              alt="Image profile"
                              sx={{ width: 32, height: 32 }}
                              src={pic}
                            />
                            {item.name}
                          </div>
                        </td>
                        <td className="text-left pl-3 text-sm">
                          {item.contact}
                        </td>
                        <td className="text-center text-sm">{item.program}</td>
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
