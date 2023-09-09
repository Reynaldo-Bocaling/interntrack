import React from "react";
import { useLocation } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
function CompanySlots() {
  const location = useLocation();
  const studentList = location.state;
  // const piechartData = [ 15, 5];
  const percentage = 75;
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

      <div className="flex gap-5">
        <div className="w-[60%]">
          <div className="mt-2 border p-3 rounded-lg  h-auto bg-white">
            <table className="w-full">
              <thead>
                <tr className="h-12 border-b">
                  <th className="text-sm tracking-wide text-center w-[15%] border-r">
                    No.
                  </th>
                  <th className="text-sm tracking-wide text-left pl-5  w-[50%] border-r">
                    Area of Assigned
                  </th>
                  <th className="text-sm tracking-wide text-center  w-[17%] border-r">
                    Deploy
                  </th>
                  <th className="text-sm tracking-wide text-center  w-[18%]">
                    Available Slots
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentList.students.length > 0 &&
                  studentList.students.map((item, index) => (
                    <tr className="h-14" key={item.id}>
                      <td className="text-sm tracking-wide text-center border-r">
                        {index + 1}
                      </td>
                      <td className="text-sm tracking-wide pl-5 border-r">
                        {item.name}
                      </td>
                      <td className="text-sm text-center font-semibold tracking-wider border-r">
                        15
                      </td>
                      <td className="text-sm text-center font-semibold tracking-wider">
                        5
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-[40%] bg-green-50 p-5 flex items-center flex-col justify-center gap-5">
          <p className="mt-4 text-center text-2xl font-semibold tracking-wide">
            Available Slots
          </p>
          <div className="w-48">
            <CircularProgressbar
              value={percentage}
              text={`${percentage} / 100`}
              styles={{
                path: { stroke: `#20D117` },
                text: { fill: `#333`, fontSize: `0.8rem`, fontWeight: 600 },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanySlots;
