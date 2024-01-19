import React from 'react'
import Logo from "../../assets/icons/logo.png";
import { Drawer, ScrollArea } from '@mantine/core';
import { MdKeyboardArrowRight } from "react-icons/md";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";


function Sidebar({opened, close}) {
    const navigate = useNavigate();
    return (
        <>
          <Drawer
            opened={opened}
            onClose={close}
            position='right'
            size="90%"
            title={<div className="mt-2 flex items-center gap-1">
            <img src={Logo} alt="" className="w-8 h-8" />
            <div className="text-[1.2rem] font-semibold">InternTrack</div>
          </div>}
          >
          <div className='px-2'>
          <ul className='mt-10 flex flex-col gap-6'>
            <li><a href="#" className='text-xl capitalize tracking-wider flex items-center justify-between' onClick={close}>Home <MdKeyboardArrowRight className='text-gray-400' /></a></li>
            <li><a href="#about" className='text-xl capitalize tracking-wider flex items-center justify-between' onClick={close}>About <MdKeyboardArrowRight className='text-gray-400' /></a></li>
            <li><a href="#features" className='text-xl capitalize tracking-wider flex items-center justify-between' onClick={close}>Features <MdKeyboardArrowRight className='text-gray-400' /></a></li>
            <li><a href="#services" className='text-xl capitalize tracking-wider flex items-center justify-between' onClick={close}>Services <MdKeyboardArrowRight className='text-gray-400' /></a></li>
            <li><a href="#contact" className='text-xl capitalize tracking-wider flex items-center justify-between' onClick={close}>Contact <MdKeyboardArrowRight className='text-gray-400' /></a></li>
          </ul>

          <Button
          color="primary"
          size="sms"
          className="absolute bottom-5 left-1.2 translate-x-1/2 rounded-full font-medium px-12 shadow-2xl shadow-blue-300"
          onClick={()=> navigate('/')}
        >
          Sign in
        </Button>

          </div>
          </Drawer>
    
      
        </>
      );
}

export default Sidebar
