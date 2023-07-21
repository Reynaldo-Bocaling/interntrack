import React, { useEffect, useState } from 'react'
import { SidebarData } from "./sidebar/SidebarLinks";
import Dp from '../../assets/images/dp.png'
import {MdNotificationsNone} from 'react-icons/md'
import { NavLink } from 'react-router-dom';

import {BiMessageRounded, BiSearch} from 'react-icons/bi'
function Header() {

  const [Role, setRole] = useState([]);
  const Menu = SidebarData[Role] || [];

  useEffect(() => {
    const getUserRole = async () => {
      try {
        setRole("teacher"); /*test*/
      } catch (error) {
        console.log(error);
      }
    };
    getUserRole();
  }, []);




  return (
    <div className='relative h-16 w-full bg-white p-3 pt-3  flex items-center justify-between px-7 shadow-sm'>
      <div className='text-[1.1rem] font-normal'>Welcome back, <span className='font-semibold'>Admin</span></div>

      <div className='flex items-center justify-center gap-3'>
        <div className='flex items-center gap-2 bg-white border rounded-full text-sm shadow-sm px-3'>
          <div className='text-blue-500'>
          <BiSearch size={18} />
          </div>
          <input type="text" className='mt-1 block w-64 py-2 outline-none placeholder-slate-400' placeholder='Search..'/>
        </div>
        <div className='flex items-center gap-4 cursor-pointer'>
          <MdNotificationsNone size={22} className='text-blue-500' />
          <BiMessageRounded size={22} className='text-blue-500' />
        </div>
        <div className='h-fit w-fit rounded-full bg-white p-2 cursor-pointer'>
          <img src={Dp} alt="" width={18} />
        </div>
      </div>
      
    </div>
  )
}

export default Header
