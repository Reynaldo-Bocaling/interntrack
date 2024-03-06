import React, { useRef, useState, useMemo, useCallback } from "react";
import { Card, Drawer, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useReactToPrint } from "react-to-print";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import Report from "../../components/print-layout/WeeklyReport";
import Swal from "sweetalert2";
import { MdKeyboardArrowRight } from "react-icons/md";
import logo from "../../assets/images/neust_logo-1.png";
import {
  getStudent,
  getTask,
  getTimesheet,
  submitReport,
} from "../../api/Api";
import { LiaTimesSolid } from "react-icons/lia";

const WeeklyReport = ({onClose}) => {
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure();
  const [weeklyReport, setWeeklyReport] = useState([]);
  const [submitReportValue, setSubmitReportValue] = useState({});
  
  const timesheetQuery = useQuery({
    queryKey: ["getTimesheetStudent2"],
    queryFn: getTimesheet,
  });

  const taskQuery = useQuery({
    queryKey: ["getTaskStudent2"],
    queryFn: getTask,
  });

  const studentQuery = useQuery({
    queryKey: ["getStudent2"],
    queryFn: getStudent,
  });

  const timesheet = timesheetQuery.data;
  const taskList = taskQuery.data;
  const studentInfo = studentQuery.data;

  const getWeekNumber = useMemo(() => {
    return timesheet?.find(
      (item) => item.date === format(new Date(), "yyyy-MM-dd")
    )?.week;
  }, [timesheet]);

  const studentTimesheet = useMemo(() => {
    return timesheet
      ? timesheet
          .filter((item) => new Date(item.week) <= getWeekNumber)
          .map(({ id, totalHours, date, logStatus, student_id, week }) => ({
            id,
            totalHours: logStatus !== 0 ? Math.round(totalHours) : "",
            date,
            logStatus,
            student_id,
            week,
            taskDescription:
              logStatus !== 0
                ? taskList?.find((item) => item.date === date)?.description
                : "",
          }))
      : [];
  }, [timesheet, taskList, getWeekNumber]);

  const groupedTimeSheet = useMemo(() => {
    const result = [];
    for (let i = 0; i < studentTimesheet?.length; i += 5) {
      result.push(studentTimesheet?.slice(i, i + 5));
    }
    return result.sort(
      (a, b) => new Date(b[0].date) - new Date(a[0].date)
    );
  }, [studentTimesheet]);

  const totalHours = useMemo(() => {
    return weeklyReport.reduce(
      (total, item) => total + item.totalHours,
      0
    );
  }, [weeklyReport]);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const daysOfWeek = useMemo(
    () => ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    []
  );

  const handleOpenWeeklyReport = useCallback(
    (item) => {
      setWeeklyReport(item);
      setSubmitReportValue({ id: item?.id, week: item?.week });
      open();
    },
    [open]
  );

  const { mutate } = useMutation({
    mutationFn: submitReport,
    onSuccess: () => {
      Swal.fire(
        "Success",
        "Your weekly report has been successfully submitted for review.",
        "success"
      );
      queryClient.invalidateQueries({ queryKey: ["getStudentweeklyreport23"] });
    },
    onError: () => {
      Swal.fire(
        "Error",
        "Oops! Something went wrong while processing your request to submit the weekly report.",
        "error"
      );
    },
  });

  const handleSubmit = useCallback(() => {
    const id = weeklyReport[0]?.student_id;
    const week = weeklyReport[0]?.week;

    if (id !== undefined && week !== undefined) {
      mutate({ id, week });
    } else {
      console.error("Invalid id or week in weeklyReport:", weeklyReport);
    }
  }, [weeklyReport, mutate]);

  if (
    timesheetQuery.isLoading ||
    taskQuery.isLoading ||
    studentQuery.isLoading
  ) {
    return <center>Computing..</center>;
  }

  

   return (
     <div className="w-screen h-screen fixed top-[50px] left-0 pt-12 bg-white z-10">
       <div className="flex items-start justify-between px-4">
         <div className="px-5 flex flex-col gap-3">
           <h2 className="text-sm font-bold">Create & Submit Report</h2>
           <small>Select One and Submit Your Weekly Report</small>
         </div>

         <button onClick={onClose}><LiaTimesSolid size={21} className="text-red-500" /></button>
       </div>

       <Card className="flex flex-col gap-5">
         {groupedTimeSheet.map((group, groupIndex) => (
           <div
             key={groupIndex}
             className="py-5 px-4 rounded-lg flex items-center justify-between border bg-gray-5 hover:bg-slate-50 hover:border-blue-400 cursor-pointer"
             onClick={() => handleOpenWeeklyReport(group)}
           >
             <span>
               {`${format(new Date(group[0].date), "MMMM dd")} - ${format(
                 new Date(group[group.length - 1].date),
                 "MMMM dd"
               )}`}
             </span>

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

         <div className="my-5 w-full flex items-center justify-center gap-4">
           <Button
             color="primary"
             size="lg"
             className="w-full my-5 bg-blue-500"
             onClick={handlePrint}
           >
             Print
           </Button>
           <Button
             size="lg"
             className="w-full my-5 bg-green-500 text-white"
             onClick={handleSubmit}
           >
             Submit
           </Button>
         </div>
       </Drawer>
     </div>
   );
};

export default WeeklyReport;