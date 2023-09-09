

import React from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import {InfoIcons, RequirementIcons,TaskIcons, ClockIcons } from "../ReactIcon/React-Icons";
import { MdKeyboardArrowLeft,MdOutlineFormatListNumbered } from "react-icons/md";
import { BsChatDots, BsFillTrash3Fill } from "react-icons/bs";
import pic from "../../assets/images/dp.png";

const index = () => {
    const link = [
        {label: 'Info', url: '/student/', icon: InfoIcons},
        {label: 'Requirements', url: '/student/requirement', icon: RequirementIcons},
        {label: 'Task', url: '/student/task', icon: TaskIcons},
        {label: 'Timesheets', url: '/student/timesheet', icon: ClockIcons}
    ]
  return (
    <div className="rounded-xl overflow-hidden -mt-3 -ml-2">
      <div className="cover"></div>

      <div className=" relative top flex items-center gap-3 border-b bg-white">
        <div className=" ml-7 -mt-52 bg-white w-52 h-44 p-5 border-white right rounded-full shadow-md overflow-hidden">
          <img
            className=" w-44 h-44 object-cover object-center mb-2 rounded-lg"
            src={pic}
            alt={"profile picture"}
          />
        </div>

        <div className="left p-5 pl-5 w-full py-5">
          <div className="flex flex-col gap-5">
            <div className="name ">
              <h1 className="text-2xl font-semibold tracking-wide">
                Reynaldo Bocaling
              </h1>
              <small className="text-blue-500 font-semibold tracking-wider">
                Trainee
              </small>
            </div>

            <div className="flex items-center gap-5 mb-3 font-semibold">
              <NavLink className="flex items-center gap-1 text-blue-500 text-sm bg-blue-100 py-2 px-4 rounded-md">
                <BsChatDots />
                Send message
              </NavLink>
              <NavLink className="flex items-center gap-1 text-red-500 text-sm bg-red-100 py-2 px-4 rounded-md">
                <BsFillTrash3Fill />
                Drop
              </NavLink>
            </div>
          </div>

          <div className="flex items-center gap-7 mt-4">
            {link.map((link, index) => (
              <NavLink key={index} to={link.url} className="StudentBtn">
                <link.icon />
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
          {/* back button */}
          <Link 
          to="/student-list/"
          className="absolute bottom-[10px] -left-4 font-semibold tracking-wide text-blue-500 rounded-full px-7 py-2 flex items-center"
        >
          <MdKeyboardArrowLeft size={20} />
          Back
        </Link>
      </div>
      <div className="pt-5 bg-slate-50">
        <Outlet  />
      </div>
    </div>
  );
}

export default index;
