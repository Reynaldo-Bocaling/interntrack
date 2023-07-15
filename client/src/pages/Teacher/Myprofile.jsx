import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
function Myprofile() {
  return (
    <div>
    <div className='flex items-center gap-5 border-b text-gray-700 font-semibold tracking-wider'>
      <NavLink to='/profile/' className="filterLink ">Information</NavLink>
      <NavLink to='/profile/security'  className="filterLink">Security</NavLink>
    </div>
    <div className='mt-5'>
      <Outlet />

    </div>
  </div>
  )
}

export default Myprofile
