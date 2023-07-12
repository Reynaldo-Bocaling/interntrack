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
      <div className='flex flex-col w-full py-4 px-5'>
        <Header />
        <div className='p-4 m-2 h-full rounded-lg'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Rootlayout
