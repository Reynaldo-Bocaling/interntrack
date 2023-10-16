import React from "react";
import { LiaUserEditSolid } from "react-icons/lia";
import { MdAlternateEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BiUserVoice, BiBookOpen } from "react-icons/bi";
import { PiGenderMaleBold } from "react-icons/pi";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { FaRegBuilding } from "react-icons/fa";

function Information() {
  return (
    <div className="py-1 px-2">
      <div>
        <h1 className="text-lg font-semibold tracking-wide mb-5">
          Information
        </h1>

        <div className="flex flex-col gap-5 mb-8">
          <div className="flex items-center justify-between">
            <small className="text-gray-400 flex items-center gap-3">
              <LiaUserEditSolid /> Name
            </small>
            <small className="font-semibold">Reynaldo F. Bocaling</small>
          </div>
          <div className="flex items-center justify-between">
            <small className="text-gray-400 flex items-center gap-3">
              <BiBookOpen /> Course
            </small>
            <small className="font-semibold">BSIT</small>
          </div>
          <div className="flex items-center justify-between">
            <small className="text-gray-400 flex items-center gap-3">
              <MdAlternateEmail /> Email
            </small>
            <small className="font-semibold">ReynaldoBocaling@gmail.com</small>
          </div>
          <div className="flex items-center justify-between">
            <small className="text-gray-400 flex items-center gap-3">
              <BsFillTelephoneFill /> Phone
            </small>
            <small className="font-semibold">63+9489946337</small>
          </div>
          <div className="flex items-center justify-between">
            <small className="text-gray-400 flex items-center gap-3">
              <PiGenderMaleBold /> Gender
            </small>
            <small className="font-semibold">Male</small>
          </div>

          <small className="mt-4 text-[#000] font-semibold">Others</small>

          <div className="flex items-center justify-between">
            <small className="text-gray-400 flex items-center gap-3">
              <AiOutlineUserSwitch /> Teacher
            </small>
            <small className="font-semibold">Roan Cochanco</small>
          </div>
          <div className="flex items-center justify-between">
            <small className="text-gray-400 flex items-center gap-3">
              <BiUserVoice /> Trainer
            </small>
            <small className="font-semibold">Mr. Lorez</small>
          </div>
          <div className="flex items-center justify-between">
            <small className="text-gray-400 flex items-center gap-3">
              <FaRegBuilding /> Company
            </small>
            <small className="font-semibold">NEUST</small>
          </div>
          <div className="flex items-center justify-between">
            <small className="text-gray-400 flex items-center gap-3">
              <FaRegBuilding /> Area of assigned
            </small>
            <small className="font-semibold">OAR</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Information;
