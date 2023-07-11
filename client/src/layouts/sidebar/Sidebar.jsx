import React, { useEffect, useState } from "react";
import Logo from "../../assets/icons/logo.png";
import leftBtn from "../../assets/icons/left-right.png";
import { SidebarData } from "../../utils/SidebarLinks";
import { Link } from "react-router-dom";

import Dash from '../../assets/icons/dashboard.png'

function Sidebar() {
  const [Role, setRole] = useState([]);
  const [open, setOpen] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const Menu = SidebarData[Role] || [];

  useEffect(() => {
    const getUserRole = async () => {
      try {
        setRole("teacher");
      } catch (error) {
        console.log(error);
      }
    };
    getUserRole();
  }, []);


  return (
    <div
      className={`${
        open ? "w-72" : "20"
      } duration-300 h-screen bg-white p-7 relative`}
    >
      {/* button reight left */}
      <div className="absolute top-4 -right-4  h-9 w-9  bg-white rounded-full flex items-center justify-center border-4 border-gray-100">
        <img
          src={leftBtn}
          className={`w-5 h-5 inline-flex cursor-pointer ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
      </div>






      {/* Logo */}
      <div className="logo flex flex-col items-center">
        <img src={Logo} alt="logo" className="h-10 w-10" />
        <h2 className="text-xl font-bold tracking-wide origin-left">InternTrack </h2>
      </div>

      {/* link */}

      <div className="flex items-start flex-col gap-y-5 mt-10">
        {Menu?.map((menu) => (
          <Link key={menu.label} to={menu.url} className="flex items-center gap-x-3 text-lg text-gray-500 py-2 px-3 tracking-wide hover:bg-gray-100 w-full rounded-xl">
              <img className="w-8" src={Dash} />
              <span>{menu.label} </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
