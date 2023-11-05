import React from 'react'
import { Link } from 'react-router-dom'

import Navbar from './Navbar'
import Home from './Home'
import About from './About'
import Features from './Features'
import Services from './Services'
import Contact from './Contact'
import Footer from './Footer'


function index() {
  return (
    <div className='shadow-effect relative w-screen min-h-screen bg-white'>
      <div className='max-w-[1124px] mx-auto'>
      <Navbar />
      <Home />
   {/* <About />
      <Features />
     <Services />
     <Contact />
     <Footer /> */}
      </div>
    


    </div>
  )
}

export default index
