import React from "react";
import { Student } from "../../components/dummyData/Data";

const WeeklyReport = () => {
  const student = Student;

  const calculateTotalHours = (timeSheet) => {
    return timeSheet.reduce((sum, entry) => sum + entry.totalHours, 0);
  };

  const groupedTimeSheet = [];
  for (let i = 0; i < student.timeSheet.length; i += 5) {
    groupedTimeSheet.push(student.timeSheet.slice(i, i + 5));
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Weekly Time Report</h2>
      {groupedTimeSheet.map((group, groupIndex) => (
        <div key={groupIndex} className="border rounded-lg p-4 mb-4 bg-white">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              Week {groupIndex + 1} ( {group[0].date} -{" "}
              {group[group.length - 1].date} )
            </h3>
            <button className="text-xs py-2 px-4 tracking-wide font-medium text-white bg-blue-500 rounded-full">
              Print Weekly Report
            </button>
          </div>
          <table className="w-full mt-3">
            <thead>
              <tr className="h-12 border-b">
                <th className="text-left pl-3">Date</th>
                <th className="text-left pl-3">Time In</th>
                <th className="text-left pl-3">Time Out</th>
                <th className="text-left pl-3">Total Hours</th>
              </tr>
            </thead>
            <tbody>
              {group.map((entry) => (
                <tr key={entry.id} className="h-12">
                  <td className="text-left pl-3">{entry.date}</td>
                  <td className="text-left pl-3">{entry.timeIn} AM</td>
                  <td className="text-left pl-3">{entry.timeOut} PM</td>
                  <td className="text-left pl-3">{entry.totalHours} hrs</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pl-3 font-semibold tracking-wide mt-2">
            Total Hours: {calculateTotalHours(group)} hrs
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyReport;
