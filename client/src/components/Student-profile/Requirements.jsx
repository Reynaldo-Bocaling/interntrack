import React from "react";
import {MdKeyboardArrowRight} from 'react-icons/md'
import { Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import brgy from '../../assets/images/sampleBrgyCert.jpg'
function Requirements() {
    const [opened, { open, close }] = useDisclosure(false); //MESSAGE

  return (
    <div className="mt-3 mb-8">
      <h1 className="text-lg font-semibold tracking-wide mb-5">Requirements</h1>

      <div className="flex flex-col gap-3">
        <div 
        onClick={open}
        className="p-5 bg-white flex items-center justify-between rounded-lg border shadow-lg shadow-slate-100 hover:border hover:border-blue-300 transition-all"
        >
            <span className="text-lged font-medium tracking-wide text-blue-500">BRGY Certificate</span>
            <MdKeyboardArrowRight size={23} className="text-gray-400"/>
        </div>
        <div className="p-5 bg-white flex items-center justify-between rounded-lg border shadow-lg shadow-slate-100 hover:border hover:border-blue-300 transition-all">
            <span className="text-lged font-medium tracking-wide text-blue-500">Philhealth</span>
            <MdKeyboardArrowRight size={23} className="text-gray-400"/>
        </div>
        <div className="p-5 bg-white flex items-center justify-between rounded-lg border shadow-lg shadow-slate-100 hover:border hover:border-blue-300 transition-all">
            <span className="text-lged font-medium tracking-wide text-blue-500">NSO</span>
            <MdKeyboardArrowRight size={23} className="text-gray-400"/>
        </div>
      </div>


      <Drawer
          position="bottom"
          size="80%"
          opened={opened}
          onClose={close}
          title={
            <header className="mt-2">
              <span className="text-xl font-semibold">BRGY Certificate</span>
            </header>
          }
        >
            <img src={brgy} alt=""  className="max-w-700px p-7"/>
        </Drawer>
    </div>
  );
}

export default Requirements;
