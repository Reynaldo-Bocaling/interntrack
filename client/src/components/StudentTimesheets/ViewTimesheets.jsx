import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Student } from "../../components/dummyData/Data";
import image from '../../assets/images/dp.png'
import { Link, useLocation } from "react-router-dom";



const WeeklyReport = () => {
  const location = useLocation();
  const newData = location.state.data
  const student = newData;

  const calculateTotalHours = (timeSheet) => {
    return timeSheet.reduce((sum, entry) => sum + entry.totalHours, 0);
  };

  const groupedTimeSheet = [];
  for (let i = 0; i < student.timeSheet.length; i += 5) {
    groupedTimeSheet.push(student.timeSheet.slice(i, i + 5));
  }


console.log(student);
  return (
    <div>
     <Link 
          to="/timeSheet"
          className="font-semibold tracking-wide text-blue-500 rounded-full mb-5 flex items-center"
        >
          <MdKeyboardArrowLeft size={20} />
          Back
        </Link>
      <div className="profile flex items-center gap-3 mb-5">
        <div className=" mt- rounded-full w-10 h-10 flex items-center justify-center bg-white border shadow-lg shadow-slate-200">
          <img
            src={image}
            alt=""
            width={30}
            className="rounded-full mx-[0.35rem]"
          />
        </div>
        <div>
          <div
            className={`text-[1.2rem] mt-3  font-semibold`}
          >
            {student.name}
          </div>
          <span className="text-sm text-blue-500 font-medium tracking-wide">
            Trainee
          </span>
        </div>
      </div>
      {groupedTimeSheet.map((group, groupIndex) => (
        <div key={groupIndex} className="border rounded-lg p-4 mb-4 bg-white">
          <h3 className="text-base font-semibold">
            Week {groupIndex + 1} ( {group[0].date} -{" "}
            {group[group.length - 1].date} )
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
                  <td className="text-sm  tracking-widetext-left pl-5">{entry.date}</td>
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
};

export default WeeklyReport;
