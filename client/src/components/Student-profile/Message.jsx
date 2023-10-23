import React from 'react'
import { Drawer } from "@mantine/core";

function Message({opened, onClose}) {
  return (
    <div>
      <Drawer
        position="left"
        size="100%"
        opened={opened}
        onClose={onClose}
        title={
          <header className="mt-2">
            <span className="text-xl font-semibold">Message</span>
          </header>
        }
      >
       
      <center className='my-5 text-2xl'>Coming Soon</center>
      </Drawer>
    </div>
  )
}

export default Message
