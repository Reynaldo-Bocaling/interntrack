import React, { useState } from "react";
import { Avatar } from "@nextui-org/react";
import Notification from "../../components/StudenrMenuDrawer/Notification";
import { BiBell } from "react-icons/bi";
import {Link} from 'react-router-dom'
import dp from '../../assets/images/reyn.png'


function StudentHeader() {
  const [openNotification, setOpenNotification] = useState(false);

  return (
    <>
      <div
        className={`w-full fixed -top-1 left-0 h-[70px] pt-4 pb-2 flex items-center justify-between duration-300 bg-white px-7 z-20`}
      >
        <Link to="/Profile">
          <Avatar
          src={dp}
          size="sm"
        /></Link>
        

        <button onClick={() => setOpenNotification(true)} className="relative">
          <BiBell size={24} className="text-gray-600" />
          <div className="absolute top-1 right-1 h-[7px] w-[7px] rounded-full bg-[#FC6736]"></div>
        </button>
      </div>

      {openNotification && (
        <Notification
          opened={openNotification}
          onClose={() => setOpenNotification(false)}
        />
      )}
    </>
  );
}

export default StudentHeader;
