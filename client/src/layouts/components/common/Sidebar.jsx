import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SidebarData } from "./SidebarLinks";
import { NavLink } from "react-router-dom";

// icons/logo
import Logo from "../../../assets/icons/logo.png";
import { IoIosArrowBack } from "react-icons/io";
import { BiChevronDown } from "react-icons/bi";

function Sidebar() {
  const [Role, setRole] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [openSubmenus, setOpenSubmenus] = useState([]);
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

  // sidebar animate
  const sidebar_animation = {
    open: {
      width: "16rem",
      transition: {
        damping: 40,
      },
    },
    closed: {
      width: "4rem",
      transition: {
        damping: 40,
      },
    },
  };

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
      <motion.div
        variants={sidebar_animation}
        animate={isOpen ? "open" : "closed"}
        className="sidebar fixed z-20 top-0 left-0 bg-white shadow-xl shadow-gray-100 pt-5 w-[16rem] h-screen overflow-y-auto"
      >
        <motion.div
          animate={
            isOpen
              ? {
                  y: 0,
                  x: 0,
                  rotate: 0,
                }
              : {
                  rotate: 180,
                }
          }
          transition={{
            duration: 0,
          }}
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-7 -right-4 h-7 w-7 text-white rounded-full flex items-center justify-center bg-blue-600 border-2 border-gray-100 cursor-pointer "
        >
          <IoIosArrowBack size={16} />
        </motion.div>

        {/* logo */}
        <div
          className={`${
            !isOpen && "border-b border-slate-300 mt-5"
          } flex flex-col items-center gap-2 mx-2 pb-2`}
        >
          <img src={Logo} alt="Logo icon" width={32} />
          <span
            className={`${
              !isOpen && "hidden"
            } font-semibold text-lg whitespace-pre`}
          >
            InternTrack
          </span>
        </div>

        {/* Menu */}
        <div className=" mt-6 py-5 px-3">
          <div className="flex flex-col gap-3">
            {Menu.map((item, index) => (
              <item.tag
                to={item.url}
                key={index}
                onClick={() => handleSubmenuToggle(index)}
                className={`link cursor-pointer ${item.space && `mt-10`}`}
              >
                <span
                  className={`${
                    item.space? '-top-5' : ''} text-[0.670rem] font-medium absolute -top-6 text-gray-400`} >
                  {item.extraText && item.extraText}
                </span>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm tracking-wide text-slate-400-100">
                    <item.icon size={item.size ? item.size : ""} />
                    {item.label}
                  </div>
                  <span>
                    {item.subMenu && (
                      <BiChevronDown size={23} className="text-gray-400" />
                    )}
                  </span>
                </div>
                {item.subMenu && openSubmenus.includes(index) && (
                  <div className="flex flex-col gap-2  mt-2 py-1 px-4 rounded-lg duration-500">
                    {item.subMenu.map((subItem, subIndex) => (
                      <NavLink
                        className="link hover:bg-gray-200 px-2"
                        to={subItem.url}
                        key={subIndex}
                      >
                        {subItem.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </item.tag>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Sidebar;
