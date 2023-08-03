import {MdOutlineDashboard} from 'react-icons/md'
import {FaRegUser} from 'react-icons/fa'
import {PiUsersThree, PiStudentBold} from 'react-icons/pi'
import {AiOutlineMessage} from 'react-icons/ai'
import {MdOutlineAnnouncement} from 'react-icons/md'
import {TbUserSearch, TbCalendarCancel} from 'react-icons/tb'
import {LuFileSpreadsheet} from 'react-icons/lu'
import {FiSettings} from 'react-icons/fi'
import { NavLink } from "react-router-dom";
import {BiChevronDown, BiCalendarExclamation} from 'react-icons/bi'
import {BsCalendarCheck} from 'react-icons/bs'
import {RxDashboard, RxCalendar} from 'react-icons/rx'
import {CgFileDocument} from 'react-icons/cg'


  export const SidebarData = {
    student: [
      { label: "Dashboard", 
        url: "/", 
        icon: RxDashboard,
        size: 18,
        extraText: "HOME"
      },
      { label: "Attendance",   
        icon: RxCalendar, 
        size: 18,
        subMenu: [
          { label: "Daily logs", url: "/daily-logs"},
          { label: "Attendance request", url: "/Attendance-request" },
          { label: "Summary", url: "/attendance-summary" },
        ],
      },
      { label: "My Records",  
        icon: TbUserSearch, 
        size: 20,
        subMenu: [
          { label: "Trainee list", url: "/student-list" },
          { label: "Timesheet", url: "/timeSheet" },
          { label: "Task uploads", url: "/irregular" },
        ],
      },
      { 
        label: "Leave", 
        url: "/leave-request",
        icon: TbCalendarCancel, 
        dropIcon:BiChevronDown,
        size: 20,
      },
      { label: "Messages", 
        url:  "/message",  
        icon: AiOutlineMessage,
        size: 19,
        space: true,
        extraText: "MESSAGES",
      },
      { label: "Announcements", 
        url: "/announcement",    
        icon: CgFileDocument,
        size:19
      },
        
    ],


    teacher: [
      { label: "Dashboard", 
        url: "/", 
        icon: RxDashboard,
        size: 18,
        extraText: "HOME"
      },
      { label: "Attendance",   
      icon: RxCalendar, 
        size: 18,
        subMenu: [
          { label: "Daily logs", url: "/daily-logs"},
          { label: "Attendance request", url: "/Attendance-request" },
        ],
      },
      { label: "My trainee",  
      icon: TbUserSearch, 
        size: 20,
        subMenu: [
          { label: "Trainee list", url: "/student-list" },
          { label: "Timesheet", url: "/timeSheet" },
          { label: "Task uploads", url: "/task-upload" },
        ],
      },
      { 
        label: "Leave", 
        url: "/leave-request",
        icon: TbCalendarCancel, 
        dropIcon:BiChevronDown,
        size: 20,
      },
      { label: "Messages", 
        url:  "/message",  
        icon: AiOutlineMessage,
        size: 19,
        space: true,
        extraText: "MESSAGES",
      },
      { label: "Announcements", 
        url: "/announcement",    
        icon: CgFileDocument,
        size: 19
    }
        
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















  