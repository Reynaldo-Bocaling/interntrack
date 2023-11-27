import React from 'react'
import {AiOutlineHome, AiOutlineUser} from 'react-icons/ai'
import {HiOutlineDocumentText} from 'react-icons/hi'
import {SiAlwaysdata} from 'react-icons/si'
import { NavLink } from 'react-router-dom';

function StudentNavigation() {
  return (
    <div>
      <div className='h-20 fixed bottom-0 left-0 w-full bg-white z-50  border-t border-slate-300 grid grid-cols-4 pb-3 text-slate-500 lg:w-[90px] lg:grid-cols-1 lg:h-[560px] lg:top-16 lg:border-none lg:shadow-md'>
        
        <NavLink to='/' className=' student-link flex items-center justify-center flex-col gap-1'>
          <AiOutlineHome  size={25} />
          <span className='text-sm lg:text-[0.7rem] tracking-wide'>Home</span>
        </NavLink>
        <NavLink to="/Attendance" className=' student-link  flex items-center justify-center flex-col gap-1'>
          <HiOutlineDocumentText  size={25} />
          <span className='text-sm lg:text-[0.7rem] tracking-wide'>Attendance</span>
        </NavLink>
        <NavLink to="/record" className=' student-link  flex items-center justify-center flex-col gap-1'>
          <SiAlwaysdata  size={25} />
          <span className='text-sm lg:text-[0.7rem] tracking-wide'>Records</span>
        </NavLink>
        <NavLink to="/Profile" className=' student-link flex items-center justify-center flex-col gap-1'>
          <AiOutlineUser  size={25} />
          <span className='text-sm lg:text-[0.7rem] tracking-wide'>Profile</span>
        </NavLink>
      </div>
    </div>
  )
}

export default StudentNavigation
