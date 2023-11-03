import React, { useEffect, useState } from "react";

import { FcCalendar } from "react-icons/fc";
import { FaClipboardList } from "react-icons/fa";
import { BsCalendar2CheckFill, BsCalendarMinusFill } from "react-icons/bs";
import LineChart from "../../components/charts/LineChart";
import Calendar from "../../components/calendar/Calendar";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCampus, getStudentList, getTrainer } from "../../api/Api";
import { format } from "date-fns";
import { CircularProgressbar } from "react-circular-progressbar";
import { Avatar } from "@nextui-org/react";
import pic from "../../assets/images/dp.png";

function Dashboard() {
  const currentDate = new Date();
  const formattedDate = format(new Date(), "yyyy-MM-dd");
  const { data: studentlist, isLoading: studentListLoading } = useQuery({
    queryKey: ["getStudentTimesheet"],
    queryFn: getStudentList,
  });

  const { data: getTrainer_id } = useQuery({
    queryKey: ["getTrainer_id"],
    queryFn: getTrainer,
  });
  const { data: getProgram } = useQuery({
    queryKey: ["getProgram"],
    queryFn: getCampus,
  });

  const filterStudentList = studentlist
    ? studentlist.filter((item) => item.trainer_id === getTrainer_id?.id)
    : [];

  const getTime = filterStudentList
    .flatMap(({ timesheet }) => timesheet)
    .find((item) => item.date === formattedDate);


    const getWeeklyHoursRate = filterStudentList 
    ? filterStudentList.flatMap(({ timesheet }) => timesheet)
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



  const getWeeklyAttendance = filterStudentList
    ? filterStudentList
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
            acc[day] = acc[day] || { present: 0, absent: 0 };
            if (totalHours === 0) {
              acc[day].absent += 1;
            } else {
              acc[day].present += 1;
            }
          }
          return acc;
        }, {})
    : {};

  const result = {
    present: [],
    absent: [],
  };

  ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].forEach((day) => {
    if (getWeeklyAttendance[day]) {
      result.present.push(getWeeklyAttendance[day].present);
      result.absent.push(getWeeklyAttendance[day].absent);
    }
  });

 

  const programList = getProgram
  ? getProgram.flatMap(({ college }) =>
      college?.flatMap(({ program }) => program)
    ).map(({trainingHours,program_description}) => ({trainingHours,program_description}) )
  : [];


  const totalAllHoursStudent = filterStudentList.map(({ program}) => 
  programList.find((item)=> item.program_description === program)?.trainingHours)
  .reduce((total, item) => total + item, 0)

const totalHoursStudent = filterStudentList.flatMap(({timesheet}) => timesheet).reduce((total, item) => total + item.totalHours, 0)


const percentage = Math.floor((totalHoursStudent / totalAllHoursStudent) * 100)



