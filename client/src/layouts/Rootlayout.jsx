import React, { lazy } from 'react'
import { Outlet } from 'react-router-dom'

const Sidebar = lazy(() => import('./components/Sidebar'))
const Header = lazy(() => import('./components/Header'))

function Rootlayout() {
  return (
    <div className='flex w-screen overflow-x-hidden'>
      <div>
        <Sidebar />
      </div>
      <div className='flex flex-col w-full py-4 px-5'>
        <Header />
        <div className='p-4 m-2 h-full max-w-full'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Rootlayout
