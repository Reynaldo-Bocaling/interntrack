import React, { lazy } from 'react'
import { Outlet } from 'react-router-dom'

import Sidebar from './components/common/Sidebar'
import Header from './components/common/Header'
import Footer from './components/common/Footer'

function Rootlayout() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-16-auto">
      <Sidebar />

      <div className='bg-gray-50'>
        <Header />
        <div className="min-h-screen px-4 ml-[16rem] pt-20 pb-6">
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Rootlayout
