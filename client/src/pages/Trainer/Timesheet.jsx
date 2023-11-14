import React from "react";
import TimesheetTable from "../../components/StudentTimesheets/Timesheet_table";
import { useQuery } from "@tanstack/react-query";
import { getTrainer, getStudentList,getCampus } from "../../api/Api";

const Timesheet = () => {

  const { data: StudentTimesheet } = useQuery({
    queryKey: ["getTimesheet"],
    queryFn: getStudentList,
  });

  const { data: getTrainer_id } = useQuery({
    queryKey: ["getTrainer_id"],
    queryFn: getTrainer,
  });

  const { data: getProgram } = useQuery({
    queryKey: ["getProgram"],
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
        totalHours: timesheet?.filter((item)=> item.logStatus === 1)?.reduce((total, item) => total + item.totalHours, 0),
        timeSheet: timesheet
          ? timesheet.map(
              ({ id, timeIn, timeOut, totalHours, date, logStatus }) => ({
                id,
                timeIn: logStatus !== 0 ? timeIn : '0:00',
                timeOut: logStatus !== 0 ? timeOut : '0:00',
                totalHours: logStatus !== 0 ? totalHours : 0,
                date,
              })
            )
          : [],
          deletedStatus
      })
      ).filter((item)=> item.deletedStatus === 0)
    : [];


    console.log('dt',data);
  return (
    <div>
      <TimesheetTable data={data} />
    </div>
  );
}

export default Timesheet;
