import React, { useEffect, useState } from "react";
import { SidebarData } from "./SidebarLinks";
import Dp from "../../assets/images/dp.png";
import { MdNotificationsNone } from "react-icons/md";
import { NavLink } from "react-router-dom";

import { BiSearch } from "react-icons/bi";
function Header({toggleIsOpen}) {
  const [Role, setRole] = useState([]);
  const Menu = SidebarData[Role] || [];

  useEffect(() => {
    const getUserRole = async () => {
      try {
        setRole("teacher"); /*test*/
      } catch (error) {
        console.log(error);
      }
    };
    getUserRole();
  }, []);

  return (
    <div className={`${toggleIsOpen? 'pl-[16rem]': 'pl-[4rem]'} fixed top-0 left-0 h-[60px] w-full duration-300 z-10 bg-white shadow-sm shadow-slate-100`}>
      <div className="p-3 pt-3  flex items-center justify-between px-7 w-full">
        <div className="text-[1.1rem] font-normal">
          Welcome back, <span className="font-semibold">Admin</span>
        </div>

        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center gap-2 bg-white border rounded-full text-sm shadow-sm px-3">
            <div className="text-blue-500">
              <BiSearch size={18} />
            </div>
            <input
              type="text"
              className="mt-1 block w-48 text-xs py-[6px] outline-none placeholder-slate-400"
              placeholder="Search.."
            />
          </div>
          <div className="flex items-center gap-4 cursor-pointer">
            <MdNotificationsNone size={20} className="text-blue-500" />
          </div>
          <div className="h-fit w-fit rounded-full bg-white shadow-lg p-2 cursor-pointer">
            <img src={Dp} alt="" width={18} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
