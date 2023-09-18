import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import profile from "../../assets/images/dp.png";
import { Input, PasswordInput, Drawer } from "@mantine/core";
import { LiaUserEditSolid } from "react-icons/lia";
import { MdAlternateEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BiUserVoice, BiBookOpen } from "react-icons/bi";
import { PiGenderMaleBold } from "react-icons/pi";
import { AiOutlineUserSwitch } from "react-icons/ai";

function Profile() {

  const [opened, { open, close }] = useDisclosure(false); //MESSAGE

                                                  
  return (                                                       
    <div className="mt-3 flex flex-col">
      <div className="flex flex-col">
        <div className="covers h-28 bg-gray-200 rounded-xl"></div>

        <div className="bg-blue-2 -mt-12 flex flex-col items-center">
          <img                                            
            src={profile}
            alt=""
            className="max-w-[90px] rounded-full p-2 border shadow-lg bg-white"
          />
          <div className="mt                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              -3 flex flex-col items-center">
          <p className="text-lg text-[#000] font-bold">Reynaldo F. Bocaling</p>
          <small className="text-blue-500 font-medium tracking-wide">
            Trainee
          </small>
          </div>
        </div>
        <div className="flex items-center justify-between px-2 mt-5">
          <button className="font-semibold bg-slate-100 py-2 px-4 rounded-lg">
            Message
          </button>
          <button onClick={open} className="font-semibold bg-slate-100 py-2 px-4 rounded-lg">
            Edit Info
          </button>
          <button className="font-semibold bg-slate-100 py-2 px-4 rounded-lg">
            Message
          </button>
        </div>

        <div className="mt-7 mb-5 flex items-center justify-between px-5 text-lg border-b pb-3">
          <NavLink to="/Profile/" className="profile-tabs">Info</NavLink>
          <NavLink to="/Profile/security" className="profile-tabs">Security</NavLink>
          <NavLink to="/Profile/requirements" className="profile-tabs">Requirements</NavLink>
        </div>

        <Outlet />




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
