import React, { useMemo } from "react";
import taskUploadModel from "../../assets/images/studentTaskModel.png";
import PieChart from "../../components/charts/PieChart";
import LineChart from "../../components/charts/LineChart";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCampus, getStudent, getTask, getTimesheet } from "../../api/Api";
import { format } from "date-fns";
import { DotLoading } from "../../components/spinners-loading/Spinner";

const Dashboard = () => {
  const formattedDate = format(new Date(), "yyyy-MM-dd");
  const currentDate = new Date();
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  // Query data
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

  // Memoized values
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

  const hoursTaken = useMemo(
    () =>
      Math.round(
        timesheetFilter?.reduce((total, item) => total + item.totalHours, 0) ||
          0
      ),
    [timesheetFilter]
  );

  const totalHours = useMemo(
    () =>
      programList.find(
        (item) => item.program_description === getStudentInfo?.program
      )?.trainingHours || 0,
    [programList, getStudentInfo]
  );

  const hoursRemaining = totalHours - hoursTaken;

  const piechartData = [hoursTaken, hoursRemaining];
  const colors = ["#2ECC71", "#FC6736"];
  const labels = ["Hours Taken", "Hours Remaining"];

  const getWeekNumber = getStudentTimesheet
    ? getStudentTimesheet.find((item) => item.date === formattedDate)?.week
    : [];

  const recentLogs = useMemo(
    () =>
      getStudentTimesheet
        ?.filter((item) => new Date(item.date) <= currentDate)
        .slice(timesheetFilter.length - 5, timesheetFilter.length + 1),
    [getStudentTimesheet, currentDate, timesheetFilter]
  );

  const attendanceRequest = getStudentTimesheet?.filter(
    (item) => item.totalHours != 0 && item.logStatus == 0
  );

  const totalRequest = getStudentTimesheet?.filter(
    (item) => item.totalHours != 0
  );

  const progressRate =
    (attendanceRequest?.length / totalRequest?.length) * 100 || 0;

  if (programLoading || taskLoading || studentLoading || timesheetLoading) {
    return <DotLoading />;
  }

  const greetingTime =
    currentHour > 5 && currentHour < 12
      ? "Morning"
      : currentHour >= 12 && currentHour < 18
      ? "Afternoon"
      : "Evening";

  const lineGraphData = getStudentTimesheet
    ?.filter((item) => item.week == getWeekNumber)
    ?.map(({ totalHours }) => totalHours);

  const graphData = [
    {
      name: "Hours",
      data: [8, 6, 7, 8, 5],
      color: "#ff7547",
      fillColor: "rgba(255, 0, 0, 0.3)",
    },
  ];

  const totalHoursTaken = getStudentTimesheet
    ?.filter((item) => item.week === getWeekNumber)
    .reduce((acc, item) => acc + item.totalHours, 0);

  const totalHoursTakenFormula = (totalHoursTaken / 40) * 100;
  const totalHoursTakenPercentage =
    Math.round(totalHoursTakenFormula / 10) * 10 + "%";
  console.log(totalHoursTakenPercentage);
  return (
    <div className="">
      <h1 className="text-xl font-bold tracking-tight capitalize">
        {`Good ${greetingTime} ${getStudentInfo?.firstname}!`}
      </h1>

      <div className="flex flex-col gap-1">
        <div className="mt-5">
          <small className="font-extrabold px-3">
            Estimated Hours for a weeks
            <span className=" font-normal">{" (40hrs)"}</span>
          </small>

          {/* progress bar */}
          <div className="mt-3 w-full bg-red-50 rounded-full overflow-hidden p-1 ">
            <div
              className={`bg-[#ff7547] rounded-full w-[${totalHoursTakenPercentage}] px-1 h-full text-center text-white text-xs py-1`}
            >
              {totalHoursTakenFormula.toFixed()}%
            </div>
          </div>
        </div>

        <div className="p- bg-red-5002 mt-5 -mx-3 bg-white shadow-lg shadow-orange-50 rounded-lg p-2">
          <small className="font-extrabold px-4"> Your weekly Hours</small>
          <LineChart data={graphData} sizeHeight={250} />
        </div>
        <div className="w-[100%] flex flex-col  gap-1  p-2 relative mb-2">
          {/* count box */}
          <div className="relative  max-w-[450px] w-full pt-7 bg-white shadow-lg shadow-orange-50 rounded-lg">
            <PieChart
              data={piechartData}
              colors={colors}
              labels={labels}
              title={"Total Hours"}
            />
            <h1 className="absolute top-[12%] right-12 text-xl font-semibold ">
              {`${hoursTaken} / ${totalHours}`}{" "}
              <span className="text-xs text-blue-500">hrs</span>
            </h1>

            <div className="h-[110px] flex items-center justify-between px-8 pb-2 mt-3">
              <div>
                <h1 className="text-lg font-semibold xl flex items-center gap-1">
                  {hoursTaken}
                  <span className="text-xs ">hrs</span>
                </h1>
                <span className="text-gray-500 text-xs  tracking-wide">
                  Hours Taken
                </span>
              </div>
              <div>
                <h1 className="text-lg font-semibold xl flex items-center gap-1">
                  {hoursRemaining}
                  <span className="text-xs ">hrs</span>
                </h1>
                <span className="text-gray-500 text-xs tracking-wide">
                  Hours Remaining
                </span>
              </div>
              <div>
                <h1 className="text-lg font-semibold xl flex items-center gap-1">
                  {totalHours}
                  <span className="text-xs">hrs</span>
                </h1>
                <span className="text-gray-500 text-xs tracking-wide">
                  Total Hours
                </span>
              </div>
            </div>
          </div>

          {/* right side */}
          <div className="bg-white w-full border  shadow-lg shadow-orange-50 rounded-lg p-5">
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
      </div>

      <div className="bottom w-full flex flex-col gap-5">
        <div className="w-full bg-white shadow-lg shadow-orange-50 rounded-lg p-2">
          <div className=" mx-3  tracking-wide font-semibold">Recent Logs</div>
          <table className="w-full">
            <thead>
              <tr className="h-12 border-b">
                <th className="text-xs font-semibold text-left pl-3 tracking-wider">
                  Date
                </th>
                <th className="text-xs font-semibold text-left pl-3 tracking-wider">
                  TimeIn
                </th>
                <th className="text-xs font-semibold text-left pl-3 tracking-wider">
                  TimeOut
                </th>
                <th className="text-xs font-semibold text-left pl-3 tracking-wider">
                  Total hours
                </th>
              </tr>
            </thead>
            <tbody>
              {recentLogs.length > 0 ? (
                recentLogs.map((item, index) => (
                  <tr className="h-12" key={index}>
                    <td className="text-left pl-3 text-xs tracking-wide">
                      {item.date}
                    </td>
                    <td className="text-left pl-3 text-xs tracking-wide">
                      {item.timeIn != "0:00"
                        ? format(new Date(item.timeIn), "h:mm a")
                        : "0"}
                    </td>
                    <td className="text-left pl-3 text-xs tracking-wide">
                      {" "}
                      {item.timeOut != "0:00"
                        ? format(new Date(item.timeOut), "h:mm a")
                        : "0"}
                    </td>
                    <td className="text-left pl-3 text-xs tracking-wide">
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
