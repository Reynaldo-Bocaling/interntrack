import React, { useEffect, useState } from "react";
import taskUploadModel from "../../assets/images/studentTaskModel.png";
import { AiOutlineCheck } from "react-icons/ai";
import { LiaTimesSolid } from "react-icons/lia";
import { BsCalendar2CheckFill, BsCalendarMinusFill } from "react-icons/bs";
import PieChart from "../../components/charts/PieChart";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTimesheet } from "../../api/Api";
import { format, parse } from "date-fns";
const Dashboard = () => {
  const formattedDate = format(new Date(), "yyyy-MM-dd");

  // piechart info
  const piechartData = [325, 25, 150];
  const colors = ["#2ECC71", "#FFA500", "#FF5733"];
  const labels = ["Hours Taken", "Leave", "Hours Remaining"];

  const { data, isLoading } = useQuery({
    queryKey: ["getStudentDailyLog"],
    queryFn: getTimesheet,
  });

  const getTime = data ? data.find((item) => item.date === formattedDate) : [];
  const timeInDB = getTime ? getTime.timeIn : "";
  const timeOutDB = getTime?.timeOut;
  const totalHoursDB = getTime?.totalHours;
  const timeId = getTime?.id;

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

      <div className=" mt-5 w-full flex flex-col gap-5 mb-5">
        {/* count box */}
        <div className="w-[100%] flex flex-col gap-[5x] bg-white2 rounded-lg relative">
          <div className="h-[220px] max-w-[450px] w-full pt-7">
            <PieChart
              data={piechartData}
              colors={colors}
              labels={labels}
              title={"Total Hours"}
            />
          </div>
          <h1 className="absolute top-[12%] right-[2%] text-2xl">
            325 / 500 <span className="text-xs text-blue-500">hrs</span>
          </h1>

          <div className="h-[110px] flex items-center justify-between px-8 pb-2 mt-3">
            <div>
              <h1 className="text-lg font-semibold xl flex items-center gap-3">
                325
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
                150
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
                25
                <span className="text-xs text-blue-500 tracking-wider">
                  hrs
                </span>
              </h1>
              <span className="text-gray-500 text-xs tracking-wide">
                Leave Hours
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
                <h1 className="text-2xl font-semibold tracking-wider">
                  56{" "}
                  <span className="text-xs font-medium text-blue-500">
                    items
                  </span>
                </h1>
                <small className="tracking-wide">total Task</small>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium tracking-wide">
                    {" "}
                    Progress rate{" "}
                  </span>
                  <span className="text-xs">62%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div className="rounded-full h-full w-[62%] bg-blue-500"></div>
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
              <tr className="h-12">
                <td className="text-left pl-3 text-sm tracking-wide">
                  January 01
                </td>
                <td className="text-left pl-3 text-sm tracking-wide">8:00</td>
                <td className="text-left pl-3 text-sm tracking-wide">4:00</td>
                <td className="text-left pl-3 text-sm tracking-wide">8 hrs</td>
              </tr>
              <tr className="h-12">
                <td className="text-left pl-3 text-sm tracking-wide">
                  January 01
                </td>
                <td className="text-left pl-3 text-sm tracking-wide">8:00</td>
                <td className="text-left pl-3 text-sm tracking-wide">4:00</td>
                <td className="text-left pl-3 text-sm tracking-wide">8 hrs</td>
              </tr>
              <tr className="h-12">
                <td className="text-left pl-3 text-sm tracking-wide">
                  January 01
                </td>
                <td className="text-left pl-3 text-sm tracking-wide">8:00</td>
                <td className="text-left pl-3 text-sm tracking-wide">4:00</td>
                <td className="text-left pl-3 text-sm tracking-wide">8 hrs</td>
              </tr>
              <tr className="h-12">
                <td className="text-left pl-3 text-sm tracking-wide">
                  January 01
                </td>
                <td className="text-left pl-3 text-sm tracking-wide">8:00</td>
                <td className="text-left pl-3 text-sm tracking-wide">4:00</td>
                <td className="text-left pl-3 text-sm tracking-wide">8 hrs</td>
              </tr>
              <tr className="h-12">
                <td className="text-left pl-3 text-sm tracking-wide">
                  January 01
                </td>
                <td className="text-left pl-3 text-sm tracking-wide">8:00</td>
                <td className="text-left pl-3 text-sm tracking-wide">4:00</td>
                <td className="text-left pl-3 text-sm tracking-wide">8 hrs</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
