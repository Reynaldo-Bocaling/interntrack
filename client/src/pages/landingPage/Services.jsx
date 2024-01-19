import React from 'react'
import Timesheet from "../../assets/images/services-timesheet.png";
import Deployment from "../../assets/images/services-deploy.png";
import Switching from "../../assets/images/services-switchAccount.png";
import Task from "../../assets/images/services-task.png";
import Monitor from "../../assets/images/services-monitor.png";
import Requirement from "../../assets/images/services-requirement.png";
import Email from "../../assets/images/services-email.png";
import Role from "../../assets/images/services-role.png";
import UserFriendly from "../../assets/images/services-userInterface.png";
import {motion} from 'framer-motion'

function Services() {
    const featuresList = [
        {
          title: "User-Friendly Interface",
          content:
            "Navigate effortlessly with an intuitive and accessible platform.",
        icon: UserFriendly
        },
        {
          title: "Efficient Intern Deployment",
          content:
            "Swiftly deploy interns to companies for streamlined onboarding.",
        icon: Deployment
        },
        {
          title: "Seamless Account Switching",
          content:
            "Easily switch between accounts for a hassle-free user experience.",
        icon: Switching
        },
        {
          title: "Streamlined Task Management",
          content:
            "Simplify task assignment and completion for efficient workflows.",
        icon: Task
        },
        {
          title: "Comprehensive Progress Monitoring",
          content:
            "Monitor intern development comprehensively for insightful insights.",
        icon: Monitor
        },
        {
          title: "Intuitive Requirement Handling",
          content:
            "Manage internship requirements seamlessly with an intuitive system",
        icon: Requirement
        },
        {
          title: "Prompt Email Communication",
          content:
            "Receive instant email notifications and respond directly within the system.",
        icon: Email
        },
        {
          title: "Flexible Role Assignment",
          content:
            "Adapt roles easily for flexible collaboration and efficient management.",
        icon: Role
        },
        {
          title: "Automated Timesheet Tracking",
          content:
            "Track intern work hours effortlessly with automated timesheets.",
        icon: Timesheet
        },
      ];
      return (
        <div id='services' className="relative pb-12 px-7">
                <motion.h1
                 initial={{opacity: 0}}
                 whileInView={{y:[-20, 0], opacity: 1}}
                className="relative mb-12 text-3xl font-bold text-center ">Our Services</motion.h1>
    
         
          <motion.div
           initial={{opacity: 0}}
           whileInView={{y:[-20, 0], opacity: 1}}
           transition={{duration: 1}}
          className="max-w-[1000px] mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            
              {featuresList.map(({ title, content, icon }) => (
                  <div className="relative z-10 flex gap-3 items-start py-5 px-4 bg-white shadow-lg shadow-gray-100  border border-gray-200 w-full md:w-[310px] min-h-[170px] rounded-lg md:mx-3">
                    <img src={icon} alt="" className="w-[50px]" />
                    <div className="flex flex-col gap-2">
                      <p className="font-semibold">{title}</p>
                      <small className="text-justify2 tracking-wide">
                        {content}
                      </small>
                    </div>
                  </div>
              ))}
          </motion.div>
    

          <div className="absolute top-1/3 -right-5 flex items-center gap-5 justify-center">
                <div className="bg-yellow-500 w-3 h-3 rounded-full -mt-2 -mr-2"></div>
                <div className="bg-blue-500 w-5 h-5 rounded-full mt-5 mr-2"></div>
              </div>
    
              <div className="absolute top-5 md:top-1 left-10 md:left-12 flex items-center -rotate-12 gap-5 justify-center">
                <div className="bg-violet-400 w-7 h-7 rounded-full mt-5 "></div>
                <div className="bg-orange-500 w-3 h-3 rounded-full -mt-2 -mr-2"></div>
                <div className="bg-green-500 w-5 h-5 rounded-full mt-5 mr-2"></div>
              </div>
              <div className="absolute -bottom-10 left-20 flex items-center -rotate-12 gap-5 justify-center">
                <div className="bg-red-400 w-7 h-7 rounded-full mt-5 "></div>
                <div className="bg-yellow-500 w-3 h-3 rounded-full -mt-2 -mr-2"></div>
                <div className="bg-green-500 w-5 h-5 rounded-full mt-5 mr-2"></div>
              </div>
        </div>
      );
}

export default Services
