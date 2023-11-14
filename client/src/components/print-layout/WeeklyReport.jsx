import React from "react";
import logo from "../../assets/images/neust_logo-1.png";
import { format } from "date-fns";

const WeeklyReport = ({ weeklyReport, studentInfo }) => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const totalHours = weeklyReport
    ? weeklyReport.reduce((total, item) => total + item.totalHours, 0)
    : [];

  return (
    <div className="mx-auto">
      <div className="weekly-report-container mx-20 px-4 sm:px-10">
        <div className="m-4 border-b-2 border-black flex items-center justify-between pb-2">
          <img src={logo} alt="" className="w-20 sm:w-28" />
          <div className="mt-4 flex flex-col items-end text-[10px] sm:text-[12px]">
            <span className="text-[8px] sm:text-[9.5px]">
              Republic of the Philippines
            </span>
            <span className="text-[8px] sm:text-[9.5px]">
              NUEVA ECIJA UNIVERSITY OF SCIENCE AND TECHNOLOGY
            </span>
            <span className="text-[8px] sm:text-[9.5px]">
              On–the–Job Training and Career Development Center
            </span>
            <span className="text-[8px] sm:text-[9.5px]">Cabanatuan City</span>
            <span className="text-[8px] sm:text-[9.5px]">
              ISO 9001:2015 Certified
            </span>
          </div>
        </div>

        <main className="text-[10px] sm:text-[12px]">
          <h5 className="font-medium text-center text-[10px] sm:text-[12px] max-w-[330px] mx-auto mt-3">
            STUDENT ON–THE–JOB–TRAINING WEEKLY REPORT
          </h5>

          <div className="grid grid-cols-2 gap-2 sm:gap-4 items-center justify-between border-[2px] border-[#000] rounded-[4px] mt-3">
            <div className="pl-2 py-1">
              Name:
              <span className="capitalize font-semibold">
                {` ${studentInfo.firstname}  ${studentInfo.lastname}`}
              </span>
            </div>
            <div className="border-l-[2px] border-[#000] pl-2 py-1">
              Company:
              <span className="capitalize font-semibold">
                {` ${studentInfo.AreaOfAssignment?.company.companyName}`}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 items-center justify-between border-[2px] border-[#000] rounded-[4px] mt-3">
            <div className="h-[60px]  overflow-hidden p-1">
              Course and Section:
            </div>
            <div className="h-[60px] overflow-hidden border-l-[2px]  border-[#000] p-1 flex flex-col">
              Training Station:
              <span className="capitalize font-semibold">
                {studentInfo.AreaOfAssignment?.areaName}
              </span>
            </div>
            <div className="h-[60px]  overflow-hidden border-l-[2px]  border-[#000] p-1 flex flex-col">
              Date:
              <span className="capitalize font-semibold">
                {format(new Date(), "MM/dd/yyyy")}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto mt-3">
            <table className="w-full border-[2px] border-[#000]">
              <thead>
                <tr>
                  <th className="w-[20%] sm:w-[15%] text-center border-[2px] font-medium border-[#000] px-2 sm:px-5 ">
                    DAYS
                  </th>
                  <th className="w-[60%] sm:w-[70%] text-center border-[2px] font-medium border-[#000] px-2 sm:px-5 ">
                    SUMMARY OF WORK, DUTIES AND RESPONSIBILITIES
                  </th>
                  <th className="w-[20%] sm:w-[15%] text-center border-[2px] font-medium border-[#000] px-2 sm:px-5 ">
                    HOURS
                  </th>
                </tr>
              </thead>
              <tbody>
                {weeklyReport.map((entry, index) => (
                  <tr key={index} className="h-[60px]">
                    <td className="text-center border-[2px] border-[#000] px-2 sm:px-5">
                      {daysOfWeek[index]}
                    </td>
                    <td className="border-[2px] border-[#000] px-2 sm:px-5">
                      {Math.round(entry.totalHours) !== 0 &&
                        entry.taskDescription}
                    </td>
                    <td className="text-center font-medium border-[2px] border-[#000] px-2 sm:px-5">
                      {Math.round(entry.totalHours) !== 0 &&
                        `${entry.totalHours} hrs`}
                    </td>
                  </tr>
                ))}

                <tr className="h-[60px]">
                  <td className="text-center border-[2px] border-[#000] px-2 sm:px-5">
                    Saturday
                  </td>
                  <td className="border-[2px] border-[#000] px-2 sm:px-5"></td>
                  <td className="text-center border-[2px] border-[#000] px-2 sm:px-5"></td>
                </tr>
                <tr className="h-[60px]">
                  <td className="text-center border-[2px] border-[#000] px-2 sm:px-5">
                    Sunday
                  </td>
                  <td className="border-[2px] border-[#000] px-2 sm:px-5"></td>
                  <td className="text-center border-[2px] border-[#000] px-2 sm:px-5"></td>
                </tr>

                <tr className="h-[35px]">
                  <td className="text-center border-[2px] border-[#000] px-2 sm:px-5"></td>
                  <td className="border-[2px] border-[#000] px-2 ">
                    TOTAL TRAINING HOURS PER WEEK
                  </td>
                  <td className="text-center border-[2px] border-[#000] px-2 sm:px-5 font-medium">
                    {Math.round(totalHours)} hrs
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-between">
            <div className="flex flex-col gap-4">
              <div>
                <p>Prepared by:</p>
                <h1 className="mt-1 -mb-1 text-[12px] font-semibold">
                  {` ${studentInfo.firstname}  ${studentInfo.lastname}`}
                </h1>
                <p>On-the-Job Trainee</p>
              </div>
              <div>
                <p>Noted by:</p>
                <h1 className="mt-1 -mb-1 text-[12px] font-semibold">
                  {` ${studentInfo.teacher?.coordinator?.firstname} ${studentInfo.teacher?.coordinator?.lastname}`}
                </h1>
                <p>Ojt Coordinator</p>

                <div className="flex flex-col mt-3">
                  <span>NEUST-OJT-F011 REv.</span>
                  <span>00 (02.11.19)</span>
                </div>
              </div>
            </div>

            <div>
              <div>
                <p>Checked by:</p>
                <h1 className="mt-1 -mb-1 text-[12px] font-semibold">
                  {` ${studentInfo.trainer?.firstname}  ${studentInfo.trainer?.lastname}`}
                </h1>
                <p>Trainer/Supervisor</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WeeklyReport;
