import React from "react";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdMoreTime,
} from "react-icons/md";
import { getTimesheet } from "../../api/Api";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

function DailyLogsHistory() {
  const { data } = useQuery({
    queryKey: ["getStudentDailyLog"],
    queryFn: getTimesheet,
  });

  const filterData = data?.filter((item) => item.totalHours != 0);
  console.log("data", filterData);
  return (
    <div>
      <div className="my-4">
        <div className="flex items-center justify-between mb-8 px-3">
          <h1 className="text-xl font-bold tracking-wider text-gray-700 ">
            History
          </h1>
          <div className="text-gray-400 flex items-center gap-1">
            <MdKeyboardArrowLeft size={23} />
            Slide to Daily Logs
          </div>
        </div>

        <div className="mt-  p-2 rounded-lg bg-white shadow-lg shadow-slate-200 border border-slate-100">
          <table className="w-full">
            <thead>
              <tr className="h-12 border-b">
                <th className="text-xs tracking-wide text-left pl-3">Date</th>
                <th className="text-xs tracking-wide text-center">Time in</th>
                <th className="text-xs tracking-wide text-center">Time out</th>
                <th className="text-xs tracking-wide">Total</th>
                <th className="text-xs tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody>
              {filterData ? (
                filterData.map((item, index) => (
                  <tr key={index} className="h-14">
                    <td className="text-xs tracking-wide text-center">
                      {format(new Date(item.date), "MMM dd")}
                    </td>
                    <td className="text-xs tracking-wide text-center">
                      {item.timeIn}
                    </td>
                    <td className="text-xs tracking-wide text-center">
                      {item.timeOut}
                    </td>
                    <td className="text-xs tracking-wide text-center">
                      {item.totalHours} hrs
                    </td>
                    <td className="text-xs tracking-wide pl-2 w-1/6">
                      <div>
                        {item.logStatus === 0 ? (
                          <span className="text-xs text-red-500 font-medium bg-red-100 py-[7px] px-3 rounded-full tracking-wider ">
                            Pending
                          </span>
                        ) : (
                          <span className="text-xs text-green-500 font-medium bg-green-100 py-[7px] px-3 rounded-full tracking-wider ">
                            Approve
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="h-14">
                  <td colSpan={5} className="text-xs tracking-wide text-center">
                    No Request
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DailyLogsHistory;
