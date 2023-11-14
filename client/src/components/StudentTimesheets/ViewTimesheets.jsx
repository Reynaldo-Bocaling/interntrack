import React, { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import image from '../../assets/images/dp.png'
import { Link, useLocation } from "react-router-dom";
import { format } from "date-fns";
import PieChart from "../../components/charts/PieChart";
import { Button } from "@nextui-org/react";

const WeeklyReport = () => {
  const currentDate = new Date();
  const location = useLocation();
  const newData = location.state.data
  
  const [showAllTables, setShowAllTables] = useState(false);

  const totalHours = newData.trainingHours;
  const totalHoursTaken = Math.round(newData.totalHours);
  const totalHoursRemaining = totalHours - totalHoursTaken;



  console.log(totalHoursTaken);
    // piechart info
    const piechartData = [totalHoursTaken, totalHoursRemaining];
    const colors = ["#2ECC71", "#FF5733"];
    const labels = ["Hours Taken", "Hours Remaining"];

    
  const student = {
    name:newData.name,
    timeSheet:newData.timeSheet.filter((item) => new Date(item.date) <= currentDate),
  }
  

  const calculateTotalHours = (timeSheet) => {
    return timeSheet.reduce((sum, entry) => sum + entry.totalHours, 0);
  };

  const groupedTimeSheet = [];
  for (let i = 0; i < student.timeSheet.length; i += 5) {
    groupedTimeSheet.push(student.timeSheet.slice(i, i + 5));
  }

  groupedTimeSheet.sort((a, b) => {
    return new Date(b[0].date) - new Date(a[0].date);
  });

  console.log(newData,'j');


  const visibleGroups = showAllTables
    ? groupedTimeSheet
    : groupedTimeSheet.slice(0, 1);


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
            Timesheet
          </span>
        </div>
      </div>


      {/* pichart */}
      <div className="w-[100%] flex flex-col gap-14 bg-white2 rounded-lg relative mb-5">
        <div className="relative  max-w-[450px] w-full pt-7">
          <PieChart
            data={piechartData}
            colors={colors}
            labels={labels}
            title={"Total Hours"}
          />

          <h1 className="absolute top-[12%] right-[2%] text-2xl font-semibold">
            {`${totalHoursTaken} / ${totalHours}`} <span className="text-xs text-blue-500">hrs</span>
          </h1>

          <div className="absolute -bottom-2 left-[60%] h-[110px] max-w-[450px] w-full flex items-center justify-between px-8 pb-2">
            <div>
              <h1 className="text-lg font-semibold xl flex items-center gap-3">
                {totalHoursTaken}
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
                {totalHoursRemaining}
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
                {totalHours}
                <span className="text-xs text-blue-500 tracking-wider">
                  hrs
                </span>
              </h1>
              <span className="text-gray-500 text-xs tracking-wide">
                Total Hours
              </span>
            </div>
          </div>
        </div>
      </div>






      {/* table of timesheet */}
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
                 {entry.totalHours} 
                 {/* {`${Math.floor(entry.totalHours)}:${Math.round(
                            (entry.totalHours % 1) * 60
                          )}`} */}
                 hrs
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

export default WeeklyReport;
