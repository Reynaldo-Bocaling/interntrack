import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
function CompanySlots({data}) {


  const slots = data? data : []

  // const totalSlots = data ? data.totalSlots : 0;
  // const usedSlots = data ? data.usedSlots : 0;

  // // Kalkulahin ang percentage
  // const percentage = totalSlots === 0 ? 0 : (usedSlots / totalSlots) * 100;

const totalSlots = slots.reduce((total, item)=> total + item.slot, 0) //total slots saved 8
const totalStudent = slots.reduce((total, item)=> total + item.student.length, 0) //total student 2


const percentage = totalSlots === 0 ? 0 : (totalStudent / totalSlots) * 100;

console.log('slots', slots);
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
                {slots.length > 0 &&
                  slots.map((item, index) => (
                    <tr className="h-14" key={item.id}>
                      <td className="text-sm tracking-wide text-center border-r">
                        {index + 1}
                      </td>
                      <td className="text-sm tracking-wide pl-5 border-r">
                        {item.areaName}
                      </td>
                      <td className="text-sm text-center font-semibold tracking-wider border-r">
                        {item.student.length}
                      </td>
                      <td className="text-sm text-center font-semibold tracking-wider">

                        {item.slot === 0 ? 0 : item.slot - item.student.length}
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
              text={`${totalStudent} / ${totalSlots}`}
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
