import React, { useState } from "react";
import logo from "../../assets/icons/logo.png";
import { GoBell } from "react-icons/go";
import { TbMessageCircle2 } from "react-icons/tb";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import Profile from "../../components/StudenrMenuDrawer/Profile";
import Notification from "../../components/StudenrMenuDrawer/Notification";
import { useDisclosure } from "@mantine/hooks";
import Message from "../../components/StudenrMenuDrawer/Message";
function StudentHeader() {
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);

  return (
    <>
      <div
        className={`w-full fixed -top-1 left-0 h-[70px] pt-2 flex items-center justify-between duration-300 bg-white shadow-xl shadow-slate-100 px-5 z-20`}
      >
        <div className="flex items-center gap-2">
          <img src={logo} alt="" className="w-[32px]" />
          <h1 className="text-[#000] font-semibold">InternTrack</h1>
        </div>

        <div className=" flex items-center gap-4">
          <button onClick={()=> setOpenMessage(true)}>
            <TbMessageCircle2 size={20} className="text-gray-900" />
          </button>
          <button onClick={() => setOpenNotification(true)}>
            <GoBell size={20} className="text-gray-900" />
          </button>
          <button
            onClick={()=> setOpenProfile(true)}
            className=" ml-3 p-2 bg-white rounded-full shadow-lg shadow-slate-300"
          >
            <HiOutlineMenuAlt4 size={25} className="text-gray-900" />
          </button>
        </div>
      </div>

      <Profile opened={openProfile} close={()=> setOpenProfile(false)} />
      <Notification opened={openNotification} onClose={() => setOpenNotification(false)} />
      <Message opened={openMessage} onClose={() => setOpenMessage(false)} />
    </>
  );
}

export default StudentHeader;
