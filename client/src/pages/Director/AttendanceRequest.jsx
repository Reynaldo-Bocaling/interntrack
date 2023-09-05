import React, { useState } from "react";
import AttendanceRequestItem from "../../components/attendance-request/AttendanceRequestItem";
import { userData } from "../../services/AttendanceRequestData";
import { BiSearch } from "react-icons/bi";

const AttendanceRequest = () => {
  const [searchInput, setSearchInput] = useState(null);
  const data = userData
    .map(({ id, firstname, middleName, lastname, timesheet, email, status }) => ({
      id,
      name: `${firstname} ${middleName[0]}. ${lastname}`,
      email,
      status,
      totalDays: timesheet.length,
      totalHours: timesheet
        .filter((status) => status.attendance_status === 1)
        .reduce((total, day) => total + day.totalHours, 0),
      startDate: timesheet[0].date,
      endDate: timesheet[timesheet.length - 1].date,
    }))
    .filter((val) => {
      if (searchInput === null) {
        return val;
      } else if (val.name.toLowerCase().includes(searchInput)) {
        return val;
      }
    });

  return (
    <div>
      <div className="pb-4 pl-2 flex items-center justify-between">
        <span className=" text-xl tracking-wide font-semibold">
          Attendance Request
        </span>

        <div className="h-10 w-[230px] flex items-center gap-2 bg-white rounded-full px-3 shadow-md shadow-slate-200">
          <BiSearch />
          <input
            type="text"
            placeholder="Search.."
            onChange={(e) => setSearchInput(e.target.value)}
            className="outline-none text-sm"
          />
        </div>
      </div>

      <AttendanceRequestItem data={data} />
    </div>
  );
};

export default AttendanceRequest;
