import React, { lazy, useState } from 'react'
import { Outlet } from 'react-router-dom'

import Sidebar from './common/Sidebar'
import Header from './common/Header'
import Footer from './common/Footer'

const Rootlayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleIsOpen =  () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-16-auto">
      <Sidebar toggleIsOpen={isOpen} toggleSetIsOpen={toggleIsOpen} />

      <div className='bg-gray-50'>
       
          <Header toggleIsOpen={isOpen} />
        

        {/* main */}
        <div className={`${isOpen? "ml-[16rem]": "ml-[4rem]"} min-h-screen px-4  pt-20 pb-6 duration-300`}>
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Rootlayout
