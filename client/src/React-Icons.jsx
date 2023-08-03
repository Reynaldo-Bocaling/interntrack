
import {HiLocationMarker, HiUser, HiOutlineDocumentDuplicate} from 'react-icons/hi'
import {MdEmail, MdOutlineNumbers, MdAssignmentInd, MdAssuredWorkload} from 'react-icons/md'
import {FaTransgender} from 'react-icons/fa'
import {BsCheck, BsFillTelephoneFill} from 'react-icons/bs'
import {BiLinkAlt, BiInfoCircle} from 'react-icons/bi'
import {GoTasklist} from 'react-icons/go'
import {AiOutlineFieldTime} from 'react-icons/ai'




export const LocationIcon = () => {
    return(
        <HiLocationMarker />
    )
}
export const UserIcon = () => {
    return(
        <HiUser />
    )
}
export const IDIcons = () => {
    return(
        <MdAssignmentInd />
    )
}
export const EmailIcons = () => {
    return(
        <MdEmail />
    )
}
export const NumberIcons = () => {
    return(
        <MdOutlineNumbers />
    )
}
export const GenderIcons = () => {
    return(
        <FaTransgender />
    )
}
export const DepartmentIcons = () => {
    return(
        <MdAssuredWorkload />
    )
}
export const CheckIcons = () => {
    return(
        <BsCheck size={20} />
    )
}
export const linkIcons = () => {
    return(
        <BiLinkAlt />
    )
}
export const PhoneIcons = () => {
    return(
        <BsFillTelephoneFill />
    )
}



export const RequirementIcons = () =>{
    return(
        <HiOutlineDocumentDuplicate />
    )
}

export const InfoIcons = () =>{
    return(
        <BiInfoCircle />
    )
}
export const TaskIcons = () =>{
    return(
        <GoTasklist />
    )
}
export const ClockIcons = () =>{
    return(
        <AiOutlineFieldTime />
    )
}