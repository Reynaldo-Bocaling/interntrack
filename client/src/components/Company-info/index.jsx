import React from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import {
  InfoIcons,
  RequirementIcons,
  TaskIcons,
  ClockIcons,
} from "../ReactIcon/React-Icons";
import { FiUsers } from "react-icons/fi";
import {
  MdKeyboardArrowLeft,
  MdOutlineFormatListNumbered,
} from "react-icons/md";
import { Tabs } from "@mantine/core";
import pic from "../../assets/images/dp.png";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { BiInfoCircle } from "react-icons/bi";
import { BsChatDots, BsFillTrash3Fill } from "react-icons/bs";
import { GoTasklist } from "react-icons/go";
import { AiOutlineFieldTime } from "react-icons/ai";

import CompanyInfo from "./CompanyInfo";
import CompanyMoa from "./CompanyMoa";
import CompanySlots from "./CompanySlots";
import CompanyStudents from "./CompanyStudents";
import CompanyTrainers from "./CompanyTrainers";
import PulseLloader from "react-spinners/PulseLoader";

const index = ({ data, isLoading, isError }) => {
  if (isError) {
    return (
      <h1 className="text-center my-10">
        Server Failed. Please Try Again Later
      </h1>
    );
  }

  if (isLoading) return <center className="my-5 ">Computing...</center>;

  return (
    <div className="rounded-xl overflow-hidden -mt-3 -ml-2">
      {isLoading ? (
        <h1 className="text-center my-14 py-5 border rounded-lg">
          <PulseLloader
            color="#1892fc"
            margin={5}
            size={13}
            speedMultiplier={1}
            className="mx-auto"
          />
        </h1>
      ) : (
        <>
          <div className="company-cover"></div>
          <div className="flex flex-col gap-3 border-b bg-white">
            <div className="flex items-center gap-3">
              <div className=" ml-7 -mt-40 bg-white w-52 h-44 p-5 border-white right rounded-full shadow-md overflow-hidden">
                <img
                  className=" w-44 h-44 object-cover object-center mb-2 rounded-lg"
                  src={pic}
                  alt={"profile picture"}
                />
              </div>

              <div className="left p-5 pl-5 w-full py-5">
                <div className="flex flex-col gap-5">
                  <div className="name ">
                    <h1 className="text-2xl font-semibold tracking-wide">
                      {data.companyName}
                    </h1>
                    <small className="text-blue-500 font-semibold tracking-wider">
                      Company
                    </small>
                  </div>

                  
                </div>
              </div>
            </div>

            <div className="flex items-center gap-7 -mt-5">
              <Tabs defaultValue="info" className="w-full">
                <div className="flex items-center gap-36 mb-3">
                  <Link
                    to="/Companies"
                    className="font-semibold tracking-wide text-blue-500 rounded-full  px-3 flex items-center"
                  >
                    <MdKeyboardArrowLeft size={20} />
                    Back
                  </Link>
                  <Tabs.List className="flex gap-4">
                    <Tabs.Tab
                      className="text-base text-gray-500 tracking-wide"
                      value="info"
                      icon={<BiInfoCircle />}
                    >
                      <p>Info</p>
                    </Tabs.Tab>
                    {/* <Tabs.Tab
                  className="text-base text-gray-500 tracking-wide"
                  value="moa"
                  icon={<HiOutlineDocumentDuplicate />}
                >
                  MOA
                </Tabs.Tab> */}
                    <Tabs.Tab
                      className="text-base text-gray-500 tracking-wide"
                      value="slots"
                      icon={<GoTasklist />}
                    >
                      Slots
                    </Tabs.Tab>
                    <Tabs.Tab
                      className="text-base text-gray-500 tracking-wide"
                      value="student"
                      icon={<AiOutlineFieldTime />}
                    >
                      Student List
                    </Tabs.Tab>
                    <Tabs.Tab
                      className="text-base text-gray-500 tracking-wide"
                      value="trainer"
                      icon={<AiOutlineFieldTime />}
                    >
                      Trainer List
                    </Tabs.Tab>
                  </Tabs.List>
                </div>

                <Tabs.Panel value="info" pt="xs">
                  <CompanyInfo data={data} />
                </Tabs.Panel>
                <Tabs.Panel value="moa" pt="xs">
                  <CompanyMoa />
                </Tabs.Panel>
                <Tabs.Panel value="slots" pt="xs">
                  <CompanySlots data={data.areaOfAssignment} />
                </Tabs.Panel>
                <Tabs.Panel value="student" pt="xs">
                  <CompanyStudents data={data} />
                </Tabs.Panel>
                <Tabs.Panel value="trainer" pt="xs">
                  <CompanyTrainers data={data} />
                </Tabs.Panel>
              </Tabs>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default index;
