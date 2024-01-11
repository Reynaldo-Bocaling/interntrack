import React from "react";
import { Drawer, Button, ScrollArea } from "@mantine/core";
import { notificationToggle } from "../../store/Store";
import { IoNotificationsOutline } from "react-icons/io5";
import { getUser } from "../../api/Api";
import { useQuery } from "@tanstack/react-query";
import {format} from 'date-fns'

function Notification() {
  const { isOpenNotfication, setIsCloseNotification } = notificationToggle();

  const { data: user } = useQuery({ queryKey: ["users"], queryFn: getUser });
  const data = user ?? [];
  const role = data.role;

  const userInfo =
    role === "Director"
      ? data.director[0]?.notification
      : role === "Coordinator"
      ? data.coordinator[0]?.notification
      : role === "Teacher"
      ? data.teacher[0]?.notification
      : role === "Trainer"
      ? data.trainer[0]?.notification
      : role === "Student"
      ? data.student[0]?.notification
      : [];

  
  return (
    <div>
      <Drawer
        opened={isOpenNotfication}
        onClose={setIsCloseNotification}
        title={<span className="text-lg font-semibold">Notifications</span>}
        scrollAreaComponent={ScrollArea.Autosize}
        position="right"
      >
        <div className="flex flex-col gap-3">
        {userInfo?.map((item, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded-lg border-b flex gap-3">
            <IoNotificationsOutline size={30} className="text-blue-500" />
            <div className="w-full flex flex-col gap-2">
             <div className="flex items-center justify-between w-full">
             <small className="text-xs text-gray-500 capitalize">
                Dear {role},
              </small>
               <small className="text-xs text-gray-500 capitalize">
               {format(new Date(item.date), 'MMM dd, yyyy')}
              </small>
             </div>
             
                <div>
                  <span className="font-semibold">{item.title}</span>
                  <p className="mt-2 text-sm text-gray-500 font-light tracking-wide">
                    {item.description}
                  </p>
                </div>
              
              
            </div>
          </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
}

export default Notification;
