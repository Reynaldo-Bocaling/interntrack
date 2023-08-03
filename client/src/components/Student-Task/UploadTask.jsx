import React from 'react'
import { DateList } from '../../pages/DummyData/DateList'
import { NavLink, Outlet } from 'react-router-dom'
function UploadTask() {
  return (
    <div>
      <div className="header flex items-center justify-between px-2">
        <h1 className="text-xl font-bold tracking-wider text-gray-700">
            Task Uploads
        </h1>
        <select className="h-10 w-[230px] text-sm tracking-wider px-3 shadow-md outline-blue-200 shadow-slate-100 rounded-full border border-slate-200 cursor-pointer">
          {
            DateList && (
                DateList.map((date)=>(
                    <option key={date.id} value={date.label}>{date.label}</option>
                ))
            )
        }
        </select>
       </div>
     

       <div className="container flex flex-col gap-5 mt-5">
        <div className='w-full flex items-end  gap-4 border-b px-2'>
            <NavLink to="/task-upload/" className="taskLink text-gray-600 font-medium tracking-wide pb-1">All</NavLink>
            <NavLink to="/task-upload/today" className="taskLink text-gray-600 font-medium tracking-wide pb-1">Today</NavLink>
        </div>


        <main className=''>
            <Outlet />
        </main>
       </div>
    </div>
  )
}

export default UploadTask