const studentRequest = filterStudentList && Array.isArray(filterStudentList)
  ? filterStudentList
  .filter((item)=> item.trainer_id === getTrainer_id?.id)
  .map(({ id, firstname, lastname, accountStatus, timesheet,deletedStatus }) => ({
      id,
      firstname,
      lastname,
      accountStatus,
      timesheet: timesheet && timesheet.filter((item) => new Date(item.date) <= currentDate && item.totalHours > 0 && item.logStatus === 0),
      deletedStatus
    }))
  : [];


  const filterStudentRequest = studentRequest.map(({id, firstname,lastname, deletedStatus, timesheet}) => ({
    id,
    name: `${firstname} ${lastname}`,
    deletedStatus,
    totalRequest : timesheet.length,
    totalPendingHours: timesheet.reduce((total, item) => total + item.totalHours, 0)
  }));
  
  const currentAttendanceRequest = filterStudentRequest.slice(filterStudentRequest.length -3, filterStudentRequest.length  +1 )

  console.log('req',currentAttendanceRequest);



  const getTimesheet = filterStudentList
    ? filterStudentList
        .flatMap(({ timesheet }) => timesheet)
        .filter((item) => item.date === formattedDate)
    : [];

  const totalStudent = filterStudentList.length;
  const totalPresent = getTimesheet.filter(
    (item) => item.timeIn != "0:00"
  ).length;
  const totalAbsent = getTimesheet.filter(
    (item) => item.timeIn == "0:00"
  ).length;

  const totalCountBox = [
    {
      label: "All",
      url: "/student-list",
      count: totalStudent,
      icon: FaClipboardList,
      textColor: "text-blue-500",
      bgColor: "bg-blue-100",
      shadow: "shadow-blue-50",
    },
    {
      label: "Present today",
      url: "/daily-logs",
      count: totalPresent,
      icon: BsCalendar2CheckFill,
      textColor: "text-green-500",
      bgColor: "bg-green-100",
      shadow: "shadow-green-50",
    },
    {
      label: "Absent today",
      url: "/",
      count: totalAbsent,
      icon: BsCalendarMinusFill,
      textColor: "text-red-500",
      bgColor: "bg-red-100",
      shadow: "shadow-red-50",
    },
  ];

  // dummydata for charts
  const weeklyAttendanceGraphData = [
    {
      name: "absent",
      data: result.absent,
      color: "#ff0000",
      fillColor: "rgba(255, 0, 0, 0.3)",
    },
    {
      name: "present",
      data: result.present,
      color: "#1a75ff",
      fillColor: "rgba(26, 117, 255, 0.3)",
    },
  ];



  const hoursRateGraphData = [
    {
      name: 'Hours',
      data: Object.values(getWeeklyHoursRate),
      color: '#00C6FD',
      fillColor: 'rgba(255, 0, 0, 0.3)',
    }
  ];


  return (
    <div className="min-h-full w-full">
      <div className="m-1 ">
        <div className="flex gap-4 mt-1 min-h-[550px]">
          {/* dashboard content */}
          <main className="flex flex-col w-[62%] relative ">
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
                  <Link
                    to={totalItems.url}
                    className="absolute top-2 right-4 text-[0.67rem] text-blue-500 font-medium"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>

            {/* graph */}
            <div className="grid gap-3">
              <div className="graph-box h-auto p-4 pr-2 shadow-lg bg-white shadow-slate-200 rounded-md border border-gray-100">
                <h1 className=" text-base font-semibold text-gray-700 ">
                  Weekly Attendance Overview
                </h1>
                <LineChart data={weeklyAttendanceGraphData} sizeHeight={350} />
              </div>
              <div className="graph-box h-auto p-4 pr-2 shadow-lg bg-white shadow-slate-200 rounded-md border border-gray-100">
                <h1 className=" text-base font-semibold text-gray-700 ">
                Current Attendance Request
                </h1>

                <div>
                <div className="mt-3 bg-white rounded-lg shadow-lg shadow-slate-50 border border-[#ecf0f1] overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="h-10 bg-[#f1f4f5]">
                      <th className="text-left pl-3 font-semibold text-sm">
                        #
                      </th>
                      <th className="text-left pl-3 font-semibold text-sm w-[250px]">
                        Name
                      </th>
                      <th className="text-center font-semibold text-sm">
                        request
                      </th>
                      <th className="text-center font-semibold text-sm">
                        Pending Hours
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {currentAttendanceRequest?.map((item, index) => (
                      <tr
                        key={index}
                        className="h-12 border-b border-[#ecf0f1]"
                      >
                        <td className="text-left pl-3 text-sm">{index + 1}</td>
                        <td className="text-left pl-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Avatar alt="Image profile" sx={{ width: 28, height: 28 }}  src={pic} />
                            {item.name}
                          </div>
                        </td>
                        <td className="text-center text-sm">
                          {item.totalRequest}
                        </td>
                        <td className="text-center text-sm">
                          {item.totalPendingHours} hrs
                        </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
                </div>
              </div>
            </div>
          </main>

          {/* left content */}
          <div className="right-side w-[37%] flex flex-col gap-3">
            <div className="max-w-full p-4 bg-white shadow-2xl shadow-sky-50 rounded-md border border-gray-100">
              <div className="text-sm font-medium tracking-wide mb-2 flex items-center gap-1">
                {" "}
                <FcCalendar />
                Date
              </div>
              <Calendar />
            </div>

            <div className="col-span-3 bg-white rounded-lg shadow-xl shadow-blue-50 border border-[#ecf0f1] ">
            <p className="text-base font-semibold mt-3 ml-3">
                Student Hours rate per week
              </p>
            <LineChart data={hoursRateGraphData} sizeHeight={200} />
            </div>

            <div className="col-span-2 bg-white rounded-lg shadow-xl p-3 shadow-blue-50 border border-[#ecf0f1] flex flex-col items-center justify-center">
              <p className="text-lg font-semibold">Student Completion Rate</p>
              <div className="max-w-[200px] w-full p-4 ">
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


          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
