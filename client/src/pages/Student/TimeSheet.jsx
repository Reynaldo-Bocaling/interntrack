import React, { lazy, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCampus, getStudent, getTimesheet } from "../../api/Api";
import { format } from "date-fns";
import { Button } from "@nextui-org/react";
import { DotLoading } from "../../components/spinners-loading/Spinner";
import { FaHourglassHalf } from "react-icons/fa";
const PieChart = lazy(() => import("../../components/charts/PieChart"));

const TimeSheet = () => {
  const [showAllTables, setShowAllTables] = useState(false);

  const currentDate = useMemo(() => new Date(), []);

  const { data: timesheet, isLoading: timesheetLoading } = useQuery({
    queryKey: ["getStudentDailyLog"],
    queryFn: getTimesheet,
  });

  const { data: getStudentInfo, isLoading: studentLoading } = useQuery({
    queryKey: ["getStudentInfo"],
    queryFn: getStudent,
  });

  const { data: getProgram, isLoading: programLoading } = useQuery({
    queryKey: ["getProgram"],
    queryFn: getCampus,
  });

  

  const programList = useMemo(() => {
    return getProgram
      ? getProgram
          .flatMap(({ college }) => college?.flatMap(({ program }) => program))
          .map(({ trainingHours, program_description }) => ({
            trainingHours,
            program_description,
          }))
      : [];
  }, [getProgram]);

  const StudentTimesheet = useMemo(() => {
    return timesheet
      ?.filter((item) => new Date(item.date) <= currentDate)
      .map(
        ({
          id,
          timeIn,
          timeOut,
          totalHours,
          date,
          logStatus,
          student_id,
          week,
          teacherMark,
          trainerMark,
        }) => ({
          id,
          timeIn: logStatus !== 0  && teacherMark!==0 && trainerMark!==0? timeIn : "0:00",
          timeOut: logStatus !== 0 && teacherMark!==0 && trainerMark!==0 ? timeOut : "0:00",
          totalHours: logStatus !== 0 && teacherMark!==0 && trainerMark!==0 ? totalHours : 0,
          date,
          logStatus,
          student_id,
          week,
          teacherMark,
          trainerMark,
        })
      );
  }, [timesheet, currentDate]);

  const groupedTimeSheet = useMemo(() => {
    const groups = [];
    for (let i = 0; i < StudentTimesheet?.length; i += 5) {
      groups.push(StudentTimesheet.slice(i, i + 5));
    }
    return groups.sort((a, b) => new Date(b[0].date) - new Date(a[0].date));
  }, [StudentTimesheet]);

  const visibleGroups = useMemo(() => (showAllTables ? groupedTimeSheet : groupedTimeSheet.slice(0, 1)), [showAllTables, groupedTimeSheet]);

  const calculateTotalHours = useMemo(() => {
    return (timeSheet) => timeSheet.reduce((sum, entry) => sum + entry.totalHours, 0);
  }, []);

  const hoursTaken = useMemo(() => {
    return Math.round(StudentTimesheet?.reduce((total, item) => total + item.totalHours, 0));
  }, [StudentTimesheet]);

  const totalHours = useMemo(() => {
    return programList.find((item) => item.program_description === getStudentInfo?.program)?.trainingHours;
  }, [programList, getStudentInfo]);

  const hoursRemaining = useMemo(() => {
    return Number(totalHours - hoursTaken);
  }, [totalHours, hoursTaken]);

  const piechartData = useMemo(() => [hoursTaken, hoursRemaining], [hoursTaken, hoursRemaining]);
  const colors = ["#2ECC71", "#FF5733"];
  const labels = ["Hours Taken", "Hours Remaining"];


  if (programLoading || studentLoading || timesheetLoading) {
    return <DotLoading/>;
  }

  
  return (
    <div className="p-1">
      <div className="text-sm text-gray-700 font-semibold mb-5">
        Timesheet
      </div>

      <div className="w-[100%] flex flex-col gap-14 bg-white2 rounded-lg relative mb-2">
        <div className="relative  max-w-[450px] w-full pt-7">
          <PieChart
            data={piechartData}
            colors={colors}
            labels={labels}
            title={"Total Hours"}
          />

          <h1 className="absolute top-[12%] right-12 text-xl font-semibold">
            {`${hoursTaken} / ${totalHours}`}{" "}
            <span className="text-xs text-blue-500">hrs</span>
          </h1>

          <div className=" h-[110px] max-w-[450px] w-full flex items-center justify-between px-8 pb-2">
            <div>
              <h1 className="text-lg font-semibold xl flex items-center gap-3">
                {hoursTaken}
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
                {hoursRemaining}
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

      {/* table of time sheet */}
      {visibleGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="border rounded-lg p-4 mb-4 bg-white">
          <h3 className="text-sm font-semibold">
            {format(new Date(group[0].date), "MMMM dd")} -{" "}
            {format(new Date(group[group.length - 1].date), "MMMM dd")}
          </h3>
          <table className="w-full mt-5">
            <thead>
              <tr className="h-12 border-b">
                <th className="text-xs font-semibold tracking-wide text-left w-[25%]">
                  Date
                </th>
                <th className="text-xs font-semibold tracking-wide text-left w-[25%]">
                  Time In
                </th>
                <th className="text-xs font-semibold tracking-wide text-left w-[25%]">
                  Time Out
                </th>
                <th className="text-xs font-semibold tracking-wide text-left w-[25%]">
                  Total Hours
                </th>
              </tr>
            </thead>
            <tbody>
              {group.map((entry) => (
                <tr key={entry.id} className="h-12">
                  <td className="text-xs  tracking-wide text-left w-[25%]">
                    {format(new Date(entry.date), "MMM dd")}
                  </td>
                  <td className="text-xs  tracking-wide text-center w-[25%]">
                    {entry.timeIn != "0:00"
                      ? format(new Date(entry.timeIn), "h:mm a")
                      : "0"}
                  </td>
                  <td className="text-xs  tracking-wide text-center w-[25%]">
                    {entry.timeOut != "0:00"
                      ? format(new Date(entry.timeOut), "h:mm a")
                      : "0"}
                  </td>
                  <td className="text-xs  tracking-wide text-center w-[25%]">
                  <div className="w-full flex items-center justify-center">
                  {entry.logStatus === 0 || entry.teacherMark !== 0 || entry.trainerMark !== 0 || entry.totalHours !==0
            ?  `${entry.totalHours}hrs` : <FaHourglassHalf size={16} className=" text-orange-500"/>}
                  </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="w-full border-t mt-5">
              <tr className="h-12">
                <td colSpan={2} className="text-base text-left  font-semibold">
                  Total Hours
                </td>

                <td></td>
                <td className="text-sm font-semibold">
                  {calculateTotalHours(group)} hrs
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      ))}

      <div className="w-full grid place-items-center">
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

export default TimeSheet;