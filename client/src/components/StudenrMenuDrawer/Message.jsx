import React from "react";
import { Drawer } from "@mantine/core";
import { Avatar, Input } from "@nextui-org/react";
import { BiSearch } from "react-icons/bi";
import { GrFormAdd } from "react-icons/gr";

const Message = ({ opened, onClose }) => {
  return (
    <div>
      <Drawer
        position="right"
        size="100%"
        opened={opened}
        onClose={onClose}
        title={
          <header className="mt-2 flex">
            {/* <BiSearch /> */}
            <span className="text-xl font-semibold">Messages </span>
            {/* <GrFormAdd /> */}
          </header>
        }
      >
        <div className="flex flex-col gap-3">
          {/* <span className="font-semibold">Recents</span>
          <div className="my-2 py-2 flex justify-between">
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" className="w-14 h-14" />
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" className="w-14 h-14" />
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" className="w-14 h-14" />
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" className="w-14 h-14" />
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" className="w-14 h-14" />
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" className="w-14 h-14" />
          </div> */}

          <p>Coming soon</p>
        </div>
      </Drawer>
    </div>
  );
};

export default Message;
