import React, { useState } from "react";
import { MdKeyboardArrowRight, MdMoreTime } from "react-icons/md";
import { AiOutlineFieldTime } from "react-icons/ai";
import { LuAlarmClockOff } from "react-icons/lu";
import { Button } from "@nextui-org/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTimesheet, addTimeIn, addTimeOut } from "../../api/Api";
import {
  format,
  setMinutes,
  parse,
  differenceInMinutes,
  addMinutes,
} from "date-fns";
import { AiOutlineCheck } from "react-icons/ai";
import Swal from "sweetalert2";

const DailyLogs = () => {
  const queryClient = useQueryClient();
  const timeOfDay = format(new Date(), "aa");
  const formattedDate = format(new Date(), "yyyy-MM-dd");
  const timeFormat = format(new Date(), "HH:mm");

  // timeIn
  const { mutate: mutateTimeIn } = useMutation({
    mutationFn: addTimeIn,
    onSuccess: () => {
      Swal.fire(
        "Success",
        "You've successfully time in. \n Lets get to work!",
        "success"
      );
      queryClient.invalidateQueries({ queryKey: ["getStudentDailyLog"] });
    },
    onError: (error) => {
      console.error(error.message);
      Swal.fire(
        "Error",
        "Time in failed. Something went wrong. \n Please retry",
        "error"
      );
    },
  });

  // timeOut
  const { mutate: mutateTimeOut } = useMutation({
    mutationFn: addTimeOut,
    onSuccess: () => {
      Swal.fire(
        "Success",
        "Time Out successfully. \n Thank you for your hard work today!",
        "success"
      );
      queryClient.invalidateQueries({ queryKey: ["getStudentDailyLog"] });
    },
    onError: (error) => {
      console.error(error.message);
      Swal.fire(
        "Error",
        "Time out failed. Something went wrong. \n Please retry",
        "error"
      );
    },
  });

  const { data } = useQuery({
    queryKey: ["getStudentDailyLog"],
    queryFn: getTimesheet,
  });

  const getTime = data ? data.find((item) => item.date === formattedDate) : [];
  const timeInDB = getTime?.timeIn;
  const timeOutDB = getTime?.timeOut;
  const totalHoursDB = getTime?.totalHours;
  const timeId = getTime?.id;

  // for total hours purposes
  const timeIn = parse(getTime?.timeIn, "HH:mm", new Date());
  const parseTimeFormat = parse(timeFormat, "HH:mm", new Date());

  const minutesDifference = differenceInMinutes(parseTimeFormat, timeIn);
  const hoursDecimal = minutesDifference / 60;
  const totalHours = parseFloat(hoursDecimal.toFixed(2));

  // timeIn Function
  const handleTimeIn = (e) => {
    e.preventDefault();
    const parsedTime = parse(timeFormat, "HH:mm", new Date());
    const minutes = parsedTime.getMinutes();

    if (minutes % 15 === 0) {
      mutateTimeIn({ id: timeId, timeIn: format(parsedTime, "HH:mm") });
    } else {
      const adjustedMinutes = Math.ceil(minutes / 15) * 15;
      const adjustedTime = setMinutes(parsedTime, adjustedMinutes);
      mutateTimeIn({ id: timeId, timeIn: format(adjustedTime, "HH:mm") });
    }
  };

  // timeOut Function
  const handleTimeOut = (e) => {
    e.preventDefault();
    mutateTimeOut({
      id: timeId,
      timeOut: timeFormat,
      totalHours: parseFloat(totalHours),
    });
    console.log(parseFloat(totalHours));
  };

  const getWeek = data
    ? data
        .filter((item) => item.week === getTime?.week)
        .map(({ date }) => ({
          date: format(new Date(date), "dd"),
          day: format(new Date(date), "EEEE"),
        }))
    : [];

  return (
    <div className="mt-2 border-r">
      <div className="flex items-center justify-between mb-8 px-3">
        <h1 className="text-xl font-bold tracking-wider text-gray-700 ">
          Daily logs
        </h1>
        <div className="text-gray-400 flex items-center gap-1">
          Slide to History
          <MdKeyboardArrowRight size={23} />
        </div>
      </div>
      <header className="h-[80px] w-full">
        <div className="grid grid-cols-5 gap-7  items-center justify-between px-3">
          {getWeek.map((item, index) => (
            <div
              key={index}
              className={`${
                item.date === format(new Date(), "dd")
                  ? "bg-blue-300 text-white"
                  : "bg-gray-200"
              } h-[80px]  rounded-2xl flex flex-col justify-center items-center gap-2`}
            >
              <span className=" text-sm  ">{item.day[0]}</span>
              <span className=" text-md font-semibold">{item.date}</span>
            </div>
          ))}
        </div>
      </header>

      {getTime ? (
        <main className="w-full flex flex-col items-center justify-center gap-7 mt-7">
          <div className="relative h-[220px] w-[220px] rounded-full">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-[95%] w-[95%] rounded-full bg-white flex flex-col justify-center items-center gap-3">
              <span className="text-lg text-gray-500 tracking-wider">
                Time Now
              </span>
              <h1 className="text-4xl tracking-wide font-semibold">
                {format(parseTimeFormat, "hh:mm")} {/*time now */}
                <small className="text-sm text-blue-500">{timeOfDay}</small>
              </h1>
            </div>

            {/* design purposes */}
            <div className="flex">
              <div className="absolute top-0 left-0 h-[220px] w-[125px] z-0 rounded-l-full bg-orange-100"></div>
              <div className="absolute top-0 right-0 h-[220px] w-[125px] rounded-r-full bg-blue-100"></div>
              <div className="absolute top-3 left-4 h-[40px] w-[40px] rounded-full bg-white border-[4px] border-orange-100 z-20"></div>
            </div>
          </div>
          <div className="w-full px-4">
            <div className="w-full flex items-center justify-between my-3">
              <div className="flex items-center gap-4">
                <MdMoreTime size={25} className="text-blue-500" />
                <span className="text-gray-700">Time in</span>
              </div>
              <span
                className={`${
                  timeInDB === "0:00" ? "text-red-500" : "font-semibold"
                }  tracking-wide`}
              >
                {timeInDB === "0:00" ? "Not yet Time in" : `${timeInDB}`}
              </span>
            </div>
            <div className="w-full flex items-center justify-between my-3">
              <div className="flex items-center gap-4">
                <LuAlarmClockOff size={25} className="text-red-500" />
                <span className="text-gray-700">Time out</span>
              </div>
              <span
                className={`${
                  timeOutDB === "0:00" ? "text-red-500" : "font-semibold"
                }  tracking-wide`}
              >
                {timeOutDB === "0:00" ? "Not yet Time out" : `${timeOutDB}`}
              </span>
            </div>
            <div className="w-full flex items-center justify-between my-3">
              <div className="flex items-center gap-4">
                <AiOutlineFieldTime size={25} className="text-green-500" />
                <span className="text-gray-700">Total hours</span>
              </div>
              <span className="font-semibold tracking-wide">
                {timeInDB === "0:00" || timeOutDB === "0:00"
                  ? 0
                  : `${totalHoursDB} hrs`}
              </span>
            </div>
          </div>

          {timeInDB != "0:00" && timeOutDB != "0:00" ? (
            <div className="my-3 text-xl tracking-wide text-green-500 flex items-center gap-2">
              End Work <AiOutlineCheck />
            </div>
          ) : timeInDB === "0:00" ? (
            <Button
              onClick={handleTimeIn}
              color="primary"
              size="lg"
              className="w-[150px] font-medium tracking-wide"
              isDisabled={timeInDB !== "0:00" && timeOutDB !== "0:00"}
            >
              Time in{" "}
            </Button>
          ) : (
            <Button
              onClick={handleTimeOut}
              color="primary"
              size="lg"
              className="w-[150px] font-medium tracking-wide"
              isDisabled={timeInDB !== "0:00" && timeOutDB !== "0:00"}
            >
              Time Out{" "}
            </Button>
          )}
        </main>
      ) : (
        <p className="text-center text-xl  text-gray-400">
          Sorry, time-in is not allowed today.
        </p>
      )}
    </div>
  );
};

export default DailyLogs;
