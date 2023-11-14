import React from "react";

const  ViewAttendanceRequest = ({data}) => {

  const studentList = data.areaOfAssignment
  ?  data.areaOfAssignment.flatMap(({student})=> student
  ? student.map(({
    id,
    firstname,
    lastname,
    AreaOfAssignment,
    timesheet,
    trainer,
    deletedStatus

  })=> ({
    id,
    name: `${firstname} ${lastname}`,
    AreaOfAssignment: AreaOfAssignment.areaName,
    timesheet: timesheet 
    ? timesheet.filter((item) => item.logStatus === 1).reduce((total, item)=> total + item.totalHours, 0)
    : [],
    trainer: trainer? `${trainer.firstname} ${trainer.lastname}`: [],
    deletedStatus
  })).filter((item)=>item.deletedStatus === 0)
  :[])
  :[]
// console.log('student',studentList);
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
            {studentList.length > 0 ?
              studentList.map((item) => (
                <tr className="h-14" key={item.id}>
                  <td className="text-sm tracking-wide pl-2">{item.id}</td>
                  <td className="text-sm tracking-wide pl-2">{item.name}</td>
                  <td className="text-sm tracking-wide pl-2">{item.AreaOfAssignment}</td>
                  <td className="text-sm tracking-wide pl-2">{item.timesheet} hrs</td>
                  <td className="text-sm tracking-wide pl-2">{item.trainer}</td>
                </tr>
              ))
              :
              <tr>
                <td colSpan="5" className="w-full text-center py-5 font-medium tracking-wide">No Student</td>
              </tr>
              
              }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewAttendanceRequest;
