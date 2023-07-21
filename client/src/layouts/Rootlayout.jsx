import React, { lazy } from 'react'
import { Outlet } from 'react-router-dom'

const Sidebar = lazy(() => import('./components/sidebar/Sidebar'))
const Header = lazy(() => import('./components/Header'))

function Rootlayout() {
  return (
    <div className='flex min-h-screen w-screen overflow-x-hidden'>
      <div>
        <Sidebar />
      </div>
      <div className='flex flex-col w-full'>
        <Header />
        <div className='relative p-4 h-full max-w-full  bg-gray-50'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Rootlayout
