import React from "react";

function ViewAttendanceRequest({data}) {


//   const trainerList = data.trainer
//   ? data.trainer.map(({
//     id ,
//     firstname,
//      lastname,
//      email,
//      student
//   })=> ({
//     id,
//     name:`${firstname} ${lastname}`,
//     email,
//     student: student.length
//   }))
// :[]
const trainerList = data?.areaOfAssignment
.flatMap(({trainer}) => trainer)
.map(({
  id,
  firstname,
  lastname,
  email,
  student,
}) => ({
  id,
  name: `${firstname} ${lastname}`,
  email,
  totalStudent: student?.filter((item)=>item.deletedStatus == 0).length
}));


console.log(trainerList);

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
                Email
              </th>
              <th className="text-sm tracking-wide text-center ">
                Total Student
              </th>
            </tr>
          </thead>
          <tbody>
            {trainerList.length > 0 &&
              trainerList.map((item) => (
                <tr className="h-14" key={item.id}>
                  <td className="text-sm tracking-wide pl-2">{item.id}</td>
                  <td className="text-sm tracking-wide pl-2">{item.name}</td>
                  <td className="text-sm tracking-wide pl-2">{item.email}</td>
                  <td className="text-sm tracking-wide text-center">{item.totalStudent}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewAttendanceRequest;
