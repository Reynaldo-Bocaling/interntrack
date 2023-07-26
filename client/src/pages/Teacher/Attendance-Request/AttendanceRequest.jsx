import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import profile from "../../../assets/images/dp.png";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Student } from "../services/StudentList";
import { FcCalendar } from "react-icons/fc";
import { BsDot } from "react-icons/bs";
import { Link } from "react-router-dom";

function AttendanceRequest() {
  const [itemStates, setItemStates] = useState({});
  const [Data, setData] = useState([]);

  const handleItemClick = (index) => {
    setItemStates((prevItemStates) => ({
      ...prevItemStates,
      [index]: {
        isOpen: !prevItemStates[index]?.isOpen,
        isRotated: !prevItemStates[index]?.isRotated,
      },
    }));
  };

  useEffect(() => {
    const getStudentRequest = async () => {
      setData(Student);
    };
    getStudentRequest();
  }, []);


  
  return (
    <div>
     

      <main className="container mt-5 flex flex-col gap-2">
        {/* Item 1 */}

        {Data &&
          Data.map((item, index) => (
            <div
              key={index}
              className={`${
                itemStates[index]?.isOpen ? "bg-slate-50" : "bg-white"
              } overflow-hidden  shadow-lg shadow-slate-100 border border-gray-200  rounded-xl`}
            >
              <div
                onClick={() => handleItemClick(index)}
                className="w-full cursor-pointer "
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
                      <span className="font-semibold tracking-wide">
                        {item.name}
                      </span>
                      <small className="text-gray-500 flex items-center">
                        {item.status}
                        <BsDot size={30} className={item.status ==='Online'? 'text-green-500': 'text-red-500'}/>
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
                      <span>{item.day} Days</span>
                      <small>{item.hours} Hours</small>
                    </div>
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: itemStates[index]?.isOpen ? 180 : 0 }}
                      className="flex items-center duration-100"
                    >
                      <MdOutlineKeyboardArrowDown size={25} />
                    </motion.div>
                  </div>
                </div>
                {/* box list end */}
              </div>

              <div
                className={`max-h-0  overflow-hidden transition-all ${
                  itemStates[index]?.isOpen && "max-h-screen"
                }`}
              >
                <div className="py-7 px-5 flex flex-col gap-6">
                  {/* Content for Item 1 */}
                  <div className="item-header text-lg font-medium tracking-wide text-sky-500">
                    Attendance Request
                  </div>

                  <div className="flex items-center gap-2">
                    <FcCalendar size={25} />
                    <span>January 02 - January 17</span>
                  </div>
                  <div className="item-buttons flex items-center gap-3">
                    <button className="py-2 px-10 text-sm text-white bg-sky-500 rounded-full border-[2px] border-sky-500 hover:opacity-[0.9]">
                      Confirm All
                    </button>
                    <Link to="/Attendance-request/view" className="py-2 px-10 text-sm text-sky-500 rounded-full border-[2px] border-sky-500 hover:bg-sky-50">
                      Check
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </main>
    </div>
  );
}

export default AttendanceRequest;
