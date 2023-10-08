import React from "react";
import { format } from "date-fns";
const StudentTimesheet = ({data}) => {

  const calculateTotalHours = (timeSheet) => {
    return timeSheet.reduce((sum, entry) => sum + entry.totalHours, 0);
  };

  const dateCount = data ? data : []
  const groupedTimeSheet = [];
  for (let i = 0; i <  dateCount.length; i += 5) {
    groupedTimeSheet.push(data.slice(i, i + 5));
  }
  return (
    <div className="p-5">
       <div className="text-xl text-gray-700 font-semibold tracking-wide mb-5">
          Timesheet
        </div>
      {groupedTimeSheet.map((group, groupIndex) => (
        <div key={groupIndex} className="border rounded-lg p-4 mb-4 bg-white">
          <h3 className="text-base font-semibold">
              {format(new Date(group[0].date), "MMMM dd")} - 
            {format(new Date(group[group.length - 1].date), "MMMM dd")} 
          </h3>
          <table className="w-full mt-5 ">
            <thead>
              <tr className="h-12 border-b">
                <th className="font-semibold tracking-wide text-left w-[25%] pl-5">Date</th>
                <th className="font-semibold tracking-wide text-left w-[25%]">Time In</th>
                <th className="font-semibold tracking-wide text-left w-[25%]">Time Out</th>
                <th className="font-semibold tracking-wide text-left w-[25%]">Total Hours</th>
              </tr>
            </thead>
            <tbody>
              {group.map((entry) => (
                <tr key={entry.id} className="h-12">
                  <td className="text-sm  tracking-widetext-left pl-5">{format(new Date(entry.date),"MMM dd")}</td>
                  <td className="text-sm  tracking-widetext-left">{entry.timeIn} AM</td>
                  <td className="text-sm  tracking-widetext-left">{entry.timeOut} PM</td>
                  <td className="text-sm  tracking-widetext-left">{entry.totalHours} hrs</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="w-full border-t mt-5">
              <tr className="h-12">
                <td className="text-lg text-left pl-5 font-semibold">
                  Total Hours
                </td>
                <td></td>
                <td></td>
                <td className="text-lg font-semibold">
                  {calculateTotalHours(group)} hrs
                </td>
              </tr>
            </tfoot>
          </table>
          {/* <div className="pl-3 font-semibold tracking-wide mt-4 w-full text-right bg-red-500">
            Total Hours: {calculateTotalHours(group)} hrs
          </div> */}
        </div>
      ))}
    </div>
  );
}

export default StudentTimesheet;
