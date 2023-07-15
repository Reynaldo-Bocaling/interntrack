import React, { useEffect, useState } from 'react'
import { SidebarData } from "../../utils/SidebarLinks";
import Dp from '../../assets/images/dp.png'
import {MdNotificationsNone} from 'react-icons/md'
import { NavLink } from 'react-router-dom';
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
    <div className='relative h-16 w-full bg-gray-100 p-2 flex items-center justify-between rounded-full px-7'>
      <div className='text-[1.1rem] font-normal'>Welcome back, <span className='font-semibold'>Admin</span></div>

      <div className='flex items-center justify-center gap-3'>
        <div>
          <input type="text" className='mt-1 block w-64 px-3 py-2 bg-white border rounded-full text-sm shadow-sm placeholder-slate-400' placeholder='Search..'/>
        </div>
        <div className='cursor-pointer'>
          <MdNotificationsNone size={25} className='text-blue-500' />
        </div>
        <div className='h-fit w-fit rounded-full bg-white p-2 cursor-pointer'>
          <img src={Dp} alt="" width={18} />
        </div>
      </div>
      
    </div>
  )
}

export default Header
