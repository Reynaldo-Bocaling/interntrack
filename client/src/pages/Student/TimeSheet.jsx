import React from "react";
import { Student } from "../../components/dummyData/Data";
import { useQuery } from "@tanstack/react-query";
import { getTimesheet } from "../../api/Api";
import { format } from "date-fns";

const TimeSheet = () => {
  const currentDate = new Date();
  const { data:timesheet } = useQuery({
    queryKey: ["getStudentDailyLog"],
    queryFn: getTimesheet,
  });

  const data = timesheet
  ? timesheet.filter((item) => item.totalHours !== 0)
  : [] 

  const calculateTotalHours = (timeSheet) => {
    return timeSheet.reduce((sum, entry) => sum + entry.totalHours, 0);
  };

  const groupedTimeSheet = [];
  for (let i = 0; i < data?.length; i += 5) {
    groupedTimeSheet.push(data.slice(i, i + 5));
  }

  const totalAllHours = data
    ? data
        .filter((item) => new Date(item.date) <= currentDate)
        .reduce((sum, entry) => sum + entry.totalHours, 0)
    : [];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Timesheet</h2>
      {groupedTimeSheet.map((group, groupIndex) => (
        <div key={groupIndex} className="border rounded-lg p-4 mb-4 bg-white">
          <h3 className="text-base font-semibold">
            Week {groupIndex + 1} ( {format(new Date(group[0].date), "MMM dd")} -{" "}
            {format(new Date(group[group.length - 1].date ), "MMM dd")}
             )
          </h3>
          <table className="w-full mt-5 ">
            <thead>
              <tr className="h-14 border-b">
                <th className="font-semibold tracking-wide text-center w-[25%]">
                  Date
                </th>
                <th className="font-semibold tracking-wide text-center w-[25%]">
                  Time In
                </th>
                <th className="font-semibold tracking-wide text-center w-[25%]">
                  Time Out
                </th>
                <th className="font-semibold tracking-wide text-center w-[25%]">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {group.map((entry) => (
                <tr key={entry.id} className="h-14">
                  <td className="text-sm  tracking-wide text-center">
                    {format(new Date(entry.date), "MMM dd")}
                  </td>
                  <td className="text-sm  tracking-wide text-center">
                    {entry.timeIn}
                  </td>
                  <td className="text-sm  tracking-wide text-center">
                    {entry.timeOut}
                  </td>
                  <td className="text-sm  tracking-wide text-center">
                    {`${Math.floor(entry.totalHours)}:${Math.round(
                      (entry.totalHours % 1) * 60
                    )}`}{" "}
                    hrs
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="w-full border-t mt-5">
              <tr className="h-12">
                <td
                  colSpan={3}
                  className="text-lg text-left pl-5 font-semibold"
                >
                  Total Hours
                </td>

                <td className="text-lg font-semibold">
                  {`${Math.floor(calculateTotalHours(group))}:${Math.round(
                    (calculateTotalHours(group) % 1) * 60
                  )}`}{" "}
                  hrs
                </td>
              </tr>
            </tfoot>
          </table>
          {/* <div className="pl-3 font-semibold tracking-wide mt-4 w-full text-right bg-red-500">
            Total Hours: {calculateTotalHours(group)} hrs
          </div> */}
        </div>
      ))}

      <div className="bg-white pl-10 py-5 pr-36 flex items-center justify-between">
        <h1>Total All Hours </h1>
        <h1>
          {`${Math.floor(totalAllHours)}:${Math.round(
            (totalAllHours % 1) * 60
          )}`}{" "}
          Hours
        </h1>
      </div>
    </div>
  );
};

export default TimeSheet;
