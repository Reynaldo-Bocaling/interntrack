import React from "react";
import Img from "../assets/icons/logo.png";
import {HiOutlineMail} from 'react-icons/hi'
function Login() {
  return (
    <div className="h-screen flex items-center justify-center">
         
          <form className="form">
            <div className="flex items-center flex-col mb-5">
              <img src={Img} alt="" width={55}/>
              <span className="text-2xl font-semibold">InternTrack</span>
            </div>
          {/* <p className="text-lg font-semibold text-gray-700">Welcome back!</p> */}
            <div className="relative">
              <input id="email"  type="text" className="peer h-10 w-full bg-white border-b-2 text-sm border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600" placeholder="Username"/>
              <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email address</label>
            </div>
            <div className="relative">
              <input id="password" type="password" className="peer h-10 w-full border-b-2 border-gray-300 text-sm text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600" placeholder="Password" />
              <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
            </div>

            <button className="button">Login</button>
            <span className="mt-4 block text-sm text-center font-medium text-gray-500 hover:underline focus:outline-none focus:ring-2 focus:ring-rose-500"> Forgot your password? <span className="text-blue-500"></span> </span>

          </form>
        </div>
  );
}

export default Login;
