import Logo from '../assets/icons/dashboard.png'
import Profile from '../assets/icons/profile.png'
import MyStudent from '../assets/icons/student.png'
import Attendance from '../assets/icons/attendance.png'
import Record from '../assets/icons/record.png'
import Message from '../assets/icons/message.png'
import Announcement from '../assets/icons/announcement.png'
import Settings from '../assets/icons/settings.png'


  export const SidebarData = {
    student: [
      { label: "Dashboard", url: "/",  img: Logo },
      { label: "My profile", url: "/MyProfile", img: Profile},
      { label: "Attendance", url: "/attendance", img: Attendance },
      { label: "Time Sheet", url: "/timeSheet" },
      { label: "Message", url: "/message", img: Message},
      { label: "Announcement", url: "/announcement", img: Announcement },
    ],
    teacher: [
      { label: "Dashboard", url: "/",  img: Logo },
      { label: "My profile", url: "/MyProfile", img:Profile },
      { label: "My student", url: "/MyStudent", img: MyStudent},
      { label: "Attendance", url: "/attendance",  img: Attendance},
      { label: "Records", url: "/record", img: Record},
      { label: "Message", url: "/message", img: Message},
      { label: "Announcement", url: "/announcement", img: Announcement},
      { label: "Settings", url: "/settings", img: Settings},
    ],
    admin: [
      { label: "Dashboard", url: "/", img: Logo},
      { label: "Records", url: "/records" },
      { label: "Request", url: "/request"},
      { label: "Message", url: "/message"},
      { label: "Announcement", url: "/announcement"},
      { label: "Report", url: "/report"},
      { label: "announcement", url: "/announcement"},
      { label: "settings", url: "/settings"},
    ],
  };
  



  export const landingPageLinks = {
    
  }