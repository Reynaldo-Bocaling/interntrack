import React, { useRef, useState, useMemo } from "react";
import { Card, Button, Group, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useReactToPrint } from "react-to-print";
import logo from "../../assets/images/neust_logo-1.png";
import { getStudent, getTask, getTimesheet } from "../../api/Api";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Report from "../print-layout/WeeklyReport";
import { MdKeyboardArrowRight } from "react-icons/md";

const WeeklyReport = () => {
  const [opened, { open, close }] = useDisclosure();
  const [weeklyReport, setWeeklyReport] = useState([]);

  const currentDate = useMemo(() => new Date(), []);

  const { data: timesheet, isLoading: timesheetLoading } = useQuery({
    queryKey: ["getTimesheetStudent2"],
    queryFn: getTimesheet,
  });

  const { data: getTaskList, isLoading: taskLoading } = useQuery({
    queryKey: ["getTaskStudent2"],
    queryFn: getTask,
  });

  const { data, isLoading: studentLoading } = useQuery({
    queryKey: ["getStudent2"],
    queryFn: getStudent,
  });

  const studentTask = getTaskList || [];
  const studentInfo = data || {};

  const getWeekNumber = useMemo(() => {
    return timesheet ? timesheet.find((item) => item.date === format(currentDate, "yyyy-MM-dd"))?.week : [];
  }, [timesheet, currentDate]);

  const StudentTimesheet = useMemo(() => {
    return timesheet
      ? timesheet
          .filter((item) => item.studentMark ===1 &&( item.trainerMark === 0 || item.teacherMark ===0) )
          .filter((item) => new Date(item.week) <= getWeekNumber)
          .map(({ id, totalHours, date, logStatus, student_id, week, dateSubmitted }) => ({
            id,
            totalHours: logStatus !== 0 ? Math.round(totalHours) : "",
            date,
            logStatus,
            student_id,
            week,
            dateSubmitted,
            taskDescription: logStatus !== 0 ? studentTask.find((item) => item.date === date)?.description : "",
          }))
      : [];
  }, [timesheet, getWeekNumber, studentTask]);

  const groupedTimeSheet = useMemo(() => {
    const result = [];
    for (let i = 0; i < StudentTimesheet.length; i += 5) {
      result.push(StudentTimesheet.slice(i, i + 5));
    }
    return result.sort((a, b) => new Date(b[0].date) - new Date(a[0].date));
  }, [StudentTimesheet]);

  const totalHours = useMemo(() => {
    return weeklyReport ? weeklyReport.reduce((total, item) => total + item.totalHours, 0) : 0;
  }, [weeklyReport]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const handleOpenWeeklyReport = (item) => {
    setWeeklyReport(item);
    open();
  };

  if (taskLoading || timesheetLoading || studentLoading) {
    return <center className="my-5 text-lg">Computing..</center>;
  }




  return (
    <div>
      <p className=" px-4 text-sm font-semibold">Pending Weekly Report</p>
      <Card className="flex flex-col gap-5">
        {groupedTimeSheet.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className="py-5 px-4 rounded-lg flex items-center justify-between border bg-gray-5 hover:bg-slate-50 hover:border-blue-400 cursor-pointer"
            onClick={() => handleOpenWeeklyReport(group)}
          >
            <div className="flex flex-col gap-2 justify-center">
              <div className="flex  gap-7 items-center">
                <span className="text-gray-400 text-[0.7rem] font-medium tracking-wider">
                  Report Period:
                </span>

                <small className="text-blue-500">
                  {`${format(new Date(group[0].date), "MMM dd")} - ${format(
                    new Date(group[group.length - 1].date),
                    "MMM dd"
                  )}`}
                </small>
              </div>

              <div className=" flex gap-4 items-center">
                <span className="text-gray-400 text-[0.7rem] font-medium tracking-wider">
                  Date Submitted:
                </span>

                <small className="text-green-500">
                  {format(new Date(group[0].dateSubmitted), "MMMM dd, yyyy")}
                </small>
              </div>
            </div>

            <MdKeyboardArrowRight />
          </div>
        ))}
      </Card>

      <Drawer
        position="bottom"
        size="100%"
        opened={opened}
        onClose={close}
        title={
          <header className="mt-2">
            <span className="text-xl font-semibold">Weekly report</span>
          </header>
        }
      >
        <div className="weekly-report-container mx-auto px-2 sm:px-10">
          <div className="m-4 border-b-2 border-black flex items-center justify-between pb-2">
            <img src={logo} alt="" className="w-20 sm:w-28" />
            <div className="mt-4 flex flex-col items-end text-[10px] sm:text-[12px]">
              <span className="text-[8px] sm:text-[9.5px] font-light">
                Republic of the Philippines
              </span>
              <span className="text-[8px] sm:text-[9.5px] font-light">
                NUEVA ECIJA UNIVERSITY OF SCIENCE AND TECHNOLOGY
              </span>
              <span className="text-[8px] sm:text-[9.5px] font-light">
                On–the–Job Training and Career Development Center
              </span>
              <span className="text-[8px] sm:text-[9.5px] font-light">
                Cabanatuan City
              </span>
              <span className="text-[8px] sm:text-[9.5px] font-light">
                ISO 9001:2015 Certified
              </span>
            </div>
          </div>

          <main className="text-[10px] sm:text-[12px]">
            <h5 className="text-center text-[10px] sm:text-[12px] max-w-[330px] mx-auto mt-3">
              STUDENT ON–THE–JOB–TRAINING WEEKLY REPORT
            </h5>

            <div className="grid grid-cols-2 gap-2 sm:gap-4 items-center justify-between border-[2px] border-[#000] rounded-[4px] mt-3">
              <div className="pl-2 py-2">
                Name:
                <span className="capitalize font-semibold">
                  {` ${studentInfo.firstname}  ${studentInfo.lastname}`}
                </span>
              </div>
              <div className="border-l-[2px] border-[#000] pl-2 py-2">
                Company:
                <span className="capitalize font-semibold">
                  {` ${studentInfo.AreaOfAssignment?.company.companyName}`}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 items-center justify-between border-[2px] border-[#000] rounded-[4px] mt-3">
              <div className="h-[50px] sm:h-[80px] overflow-hidden pl-2 py-2">
                Course and Section: {studentInfo.program}
              </div>
              <div className="h-[50px] sm:h-[80px] overflow-hidden border-l-[2px]  border-[#000] pl-2 py-2 flex flex-col">
                Training Station:
                <span className="capitalize font-semibold">
                  {studentInfo.AreaOfAssignment?.areaName}
                </span>
              </div>
              <div className="h-[50px] sm:h-[80px] overflow-hidden border-l-[2px]  border-[#000] pl-2 py-2 flex flex-col">
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
                      <td className="text-center border-[2px] border-[#000] px-2 sm:px-5">
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
                    <td className="text-center border-[2px] border-[#000] px-2 sm:px-5">
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

        {/* Printable component */}
        <div style={{ display: "none" }}>
          <div ref={componentRef}>
            <Report weeklyReport={weeklyReport} studentInfo={studentInfo} />
          </div>
        </div>

        <div className="my-5 w-full flex items-center justify-center">
          <Button
            color="primary"
            size="lg"
            className="w-full my-5 bg-blue-500 rounded-full"
            onClick={handlePrint}
          >
            Print
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default WeeklyReport;