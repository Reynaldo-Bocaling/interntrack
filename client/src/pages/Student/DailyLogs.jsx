import React, { useState } from "react";
import { Carousel } from "@mantine/carousel";
import { MdKeyboardArrowLeft,MdKeyboardArrowRight, MdMoreTime } from "react-icons/md";
import { AiOutlineFieldTime } from "react-icons/ai";
import { LuAlarmClockOff } from "react-icons/lu";
import {Button} from "@nextui-org/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTimesheet , addTimeIn,addTimeOut} from "../../api/Api";
import { format,setMinutes, parse, differenceInMinutes, addMinutes } from "date-fns";

const  DailyLogs = () => {
    const queryClient = useQueryClient();
    const timeOfDay = format(new Date(), 'aa')
  const formattedDate = format(new Date(), 'yyyy-MM-dd');
  const timeFormat = format(new Date(), 'HH:mm');

 
  // timeIn
  const {mutate:mutateTimeIn} = useMutation({
    mutationFn: addTimeIn,
    onSuccess: () => {
      alert('Success');
      queryClient.invalidateQueries({ queryKey: ['getStudentDailyLog'] });
    },
    onError: (error) => {
      console.error(error.message);
      alert('Failed');
    },
  });

  // timeOut
  const {mutate:mutateTimeOut} = useMutation({
    mutationFn: addTimeOut,
    onSuccess: () => {
      alert('Success');
      queryClient.invalidateQueries({ queryKey: ['getStudentDailyLog'] });
    },
    onError: (error) => {
      console.error(error.message);
      alert('Failed');
    },
  });


  

  const {data} = useQuery({
    queryKey: ['getStudentDailyLog'],
    queryFn: getTimesheet
  });

  const getTime = data
  ? data.find((item)=> item.date === '2023-10-16')
  :[]

  const timeInDB = getTime?.timeIn;
  const timeOutDB = getTime?.timeOut;
  const totalHoursDB = getTime?.totalHours;
  const timeId = getTime?.id;


   const timeInFormat = parse(timeInDB, 'HH:mm', new Date());
   const timeOutFormat = parse(timeOutDB, 'HH:mm', new Date());




  // for total hours purposes
   const timeIn = parse(getTime?.timeIn, 'HH:mm', new Date());
   const parseTimeFormat = parse(timeFormat, 'HH:mm', new Date());

   const minutesDifference = differenceInMinutes(parseTimeFormat,timeIn);
   const hoursDecimal = minutesDifference / 60;
  const totalHours = parseFloat(hoursDecimal.toFixed(2));
  // totalHours
  const hours = Math.floor(totalHours);
  const minutes = Math.round((totalHours % 1) * 60); 


  // timeIn Function
  const handleTimeIn = (e) => {
    e.preventDefault();
    const parsedTime = parse(timeFormat, 'HH:mm', new Date());
    const minutes = parsedTime.getMinutes();
  
    if (minutes % 15 === 0) {
      console.log(format(parsedTime, 'HH:mm')); 
    } else {
      const adjustedMinutes = Math.ceil(minutes / 15) * 15;
      const adjustedTime = setMinutes(parsedTime, adjustedMinutes);
      mutateTimeIn({ id: timeId, timeIn: format(adjustedTime, 'HH:mm') }); 
    }
    
    
  }


  // timeOut Function
  const handleTimeOut = (e) => {
    e.preventDefault();
    mutateTimeOut({ id: timeId, timeOut: timeFormat , totalHours:parseFloat(totalHours) }); 
    // console.log({ id: timeId, timeOut: timeFormat , totalHours:`${hours}, ${minutes}, ${totalHours}`}); 
  }
  


  
  
  return (
    <div>
      <Carousel
        maw={320}
        className=" max-w-[400px] z-0"
        nextControlIcon={<MdKeyboardArrowRight size={16} />}
        previousControlIcon={<MdKeyboardArrowLeft size={16} />}
      >
        <Carousel.Slide>
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
                <div className="h-[80px] bg-blue-300 text-white rounded-2xl flex flex-col justify-center items-center gap-2">
                  <span className=" text-sm text-white ">M</span>
                  <span className=" text-lg font-semibold">01</span>
                </div>
                <div className="h-[80px] flex rounded-2xl  flex-col justify-center items-center gap-2">
                  <span className=" text-sm text-gray-600 ">T</span>
                  <span className=" text-lg font-semibold">02</span>
                </div>
                <div className="h-[80px] flex rounded-2xl  flex-col justify-center items-center gap-2">
                  <span className=" text-sm text-gray-600 ">W</span>
                  <span className=" text-lg font-semibold">03</span>
                </div>
                <div className="h-[80px] flex  rounded-2xl flex-col justify-center items-center gap-2">
                  <span className=" text-sm text-gray-600 ">T</span>
                  <span className=" text-lg font-semibold">04</span>
                </div>
                <div className="h-[80px] flex  rounded-2xl flex-col justify-center items-center gap-2">
                  <span className=" text-sm text-gray-600 ">F</span>
                  <span className=" text-lg font-semibold">05</span>
                </div>
              </div>
            </header>

            <main className="w-full flex flex-col items-center justify-center gap-7 mt-7">
             <div className="relative h-[220px] w-[220px] rounded-full">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-[95%] w-[95%] rounded-full bg-white flex flex-col justify-center items-center gap-3">
                    <span className="text-lg text-gray-500 tracking-wider">
                    Time Now
                    </span>
                    <h1 className="text-4xl tracking-wide font-semibold">
                       {format(parseTimeFormat, 'hh:mm')} {/*time now */}
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
                    className={`${timeInDB === '0:00' ? 'text-red-500': 'font-semibold'}  tracking-wide`}
                    >
                      {timeInDB === '0:00'? 'Not yet Time in': `${timeInDB} ${timeOfDay}`} 
                    </span>
                </div>
                <div className="w-full flex items-center justify-between my-3">
                    <div className="flex items-center gap-4">
                        <LuAlarmClockOff size={25} className="text-red-500" />
                        <span className="text-gray-700">Time in</span>
                    </div>
                    <span 
                    className={`${timeOutDB === '0:00' ? 'text-red-500': 'font-semibold'}  tracking-wide`}
                    >
                      {timeOutDB === '0:00'? 'Not yet Time out': `${timeOutDB} ${timeOfDay}`}
                      </span>
                </div>
                <div className="w-full flex items-center justify-between my-3">
                    <div className="flex items-center gap-4">
                        <AiOutlineFieldTime size={25} className="text-green-500" />
                        <span className="text-gray-700">Total</span>
                    </div>
                    <span className="font-semibold tracking-wide">
                      {
                        timeInDB === '0:00' || timeOutDB === '0:00' ? 0 : `${totalHoursDB} hrs`
                      }
                    </span>
                </div>
              </div>
              {
                timeInDB === '0:00'?
                (
                <Button 
                onClick={handleTimeIn}
                color="primary" size="lg" className="w-[150px] font-medium tracking-wide"
                isDisabled={timeInDB !== '0:00' && timeOutDB !== '0:00'}
                >Time in </Button>
                ) : (
                  <Button 
                  onClick={handleTimeOut}
                  color="primary" size="lg" className="w-[150px] font-medium tracking-wide"
                  isDisabled={timeInDB !== '0:00' && timeOutDB !== '0:00'}
                  >Time Out </Button>
                )

              }

            </main>
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
        <div className="my-4">
        <div className="flex items-center justify-between mb-8 px-3">
              <h1 className="text-xl font-bold tracking-wider text-gray-700 ">
                History
              </h1>
              <div className="text-gray-400 flex items-center gap-1">
                <MdKeyboardArrowLeft size={23} />
                Slide to Daily Logs
              </div>
            </div>
            

            <div className="mt-  p-2 rounded-lg bg-white shadow-lg shadow-slate-200 border border-slate-100">
          <table className='w-full'>
            <thead>
              <tr className='h-12 border-b'>
                <th className='text-xs tracking-wide text-left pl-3'>Date</th>
                <th className='text-xs tracking-wide text-center'>Time in</th>
                <th className='text-xs tracking-wide text-center'>Time out</th>
                <th className='text-xs tracking-wide'>Total hours</th>
              </tr>
            </thead>
            <tbody>
              <tr className='h-14'>
                <td className='text-xs tracking-wide text-center'>January 02</td>
                <td className='text-xs tracking-wide text-center'>8:00</td>
                <td className='text-xs tracking-wide text-center'>4:00 out</td>
                <td className='text-xs tracking-wide text-center'>8 hrs</td>
                
              </tr>
              <tr className='h-14'>
                <td className='text-xs tracking-wide text-center'>January 03</td>
                <td className='text-xs tracking-wide text-center'>8:00</td>
                <td className='text-xs tracking-wide text-center'>4:00 out</td>
                <td className='text-xs tracking-wide text-center'>8 hrs</td>
              </tr>
              <tr className='h-14'>
                <td className='text-xs tracking-wide text-center'>January 04</td>
                <td className='text-xs tracking-wide text-center'>8:00</td>
                <td className='text-xs tracking-wide text-center'>4:00 out</td>
                <td className='text-xs tracking-wide text-center'>8 hrs</td>
              </tr>
              <tr className='h-14'>
                <td className='text-xs tracking-wide text-center'>January 05</td>
                <td className='text-xs tracking-wide text-center'>8:00</td>
                <td className='text-xs tracking-wide text-center'>4:00 out</td>
                <td className='text-xs tracking-wide text-center'>8 hrs</td>
           </tr>
            </tbody>
          </table>
        </div>


          </div>
        </Carousel.Slide>
      </Carousel>

      <div></div>
    </div>
  );
}

export default DailyLogs;
