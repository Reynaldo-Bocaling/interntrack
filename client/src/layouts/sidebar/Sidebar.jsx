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
        {/* icon left */}
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
          className="absolute top-7 -right-4 h-8 w-8 rounded-full flex items-center justify-center bg-gray-50 border-2 border-gray-100 cursor-pointer"
        >
          <IoIosArrowBack size={20} />
        </motion.div>

        {/* logo */}
        <div
          className={`${
            !isOpen && "border-b border-slate-300 mt-5"
          } flex flex-col items-center gap-2 mx-2 pb-2`}
        >
          <img src={Logo} alt="Logo icon" width={40} />
          <span
            className={`${
              !isOpen && "hidden"
            } font-semibold text-xl whitespace-pre`}
          >
            InternTrack
          </span>
        </div>

        <div className="flex flex-col">
          <ul className=" flex flex-col gap-3 font-medium overflow-x-hidden px-2 py-5">
            {Menu?.map((link) => (
              <li key={link.label}>
                <NavLink className="link" to={link.url}>
                  <img src={link.img} alt="Logo" className="w-8" />
                  <span className="text-base">{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* submemenu */}
          {/* <div>
            <div className="border-y py-5 border-slate-300">
              <small className="pl-3 text-slate-500 inline-block mb-2">
                - Messages
              </small>
            </div>
          </div> */}
          <Link className="flex items-center gap-3 pl-5 py-5 text-gray-500 bg-gray-100">
            <BiLogOutCircle size={20} />
            <span className="text-lg font-medium">logout</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Sidebar;
