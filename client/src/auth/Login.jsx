import React, { useEffect, useState } from "react";
import Img from "../assets/icons/logo.png";
import { IconAt, IconLock } from '@tabler/icons-react';
import { TextInput, PasswordInput, Button } from '@mantine/core';
import model from '../assets/images/LoginModel.png'
import { Link } from "react-router-dom";
function Login() {


  return (
    <div className="w-screen h-screen flex items-center  bg-gray-50 ">
      <div className="absolute top-7 left-7 z-30 flex items-center gap-2">
            <img src={Img} alt="" className="w-[35px]" />
            <span className="text-xl font-semibold">
              InternTrack
            </span>
          </div>
      <div className="relative w-[55%] flex items-center justify-center mr-10">
        <img src={model} alt="" className="max-w-[350px] z-20" />
        <div>
          <div className="absolute top-10 right-8 py-3 px-5 bg-white drop-shadow-md rounded-lg border border-slate-100 z-30">
            Track Your Progress
          </div>
          <div className="absolute top-14 left-16 py-3 px-5 bg-white drop-shadow-md rounded-lg border border-slate-100 z-30">
            Track Your Progress
          </div>
          <div className="absolute top-40 right-2 py-3 px-5 bg-white drop-shadow-md rounded-lg border border-slate-100 z-30">
            Track Your Progress
          </div>
          <div className="absolute bottom-12 right-8 py-3 px-5 bg-white drop-shadow-md rounded-lg border border-slate-100 z-30">
            Track Your Progress
          </div>
          <div className="absolute top-44 left-8 py-3 px-5 bg-white drop-shadow-md rounded-lg border border-slate-100 z-30">
            Track Your Progress
          </div>
        </div>

        <div className="absolute z-1 h-[320px] w-[320px] bg-blue-500 rounded-full "></div>
        <div className="absolute left-32 bottom-14 z-1 h-[40px] rotate-45 w-[100px] bg-yellow-500 rounded-full "></div>
      </div>
      <div className="w-[45%] h-screen bg-white  flex items-center justify-center">
        <div className="flex flex-col p-5 gap-3">
          <span className="font-semibold text-2xl tracking-tight">Welcome back!</span>
          <small className="text-sm text-gray-500 mb-3 tracking-wide">
            Begin Enhancing Your OJT Experience Efficiently
          </small>
          <div className=" flex flex-col gap-4">
            <TextInput
              label="Email"
              placeholder="Your email"
              icon={<IconAt size="0.9rem" />}
              labelProps={{
                className: "mb-2 pl-1",
              }}
              size="md"
              // error="Email not found"
              errorProps={{className:"text-right text-sm pl-2 tracking-wider text-left"}}
            />

            <PasswordInput 
            placeholder="Your password" 
            label="Password"
            icon={<IconLock size="1rem" />}
            labelProps={{
              className: "mb-2 pl-1",
            }}
            // error="Incorrect password"
            errorProps={{className:"text-right text-sm pl-2 tracking-wider text-left"}}
            size="md"
             />
             <div className="flex justify-end">
              <Link className="text-sm text-blue-500 font-semibold">Forgot password</Link>
             </div>
             <Button className="bg-blue-500 rounded-md" size="md">
              Sign in
            </Button>

            
          </div>

          <footer className='absolute bottom-5 right-15'>
            <p className='text-sm text-gary-500 text-center tracking-wider pb-1'>&copy; 2023 <Link to="/"  className='font-semibold text-black hover:underline'>InternTrack</Link >. All Rights Reserved.</p>
            {/* <p className='text-sm text-gary-600 text-center tracking-wider'>Terms of Use | Privacy Policy | Contact Us</p> */}
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Login;
