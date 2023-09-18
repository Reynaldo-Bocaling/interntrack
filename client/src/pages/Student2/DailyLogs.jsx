import React from "react";
import { Carousel } from "@mantine/carousel";
import { MdKeyboardArrowLeft,MdKeyboardArrowRight, MdMoreTime } from "react-icons/md";
import { AiOutlineFieldTime } from "react-icons/ai";
import { LuAlarmClockOff } from "react-icons/lu";

function DailyLogs() {
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
                    <span className="text-xl text-gray-500 tracking-wider">
                    Day
                    </span>
                    <h1 className="text-4xl tracking-wide font-semibold">
                    08:00 <small className="text-sm text-blue-500">AM</small>
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
                        <AiOutlineFieldTime size={25} className="text-green-500" />
                        <span className="text-gray-700">Time in</span>
                    </div>
                    <span className="font-semibold tracking-wide">08:00</span>
                </div>
                <div className="w-full flex items-center justify-between my-3">
                    <div className="flex items-center gap-4">
                        <LuAlarmClockOff size={25} className="text-red-500" />
                        <span className="text-gray-700">Time in</span>
                    </div>
                    <span className="font-semibold tracking-wide">05:00</span>
                </div>
                <div className="w-full flex items-center justify-between my-3">
                    <div className="flex items-center gap-4">
                        <MdMoreTime size={25} className="text-blue-500" />
                        <span className="text-gray-700">Time in</span>
                    </div>
                    <span className="font-semibold tracking-wide">8 hrs</span>
                </div>
              </div>
              <button className="text-white font-semibold tracking-wider bg-blue-500 py-3 px-16 rounded-lg">
                Time in
              </button>
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
        {/* ...other slides */}
      </Carousel>

      <div></div>
    </div>
  );
}

export default DailyLogs;
