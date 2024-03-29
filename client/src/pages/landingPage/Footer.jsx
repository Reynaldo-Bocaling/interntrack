import React from 'react'
import { FaFacebookF,FaInstagram,FaPhone  } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import {motion} from 'framer-motion'
function Footer() {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ y: -15, opacity: 1 }}
    transition={{ duration: 1.5 }}
    id='contact' className='mt-12 flex items-center justify-center flex-col gap-7 px-7 text-center'>
      <div className='flex items-center justify-center gap-3'>
        <a href="#" className='h-[45px] w-[45px] text-white bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-200'> <FaFacebookF /></a>
        <a href="#" className='h-[45px] w-[45px] text-white bg-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-pink-300'> <FaInstagram /></a>
        <a href="#" className='h-[45px] w-[45px] text-white bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-200'> <BiLogoGmail /></a>
        <a href="#" className='h-[45px] w-[45px] text-white bg-sky-500 rounded-full flex items-center justify-center shadow-lg shadow-sky-200'> <FaPhone /></a>
     
      </div>

      <div className='text-base text-gray-500'>
          | HOME | ABOUT | SERVICES | FEATURES | CONTACT | 
      </div>
      <p className='mb-2 text-sm'><span className='font-medium'>InternTrack</span> - Your Partner in Streamlining OJT Experiences. © 2024. All Rights Reserved.</p>
    </motion.div>
  )
}

export default Footer
