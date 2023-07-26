import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";

function index() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div>
       <div className=" flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-wider text-gray-700">
          Attendance Request
        </h1>

        <div className="relative flex items-center gap-5">
          <div>
            <AiOutlineQuestionCircle
              size={17}
              className={`${isOpenModal ? 'text-blue-500': 'text-gray-500'} transition-all hover:text-gray-400`}
              onClick={()=> setIsOpenModal(!isOpenModal)}
            />
            {isOpenModal ? (
              <div className="absolute top-[120%] right-28 w-[500px]  z-50 bg-white shadow-xl shadow-slate-200 border px-5 py-7 rounded-xl">
                <h1 className="text-xl font-semibold tracking-wide mb-2 pb-2 border-b">
                  Confirming Attendance Guidelines!
                </h1>
                <span className=" text-sm text-gray-600 tracking-wider leading-7">
                  Welcome to the OJT System Attendance Request. Here, you can
                  request attendance for your On-the-Job Training sessions.
                  Simply click on the relevant OJT session below to expand and
                  view the details. If you are ready to confirm your attendance
                  for all sessions, you can use the 'Confirm All' button.
                  Alternatively, you can use the 'Check' button to verify your
                  attendance for individual sessions. If you have any questions
                  or concerns, please feel free to reach out to the OJT
                  coordinator.
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex items-center gap-2 px-3 bg-white border rounded-full text-sm">
            <div className="text-blue-500">
              <BiSearch size={18} />
            </div>
            <input
              type="text"
              className="mt-1 block w-52 text-xs py-[8px] outline-none placeholder-slate-400"
              placeholder="Search.."
            />
          </div>
        </div>
      </div>


      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default index
