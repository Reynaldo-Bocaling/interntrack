import React, { lazy } from "react";
import { FcCalendar } from "react-icons/fc";
import { LiaUsersSolid } from "react-icons/lia";
const LineChart  = lazy(()=> import("../../components/charts/LineChart"));
import pic from "../../assets/images/emptyProfile.png";
import { Link } from "react-router-dom";
const DateNow  = lazy(()=> import("../../components/Dates/DateNow"));
import { useQuery } from "@tanstack/react-query";
import {
  getCampus,
  getStudentList,
  getTeacher,
  getTrainerList,
} from "../../api/Api";
import { format } from "date-fns";
import { CircularProgressbar } from "react-circular-progressbar";
import { Avatar } from "@nextui-org/react";

const Dashboard = () => {
  const formattedDate = format(new Date(), "yyyy-MM-dd");

  const { data: getProgram, isLoading: programLoading } = useQuery({
    queryKey: ["getProgram"],
    queryFn: getCampus,
  });

  const { data: teacher, isLoading: teacherLoading } = useQuery({
    queryKey: ["getTeacher"],
    queryFn: getTeacher,
  });

  const { data: students, isLoading: studentLoading } = useQuery({
    queryKey: ["getStudent2"],
    queryFn: getStudentList,
  });

  const { data: trainerlist, isLoading: trainerlistLoading } = useQuery({
    queryKey: ["getTrainerList"],
    queryFn: getTrainerList,
  });

  const data = teacher
    ? teacher.student.filter((item) => item.deletedStatus === 0)
    : [];

  const filterStudentList = students
    ? students
        .filter((item) => item.teacher_id === teacher?.id)
        .filter((item) => item.deletedStatus === 0)
    : [];

  const getTime = filterStudentList
    .flatMap(({ timesheet }) => timesheet)
    .find((item) => item.date === formattedDate);

  const getWeeklyHoursRate = filterStudentList
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
    ? getProgram
        .flatMap(({ college }) => college?.flatMap(({ program }) => program))
        .map(({ trainingHours, program_description }) => ({
          trainingHours,
          program_description,
        }))
    : [];

  const totalAllHoursStudent = filterStudentList
    .map(
      ({ program }) =>
        programList.find((item) => item.program_description === program)
          ?.trainingHours
    )
    .reduce((total, item) => total + item, 0);

  const totalHoursStudent = filterStudentList
    .flatMap(({ timesheet }) => timesheet)
    .filter((item) => item.logStatus === 1)
    .reduce((total, item) => total + item.totalHours, 0);

  const percentage = Math.floor(
    (Math.round(totalHoursStudent) / totalAllHoursStudent) * 100
  );

  const trainer = trainerlist ? trainerlist : 0;
  const coordinatorStudent = teacher?.coordinator.teacher.flatMap(
    ({ student }) => student
  ).length;

 


  const totalStudent = filterStudentList.length;

const totalAssign = totalStudent !== 0
  ? `${Math.round(
      (data.filter(
        (item) => item.trainer !== null && item.areaAssigned_id !== null
      ).length / totalStudent) * 100
    )} %`
  : '0 %';

const totalUnAssign = totalStudent !== 0
  ? `${Math.round(
      (data.filter(
        (item) => item.trainer === null && item.areaAssigned_id === null
      ).length / totalStudent) * 100
    )} %`
  : '0 %';


  



  // console.log('student',getWeeklyAttendance);

  const totalCountBox = [
    {
      label: "Trainer",
      url: "/daily-logs",
      count: trainerlistLoading ? "Loading" : trainer.length,
      textColor: "text-blue-500",
      shadow: "shadow-red-50",
    },
    {
      label: "Student",
      url: "/",
      count: studentLoading ? "Loading" : totalStudent,
      textColor: "text-green-500",
      shadow: "shadow-green-50",
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
      name: "Hours",
      data: Object.values(getWeeklyHoursRate),
      color: "#00C6FD",
      fillColor: "rgba(255, 0, 0, 0.3)",
    },
  ];

  if (
    (programLoading || studentLoading || teacherLoading, trainerlistLoading)
  ) {
    return <center className="my-5 text-lg">Computing..</center>;
  }

  return (
    <div className="min-h-full w-full">
      <div className="m-1 ">
        <div className="flex flex-col md:flex-row gap-3 mt-1 min-h-[550px] ">
          {/* main dashboard content */}
          <main className="flex flex-col md:w-[62%]  relative ">
            {/* title */}

            <div className="left-content flex  items-center justify-between">
              <div className="flex flex-col gap-2">
                <h1 className="text-base md:text-xl font-semibold tracking-wider text-gray-700">
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
            <div className="total-count flex flex-col md:flex-row justify-between gap-5 py-3 ">
              <div className="felx flex-col gap-3 bg-white w-full h-full rounded-lg p-5 shadow-2xl border shadow-blue-50 border-slate-200">
                <div className="text-gray-500 text-md font-medium tracking-wide mb-5">
                  Student Assignment Status
                </div>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-3">
                    <div className="font-medium">
                      Assigned:{" "}
                      <span className="pl-8 font-semibold">{totalAssign}</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full">
                      <div
                        className={`h-full w-[${totalAssign}] bg-blue-500 rounded-full`}
                      ></div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="font-medium">
                      Unassigned:{" "}
                      <span className="pl-3 font-semibold">
                        {totalUnAssign}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full">
                      <div
                        className={`h-full w-[${totalUnAssign}] bg-red-500 rounded-full`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="right flex flex-col gap-3">
                {totalCountBox.map((totalItems, index) => (
                  <div
                    key={index}
                    className={`${totalItems.shadow} relative h-24 lg:w-[280px] flex items-center gap-5 bg-white rounded-lg p-5 py-7 shadow-2xl border border-slate-200`}
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
              <LineChart data={weeklyAttendanceGraphData} />
            </div>
          </main>

          {/* right side */}
          <div className="right-side lg:w-[37%] flex flex-col gap-3 ">
            <div className="relative  max-w-full flex  flex-col p-4 bg-white shadow-2xl shadow-orange-50 rounded-md border px-7 py-7 border-slate-200">
              <div className="flex items-center gap-5">
                  <Avatar src={teacher?.coordinator? teacher?.coordinator.profile_url : pic} alt="error" size="lg" className="shadow-md border"/>

                <div>
                  <h4 className="text-xl font-semibold tracking-wider">
                    {`${teacher?.coordinator?.firstname} ${teacher?.coordinator?.lastname}`}
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
                  <span className="pl-5 text-gray-700 text-lg font-semibold">
                    {teacher?.coordinator?.teacher.length}
                  </span>
                </div>

                <div className="flex items-center  justify-between">
                  <div className="flex gap-5">
                    <LiaUsersSolid size={25} className="text-blue-400" />
                    <span className=" font-medium tracking-wide">Student</span>
                  </div>
                  <span className="pl-5 text-gray-700 text-lg font-semibold">
                    {coordinatorStudent}
                  </span>
                </div>
              </div>

              <button className="absolute top-5 right-3 text-blue-500 text-xs font-medium tracking-wide">
                View
              </button>
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
};

export default Dashboard;
