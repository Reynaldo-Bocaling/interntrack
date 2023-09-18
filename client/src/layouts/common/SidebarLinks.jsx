import {MdOutlineDashboard} from 'react-icons/md'
import {FaRegUser} from 'react-icons/fa'
import {PiUsersThree, PiStudentBold} from 'react-icons/pi'
import {AiOutlineMessage} from 'react-icons/ai'
import {MdOutlineAnnouncement} from 'react-icons/md'
import {TbUserSearch, TbCalendarCancel} from 'react-icons/tb'
import {LuFileSpreadsheet} from 'react-icons/lu'
import {FiUsers} from 'react-icons/fi'
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
          { label: "Daily Log", url: "/daily-log"},
          { label: "Attendance request", url: "/Attendance-request" },
        ],
      },
      { label: "My Records",  
        icon: TbUserSearch, 
        size: 20,
        subMenu: [
          { label: "Weekly Reports", url: "/weekly-time-reports" },
          { label: "Timesheets", url: "/weekly-time-reports" },
          { label: "Activities", url: "/Upload-task" },
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


    coordinator: [
      { label: "Dashboard", 
        url: "/", 
        icon: RxDashboard,
        size: 16,
        extraText: "HOME"
      },
      { label: "Companies", 
      url: "/companies",  
      icon: FiUsers,
      size: 16,
    },
      { label: "Teacher", 
        url: "/Teacher-list",  
       icon: FiUsers,
        size: 16,
      }, 

      { label: "Trainer", 
        url: "/Trainer-list",  
       icon: FiUsers,
        size: 16,
      }, 

      { label: "Student", 
        url: "/Student-list",  
       icon: TbUserSearch,
        size: 16,
      }, 
      
      { label: "Messages", 
        url:  "/message",  
        icon: AiOutlineMessage,
        size: 17,
        space: true,
        extraText: "MESSAGES",
      },
      { label: "Announcements", 
        url: "/announcement",    
        icon: CgFileDocument,
        size: 17
    }
        
    ],


    teacher: [
      { label: "Dashboard", 
        url: "/", 
        icon: RxDashboard,
        size: 16,
        extraText: "HOME"
      },
      { label: "Companies", 
        url: "/companies",  
        icon: FiUsers,
        size: 16,
      },
      { label: "Trainer", 
        url: "/Trainer-list",  
        icon: FiUsers,
        size: 16,
      },
      
      { label: "My student",  
      icon: TbUserSearch, 
        size: 18,
        subMenu: [
          { label: "Daily logs", url: "/daily-logs"},
          { label: "Student list", url: "/student-list" },
          { label: "Timesheet", url: "/timeSheet" },
          { label: "Task uploads", url: "/StudentTask" },
        ],
      },
      { 
        label: "Leave", 
        url: "/leave-request",
        icon: TbCalendarCancel, 
        dropIcon:BiChevronDown,
        size: 18,
      },
      { label: "Messages", 
        url:  "/message",  
        icon: AiOutlineMessage,
        size: 17,
        space: true,
        extraText: "MESSAGES",
      },
      { label: "Announcements", 
        url: "/announcement",    
        icon: CgFileDocument,
        size: 17
    }
        
    ],


    SuperAdmin: [
      { label: "Dashboard", 
        url: "/", 
        icon: RxDashboard,
        size: 16,
        extraText: "HOME"
      },
      { label: "Companies", 
        url: "/Companies",  
        icon: FiUsers,
        size: 16,
      },
      { label: "Users",   
      icon: RxCalendar, 
        size: 16,
        subMenu: [
          { label: "Coordinator", url: "/Coordinator-list"},
          { label: "Trainer", url: "/Trainer-list" },
          { label: "Students", url: "/Student-list" },
          { label: "Teacher", url: "/Teacher-list" },
        ],
      },
      { label: "Messages", 
        url:  "/message",  
        icon: AiOutlineMessage,
        size: 17,
        space: true,
        extraText: "MESSAGES",
      },
      { label: "Announcements", 
        url: "/announcement",    
        icon: CgFileDocument,
        size: 17
    },
  
        
    ],

    director: [
      { label: "Dashboard", 
        url: "/", 
        icon: RxDashboard,
        size: 16,
        extraText: "HOME"
      },
      { label: "Company", 
        url: "/Companies",  
        icon: FiUsers,
        size: 16,
      },
      { label: "Trainer list", 
        url: "/trainer-list/",  
        icon: FiUsers,
        size: 16,
      },
      { label: "Student list", 
        url: "/student-list/",  
        icon: FiUsers,
        size: 16,
      },
     
      { 
        label: "MOA", 
        url: "/moa",
        icon: TbCalendarCancel, 
        dropIcon:BiChevronDown,
        size: 18,
      },
      { label: "Messages", 
        url:  "/message",  
        icon: AiOutlineMessage,
        size: 17,
        space: true,
        extraText: "MESSAGES",
      },
      { label: "Announcements", 
        url: "/announcement",    
        icon: CgFileDocument,
        size: 17
    }
        
    ],


    trainer: [
      { label: "Dashboard", 
        url: "/", 
        icon: RxDashboard,
        size: 16,
        extraText: "HOME"
      },
      { label: "Attendance",   
      icon: RxCalendar, 
        size: 16,
        subMenu: [
          { label: "Daily logs", url: "/daily-logs"},
          { label: "Attendance request", url: "/Attendance-request" },
        ],
      },
      { label: "My student",  
      icon: TbUserSearch, 
        size: 18,
        subMenu: [
          { label: "Student list", url: "/student-list" },
          { label: "Timesheet", url: "/timeSheet" },
          { label: "Task uploads", url: "/StudentTask" },
        ],
      },
      { 
        label: "Leave", 
        url: "/leave-request",
        icon: TbCalendarCancel, 
        dropIcon:BiChevronDown,
        size: 18,
      },
      { label: "Messages", 
        url:  "/message",  
        icon: AiOutlineMessage,
        size: 17,
        space: true,
        extraText: "MESSAGES",
      },
      { label: "Announcements", 
        url: "/announcement",    
        icon: CgFileDocument,
        size: 17
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















  