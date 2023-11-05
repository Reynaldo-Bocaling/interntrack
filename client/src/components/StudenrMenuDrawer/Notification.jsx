import React from 'react'
import { Drawer } from "@mantine/core";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsDot } from "react-icons/bs";


function Notification({opened, onClose}) {
  return (
    <div>
       <Drawer
        position="right"
        size="100%"
        opened={opened}
        onClose={onClose}
        title={
          <header className="mt-2 flex ">
            <span className="text-xl font-semibold">Notification </span>
            <BsDot
                size={23}
                className="text-red-500"
              />
          </header>
        }
      >
         <div className="flex flex-col gap-3">
          <div className="bg-gray-50 p-3 rounded-lg border-b flex gap-3">
          <IoNotificationsOutline size={40} className="text-blue-500" />
            <div>
              <small className="text-xs text-gray-500 capitalize">Hello Student,</small>
              <div>
                <span className="font-semibold">Added Successfully</span>
                <p className="mt-2 text-sm text-gray-500 font-light tracking-wide">Welcome to Interntrack! We are delighted to have you on board as a part of our OJT program. Your profile has been successfully created.</p>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default Notification
