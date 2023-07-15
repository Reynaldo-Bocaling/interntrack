import React from 'react'
import {NavLink, Outlet} from 'react-router-dom'

function MyStudent() {
  return (
    <div>
      <div className='flex items-center gap-5 border-b text-gray-700 font-semibold tracking-wider'>
        <NavLink to='/trainee/' className="filterLink ">Trainee list</NavLink>
        <NavLink to='/trainee/timeSheet'  className="filterLink">Timesheet</NavLink>
      </div>
      <div className='mt-5'>
        <Outlet />
  
      </div>
    </div>
  )
}

export default MyStudent
