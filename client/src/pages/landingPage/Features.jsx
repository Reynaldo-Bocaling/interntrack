import React from "react";
import Timesheet from "../../assets/images/timsheet-features.png";
import Report from "../../assets/images/report-features.png";
import Task from "../../assets/images/task-features.png";
import Requirement from "../../assets/images/requirement-features.png";
import Attendance from "../../assets/images/attendance-features.png";
import Company from "../../assets/images/company-features.png";
import Students from "../../assets/images/studentList-features.png";
import Email from "../../assets/images/email-features.png";
import ChangeRole from "../../assets/images/change-features.png";
import featureMain from '../../assets/images/feature-main.png'
import featureLeft from '../../assets/images/feature-left.png'
import featureRight from '../../assets/images/feature-right.png'
import tool1 from '../../assets/images/heart.png'
import tool2 from '../../assets/images/check.png'
import tool3 from '../../assets/images/like.png'
import { Carousel } from "@mantine/carousel";


function Features() {
  const featuresList = [
    {
      title: "Timesheet",
      content:
        "Efficiently track intern work hours with our user-friendly timesheet feature.",
      icon: Timesheet,
    },
    {
      title: " Weekly Report",
      content:
        "Seamlessly submit and review weekly progress reports for comprehensive internship insights.",
      icon: Report,
    },
    {
      title: "Upload Task",
      content:
        "Streamline task delegation and completion by easily uploading and assigning tasks.",
      icon: Task,
    },
    {
      title: "Upload Requirements",
      content:
        "Simplify documentation – effortlessly upload and manage internship requirements in one place.",
      icon: Requirement,
    },
    {
      title: "Attendance",
      content:
        "Monitor intern attendance effortlessly, ensuring accountability and consistent engagement.",
      icon: Attendance,
    },
    {
      title: "Add Company (w/ MOA)",
      content:
        "Expand your network by adding new companies with a clear Memorandum of Agreement.",
      icon: Company,
    },
    {
      title: "Import Student List",
      content:
        "Save time by importing student lists directly into the system for hassle-free onboarding.",
      icon: Students,
    },
    {
      title: "Email Response",
      content:
        "Enhance communication – receive prompt email notifications and respond directly within the system.",
      icon: Email,
    },
    {
      title: "Change Role",
      content:
        "Adapt roles to fit your organizational structure for seamless collaboration and management.",
      icon: ChangeRole,
    },
  ];
  return (
    <div className="relative mb-20   before:min-h-[550px] before:w-full before:bg-gray-100 before:absolute before:rounded-lg before:-top-7">
            <h1 className="relative mb-12 text-3xl font-bold text-center ">Features</h1>

      <div className="flex items-center justify-center">
        <img src={featureLeft} alt="" className="max-w-[150px] -rotate-12 translate-x-9" />
        <img src={featureMain} alt="" className="relative z-10 max-w-[150px]" />
        <img src={featureRight} alt="" className="max-w-[150px] rotate-12 -translate-x-9" />
      </div>
      <div className="max-w-[1000px] mx-auto mt-12">
        <Carousel
          withIndicators
          height={200}
          slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
          slideGap={{ base: 10, sm: "lg" }}
          loop
          align="start"
        >
          {featuresList.map(({ title, content, icon }) => (
            <Carousel.Slide>
              <div className="relative z-10 flex gap-3 items-start py-5 px-4 bg-white shadow-lg shadow-gray-100  border border-gray-200 w-[310px] min-h-[170px] rounded-lg mx-3">
                <img src={icon} alt="" className="w-[50px]" />
                <div className="flex flex-col gap-2">
                  <p className="font-semibold">{title}</p>
                  <small className="text-justify2 tracking-wide">
                    {content}
                  </small>
                </div>
              </div>
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>

     <img src={tool1} alt="" className="absolute top-1/3 right-28 z-0 max-w-[60px] -rotate-45" />
     <img src={tool2} alt="" className="absolute top-1/3 right-1/4 translate-y-14 z-0 max-w-[60px] " />
     <img src={tool3} alt="" className="absolute top-1/3  left-32 z-0 max-w-[60px] rotate-45" />
      <div className="absolute top-24 right-5 flex items-center gap-5 justify-center">
            <div className="bg-yellow-500 w-3 h-3 rounded-full -mt-2 -mr-2"></div>
            <div className="bg-blue-500 w-5 h-5 rounded-full mt-5 mr-2"></div>
          </div>

          <div className="absolute top-1 left-12 flex items-center -rotate-12 gap-5 justify-center">
            <div className="bg-violet-400 w-7 h-7 rounded-full mt-5 "></div>
            <div className="bg-orange-500 w-3 h-3 rounded-full -mt-2 -mr-2"></div>
            <div className="bg-green-500 w-5 h-5 rounded-full mt-5 mr-2"></div>
          </div>
          <div className="absolute top-1/2 left-12 flex items-center -rotate-12 gap-5 justify-center">
            <div className="bg-red-400 w-7 h-7 rounded-full mt-5 "></div>
            <div className="bg-yellow-500 w-3 h-3 rounded-full -mt-2 -mr-2"></div>
            <div className="bg-green-500 w-5 h-5 rounded-full mt-5 mr-2"></div>
          </div>
    </div>
  );
}

export default Features;
