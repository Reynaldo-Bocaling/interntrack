import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { BsDot } from "react-icons/bs";
import dp from "../../assets/images/dp.png";
import { FcCalendar } from "react-icons/fc";
import { Link } from "react-router-dom";
import { getStudentList } from '../../api/Api'
import {useQuery} from '@tanstack/react-query'

const AttendanceRequestItem = ({ data }) => {
   const currentDate = new Date(); 
  const [show, setShow] = useState(null);
  
  const handleFunc = (index) => {
    setShow((prev) => (prev === index ? null : index));
  };

  const {data:StudentItem} = useQuery({
    queryKey: ["getTimesheet"],
    queryFn: getStudentList
  });

  const studentRequest =  StudentItem
  ? StudentItem.map(({
    id,
    firstname,
    lastname,
    accountStatus,
    timesheet
  })=> ({
    id,
    firstname,
    lastname,
    accountStatus,
    totalAllHoursRequest:timesheet &&  timesheet.filter((item) => new Date(item.date) <= currentDate && item.totalHours > 0 && item.logStatus === 0).reduce((total, item) => total + item.totalHours, 0),
    day:timesheet &&  timesheet.filter((item) => new Date(item.date) <= currentDate && item.totalHours > 0 && item.logStatus === 0).length,
    dayStart: timesheet &&  timesheet.filter((item) => new Date(item.date) <= currentDate && item.totalHours > 0 && item.logStatus === 0).map(({date})=> ({date}))[0],
    dayEnd: timesheet &&  timesheet.filter((item) => new Date(item.date) <= currentDate && item.totalHours > 0 && item.logStatus === 0).map(({date})=> ({date}))[0],

  }))
  : []

  console.log('attendace',studentRequest);

  return (
    <div>
      {studentRequest.length > 0 ? (
        studentRequest.map((item, index) => (
          <div
            key={index}
            className="border rounded-xl bg-white mb-3 px-5 py-2 cursor-pointer"
          >
            <div
              className="flex items-center justify-between w-full mt-2"
              onClick={() => handleFunc(index)}
            >
              <div className="flex items-center gap-3">
                <div className="max-w-[45px] p-2 rounded-full overflow-hidden shadow-md shadow-gray-100">
                  <img src={dp} alt="" />
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="font-semibold text-base tracking-wider capitalize flex items-center gap-2">
                    <span className="capitalize">{item.firstname}</span>
                    <span className="capitalize">{item.lastname}</span>
                  </h1>
                  {item.status === 1 ? (
                    <small className="font-medium text-gray-600 tracking-wider flex items-center capitalize">
                      Online
                      <span className="text-green-500">
                        <BsDot size={22} />
                      </span>
                    </small>
                  ) : (
                    <small className="font-medium text-gray-600 tracking-wider flex items-center capitalize">
                      Offline
                      <span className="text-red-500">
                        <BsDot size={22} />
                      </span>
                    </small>
                  )}
                </div>
              </div>

              <small className="text-yellow-500 tracking-wide font-medium">
                Pending request
              </small>

              <div className="flex gap-5 items-center">
                <div className="flex flex-col gap-1">
                  <div className="text-base font-medium tracking-wider">
                    {item.day} Days
                  </div>
                  <p className="text-sm tracking-wider">
                    {item.totalAllHoursRequest} Hours
                  </p>
                </div>
                <div>
                  <FiChevronDown
                    className={`text-2xl duration-100 text-blue-500 ${
                      show === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
            </div>

            <div
              className={`mt-3 max-h-0 overflow-hidden duration-200 ${
                show === index ? "max-h-screen" : "max-h-0"
              }`}
            >
              <div className="py-4 border-t flex flex-col gap-4">
                <span className="text-lg text-blue-500 font-medium tracking-wider">
                  Attendance Request
                </span>
                <div className="flex items-center gap-2">
                  <FcCalendar size={25} />
                  <div className="flex items-center gap-2">
                    <span>{item.startDate}</span> -<span>{item.endDate}</span>
                  </div>
                </div>
                <div className="item-buttons flex items-center gap-3 mt-3">
                  <button className="py-2 px-10 text-sm text-white bg-sky-500 rounded-full border-[2px] border-sky-500 hover:opacity-[0.9]">
                    Confirm All
                  </button>
                  <Link
                    to="/Attendance-request/view/12"
                    className="py-2 px-10 text-sm text-sky-500 rounded-full border-[2px] border-sky-500 hover:bg-sky-50"
                  >
                    Check
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="py-5 mt-7 text-xl font-medium text-center bg-white rounded-lg">
          No record
        </div>
      )}
    </div>
  );
};

export default AttendanceRequestItem;
