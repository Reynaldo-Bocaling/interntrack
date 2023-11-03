import React, { useState } from "react";
import { format } from "date-fns";
import { Button } from "@nextui-org/react";
import PieChart from "../../components/charts/PieChart";

const StudentTimesheet = ({ data ,isLoading}) => {
  const [showAllTables, setShowAllTables] = useState(false);

if(isLoading) return <span>Loading</span>

  // piechart info
  const piechartData = [325, 25, 150];
  const colors = ["#2ECC71", "#FFA500", "#FF5733"];
  const labels = ["Hours Taken", "Leave", "Hours Remaining"];

  const calculateTotalHours = (timeSheet) => {
    return timeSheet.reduce((sum, entry) => sum + entry.totalHours, 0);
  };

  const dateCount = data ? data : [];
  const groupedTimeSheet = [];
  for (let i = 0; i < dateCount.length; i += 5) {
    groupedTimeSheet.push(data.slice(i, i + 5));
  }

  groupedTimeSheet.sort((a, b) => {
    return new Date(b[0].date) - new Date(a[0].date);
  });

  const visibleGroups = showAllTables
    ? groupedTimeSheet
    : groupedTimeSheet.slice(0, 1);

  return (
    <div className="p-5">
      <div className="text-xl text-gray-700 font-semibold tracking-wide mb-5">
        Timesheet
      </div>



      
      <div className="w-[100%] flex flex-col gap-14 bg-white2 rounded-lg relative mb-5">
        <div className="relative  max-w-[450px] w-full pt-7">
          <PieChart
            data={piechartData}
            colors={colors}
            labels={labels}
            title={"Total Hours"}
          />

          <h1 className="absolute top-[12%] right-[2%] text-2xl font-semibold">
            325 / 500 <span className="text-xs text-blue-500">hrs</span>
          </h1>

          <div className="absolute -bottom-2 left-[60%] h-[110px] max-w-[450px] w-full flex items-center justify-between px-8 pb-2">
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
      </div>

      {/* table of time sheet */}
      {visibleGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="border rounded-lg p-4 mb-4 bg-white">
          <h3 className="text-base font-semibold">
            {format(new Date(group[0].date), "MMMM dd")} -{" "}
            {format(new Date(group[group.length - 1].date), "MMMM dd")}
          </h3>
          <table className="w-full mt-5">
            <thead>
              <tr className="h-12 border-b">
                <th className="font-semibold tracking-wide text-left w-[25%] pl-5">
                  Date
                </th>
                <th className="font-semibold tracking-wide text-left w-[25%]">
                  Time In
                </th>
                <th className="font-semibold tracking-wide text-left w-[25%]">
                  Time Out
                </th>
                <th className="font-semibold tracking-wide text-left w-[25%]">
                  Total Hours
                </th>
              </tr>
            </thead>
            <tbody>
              {group.map((entry) => (
                <tr key={entry.id} className="h-12">
                  <td className="text-sm  tracking-widetext-left pl-5">
                    {format(new Date(entry.date), "MMM dd")}
                  </td>
                  <td className="text-sm  tracking-widetext-left">
                  {entry.timeIn != '0:00' ? format(new Date(entry.timeIn), "h:mm a") : '0'}
                  </td>
                  <td className="text-sm  tracking-widetext-left">
                  {entry.timeOut != '0:00' ? format(new Date(entry.timeOut), "h:mm a") : '0'}
                  </td>
                  <td className="text-sm  tracking-widetext-left">
                    {entry.totalHours} hrs
                  </td>
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
        </div>
      ))}

      <div  className="w-full grid place-items-center">
      {groupedTimeSheet.length > 1 && (
        <Button
          color="primary"
          className="w-[130px]"
          onClick={() => setShowAllTables(!showAllTables)}
        >
          {showAllTables ? "Show less" : "Show more"}
        </Button>
      )}
      </div>
    </div>
  );
};

export default StudentTimesheet;
