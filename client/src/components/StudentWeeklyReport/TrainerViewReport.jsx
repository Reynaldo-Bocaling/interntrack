import React, { useRef, useState } from "react";
import { Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useReactToPrint } from "react-to-print"
import logo from "../../assets/images/neust_logo-1.png";
import {
  getCoordinator,
  getStudentList,
  getTrainer,
  getTeacherList,
} from "../../api/Api";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@nextui-org/react";
import { format } from "date-fns";
import Report from "../print-layout/ViewWeeklyReport";
import {MdKeyboardArrowRight } from "react-icons/md";
import { BiSearch } from "react-icons/bi";

const WeeklyReport = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchLength, setSearchLength] = useState(false);

  const [opened, { open, close }] = useDisclosure();
  const [weeklyReport, setWeeklyReport] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["getStudentweeklyreport23"],
    queryFn: getStudentList,
  });
  const { data: teacherList, isLoading: teacherLoading } = useQuery({
    queryKey: ["teacherList22"],
    queryFn: getTeacherList,
  });
  
  const { data: getMyId, isLoading: getMyIdLaoding } = useQuery({
    queryKey: ["getMyId2"],
    queryFn: getTrainer,
  });
  

  console.log(getMyId, 'd');


  const studentInfo = data ? data : [];

  const newData = data
    ? data
        .flatMap(({ timesheet }) => timesheet)
        .filter((item) => item.teacherMark === 1 && item.studentMark === 1 && item.trainerMark===1 )
        .map(
          ({
            id,
            totalHours,
            date,
            logStatus,
            student_id,
            week,
            dateSubmitted,
          }) => ({
            id,
            totalHours,
            date,
            logStatus,
            student_id,
            week,
            students: data?.find((item) => item.id === student_id),
            dateSubmitted,
            coordinator_id: teacherList?.find(
              (item) =>
                item.id ==
                data?.find((item) => item.id === student_id)?.teacher_id
            )?.coordinator.id,
            coordinator: teacherList?.find(
              (item) =>
                item.id ==
                data?.find((item) => item.id === student_id)?.teacher_id
            )?.coordinator,
            deletedStatus: data?.find((item) => item.id === student_id)
              ?.deletedStatus,
            trainer_id: data?.find((item) => item.id === student_id)
              ?.trainer_id,
            name: `${data?.find((item) => item.id === student_id)?.firstname} ${
              data?.find((item) => item.id === student_id)?.lastname
            }`,
          })
        )
        .filter(
          (item)=>
            item.trainer_id === getMyId?.id
          )
        .filter(
          (item) =>
            item.deletedStatus === 0 &&
            item.trainer_id != null 
        )
        .filter(
          (item) =>
            item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            format(new Date(item.date), "MMMM dd")
              .toLowerCase()
              .includes(searchInput.toLowerCase())
        )
    : [];


    console.log('week2',newData);



  const groupedTimeSheet = [];
  for (let i = 0; i < newData.length; i += 5) {
    groupedTimeSheet.push(newData.slice(i, i + 5));
  }

  groupedTimeSheet.sort((a, b) => {
    return new Date(b[0].date) - new Date(a[0].date);
  });

  const totalHours = weeklyReport
    ? weeklyReport.reduce((total, item) => total + item.totalHours, 0)
    : [];

  // print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const handleOpenWeeklyReport = (item) => {
    setWeeklyReport(item);
    open();
  };

  if (isLoading || teacherLoading ||getMyIdLaoding) {
    return <center className="my-5 text-lg">Computing..</center>;
  }

  return (
    <div className="py-7">
      <div className="flex flex-col gap-4">
       
        {groupedTimeSheet.length > 0 ? (
          groupedTimeSheet.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="relative py-5 px-4 rounded-lg flex items-center justify-between border bg-gray-5 hover:bg-slate-50  cursor-pointer"
              onClick={() => handleOpenWeeklyReport(group)}
            >
              <div className="flex items-center gap-3">
                <span className="capitalize font-medium">
                  {group[0].students.firstname}
                </span>
                <span className="capitalize font-medium">
                  {group[0].students.lastname}
                </span>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-y-1/2 flex flex-col items-center">
                <small className="text-green-500">
                  {format(new Date(group[0].dateSubmitted), "MMMM dd, yyyy")}
                </small>

                <span className="text-gray-500 text-[0.7rem] font-medium">
                  Date Submitted
                </span>
              </div>
              <div className="flex items-center gap-8">
                <div className="flex flex-col items-center">
                  <small className="text-blue-500">
                    {`${format(new Date(group[0].date), "MMMM dd")} - ${format(
                      new Date(group[group.length - 1].date),
                      "MMMM dd"
                    )}`}
                  </small>

                  <span className="text-gray-500 text-[0.7rem] font-medium">
                    Report Period
                  </span>
                </div>

                <MdKeyboardArrowRight size={23} className="text-blue-500" />
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-center py-4">No Weekly Report</h1>
        )}
      </div>

      <Drawer
        position="bottom"
        size="100%"
        opened={opened}
        onClose={close}
        title={
          <header className="mt-2 ">
            <span className="text-xl font-semibold">Weekly report</span>
          </header>
        }
      >
        <div className="weekly-report-container  sm:px-10 mx-auto max-w-[550px] w-full border rounded-lg shadow-sm ">
          <div className="m-4 border-b-2 border-black flex items-center justify-between pb-2 mx-10">
            <img src={logo} alt="" className="w-20 md:w-16" />
            <div className="mt-4 flex flex-col items-end text-[10px] sm:text-[12px]">
              <span className="text-[8px] md:text-[6.5px] font-light">
                Republic of the Philippines
              </span>
              <span className="text-[8px] md:text-[6.5px] font-light">
                NUEVA ECIJA UNIVERSITY OF SCIENCE AND TECHNOLOGY
              </span>
              <span className="text-[8px] md:text-[6.5px] font-light">
                On–the–Job Training and Career Development Center
              </span>
              <span className="text-[8px] md:text-[6.5px] font-light">
                Cabanatuan City
              </span>
              <span className="text-[8px] md:text-[6.5px] font-light">
                ISO 9001:2015 Certified
              </span>
            </div>
          </div>

          <main className="text-[10px] sm:text-[12px] mx-10 pb-10">
            <h5 className="text-center text-[10px] max-w-[330px] mx-auto mt-3">
              STUDENT ON–THE–JOB–TRAINING WEEKLY REPORT
            </h5>

            <div className="grid grid-cols-2 gap-2 sm:gap-4 items-center justify-between border-[2px] border-[#000] rounded-[4px] mt-3">
              <div className="pl-2 py-2">
                Name:
                <span className="capitalize font-semibold">
                  {` ${weeklyReport[0]?.students.firstname}  ${weeklyReport[0]?.students.lastname}`}
                </span>
              </div>
              <div className="border-l-[2px] border-[#000] pl-2 py-2">
                Company:
                <span className="capitalize font-semibold">
                  {` ${weeklyReport[0]?.students.AreaOfAssignment?.company.companyName}`}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 items-center justify-between border-[2px] border-[#000] rounded-[4px] mt-3">
              <div className="h-[50px] sm:h-[80px] overflow-hidden pl-2 py-2">
                Course and Section: {weeklyReport[0]?.students.program}
              </div>
              <div className="h-[50px] sm:h-[80px] overflow-hidden border-l-[2px]  border-[#000] pl-2 py-2 flex flex-col">
                Training Station:
                <span className="capitalize font-semibold">
                  {weeklyReport[0]?.students.AreaOfAssignment?.areaName}
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
                    {` ${weeklyReport[0]?.students.firstname}  ${weeklyReport[0]?.students.lastname}`}
                  </h1>
                  <p>On-the-Job Trainee</p>
                </div>
                <div>
                  <p>Noted by:</p>
                  <h1 className="mt-1 -mb-1 text-[12px] font-semibold">
                    {` ${weeklyReport[0]?.coordinator.firstname} ${weeklyReport[0]?.coordinator.lastname}`}
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
                    {` ${weeklyReport[0]?.students.trainer?.firstname}  ${weeklyReport[0]?.students.trainer?.lastname}`}
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

        <div className="my-5  flex items-center justify-center  mx-auto w-[40%]">
          <Button
            color="primary"
            size="lg"
            className="w-[150px] my-5"
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
