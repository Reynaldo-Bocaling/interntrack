import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { RxArchive, RxDashboard, RxCalendar } from "react-icons/rx";
import { MdOutlineEditCalendar, MdOutlineSecurity,MdOutlineSettings,MdOutlinePowerSettingsNew   } from "react-icons/md";
import { Tooltip } from "@nextui-org/react";
import { IoIosAdd } from "react-icons/io";
import { LiaTimesSolid } from "react-icons/lia";
import { motion } from "framer-motion";
import{useNavigate} from 'react-router-dom'
import { useMutation} from "@tanstack/react-query";
import Swal from "sweetalert2";
import { logout } from "../../api/Api";

// test pic 

function StudentNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  // logout
  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await Swal.fire({
        icon: 'success',
        title: 'Logout Successful!',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/');
      window.location.reload();
    },
    onError: async () => {
      await Swal.fire({
        icon: 'error',
        title: 'Logout failed!',
        showConfirmButton: false,
        timer: 1500,
      });
      
    },
  });
  


  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#49A6F3",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate();
      }
    });
  };




  const userLink = [
    {
      label: "Home",
      url: "/",
      icon: <RxDashboard size={22} />,
    },
    {
      label: "Attendance",
      url: "/attendance",
      icon: <MdOutlineEditCalendar size={23} />,
    },
    {
      centerBtn: true,
      openIcon: <IoIosAdd size={25} />,
      closeIcon: <LiaTimesSolid size={20} />,
    },
    {
      label: "Records",
      url: "/record",
      icon: <RxArchive size={22} />,
    },
    {
      label: "Records",
      url: "/profile",
      icon: <FiUser size={22} />,
    },
  ];

  const mainBtns = [
    {
      label: 'Logout',
      icon: <MdOutlinePowerSettingsNew size={20} className=" text-[#ff7547]"/>,
      position: 'top-5 left-1/2 -translate-x-1/2',
      handleClick:()=>{
        handleLogout()
        setIsOpen(false)
      } 

    },
    {
      label: 'Settings',
      icon: <MdOutlineSettings size={20} className=" text-[#ff7547]"/>,
      position: 'top-16 left-8',
      handleClick:()=>{
        setIsOpen(false)
      } 
    },
    {
      label: 'Security',
      icon: <MdOutlineSecurity size={20} className=" text-[#ff7547]"/>,
      position: 'top-16 right-8',
      handleClick:()=>{
        setIsOpen(false)
      } 

    },
  ];



  return (
    <div>
      <div className="studentNav fixed bottom-0 left-0 w-full  items-center justify-between bg-white  z-50 px-8 flex text-slate-500 pt-5 pb-6 ">
        {userLink.map((_, i) => {
          return (
            <div key={i}>
              {_.centerBtn ? (
                <div className=" relative">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative z-50 bg-[#ff7547] p-3 rounded-full text-white"
                  >
                    {isOpen ? _.closeIcon : _.openIcon}
                  </button>

                  {isOpen && (
                    <motion.div
                    initial={{ scale: 0, x: '-50%', y: '0%' }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className=" absolute -bottom-20 left-1/2 -translate-x-1/2 h-[250px] w-[250px] bg-[#fa6534] rounded-full ">
                      <div className="relative h-full w-full bg-red-5002">
                        {
                          mainBtns.map(({label, icon, position, handleClick}, index) => (
                            <Tooltip  key={index} content={label} placement="bottom">
                            <button  onClick={handleClick} className={`absolute ${position}  bg-white rounded-full p-3 cursor-pointer hover:bg-[#f7f4f1]`}>
                              
                              {icon}
                             
                         
                          </button>
                           </Tooltip>
                          ))
                        }
                       
                       
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <NavLink
                  to={_.url}
                  onClick={() => setIsOpen(false)}
                  className="  student-link flex items-center justify-center flex-col gap-1 pb-2"
                >
                  {_.icon}
                </NavLink>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StudentNavigation;
