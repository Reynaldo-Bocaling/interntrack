import React from "react";
import TimesheetTable from "../../components/StudentTimesheets/Timesheet_table";
import { useQuery } from "@tanstack/react-query";
import { getStudentList, getTeacher } from "../../api/Api";

const Timesheet = () => {
  const currentDate = new Date();
  const { data: StudentTimesheet } = useQuery({
    queryKey: ["getTimesheet"],
    queryFn: getStudentList,
  });

  const { data: getTeacher_id } = useQuery({
    queryKey: ["getStudent"],
    queryFn: getTeacher,
  });

  console.log("id", getTeacher_id?.id);

  const data = StudentTimesheet
    ? StudentTimesheet.filter((item) => item.teacher_id === getTeacher_id?.id)
        .map(({ id, firstname, lastname, timesheet, deletedStatus }) => ({
          id,
          name: `${firstname} ${lastname}`,
          timeSheet: timesheet
            ? timesheet.map(
                ({ id, timeIn, timeOut, totalHours, date, logStatus }) => ({
                  id,
                  timeIn: logStatus !== 0 ? timeIn : 0,
                  timeOut: logStatus !== 0 ? timeOut : 0,
                  totalHours: logStatus !== 0 ? totalHours : 0,
                  date,
                })
              )
            : [],
          deletedStatus,
        }))
        .filter((item) => item.deletedStatus === 0)
    : [];

  return (
    <div>
      <TimesheetTable data={data} />
    </div>
  );
}

export default Timesheet;
