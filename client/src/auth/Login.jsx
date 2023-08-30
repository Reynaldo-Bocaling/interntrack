import React from "react";
import Img from "../assets/icons/logo.png";
import {MdOutlineMailLock} from 'react-icons/md'
import {BiLockOpen} from 'react-icons/bi'

import model from '../assets/images/LoginModel.png'
function Login() {
  
  
  
  
  
  return (
   <div className="w-screen h-screen flex items-center bg-white">
    <div className="relative w-1/2 flex items-center justify-center">
      <img src={model} alt="" className="max-w-[350px] z-20" />
      <div>
        <div className="absolute top-10 right-8 py-3 px-5 bg-white drop-shadow-md rounded-lg border border-slate-100 z-30">Track Your Progress</div>
        <div className="absolute top-14 left-16 py-3 px-5 bg-white drop-shadow-md rounded-lg border border-slate-100 z-30">Track Your Progress</div>
        <div className="absolute top-40 right-0 py-3 px-5 bg-white drop-shadow-md rounded-lg border border-slate-100 z-30">Track Your Progress</div>
        <div className="absolute bottom-12 right-8 py-3 px-5 bg-white drop-shadow-md rounded-lg border border-slate-100 z-30">Track Your Progress</div>
        <div className="absolute top-40 left-8 py-3 px-5 bg-white drop-shadow-md rounded-lg border border-slate-100 z-30">Track Your Progress</div>
      </div>

      <div className="absolute z-1 h-[320px] w-[320px] bg-blue-500 rounded-full "></div>
      <div className="absolute left-32 bottom-14 z-1 h-[40px] rotate-45 w-[100px] bg-yellow-500 rounded-full "></div>
    </div>
    <div className="w-1/2 h-screen bg-red-500 flex items-center justify-center">
      <div className="flex flex-col bg-blue-500 p-5 gap-3">
        <span className="font-semibold text-2xl">Welcome back!</span>
        <small>Begin Enhancing Your OJT Experience Efficiently</small>
        <div className="flex flex-col gap-4">
          <div className="relative input bg-white w-full rounded-lg overflow-hidden">
            <MdOutlineMailLock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
            <input type="text" placeholder="you@example.com" className="py-3 pl-10 text-sm" />
          </div>
          <div className="relative input bg-white w-full rounded-lg overflow-hidden">
            <BiLockOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
            <input type="text" placeholder="At least 8 character" className="py-3 pl-10 text-sm" />
          </div>
        </div>
      </div>

    </div>
   </div>
  );
}

export default Login;
