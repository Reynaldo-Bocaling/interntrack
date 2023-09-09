import React from "react";
import { useLocation } from "react-router-dom";

function ViewAttendanceRequest() {
  const location = useLocation();
  const studentList = location.state;
console.log(studentList);
  return (
    <div className="py-2 px-5">
      <header className="flex items-center justify-between mb-5 px-2">
        <span className="text-xl text-gray-700 font-semibold tracking-wide">
          Students
        </span>

        <div className="bg-white p-1 px-3 py-1 flex items-center gap-2 rounded-full shadow-md shadow-slate-200 border border-gray-100">
          <input type="text" placeholder="Search" />
        </div>
      </header>
      <div className="mt-2 border p-3 rounded-lg bg-white">
        <table className="w-full">
          <thead>
            <tr className="h-12 border-b">
              <th className="text-sm tracking-wide text-left pl-2">ID</th>
              <th className="text-sm tracking-wide text-left pl-2">Name</th>
              <th className="text-sm tracking-wide text-left pl-2">
                Area Assigned
              </th>
              <th className="text-sm tracking-wide text-left pl-2">
                Total hours
              </th>
              <th className="text-sm tracking-wide text-left pl-2">Trainer</th>
            </tr>
          </thead>
          <tbody>
            {studentList.students.length > 0 &&
              studentList.students.map((item) => (
                <tr className="h-14" key={item.id}>
                  <td className="text-sm tracking-wide pl-2">{item.id}</td>
                  <td className="text-sm tracking-wide pl-2">{item.name}</td>
                  <td className="text-sm tracking-wide pl-2">{item.department}</td>
                  <td className="text-sm tracking-wide pl-2">{item.totalTimeTaken}</td>
                  <td className="text-sm tracking-wide pl-2">{item.totalTimeTaken}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewAttendanceRequest;
