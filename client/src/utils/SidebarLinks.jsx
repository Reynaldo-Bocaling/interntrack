import {MdOutlineDashboard} from 'react-icons/md'
import {FaRegUser} from 'react-icons/fa'
import {PiUsersThree, PiStudentBold} from 'react-icons/pi'
import {AiOutlineMessage} from 'react-icons/ai'
import {MdOutlineAnnouncement} from 'react-icons/md'
import {TbFileDatabase} from 'react-icons/tb'
import {LuFileSpreadsheet} from 'react-icons/lu'
import {FiSettings} from 'react-icons/fi'


  export const SidebarData = {
    student: [
      { label: "Dashboard", url: "/",  icon: MdOutlineDashboard },
      { label: "My profile", url: "/MyProfile", icon: FaRegUser},
      { label: "Attendance", url: "/attendance", icon: PiUsersThree },
      { label: "Time Sheet", url: "/timeSheet", icon: LuFileSpreadsheet },
      { label: "Message", url: "/message", icon: AiOutlineMessage},
      { label: "Announcement", url: "/announcement", icon: MdOutlineAnnouncement },
    ],
    teacher: [
      { label: "Dashboard", url: "/",  icon: MdOutlineDashboard },
      { label: "My profile", url: "/Profile/", icon: FaRegUser },
      { label: "Trainee", url: "/trainee", icon: PiStudentBold},
      { label: "Attendance", url: "/attendance",  icon: PiUsersThree},
      { label: "Records", url: "/record", icon: TbFileDatabase},
      { label: "Message", url: "/message", icon: AiOutlineMessage},
      { label: "Announcement", url: "/announcement", icon: MdOutlineAnnouncement},
      { label: "Settings", url: "/settings", icon: FiSettings},
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