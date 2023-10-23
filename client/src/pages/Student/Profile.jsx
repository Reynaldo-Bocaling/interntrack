import React from "react";
import { useDisclosure } from "@mantine/hooks";
import profile from "../../assets/images/dp.png";
import { Input, Drawer } from "@mantine/core";
import { MdAlternateEmail } from "react-icons/md";
import { CgMenuMotion } from "react-icons/cg";
import {Avatar, Button} from "@nextui-org/react";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md'
import {HiMenuAlt3, HiOutlineDocumentText} from 'react-icons/hi'
import ProfileInfo from '../../components/Student-profile/index'
function Profile() {

  const [opened, { open, close }] = useDisclosure(false); //MESSAGE

                                                  
  return (                                                       
    <div className="flex flex-col">
      <div className="flex flex-col">
        <header className='flex items-center justify-between py-2 mb-3 px-2'>
            <MdKeyboardArrowLeft size={22} />
            <span className='text-lg font-semibold'>Profile</span>
            <CgMenuMotion size={20} />
        </header>
        <div className="bg-blue-2 flex flex-col items-center">
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-24 h-24 text-large border-[3px] border-slate-300 mb-2" />

        
          <div className="mt-3 flex flex-col items-center">
          <p className="text-lg text-[#000] font-bold">Reynaldo F. Bocaling</p>
          <small className='text-blue-500 font-medium'>Student</small>
          </div>
        </div>
        <div className="flex items-center justify-between px-2 mt-5">
          <button className="font-semibold bg-slate-100 py-2 px-4 rounded-lg">
            Message
          </button>
          <button onClick={open} className="font-semibold bg-slate-100 py-2 px-4 rounded-lg">
            Edit Info
          </button>
          <button className="text-red-500 font-semibold bg-red-100 py-2 px-4 rounded-lg">
            Drop
          </button>
        </div>

        <ProfileInfo />




        {/* message drawer */}
        <Drawer
          position="right"
          size="100%"
          opened={opened}
          onClose={close}
          title={
            <header className="mt-2">
              <span className="text-xl font-semibold">Edit Info</span>
            </header>
          }
        >

          <div className="flex flex-col gap-3">
          <Input.Wrapper label={<p className="pb-2">First Name</p>}>
          <Input
            icon={<MdAlternateEmail />}
            size="md"
            placeholder="Your email"
          />
        </Input.Wrapper>
       
<Input.Wrapper label={<p className="pb-2">Middle Name</p>}>
          <Input
            icon={<MdAlternateEmail />}
            size="md"
            placeholder="Your email"
          />
        </Input.Wrapper>
       
<Input.Wrapper label={<p className="pb-2">Last Name</p>}>
          <Input
            icon={<MdAlternateEmail />}
            size="md"
            placeholder="Your email"
          />
        </Input.Wrapper>
          </div>
       
        </Drawer>
      </div>
    </div>
  );
}

export default Profile;
