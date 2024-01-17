import React from "react";
import aboutMain from "../../assets/images/about-main.png";
import aboutLeft from "../../assets/images/about-right.png";
import aboutRight from "../../assets/images/about-left.png";
import aboutCase from "../../assets/images/about-case.png";
import { Button } from "@nextui-org/react";
function About() {
  return (
    <>
      <div className="about-shadow-effect relative mt-24 mb-24 w-full bg-white flex flex-col items-center justify-center gap-5  lg:gap-24 lg:flex-row">
        <div className="relative max-w-[400px] w-full min-h-[550px] bg-red-5t00">
          <img
            src={aboutCase}
            alt="About Main picture"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2   max-w-[250px] w-full"
          />

          <img
            src={aboutMain}
            alt="About Main picture"
            className="absolute -top-0 right-9     max-w-[250px] w-full"
          />
          <img
            src={aboutLeft}
            alt="About Main picture"
            className="absolute top-16 left-6  max-w-[130px] w-full"
          />
          <img
            src={aboutRight}
            alt="About Main picture"
            className="absolute bottom-14 -right-3 max-w-[140px] w-full"
          />

          <div className="absolute top-24 -right-5 flex items-center gap-5 justify-center">
            <div className="bg-yellow-500 w-3 h-3 rounded-full -mt-2 -mr-2"></div>
            <div className="bg-blue-500 w-5 h-5 rounded-full mt-5 mr-2"></div>
          </div>

          <div className="absolute -top-5 -left-12 flex items-center -rotate-12 gap-5 justify-center">
            <div className="bg-violet-400 w-7 h-7 rounded-full mt-5 "></div>
            <div className="bg-orange-500 w-3 h-3 rounded-full -mt-2 -mr-2"></div>
            <div className="bg-green-500 w-5 h-5 rounded-full mt-5 mr-2"></div>
          </div>
        </div>

        <div className="max-w-[500px] w-full mt-12">
          <h1 className=" mb-5 text-3xl font-bold">About Us</h1>
          <div className="text-lg font-semibold mb-5">
            Empowering Growth Through Innovative OJT Management Solutions –
            Welcome to InternTrack
          </div>

          <p className="text-gray-500 ">
            Where seamless OJT management meets innovation. We're dedicated to
            revolutionizing internship experiences through efficient task
            tracking, transparent progress monitoring, and collaborative
            communication. Empower your team and elevate intern development with
            InternTrack – your partner in shaping the future workforce.
          </p>
          <Button
            color="primary"
            size="lg"
            className="mt-5 rounded-full font-medium px-10 shadow-2xl shadow-blue-300 hover:-translate-x-2 hover:transition-all"
          >
            Rate Us
          </Button>
        </div>
      </div>
    </>
  );
}

export default About;
