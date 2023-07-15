import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SidebarData } from "../../utils/SidebarLinks";
import { NavLink, Link } from "react-router-dom";

// icons/logo
import Logo from "../../assets/icons/logo.png";
import { IoIosArrowBack } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";

function Sidebar() {
  const [Role, setRole] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [dropdown, setDropdown] = useState(false);
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

  // sidebar animate
  const sidebar_animation = {
    open: {
      width: "17rem",
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

  return (
    <div>
      <motion.div
        variants={sidebar_animation}
        animate={isOpen ? "open" : "closed"}
        className="bg-white shadow-xl text-gray pt-5 z-indez[998] h-screen md:relative fixed"
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
          className="absolute top-7 -right-4 h-7 w-7 rounded-full flex items-center justify-center bg-gray-50 border-2 border-gray-100 cursor-pointer"
        >
          <IoIosArrowBack size={18} />
        </motion.div>


        {/* logo */}
        <div
          className={`${
            !isOpen && "border-b border-slate-300 mt-5"} flex flex-col items-center gap-2 mx-2 pb-2`} >
          <img src={Logo} alt="Logo icon" width={32} />
          <span className={`${!isOpen && "hidden" } font-semibold text-lg whitespace-pre`} >
            InternTrack
          </span>
        </div>


        {/* Menu */}
        <div className="flex flex-col">
          <ul className=" flex flex-col gap-3 font-medium py-6 px-4">
            {Menu?.map((link) => (
              <li key={link.label}>
                <NavLink className={`link `} to={link.url}>
                 {<link.icon size={18} />}
                  <span  className={`${!isOpen && "hidden"}  tracking-wide`}>{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

export default Sidebar;
