import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import profile from "../../assets/images/dp.png";
import { StudentData } from "../../services/Data";
function ViewAttendanceRequest() {
  return (
    <div className="py-2 px-5">
      <header className="flex items-center justify-between mb-5 px-2">
        <span className="text-xl text-gray-700 font-semibold tracking-wide">
          Timesheet
        </span>

        <div className="bg-white p-1 px-3 py-1 flex items-center gap-2 rounded-full shadow-md shadow-slate-200 border border-gray-100">
        <input type="text" placeholder="Search"/>
        </div>
      </header>
      <div className="mt-2 border p-3 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="h-12 border-b">
              <th className="text-sm tracking-wide text-left pl-2">Date</th>
              <th className="text-sm tracking-wide text-left pl-2">Time in</th>
              <th className="text-sm tracking-wide text-left pl-2">Time out</th>
              <th className="text-sm tracking-wide text-left pl-2">
                Total hours
              </th>
              <th className="text-sm tracking-wide text-left pl-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-14">
              <td className="text-sm tracking-wide pl-2">january 2</td>
              <td className="text-sm tracking-wide pl-2">8:00</td>
              <td className="text-sm tracking-wide pl-2">4:00 out</td>
              <td className="text-sm tracking-wide pl-2">8 hrs</td>
              <td className="text-sm tracking-wide pl-2 w-1/6 text-green-500">
                Aprove
              </td>
            </tr>
            <tr className="h-14">
              <td className="text-sm tracking-wide pl-2">january 2</td>
              <td className="text-sm tracking-wide pl-2">8:00</td>
              <td className="text-sm tracking-wide pl-2">4:00 out</td>
              <td className="text-sm tracking-wide pl-2">8 hrs</td>
              <td className="text-sm tracking-wide pl-2 w-1/6 text-yellow-500">
                Pending
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewAttendanceRequest;
