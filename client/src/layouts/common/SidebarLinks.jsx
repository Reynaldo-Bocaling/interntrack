import { MdOutlineDashboard } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { PiBuildingsBold } from "react-icons/pi";
import { AiOutlineMessage, AiOutlineUser } from "react-icons/ai";
import { MdOutlineAnnouncement } from "react-icons/md";
import { TbUserSearch, TbCalendarCancel } from "react-icons/tb";
import { LuFileSpreadsheet } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { BiChevronDown, BiCalendarExclamation } from "react-icons/bi";
import { BsCalendarCheck } from "react-icons/bs";
import { RxDashboard, RxCalendar } from "react-icons/rx";
import { CgFileDocument } from "react-icons/cg";
import { RiArrowDropDownLine } from "react-icons/ri";

export const SidebarData = {
  Coordinator: [
    {
      label: "Dashboard",
      url: "/",
      icon: RxDashboard,
      size: 16,
      extraText: "HOME",
    },
    { label: "Companies", url: "/companies", icon: PiBuildingsBold, size: 16 },
    { label: "Teacher", url: "/Teacher-list", icon: FiUsers, size: 16 },

    { label: "Trainer", url: "/Trainer-list", icon: FiUsers, size: 16 },

    { label: "Student", url: "/Student-list", icon: TbUserSearch, size: 16 },

    {
      label: "Messages",
      url: "/message",
      icon: AiOutlineMessage,
      size: 17,
      space: true,
      extraText: "MESSAGES",
    },
    {
      label: "Announcements",
      url: "/announcement",
      icon: CgFileDocument,
      size: 17,
    },
  ],

  Teacher: [
    {
      label: "Dashboard",
      url: "/",
      icon: RxDashboard,
      size: 16,
      extraText: "HOME",
    },
    { label: "Companies", url: "/companies", icon: PiBuildingsBold, size: 16 },
    { label: "Trainer", url: "/Trainer-list", icon: FiUsers, size: 16 },

    {
      label: "My student",
      icon: TbUserSearch,
      size: 18,
      dropDownIcon: RiArrowDropDownLine,
      subMenu: [
        { label: "Daily logs", url: "/daily-logs" },
        { label: "Student list", url: "/student-list" },
        { label: "Timesheet", url: "/timeSheet" },
        { label: "Task uploads", url: "/StudentTask" },
      ],
    },
    {
      label: "Messages",
      url: "/message",
      icon: AiOutlineMessage,
      size: 17,
      space: true,
      extraText: "MESSAGES",
    },
    {
      label: "Announcements",
      url: "/announcement",
      icon: CgFileDocument,
      size: 17,
    },
  ],

  SuperAdmin: [
    {
      label: "Dashboard",
      url: "/",
      icon: RxDashboard,
      size: 16,
      extraText: "HOME",
    },
    { label: "Companies", url: "/Companies", icon: PiBuildingsBold, size: 16 },

    { label: "Coordinator", url: "/Coordinator-list", icon: FiUsers, size: 16 },
    { label: "Trainer", url: "/Trainer-list", icon: FiUsers, size: 16 },
    { label: "Students", url: "/Student-list", icon: FiUsers, size: 16 },
    { label: "Teacher", url: "/Teacher-list", icon: FiUsers, size: 16 },
    { label: "Director", url: "/director", icon: AiOutlineUser, size: 16 },
  ],

  Director: [
    {
      label: "Dashboard",
      url: "/",
      icon: RxDashboard,
      size: 16,
      extraText: "HOME",
    },
    { label: "Company", url: "/Companies", icon: PiBuildingsBold, size: 16 },
    {
      label: "Coordinator list",
      url: "/coordinator-list",
      icon: FiUsers,
      size: 16,
    },
    { label: "Teacher list", url: "/teacher-list", icon: FiUsers, size: 16 },
    { label: "Student list", url: "/student-list", icon: FiUsers, size: 16 },

    {
      label: "MOA",
      url: "/moa",
      icon: TbCalendarCancel,
      dropIcon: BiChevronDown,
      size: 18,
    },
    {
      label: "Messages",
      url: "/message",
      icon: AiOutlineMessage,
      size: 17,
      space: true,
      extraText: "MESSAGES",
    },
    {
      label: "Announcements",
      url: "/announcement",
      icon: CgFileDocument,
      size: 17,
    },
  ],

  Trainer: [
    {
      label: "Dashboard",
      url: "/",
      icon: RxDashboard,
      size: 16,
      extraText: "HOME",
    },
    {
      label: "Attendance",
      icon: RxCalendar,
      dropDownIcon: RiArrowDropDownLine,
      size: 16,
      subMenu: [
        { label: "Daily logs", url: "/daily-logs" },
        { label: "Attendance request", url: "/Attendance-request" },
      ],
    },
    {
      label: "My student",
      icon: TbUserSearch,
      dropDownIcon: RiArrowDropDownLine,
      size: 18,
      subMenu: [
        { label: "Student list", url: "/student-list" },
        { label: "Timesheet", url: "/timeSheet" },
        { label: "Task uploads", url: "/StudentTask" },
      ],
    },
    
    {
      label: "Messages",
      url: "/message",
      icon: AiOutlineMessage,
      size: 17,
      space: true,
      extraText: "MESSAGES",
    },
    {
      label: "Announcements",
      url: "/announcement",
      icon: CgFileDocument,
      size: 17,
    },
  ],

  admin: [
    { label: "Dashboard", url: "/", icon: MdOutlineDashboard },
    { label: "Records", url: "/records" },
    { label: "Request", url: "/request" },
    { label: "Message", url: "/message", AiOutlineMessage },
    { label: "Announcement", url: "/announcement", MdOutlineAnnouncement },
    { label: "Report", url: "/report" },
    { label: "announcement", url: "/announcement" },
    { label: "settings", url: "/settings" },
  ],
};

export const landingPageLinks = {};
