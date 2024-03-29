import React, { lazy, useState } from "react";
const DailyLogItem = lazy(()=> import("../../components/DailyLogs/DailyLogsItems"));
import { BiSearch } from "react-icons/bi";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { getStudentList, getTrainer } from "../../api/Api";
import { useQuery } from "@tanstack/react-query";
import picture from "../../assets/images/emptyProfile.png";
import { Avatar } from "@nextui-org/react";

const DailyLogs = () => {
  const [currentDate] = useState(new Date());
  const [searchInput, setSearchInput] = useState("");
  const columnHelper = createColumnHelper();

  const { data: trainer, isLoading: trainerLoading } = useQuery({
    queryKey: ["trainer_gettrainer2"],
    queryFn: getTrainer,
  });

  const { data: student, isLoading: studentLoading } = useQuery({
    queryKey: ["trainer_studentDailyLogs"],
    queryFn: getStudentList,
  });

  const dateNow = format(new Date(), 'eeee');


  const data = student
    ? student
        .filter((item) => item.trainer_id == trainer?.id)
        .filter((item) => item.deletedStatus == 0)
        .map(({ id, firstname, lastname, timesheet, profile_url }) => ({
          id,
          name: `${firstname}  ${lastname}`,
          timeIn: timesheet?.find(
            (item) => item.date === format(currentDate, "yyyy-MM-dd")
          )?.timeIn,
          timeOut: timesheet?.find(
            (item) => item.date === format(currentDate, "yyyy-MM-dd")
          )?.timeOut,
          totalHours: timesheet?.find(
            (item) => item.date === format(currentDate, "yyyy-MM-dd")
          )?.totalHours,
          profile_url,
        }))
        .filter((item) => item.totalHours > 0 || item.timeIn !== "0:00")
        .map(({ id, name, timeIn, timeOut, totalHours, profile_url }) => ({
          id,
          name,
          timeIn:
            timeIn !== "0:00"
              ? format(
                  new Date(`${format(currentDate, "yyyy-MM-dd")} ${timeIn}`),
                  "hh:mm a"
                )
              : "--",
          timeOut:
            timeOut !== "0:00"
              ? format(
                  new Date(`${format(currentDate, "yyyy-MM-dd")} ${timeOut}`),
                  "hh:mm a"
                )
              : "--",
          totalHours: `${totalHours} hrs`,
          date: format(currentDate, "MMMM dd yyyy"),
          url: profile_url,
        }))
        .filter((item) =>
          item.name.toLowerCase().includes(searchInput.toLowerCase())
        )
    : [];

  const columns = [
    columnHelper.accessor("id", {
      id: "id",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "ID",
    }),
    columnHelper.accessor("name", {
      id: "name",
      cell: (info) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={info.row.original.url ? info.row.original.url : picture}
            className="text-large"
          />
          <span className="font-semibold tracking-wider">
            {info.row.original.name}
          </span>
        </div>
      ),
      header: "Name",
    }),
    columnHelper.accessor("timeIn", {
      id: "timeIn",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Time in",
    }),
    columnHelper.accessor("timeOut", {
      id: "timeOut",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Time out",
    }),
    columnHelper.accessor("totalHours", {
      id: "totalHours",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Total hours",
    }),
    columnHelper.accessor("date", {
      id: "date",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Date",
    }),
  ];

  if (studentLoading) return <center className="my-12">Loading</center>;

  return (
    <>
      <div className="flex items-center justify-between px-2 mb-4">
        <h1 className="text-xl font-bold tracking-wider text-gray-700">
          Daily Logs
        </h1>

        <div className="flex items-center gap-3">
          <div className="h-10 w-[230px] flex items-center gap-2 bg-white rounded-full px-3 shadow-md shadow-slate-200 ">
            <BiSearch />
            <input
              type="text"
              placeholder="Search.."
              onChange={(e) => setSearchInput(e.target.value)}
              className="outline-none text-sm"
            />
          </div>
        </div>
      </div>

      <DailyLogItem data={data} columns={columns} />
    </>
  );
};

export default DailyLogs;
