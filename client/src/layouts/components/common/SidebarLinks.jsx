import {MdOutlineDashboard} from 'react-icons/md'
import {FaRegUser} from 'react-icons/fa'
import {PiUsersThree, PiStudentBold} from 'react-icons/pi'
import {AiOutlineMessage} from 'react-icons/ai'
import {MdOutlineAnnouncement} from 'react-icons/md'
import {TbFileDatabase} from 'react-icons/tb'
import {LuFileSpreadsheet} from 'react-icons/lu'
import {FiSettings} from 'react-icons/fi'
import { NavLink } from "react-router-dom";
import {BiChevronDown, BiCalendarExclamation} from 'react-icons/bi'
import {BsCalendarCheck} from 'react-icons/bs'

  export const SidebarData = {
    student: [
      { label: "Dashboard", url: "/",  icon: "MdOutlineDashboard" },
      { label: "My profile", url: "/MyProfile", icon: FaRegUser},
      { label: "Attendance", url: "/attendance", icon: PiUsersThree },
      { label: "Time Sheet", url: "/timeSheet", icon: LuFileSpreadsheet },
      { label: "Message", url: "/message", icon: AiOutlineMessage},
      { label: "Announcement", url: "/announcement", icon: MdOutlineAnnouncement },
    ],

    teacher: [
      { label: "Dashboard", 
        url: "/", 
        icon: MdOutlineDashboard,
        tag: NavLink,
        size: 19,
        extraText: "HOME"
      },
      { label: "Attendance",   
        icon: BsCalendarCheck, 
        tag: "div",
        size: 16,
        subMenu: [
          { label: "Daily logs", url: "/Attendance"},
          { label: "Attendance request", url: "/Attendance-request" },
        ],
      },
      { label: "My trainee",  
        icon: PiUsersThree, 
        tag: "div",
        size: 21,
        subMenu: [
          { label: "Trainee list", url: "/student-list" },
          { label: "Timesheet", url: "/timeSheet" },
          { label: "Task uploads", url: "/irregular" },
        ],
      },
      { 
        label: "Leave", 
        icon: BiCalendarExclamation, 
        dropIcon:BiChevronDown,
        tag: "div",
        size: 21,
        subMenu: [
          { label: "Leave request", url: "/regular" },
          { label: "Failed request", url: "/irregular" },
        ],
      },
      { label: "Messages", 
        url:  "/message",  
        icon: AiOutlineMessage,
        tag: NavLink,
        size: 18,
        space: true,
        extraText: "MESSAGES",
      },
      { label: "Announcements", 
        url: "/announcement",    
        icon: MdOutlineAnnouncement,
        tag: NavLink,
      },
        
    ],

    admin: [
      { label: "Dashboard", url: "/", icon: MdOutlineDashboard},
      { label: "Records", url: "/records" },
      { label: "Request", url: "/request"},
      { label: "Message", url: "/message", AiOutlineMessage},
      { label: "Announcement", url: "/announcement", MdOutlineAnnouncement},
      { label: "Report", url: "/report"},
      { label: "announcement", url: "/announcement"},
      { label: "settings", url: "/settings"},
    ],
  };
  



  export const landingPageLinks = {
    
  }















  