import React from 'react'

import Navbar from './Navbar'
import Footer from './Footer'
import Home from './Home'
import About from './About'
import Features from './Features'
import WhatWeDo from './WhatWeDo'
import Services from './Services'
import HeaderFooter from './HeaderFooter'
function index() {
  return (
    <div className='shadow-effect relative w-screen min-h-screen bg-white'>
      <div className='max-w-[1124px] mx-auto'>
      <Navbar />
      <Home />
      <WhatWeDo />
      <About />
      <Features />
      <Services />
      <HeaderFooter />
      <Footer />
      
   
      </div>
    


    </div>
  )
}




export default index
