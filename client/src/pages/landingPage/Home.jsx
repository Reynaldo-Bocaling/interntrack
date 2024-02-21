import React from "react";
import { Link } from "react-router-dom";
import homeModel from "../../assets/images/homeImage.webp";
import { Button } from "@nextui-org/react";
import { BsPlayFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { BiSolidCheckShield } from "react-icons/bi";
import tool1 from "../../assets/images/tool1.png";
import heart from "../../assets/images/heart.png";
import like from "../../assets/images/like.png";
import {motion} from 'framer-motion'
function Home() {
  return (
    <div>
      <motion.div
      initial={{y: -15, opacity: 0}}
      animate={{y: 0, opacity: 1}}
      transition={{duration: 1.3, delay: 0.5}}
       className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-2 px-7 pt-28 md:pt-1">
        <div className="left w-full mx:max-w-[550px] relative z-20">
          <div className="top flex flex-col items-start">
            <small className="text-blue-500 font-medium mb-3">
              {" "}
              OJT Management{" "}
            </small>
            <h1 className="homeTitle text-[2.2rem] md:text-[2.9rem] text-gray-800 leading-[3rem] md:leading-[3.8rem] mb-3">
              Manage Your OJT <br />
              Program <span className="text-green-500">
                Effectively
              </span> with <br />
              Our Solution
            </h1>
            <p className="text-gray-500">
              {" "}
              With our solution, managing your OJT program has never been
              easier. Our system allows you to track student progress, manage
              weekly reports, and communicate effectively with coordinators and
              trainers.
            </p>

            <motion.div
            initial={{x: -20, opacity: 0}}
            animate={{x: 0, opacity: 1}}
            transition={{duration: 2}}
            className="flex items-center gap-4 mt-7">
              <Button
                color="primary"
                size="lg"
                className=" rounded-full font-medium px-10 shadow-2xl shadow-blue-300 hover:-translate-x-2 hover:transition-all"
              >
                Let's talk
              </Button>

              <div className="flex items-center gap-2">
                <div className="h-12 w-12 rounded-full shadow-lg flex items-center justify-center">
                  <BsPlayFill size={23} />
                </div>
                <small className="text-gray-500">Play Introduction</small>
              </div>
            </motion.div>
          </div>
          <motion.div
          initial={{y: 20, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          transition={{duration: 1.5, delay: 0.5}}
          className="mt-14 py-2 mb-12 md:mb-2 grid grid-cols-2 md:grid-cols-4 items-center justify-center w-full gap-7 font-medium">
            <span className="border-r pr-4 ">User-friendly</span>
            <span className="border-r pr-4 ">Accessible</span>
            <span className="border-r pr-4 ">Reliable</span>
            <span>Convenient</span>
          </motion.div>
        </div>

        {/* right */}
        <div className="home-Shadow relative">
          <img
            src={homeModel}
            alt=""
            className="relative max-w-[420px] -ml-2 md:ml-0 md:max-w-[500px] w-full z-10"
            loading="lazy"
          />

          <div className=" absolute right-1 bottom-3 py-3 px-5 rounded-xl flex items-center justify-center gap-3 z-20 bg-[rgba(250,250,250,0.87)] shadow-lg">
            <div className="bg-[#fb8d33] p-2 rounded-lg">
              <GrMail size={20} className="text-white" />
            </div>
            <div>
              <div className="relative flex flex-col gap-1">
                <span className="font-semibold">Congratulations</span>
                <small className="text-gray-600">Your addmission is done</small>
                <BiSolidCheckShield className="text-green-500 absolute top-1 right-0" />
              </div>
            </div>
          </div>
          <img
            src={tool1}
            alt=""
            className="absolute -left-0 bottom-28 w-20  z-20 -rotate-90"
          />

          {/* dots design */}

          <div className="absolute bottom-0 left-10 flex items-center gap-5 justify-center">
            <div className="bg-green-400 w-7 h-7 rounded-full mt-5 "></div>
            <div className="bg-yellow-500 w-3 h-3 rounded-full -mt-2 -mr-2"></div>
            <div className="bg-blue-500 w-5 h-5 rounded-full mt-5 mr-2"></div>
            <div className="bg-blue-500 w-2 h-2 rounded-full mt-9 mr-2"></div>
          </div>

          <div className="absolute -top-5 left-10 flex items-center gap-5 justify-center">
            <div className="bg-violet-400 w-7 h-7 rounded-full mt-5 "></div>
            <div className="bg-orange-500 w-3 h-3 rounded-full -mt-2 -mr-2"></div>
            <div className="bg-green-500 w-5 h-5 rounded-full mt-5 mr-2"></div>
          </div>
          <div className="absolute top-9 -right-7 flex items-center gap-5 justify-center">
            <div className="bg-orange-500 w-1 h-1 rounded-full -mt-2 -mr-2"></div>
            <div className="bg-orange-500 w-3 h-3 rounded-full -mt-2 -mr-2"></div>
            <div className="bg-blue-500 w-5 h-5 rounded-full -mt-5 mr-0"></div>
          </div>

          <img
            src={heart}
            alt=""
            className="absolute -right-7 top-36 translate-y-1/2 w-11"
          />
          <img
            src={like}
            alt=""
            className="absolute -right-3 top-52 translate-y-1/2 w-10"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
