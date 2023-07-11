import React, { lazy } from 'react'
import { Outlet } from 'react-router-dom'

const Sidebar = lazy(() => import('./sidebar/Sidebar'))
const Header = lazy(() => import('./header/Header'))

function Rootlayout() {
  return (
    <div className='flex'>
      <div>
        <Sidebar />
      </div>
      <div className='flex flex-col bg-gray-50 w-full'>
        <Header />
        <div className='bg-white p-2 m-2 h-full rounded-lg'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Rootlayout
