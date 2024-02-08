import React from "react";
import { getTimesheet } from "../../api/Api";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { DotLoading } from "../../components/spinners-loading/Spinner";

const Attendance_request = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getStudentDailyLog"],
    queryFn: getTimesheet,
  });

  const filterData = data?.filter(
    (item) => item.totalHours != 0 && item.logStatus == 0
  );

  if(isLoading){
    return <DotLoading/>
  }

  return (
    <>
      <div className=" rounded-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-wider text-gray-700 mb-3 ml-3 mt-3">
            Attendance request
          </h1>
        </div>
        <div className="mt-4  p-2 rounded-lg bg-white shadow-lg shadow-slate-200 border border-slate-100">
          <table className="w-full">
            <thead>
              <tr className="h-12 border-b">
                <th className="text-xs tracking-wide text-left pl-2">Date</th>
                <th className="text-xs tracking-wide text-left pl-2">
                  Time in
                </th>
                <th className="text-xs tracking-wide text-left pl-2">
                  Time out
                </th>
                <th className="text-xs tracking-wide">Total</th>
                <th className="text-xs tracking-wide text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {filterData ? (
                filterData.map((item, index) => (
                  <tr key={index} className="h-14">
                    <td className="text-xs tracking-wide pl-2">
                      {format(new Date(item.date), "MMM dd")}
                    </td>
                    <td className="text-xs tracking-wide pl-2">
                      {item.timeIn != "0:00"
                        ? format(new Date(item.timeIn), "h:mm a")
                        : "0"}
                    </td>
                    <td className="text-xs tracking-wide pl-2">
                      {item.timeOut != "0:00"
                        ? format(new Date(item.timeOut), "h:mm a")
                        : "0"}
                    </td>
                    <td className="text-xs tracking-wide pl-2">
                      {item.totalHours} hrs
                    </td>
                    <td className="text-xs tracking-wide pl-2 w-1/6">
                      <div>
                        <span className="text-xs text-red-500 font-medium bg-red-100 py-[7px] px-3 rounded-full tracking-wider ">
                          Pending
                        </span>
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
    </>
  );
};

export default Attendance_request;
