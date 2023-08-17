import React, { useState } from "react";
import profile from "../../../assets/images/dp.png";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FcCalendar } from "react-icons/fc";
import { BsDot } from "react-icons/bs";
import { Link, useOutletContext } from "react-router-dom";
import { StudentData } from "../../../services/Data";

const AttendanceRequest = () => {
  const [itemStates, setItemStates] = useState({});
  const { searchVal } = useOutletContext();

  const handleItemClick = (studentId) => {
    setItemStates((prevItemStates) => ({
      ...prevItemStates,
      [studentId]: {
        isOpen: !prevItemStates[studentId]?.isOpen,
        isRotated: !prevItemStates[studentId]?.isRotated,
      },
    }));
  };

  return (
    <div>
      <main className="container mt-5 flex flex-col gap-2">
        {StudentData.length !== 0 ? (
          StudentData.filter((val) => {
            if (searchVal === "") {
              return val;
            } else if (
              val.firstname.toLowerCase().includes(searchVal.toLowerCase()) ||
              val.middleName.toLowerCase().includes(searchVal.toLowerCase()) ||
              val.lastname.toLowerCase().includes(searchVal.toLowerCase())
            ) {
              return val;
            }
          }).map((item) => {
            const day = item.TimeManegement.filter(
              (days) => days.attendanceStatus === 1
            );

            const totalHours = item.TimeManegement.reduce(
              (totalHours, day) =>
                day.attendanceStatus === 1
                  ? totalHours + day.totalTotal
                  : totalHours,
              0
            );

            return (
              day.length !== 0 && (
                <div
                  key={item.studentNo}
                  className={`${
                    itemStates[item.studentNo]?.isOpen
                      ? "bg-slate-50"
                      : "bg-white"
                  } overflow-hidden  shadow-lg shadow-slate-100 border border-gray-200  rounded-xl`}
                >
                  <div
                    onClick={() => handleItemClick(item.studentNo)}
                    className="w-full cursor-pointer"
                  >
                    {/* box list */}
                    <div className="relative h-full flex items-center justify-between py-4  border-b border-slate-200 px-5">
                      <div className="left-side flex gap-3">
                        <div className="h-12 rounded-full flex items-center justify-center bg-white border shadow-lg shadow-slate-200">
                          <img
                            src={profile}
                            alt=""
                            width={35}
                            className="rounded-full mx-[0.35rem]"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="font-semibold tracking-wide flex items-center gap-2">
                            <span>{item.firstname} </span>
                            <span>{item.middleName} </span>
                            <span>{item.lastname} </span>
                          </div>

                          <small className="text-gray-500 flex items-center">
                            {item.status === 1 ? "Online" : "Offline"}
                            <BsDot
                              size={30}
                              className={
                                item.status === 1
                                  ? "text-green-500"
                                  : "text-red-500"
                              }
                            />
                          </small>
                        </div>
                      </div>

                      <div className="absolute top-1/2 left-1/2 flex items-center">
                        <small className="text-orange-500 tracking-wide">
                          Pending request
                        </small>
                      </div>

                      <div className="right-side flex gap-4">
                        <div className="flex flex-col">
                          <span>{day.length} Days</span>
                          <div className="flex items items-center gap-2">
                            <span>{totalHours} </span>
                            Total hours
                          </div>
                        </div>
                        <MdOutlineKeyboardArrowDown
                          size={25}
                          className={`flex items-center duration-100 ${
                            itemStates[item.studentNo]?.isOpen && "rotate-180"
                          }`}
                        />
                      </div>
                    </div>
                    {/* box list end */}
                  </div>

                  <div
                    className={`max-h-0  overflow-hidden transition-all ${
                      itemStates[item.studentNo]?.isOpen && "max-h-screen"
                    }`}
                  >
                    <div className="py-7 px-5 flex flex-col gap-6">
                      <div className="item-header text-lg font-medium tracking-wide text-sky-500">
                        Attendance Request
                      </div>

                      <div className="flex items-center gap-2">
                        <FcCalendar size={25} />
                        <div className="flex items-center gap-2">
                          <span>{day[0].date}</span> -
                          <span>{day[day.length - 1].date}</span>
                        </div>
                      </div>
                      <div className="item-buttons flex items-center gap-3">
                        <button className="py-2 px-10 text-sm text-white bg-sky-500 rounded-full border-[2px] border-sky-500 hover:opacity-[0.9]">
                          Confirm All
                        </button>
                        <Link
                          to={`/Attendance-request/view`}
                          className="py-2 px-10 text-sm text-sky-500 rounded-full border-[2px] border-sky-500 hover:bg-sky-50"
                        >
                          Check
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            );
          })
        ) : (
          <div className="text-xl font-medium tracking-wider">No Request</div>
        )}
      </main>
    </div>
  );
};

export default AttendanceRequest;
