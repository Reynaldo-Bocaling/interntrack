import React, { lazy, useState, useMemo, useCallback } from "react";
import { MdKeyboardArrowRight, MdMoreTime } from "react-icons/md";
import { TbPencil } from "react-icons/tb";
import { Button } from "@nextui-org/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTimesheet, addTimeIn, addTimeOut } from "../../api/Api";
import {
  format,
  parse,
  setMinutes,
  setHours,
} from "date-fns";
import { AiOutlineCheck } from "react-icons/ai";
import Swal from "sweetalert2";
import { adjustTime } from "./AddjustTime";
import { DotLoading } from "../spinners-loading/Spinner";
const CustmTimeModal = lazy(() => import("./DailyLogModal"));

const DailyLogs = () => {
  const queryClient = useQueryClient();
  const formattedDate = useMemo(() => format(new Date(), "yyyy-MM-dd"), []);
  const timeFormat = useMemo(() => format(new Date(), "HH:mm"), []);
  const [totalHours, setTotalHours] = useState(0);
  const getTimeNow = useMemo(() => new Date().getHours(), []);

  const [currentTime, setCurrrentTime] = useState(new Date());
  const [isOpen, setIopen] = useState(false);



  const { mutate: mutateTimeIn, isLoading: timelogLoading } = useMutation({
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

  const { data, isLoading } = useQuery({
    queryKey: ["getStudentDailyLog"],
    queryFn: getTimesheet,
  });

 

  const getTime = data ? data.find((item) => item.date === formattedDate) : [];
  const timeInDB = getTime?.timeIn;
  const timeOutDB = getTime?.timeOut;
  const totalHoursDB = getTime?.totalHours;
  const timeId = getTime?.id;

  const timeInDBFormat = new Date(timeInDB);
  const timeOutDBFormat = new Date(timeOutDB);

  // time now
  const timeNow = parse(timeFormat, "HH:mm", new Date());

  const getWeek = data
    ? data
        .filter((item) => item.week === getTime?.week)
        .map(({ date }) => ({
          date: format(new Date(date), "dd"),
          day: format(new Date(date), "EEEE"),
        }))
    : [];

  const adjustTotalHours = useCallback((hours) => {
    const totalMinutes = hours * 60;
    const adjustedMinutes = Math.floor(totalMinutes / 15) * 15;
    return adjustedMinutes / 60;
  }, []);

  const handleTimeIn = useCallback((e) => {
    e.preventDefault();
    const adjustedTime = adjustTime(currentTime);
    mutateTimeIn({
      id: timeId,
      timeIn: adjustedTime,
    });
  }, [mutateTimeIn, timeId, adjustTime, currentTime]);

  const handleTimeOut = useCallback(() => {
    const adjustedTime = adjustTime(currentTime);
    if (timeInDB !== "0:00") {
      const lunchBreakStart = setHours(setMinutes(new Date(), 0), 12);
      const minutesWorked = Math.ceil((adjustedTime - timeInDBFormat) / 60000);
      const hoursWorked = minutesWorked / 60;
      const newTotalHours = adjustTotalHours(totalHours + hoursWorked);
      let adjustedTotalHours = newTotalHours;
      if (timeInDBFormat < lunchBreakStart) {
        const lunchBreakHours = 1.0;
        adjustedTotalHours -= lunchBreakHours;
      }
      mutateTimeOut({
        id: timeId,
        timeOut: adjustedTime,
        totalHours: parseFloat(adjustedTotalHours.toFixed(2)),
      });
    }
  }, [mutateTimeOut, timeId, adjustTime, currentTime, timeInDB, timeInDBFormat, totalHours, adjustTotalHours]);

  const handleCustomDate = useCallback((time) => {
    setCurrrentTime(time);
  }, []);



  if (isLoading) {
    return <DotLoading/>;
  }

  if(timeInDB === undefined) {
    return <center className="py-7">Not available</center>
  }
  const timeLogs = [ 
    {
      label: "Time in",
      contentValue: (
        <span
          className={`${
            timeInDB === "0:00" && "text-red-500"}  font-semibold"
          }  tracking-wide`}
        >
          {timeInDB === "0:00" ? "--" : `${format(timeInDBFormat, "h:mm a")}`} 
        </span>
      ),
    },
    {
      label: "Time out",
      contentValue: (
        <span
          className={`${
            timeOutDB === "0:00" && "text-red-500"}  font-semibold tracking-wide`}
        >
          {timeOutDB === "0:00" ? "--" : `${format(timeOutDBFormat, "h:mm a")}`}
        </span>
      ),
    },
    {
      label: "Total hours",
      contentValue: (
        <span className="font-semibold tracking-wide">
          {timeInDB === "0:00" || timeOutDB === "0:00" ? (
            <span className="text-red-500 text-xl font-semibold">--</span>
          ) : (
            `${totalHoursDB} hrs`
          )}
        </span>
      ),
    },
  ];
  
  
  return (
    <div className="mt-2 border-r">
      <div className="flex items-center justify-between mb-8 px-3">
        <h1 className="text-base font-bold">Daily logs</h1>
        <small className="text-gray-400 flex items-center gap-1">
          Slide to History
          <MdKeyboardArrowRight size={23} />
        </small>
      </div>
      <header className="h-[80px] w-full">
        <div className="grid grid-cols-5 gap-7  items-center justify-between px-3">
          {getWeek.map((item, index) => (
            <div
              key={index}
              className={`${
                item.date === format(new Date(), "dd")
                  ? "bg-[#fd6f40] text-white"
                  : "bg-white"
              } py-4 px-2 rounded-full flex flex-col justify-center items-center gap-2`}
            >
              <span className=" text-sm  ">
                {item.date === format(new Date(), "dd") ? (
                  <small className="text-[0.56rem] font-semibold">TODAY</small>
                ) : (
                  item.day[0]
                )}
              </span>
              <span className=" text-sm font-semibold">{item.date}</span>
            </div>
          ))}
        </div>
      </header>

      
        <main className="w-full flex flex-col items-center justify-center gap-7 mt-7">
          <div className="relative  h-[180px] w-[180px] rounded-full border-[5px] border-[#f98e6a] flex flex-col items-center justify-center">
              <span className="text-lg text-gray-500 tracking-wider">
                Time Now
              </span>
              <h1 className="text-2xl font-semibold">
                {format(currentTime, "hh:mm")} 
                <small className="text-sm text-blue-500">{format(currentTime, 'aa')}</small>
              </h1>
          </div>
          
          <div className="w-full px-4 flex items-start justify-between">
            {timeLogs.map(({ label, contentValue }, index) => (
              <div key={index} className="w-full flex items-center justify-between  flex-col gap-2">
                
                {contentValue}
                  <small className="text-gray-700">{label}</small>
                
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2">
            {timeInDB != "0:00" && timeOutDB != "0:00" ? (
              <div className="my-3 text-xl tracking-wide text-green-500 flex items-center gap-2">
                End Work <AiOutlineCheck />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-5 pb-5">
                

                <div className="flex items-center justify-center gap-3">
                  {timeInDB === "0:00" ? (
                    <Button
                      onClick={handleTimeIn}
                     
                      size="lg"
                      className="w-[150px] bg-[rgba(218,126,76,0.2)] text-[#fd6f40] font-medium tracking-wide"
                      isDisabled={
                        timeInDB !== "0:00" && timeOutDB !== "0:00" ||
                        getTimeNow < 7 ||
                        timelogLoading
                      }
                    >
                      {timelogLoading ? "Submitting.." : " Time in"}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleTimeOut}
                     
                      size="lg"
                      className="w-[150px] bg-[rgba(218,126,76,0.2)] text-[#fd6f40] font-medium tracking-wide"
                      isDisabled={
                        timeInDB !== "0:00" && timeOutDB !== "0:00" ||
                        timelogLoading
                      }
                    >
                      {timelogLoading ? "Submitting.." : " Time Out"}
                    </Button>
                  )}
                  <button
                    onClick={() => setIopen(true)}
                    className=""
                  >
                    <TbPencil size={25} className="text-[#fd6f40] w-[50px]" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
     

      <CustmTimeModal
        isOpen={isOpen}
        onClose={() => setIopen(false)}
        handleCustom={handleCustomDate}
        currentTime={currentTime}
        time={format(adjustTime(currentTime), "hh:mm")}
      />
    </div>
  );
};

export default DailyLogs;
