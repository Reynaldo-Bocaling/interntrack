import React from "react";
import { Student } from "../../components/dummyData/Data";

const TimeSheet = () => {
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
      <h2 className="text-xl font-semibold mb-6">Timesheet</h2>
      {groupedTimeSheet.map((group, groupIndex) => (
        <div key={groupIndex} className="border rounded-lg p-4 mb-5 bg-white">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-semibold">
                {group[0].date} -{" "}
              {group[group.length - 1].date} 
            </h3>
            
          </div>
          <table className="w-full mt-3">
            <thead>
              <tr className="h-12 border-b">
                <th className="text-xs text-left pl-3">Date</th>
                <th className="text-xs text-left pl-3">Time In</th>
                <th className="text-xs text-left pl-3">Time Out</th>
                <th className="text-xs text-left pl-3">Total hours</th>
              </tr>
            </thead>
            <tbody>
              {group.map((entry) => (
                <tr key={entry.id} className="h-12">
                  <td className="text-xs text-center">{entry.date}</td>
                  <td className="text-xs text-center">{entry.timeIn} AM</td>
                  <td className="text-xs text-center">{entry.timeOut} PM</td>
                  <td className="text-xs text-center">{entry.totalHours} hrs</td>
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

export default TimeSheet;
