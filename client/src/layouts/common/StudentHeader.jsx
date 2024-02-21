import React, { useState } from "react";
import { Avatar } from "@nextui-org/react";
import Notification from "../../components/StudenrMenuDrawer/Notification";
import { BiBell } from "react-icons/bi";
import {Link} from 'react-router-dom'
import dp from '../../assets/images/reyn.png'
import Empty from "../../assets/images/emptyProfile.png";
import { getUser } from "../../api/Api";
import {useQuery } from "@tanstack/react-query";


function StudentHeader() {
  const [openNotification, setOpenNotification] = useState(false);
  const { data: userData, isLoading } = useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
  });


  const data = userData?.student[0]
  console.log(data, 's');
  return (
    <>
      <div
        className={`w-full lg:max-w-[350px] fixed -top-1 left-0 lg:left-1/2 lg:-translate-x-1/2 h-[70px] pt-4 pb-2 flex items-center justify-between duration-300 bg-white px-7 z-20`}
      >
        <Link to="/Profile">
        <Avatar
            src={data?.url ? data?.url : Empty}
            className="cursor-pointer w-8 h-8 shadow-md mr-2"
          />
        </Link>

       

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
