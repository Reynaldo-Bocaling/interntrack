import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SidebarData } from "./SidebarLinks";
import { NavLink } from "react-router-dom";

// icons/logo
import Logo from "../../assets/icons/logo.png";
import { IoIosArrowBack } from "react-icons/io";
import { BiChevronDown } from "react-icons/bi";
import { BsFillCircleFill } from "react-icons/bs";

const Sidebar = (props) => {
  const { toggleIsOpen, toggleSetIsOpen, role } = props;
  const [openSubmenus, setOpenSubmenus] = useState([]);
  const Menu = SidebarData[role] || [];

  // submenu toggle
  const handleSubmenuToggle = (index) => {
    setOpenSubmenus((prevOpenSubmenus) => {
      if (prevOpenSubmenus.includes(index)) {
        return prevOpenSubmenus.filter((item) => item !== index);
      } else {
        return [...prevOpenSubmenus, index];
      }
    });
  };

  return (
    <div>
      <div className="sidebar md:fixed z-50 top-0 left-0 bg-white shadow-xl shadow-gray-100 pt-5 w-[16rem] h-screen overflow-y-auto duration-500  hidden lg:flex lg:flex-col">
        

        {/* logo */}
        <div
          className='flex flex-col items-center gap-2 mx-2 pb-2'
        >
          <img src={Logo} alt="Logo icon" width={32} />
          <span
            className='font-semibold text-xl whitespace-pre'
          >
            InternTrack
          </span>
        </div>

        {/* Menu */}
        <div className=" py-5 px-3">
          <div className="flex flex-col gap-3 duration-700">
            {Menu.map((item, index) => (
              <div key={index}>
                {item.subMenu ? (
                  <div
                    onClick={() => {
                      handleSubmenuToggle(index);
                    }}
                    className='link cursor-pointer flex flex-col items-center p-3'
                  >
                    <div className="w-full flex items-center justify-between">
                      <div className="link gap-2 tracking-wide text-[#4c4b50]">
                        <item.icon
                          size={item.size && item.size}
                          className="bg-blue-50 text-blue-500 h-[32px] w-[32px] p-2 rounded-md"
                        />
                        {item.label}
                      </div>
                      <span>
                        {toggleIsOpen && item.subMenu && (
                          <BiChevronDown size={23} className="text-gray-400" />
                        )}
                      </span>
                    </div>
                    {toggleIsOpen &&
                      item.subMenu &&
                      openSubmenus.includes(index) && (
                        <div className="w-full flex flex-col gap-1 rounded-lg duration-1000 ">
                          {item.subMenu.map((subItem, subIndex) => (
                            <NavLink
                              className="link p-3"
                              to={subItem.url}
                              key={subIndex}
                            >
                              <span className="flex  items-center gap-2 text-[#4c4b50]">
                                <BsFillCircleFill
                                  size={7}
                                  className="text-blue-500"
                                />
                                {subItem.label}
                              </span>
                            </NavLink>
                          ))}
                        </div>
                      )}
                  </div>
                ) : (
                  <div className={`SidebarLink cursor-pointer`}>
                    {item.extraText && (
                      <div
                        className={`flex ${
                          !toggleIsOpen ? "justify-center" : "ml-1"
                        } mb-3 `}
                      >
                        <span
                          className={`text-[0.670rem] text-gray-400 tracking-wide`}
                        >
                          {item.extraText}
                        </span>
                      </div>
                    )}

                    <NavLink
                      to={item.url}
                      className={`${
                        !toggleIsOpen ? "0" : "p-3"
                      } link  text-base tracking-wide text-slate-400-100 text-[#686475]`}
                    >
                      <item.icon
                        size={item.size ? item.size : ""}
                        className="bg-blue-50 text-blue-500 h-[32px] w-[32px] p-2 rounded-md"
                      />
                      {toggleIsOpen ? item.label : ""}
                    </NavLink>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
