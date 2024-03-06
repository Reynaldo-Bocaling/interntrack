import React, { lazy } from "react";
const TimesheetTable = lazy(()=> import("../../components/StudentTimesheets/Timesheet_table"));
import { useQuery } from "@tanstack/react-query";
import { getStudentList, getTeacher, getCampus } from "../../api/Api";

const Timesheet = () => {

  const { data: StudentTimesheet, isLoading: timesheetLoading } = useQuery({
    queryKey: ["teacher_getTimesheet"],
    queryFn: getStudentList,
  });

  const { data: getTeacher_id, isLoading: teacher_idLoading } = useQuery({
    queryKey: ["teacher_getStudent"],
    queryFn: getTeacher,
  });

  const { data: getProgram, isLoading: programLoading } = useQuery({
    queryKey: ["teacher_getProgram"],
    queryFn: getCampus,
  });

  if (programLoading || teacher_idLoading || timesheetLoading) {
    return <center className="my-5 text-lg">Computing..</center>;
  }

  const programList = getProgram
    ? getProgram
        .flatMap(({ college }) => college?.flatMap(({ program }) => program))
        .map(({ trainingHours, program_description }) => ({
          trainingHours,
          program_description,
        }))
    : [];

  const data = StudentTimesheet
    ? StudentTimesheet.filter((item) => item.teacher_id === getTeacher_id?.id)
        .map(
          ({ id, firstname, lastname, timesheet, deletedStatus, program }) => ({
            id,
            name: `${firstname} ${lastname}`,
            program,
            trainingHours: programList.find(
              (item) => item.program_description == program
            )?.trainingHours,
            timeSheet: timesheet
              ? timesheet.map(
                  ({ id, timeIn, timeOut, totalHours, date, logStatus,teacherMark, trainerMark }) => ({
                    id,
                    timeIn: logStatus !== 0 && teacherMark!==0 && trainerMark!==0? timeIn : "0:00",
                    timeOut: logStatus !== 0 && teacherMark!==0 && trainerMark!==0? timeOut : "0:00",
                    totalHours: logStatus !== 0 && teacherMark!==0 && trainerMark!==0? totalHours : 0,
                    date,
                    trainerMark,
                teacherMark,
                logStatus
                  })
                )
              : [],
            deletedStatus,
            totalHours: timesheet
              .filter((item) => item.logStatus&& item.teacherMark!==0 && item.trainerMark!==0)
              .reduce((total, item) => total + item.totalHours, 0),
          })
        )
        .filter((item) => item.deletedStatus === 0)
    : [];

  console.log("g", data);
  return (
    <>
      <TimesheetTable data={data} />
    </>
  );
};

export default Timesheet;
