import {
  HiLocationMarker,
  HiUser,
  HiOutlineDocumentDuplicate,
} from "react-icons/hi";
import {
  MdEmail,
  MdOutlineNumbers,
  MdAssignmentInd,
  MdAssuredWorkload,
  MdOutlineUpdate,
} from "react-icons/md";
import { FaTransgender } from "react-icons/fa";
import {
  BsCheck,
  BsFillTelephoneFill,
  BsDot,
  BsArrowRightShort,
} from "react-icons/bs";
import { BiLinkAlt, BiInfoCircle, BiSearch } from "react-icons/bi";
import { GoTasklist } from "react-icons/go";
import { AiOutlineFieldTime } from "react-icons/ai";
import { FiMaximize, FiMinimize } from "react-icons/fi";
import { RiArrowLeftSLine } from "react-icons/ri";

export const TimeIcon = () => {
  return <MdOutlineUpdate />;
};
export const LocationIcon = () => {
  return <HiLocationMarker />;
};
export const SearchIcon = () => {
  return <BiSearch />;
};

export const UserIcon = () => {
  return <HiUser />;
};
export const IDIcons = () => {
  return <MdAssignmentInd />;
};
export const EmailIcons = () => {
  return <MdEmail />;
};
export const NumberIcons = () => {
  return <MdOutlineNumbers />;
};
export const GenderIcons = () => {
  return <FaTransgender />;
};
export const DepartmentIcons = () => {
  return <MdAssuredWorkload />;
};
export const CheckIcons = () => {
  return <BsCheck size={20} />;
};
export const linkIcons = () => {
  return <BiLinkAlt />;
};
export const PhoneIcons = () => {
  return <BsFillTelephoneFill />;
};

export const RequirementIcons = () => {
  return <HiOutlineDocumentDuplicate />;
};

export const InfoIcons = () => {
  return <BiInfoCircle />;
};
export const TaskIcons = () => {
  return <GoTasklist />;
};
export const ClockIcons = () => {
  return <AiOutlineFieldTime />;
};

export const MaximizeIcons = () => {
  return <FiMaximize size={18} />;
};
export const MinimizeIcons = () => {
  return <FiMinimize size={18} />;
};
export const DotIcons = () => {
  return <BsDot />;
};
export const ExitIcons = () => {
  return <BsArrowRightShort size={28} />;
};
export const ArrowLeft = () => {
  return <RiArrowLeftSLine size={19} />;
};
