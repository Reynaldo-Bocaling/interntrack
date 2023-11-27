import React from "react";
import taskUploadModel from "../../assets/images/studentTaskModel.png";
import { AiOutlineCheck } from "react-icons/ai";
import { LiaTimesSolid } from "react-icons/lia";
import PieChart from "../../components/charts/PieChart";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCampus, getStudent, getTask, getTimesheet } from "../../api/Api";
import { format } from "date-fns";

const Dashboard = () => {
  const formattedDate = format(new Date(), "yyyy-MM-dd");
  const currentDate = new Date();
  // piechart info

  const { data: getProgram, isLoading: programLoading } = useQuery({
    queryKey: ["getProgram2"],
    queryFn: getCampus,
  });
  const { data: getTaskList, isLoading: taskLoading } = useQuery({
    queryKey: ["getTask2"],
    queryFn: getTask,
  });
  const { data: getStudentInfo, isLoading: studentLoading } = useQuery({
    queryKey: ["getStudentInfo2"],
    queryFn: getStudent,
  });
  const { data: getStudentTimesheet, isLoading: timesheetLoading } = useQuery({
    queryKey: ["getTimesheet2"],
    queryFn: getTimesheet,
  });

  if (programLoading || taskLoading || studentLoading || timesheetLoading) {
    return <center className="my-5 text-lg">Computing..</center>;
  }

  const programList = getProgram
    ? getProgram
        .flatMap(({ college }) => college?.flatMap(({ program }) => program))
        .map(({ trainingHours, program_description }) => ({
          trainingHours,
          program_description,
        }))
    : [];

  const timesheetFilter = getStudentTimesheet
    ?.filter((item) => new Date(item.date) <= currentDate)
    .map(
      ({
        id,
        timeIn,
        timeOut,
        totalHours,
        date,
        logStatus,
        student_id,
        week,
      }) => ({
        id,
        timeIn: logStatus !== 0 ? timeIn : "0:00",
        timeOut: logStatus !== 0 ? timeOut : "0:00",
        totalHours: logStatus !== 0 ? totalHours : 0,
        date,
        logStatus,
        student_id,
        week,
      })
    );
  const hoursTaken = Math.round(
    timesheetFilter?.reduce((total, item) => total + item.totalHours, 0)
  );
  const totalHours = programList.find(
    (item) => item.program_description === getStudentInfo?.program
  )?.trainingHours;
  const hoursRemaining = totalHours - hoursTaken;

  const piechartData = [hoursTaken, hoursRemaining];
  const colors = ["#2ECC71", "#FF5733"];
  const labels = ["Hours Taken", "Hours Remaining"];

  const getTime = getStudentTimesheet
    ? getStudentTimesheet.find((item) => item.date === formattedDate)
    : [];
  const timeInDB = getTime ? getTime.timeIn : "";
  const timeOutDB = getTime?.timeOut;
  const totalHoursDB = getTime?.totalHours;
  const timeId = getTime?.id;
  const recentLogs = getStudentTimesheet
    ?.filter((item) => new Date(item.date) <= currentDate)
    .slice(timesheetFilter.length - 5, timesheetFilter.length + 1);
  const attendanceRequest = getStudentTimesheet?.filter(
    (item) => item.totalHours != 0 && item.logStatus == 0
  );
  const totalRequest = getStudentTimesheet?.filter(
    (item) => item.totalHours != 0
  );

  const progressRate = (attendanceRequest.length / totalRequest.length) * 100;

  return (
    <div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl mt-2 font-bold tracking-wide text-gray-70 ">
          Welcome back!
        </h1>
        <small className="text-blue-500 font-semibold tracking-wider">
          Student Dashboard
        </small>
      </div>

      <div className="w-[100%] flex flex-col lg:flex-row gap-14 bg-white2 rounded-lg relative mb-2">
        {/* count box */}
        <div className="relative  max-w-[450px] w-full pt-7">
            <PieChart
              data={piechartData}
              colors={colors}
              labels={labels}
              title={"Total Hours"}
            />
          <h1 className="absolute top-[12%] right-[2%] text-2xl font-semibold">
            {`${hoursTaken} / ${totalHours}`}{" "}
            <span className="text-xs text-blue-500">hrs</span>
          </h1>

          <div className="h-[110px] flex items-center justify-between px-8 pb-2 mt-3">
            <div>
              <h1 className="text-lg font-semibold xl flex items-center gap-3">
                {hoursTaken}
                <span className="text-xs text-blue-500 tracking-wider">
                  hrs
                </span>
              </h1>
              <span className="text-gray-500 text-xs tracking-wide">
                Hours Taken
              </span>
            </div>
            <div>
              <h1 className="text-lg font-semibold xl flex items-center gap-3">
                {hoursRemaining}
                <span className="text-xs text-blue-500 tracking-wider">
                  hrs
                </span>
              </h1>
              <span className="text-gray-500 text-xs tracking-wide">
                Hours Remaining
              </span>
            </div>
            <div>
              <h1 className="text-lg font-semibold xl flex items-center gap-3">
                {totalHours}
                <span className="text-xs text-blue-500 tracking-wider">
                  hrs
                </span>
              </h1>
              <span className="text-gray-500 text-xs tracking-wide">
                Total Hours
              </span>
            </div>
          </div>
        </div>




        {/* right side */}
        <div className="bg-white w-full border shadow-2xl shadow-red-50 border-slate-200 rounded-lg p-5">
          <header className="w-full flex flex-col gap-3 mb-5">
            <small className="text-gray-400 tracking-wider">
              Upload records
            </small>
            <span className="text-lg tracking-wide font-semibold">
              Activity Summary
            </span>
          </header>
          <main className="flex items-center gap-5">
            <div>
              <img
                src={taskUploadModel}
                alt="task upload models"
                className="max-w-[180px]"
              />
            </div>
            <div className="w-full flex flex-col gap-10">
              <div className="flex flex-col gap-2">
                <div className="text-2xl font-semibold tracking-wider flex items-center gap-3">
                  {getTaskList.length}
                  <span className="text-xs font-medium text-blue-500">
                    items
                  </span>
                </div>
                <small className="tracking-wide">total Task</small>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col items-center">
                  <span className="font-medium tracking-wide">
                    {" "}
                    Progress rate
                  </span>
                  <span className="text-xs">{progressRate}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className={`rounded-full h-full w-[${progressRate}%]  bg-blue-500`}
                  ></div>
                </div>
              </div>
            </div>
          </main>
          <div className="mt-5 px-5 w-full">
            <button className="w-full h-10 text-sm rounded-lg border border-blue-500 text-blue-500 hover:bg-slate-50">
              <Link to="/Upload-task">View All task</Link>
            </button>
          </div>
        </div>
      </div>





      <div>
        {totalHoursDB > 0 ? (
          <div className="my-10 text-2xl flex items-center justify-center gap-1 text-green-500">
            End Work <AiOutlineCheck />
          </div>
        ) : timeInDB !== "0:00" ? (
          <div className="flex flex-col items-center justify-center gap-3 my-10">
            <small className="text-gray-500 tracking-wide">
              Time-in for today
              <h1></h1>
            </small>
            <h1 className="text-3xl font-bold">{timeInDB}</h1>
          </div>
        ) : (
          <div className="w-full text-2xl text-gray-500 my-10 flex items-center justify-center gap-1">
            Time in not yet <LiaTimesSolid className="text-red-500" />
          </div>
        )}
      </div>

      <div className="bottom w-full flex flex-col gap-5">
        <div className="w-full bg-white border rounded-lg text-sm tracking-wide p-3">
          <div className=" mx-3 text-lg tracking-wide font-semibold">
            Recent Logs
          </div>
          <table className="w-full">
            <thead>
              <tr className="h-12 border-b">
                <th className="text-sm font-semibold text-left pl-3 tracking-wider">
                  Date
                </th>
                <th className="text-sm font-semibold text-left pl-3 tracking-wider">
                  TimeIn
                </th>
                <th className="text-sm font-semibold text-left pl-3 tracking-wider">
                  TimeOut
                </th>
                <th className="text-sm font-semibold text-left pl-3 tracking-wider">
                  Total hours
                </th>
              </tr>
            </thead>
            <tbody>
              {recentLogs.length > 0 ? (
                recentLogs.map((item, index) => (
                  <tr className="h-12" key={index}>
                    <td className="text-left pl-3 text-sm tracking-wide">
                      {item.date}
                    </td>
                    <td className="text-left pl-3 text-sm tracking-wide">
                      {item.timeIn != "0:00"
                        ? format(new Date(item.timeIn), "h:mm a")
                        : "0"}
                    </td>
                    <td className="text-left pl-3 text-sm tracking-wide">
                      {" "}
                      {item.timeOut != "0:00"
                        ? format(new Date(item.timeOut), "h:mm a")
                        : "0"}
                    </td>
                    <td className="text-left pl-3 text-sm tracking-wide">
                      {item.totalHours} hrs
                    </td>
                  </tr>
                ))
              ) : (
                <h1>No logs</h1>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
