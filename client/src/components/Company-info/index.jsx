

import React from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import {InfoIcons, RequirementIcons,TaskIcons, ClockIcons } from "../ReactIcon/React-Icons";
import {FiUsers} from 'react-icons/fi'
import { MdKeyboardArrowLeft,MdOutlineFormatListNumbered } from "react-icons/md";


const index = ({data}) => {

    const link = [
        {label: 'Info', url: '/company/', icon: InfoIcons, state:data},
        {label: 'MOA', url: '/company/moa', icon: RequirementIcons, state:data},
        {label: 'Student', url: '/company/students', icon: FiUsers, state:data},
        {label: 'Available', url: '/company/slots', icon: MdOutlineFormatListNumbered, state:data},
    ]
 
  return (
    <div className="rounded-xl overflow-hidden -mt-3 -ml-2">
      <div className="company-cover"></div>

      <div className="relative top flex items-center gap-3 border-b bg-white">
        <div className=" ml-7 -mt-52 bg-white w-52 h-44 p-5 border-white right rounded-full shadow-md overflow-hidden">
          <img
            className=" w-44 h-44 object-cover object-center mb-2 rounded-lg"
            src={data.profilePicture}
            alt={"profile picture"}
          />
        </div>

        <div className="left p-5 pl-5 w-full py-5">
          <div className="flex flex-col gap-5">
            <div className="mb-5">
              <h1 className="text-2xl font-bold tracking-wide">
                {data.companyName}
              </h1>
              <small className="text-blue-500 font-semibold tracking-wider">
                Company Name
              </small>
            </div>

           
          </div>

          <div className="flex items-center gap-7 mt-4">
            {link.map((link, index) => (
              <NavLink to={link.url}  state={link.state} key={index}   className="StudentBtn" >
                <link.icon />
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
        

        {/* back button */}
        <Link 
          to="/companies"
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
