import React, { useState } from "react";
import DailyLogItem from "../../components/DailyLogs/DailyLogsItems";
import { userData } from "../../services/AttendanceRequestData";
import { BiSearch } from "react-icons/bi";
import { createColumnHelper } from "@tanstack/react-table";

const DailyLogs = () => {
  const [currentDate] = useState(new Date());
  const [searchInput, setSearchInput] = useState("");
  const columnHelper = createColumnHelper();
  
  const data = userData
    .map(
      ({
        id,
        firstname,
        middleName,
        lastname,
        picture,
        status,
        timesheet,
      }) => ({
        id,
        name: `${firstname} ${middleName[0]}. ${lastname}`,
        status,
        picture,
        date: currentDate.toLocaleDateString("en-US", { month: "long", day: "2-digit",}),
        timeIn: `${timesheet.find((item) => item.date === currentDate.toLocaleDateString("en-US", {month: "long", day: "2-digit"}))?.timeIn} hrs`,
        timeOut: `${timesheet.find((item) => item.date === currentDate.toLocaleDateString("en-US", {month: "long", day: "2-digit", }) )?.timeOut} hrs`,
        totalHours: `${ timesheet.find((item) =>  item.date === currentDate.toLocaleDateString("en-US", { month: "long", day: "2-digit", }) )?.totalHours } hrs`,
      })
    )
    .filter((item) =>
      item.name.toLocaleLowerCase().includes(searchInput.toLowerCase())
    );

// console.log(data);
  const columns = [
    columnHelper.accessor("date", {
      id: "date",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Date",
    }),
    columnHelper.accessor("timeIn", {
      id: "timeIn",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Time in",
    }),
    columnHelper.accessor("timeOut", {
      id: "timeOut",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Time out",
    }),
    columnHelper.accessor("totalHours", {
      id: "totalHours",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Total hours",
    }),
   
    columnHelper.accessor("status", {
      id: "status",
      cell: (info) => (
          <div className="relative">
          {info.getValue() !== 0 ? (
            <span className="text-sm text-green-500 bg-green-100 font-medium tracking-wide flex items-center gap-1 justify-center w-[100px]  py-[4px] rounded-full">
              Present
            </span>
          ) : (
            <span className="text-sm text-red-500 bg-red-100 font-medium tracking-wide flex items-center gap-1 justify-center w-[100px] py-[4px] rounded-full">
              Absent
            </span>
            
          )}
          </div>
      ),
      header: "Attendance Status",
    }),
  ];

  return (
    <div>
      <div className="flex items-center justify-between px-2 mb-5">
        <h1 className="text-xl font-bold tracking-wider text-gray-700">
          Daily Logs
        </h1>
        <div className="h-10 w-[230px] flex items-center gap-2 bg-white rounded-full px-3 shadow-md shadow-slate-200 ">
          <BiSearch />
          <input
            type="text"
            placeholder="Search.."
            onChange={(e) => setSearchInput(e.target.value)}
            className="outline-none text-sm"
          />
        </div>
      </div>

      <DailyLogItem data={data} columns={columns} />
    </div>
  );
};

export default DailyLogs;
