import React, { lazy } from "react";
const TimesheetTable = lazy(()=> import("../../components/StudentTimesheets/Timesheet_table"));
import { useQuery } from "@tanstack/react-query";
import { getTrainer, getStudentList,getCampus } from "../../api/Api";

const Timesheet = () => {

  const { data: StudentTimesheet } = useQuery({
    queryKey: ["trainer_getTimesheet"],
    queryFn: getStudentList,
  });

  const { data: getTrainer_id } = useQuery({
    queryKey: ["trainer_getTrainer_id"],
    queryFn: getTrainer,
  });

  const { data: getProgram } = useQuery({
    queryKey: ["trainer_getProgram"],
    queryFn: getCampus,
  });

  const programList = getProgram
    ? getProgram.flatMap(({ college }) =>
        college?.flatMap(({ program }) => program)
      ).map(({trainingHours,program_description}) => ({trainingHours,program_description}) )
    : [];


  const data = StudentTimesheet
    ? StudentTimesheet.filter(
        (item) => item.trainer_id === getTrainer_id?.id
      ).map(({ id, firstname, lastname, timesheet,deletedStatus,program }) => ({
        id,
        name: `${firstname} ${lastname}`,
        program,
        trainingHours: programList.find((item) => item.program_description ==program)?.trainingHours,
        totalHours: timesheet?.filter((item)=> item.logStatus === 1 && item.teacherMark!==0 && item.trainerMark!==0)?.reduce((total, item) => total + item.totalHours, 0),
        timeSheet: timesheet
          ? timesheet.map(
              ({ id, timeIn, timeOut, totalHours, date, logStatus ,trainerMark, teacherMark}) => ({
                id,
                timeIn: logStatus !== 0 && teacherMark!==0 && trainerMark!==0 ? timeIn : '0:00',
                timeOut: logStatus !== 0 && teacherMark!==0 && trainerMark!==0 ? timeOut : '0:00',
                totalHours: logStatus !== 0 && teacherMark!==0 && trainerMark!==0 ? totalHours : 0,
                date,
                trainerMark,
                teacherMark,
                logStatus
              })
            )
          : [],
          deletedStatus
      })
      ).filter((item)=> item.deletedStatus === 0)
    : [];


    console.log('dt',data);
  return (
    <>
      <TimesheetTable data={data} />
    </>
  );
}

export default Timesheet;
