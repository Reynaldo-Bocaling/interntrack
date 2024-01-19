import React from "react";
import Logo from "../../assets/icons/logo.png";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { useDisclosure } from '@mantine/hooks';
import Sidebar from "./Sidebar";
import {motion} from 'framer-motion'

function Navbar() {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <motion.div 
      initial={{y: -15}}
      animate={{y: -5}}
      transition={{duration: 0.7}}
      className=" fixed w-full top-0 left-0 bg-white md:bg-transparent md:relative z-40 px-5"
    >
      <nav
        className={`flex items-center justify-between py-6  `}
      >
        <div className="flex items-center gap-1">
          <img src={Logo} alt="" className="w-8 h-8" />
          <div className="text-[1.2rem] font-semibold">InternTrack</div>
        </div>
        <ul className="hidden md:flex items-center gap-4 text-gary-800">
          <li><a href="#">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <Button
          color="primary"
          size="sms"
          className="hidden md:block rounded-full font-medium px-5 shadow-2xl shadow-blue-300"
          onClick={()=> navigate('/')}
        >
          Sign in
        </Button>

        {/* menu */}
        <button onClick={open} className="md:hidden"><HiOutlineMenuAlt4 size={25} /></button>
        <Sidebar
        opened={opened}
        close={close}
        />
      </nav>
    </motion.div>
  );
}

export default Navbar;
