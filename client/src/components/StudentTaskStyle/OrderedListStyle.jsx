import React from 'react'
import pic from "../../assets/images/task1.jpg";
import { Link } from "react-router-dom";
import { FcCalendar } from "react-icons/fc";

function OrderedListStyle() {
  return (
    <div>
       <div className="flex flex-col gap-1">
          <div className="mt-7 flex gap-7 bg-white drop-shadow-md p-5 rounded-lg">
            <img
                className="w-[270px] h-full object-cover object-center mb-2 rounded-lg"
                src={pic}
                alt={"ds"}
              />
              <div>
                <div className="title flex flex-col gap-1 mb-5">
                  <span className="font-semibold text-xl"> Coding in CICT office</span>
                  <small className="text-blue-500 font-medium tracking-wide">Task</small>
                </div>

                <div className="description text-gray-500 text-sm tracking-wide text-justify ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Non amet voluptate excepturi illum ipsam dolores aperiam earum, nisi corporis corrupti explicabo facere cumque ea magnam aut nam maxime rem suscipit!
                </div>

                <div className="mt-5 flex items-center gap-7">
                  <div className="flex items-center  gap-2 text-sm text-gray-500"><FcCalendar />  January 1, 2023</div>
                  <Link className="text-blue-500 text-sm font-medium tracking-wide">
                    View
                  </Link>
                </div>
              </div>
          </div>
          <div className="mt-5 flex gap-7 bg-white drop-shadow-md p-5 rounded-lg">
            <img
                className="w-[270px] h-full object-cover object-center mb-2 rounded-lg"
                src={pic}
                alt={"ds"}
              />
              <div>
                <div className="title flex flex-col gap-1 mb-5">
                  <span className="font-semibold text-xl"> Coding in CICT office</span>
                  <small className="text-blue-500 font-medium tracking-wide">Task</small>
                </div>

                <div className="description text-gray-500 text-sm tracking-wide text-justify ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Non amet voluptate excepturi illum ipsam dolores aperiam earum, nisi corporis corrupti explicabo facere cumque ea magnam aut nam maxime rem suscipit!
                </div>

                <div className="mt-5 flex items-center gap-7">
                  <div className="flex items-center  gap-2 text-sm text-gray-500"><FcCalendar />  January 1, 2023</div>
                  <Link className="text-blue-500 text-sm font-medium tracking-wide">
                    View
                  </Link>
                </div>
              </div>
          </div>
          <div className="mt-5 flex gap-7 bg-white drop-shadow-md p-5 rounded-lg">
            <img
                className="w-[270px] h-full object-cover object-center mb-2 rounded-lg"
                src={pic}
                alt={"ds"}
              />
              <div>
                <div className="title flex flex-col gap-1 mb-5">
                  <span className="font-semibold text-xl"> Coding in CICT office</span>
                  <small className="text-blue-500 font-medium tracking-wide">Task</small>
                </div>

                <div className="description text-gray-500 text-sm tracking-wide text-justify ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Non amet voluptate excepturi illum ipsam dolores aperiam earum, nisi corporis corrupti explicabo facere cumque ea magnam aut nam maxime rem suscipit!
                </div>

                <div className="mt-5 flex items-center gap-7">
                  <div className="flex items-center  gap-2 text-sm text-gray-500"><FcCalendar />  January 1, 2023</div>
                  <Link className="text-blue-500 text-sm font-medium tracking-wide">
                    View
                  </Link>
                </div>
              </div>
          </div>
          <div className="mt-5 flex gap-7 bg-white drop-shadow-md p-5 rounded-lg">
            <img
                className="w-[270px] h-full object-cover object-center mb-2 rounded-lg"
                src={pic}
                alt={"ds"}
              />
              <div>
                <div className="title flex flex-col gap-1 mb-5">
                  <span className="font-semibold text-xl"> Coding in CICT office</span>
                  <small className="text-blue-500 font-medium tracking-wide">Task</small>
                </div>

                <div className="description text-gray-500 text-sm tracking-wide text-justify ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Non amet voluptate excepturi illum ipsam dolores aperiam earum, nisi corporis corrupti explicabo facere cumque ea magnam aut nam maxime rem suscipit!
                </div>

                <div className="mt-5 flex items-center gap-7">
                  <div className="flex items-center  gap-2 text-sm text-gray-500"><FcCalendar />  January 1, 2023</div>
                  <Link className="text-blue-500 text-sm font-medium tracking-wide">
                    View
                  </Link>
                </div>
              </div>
          </div>
          <div className="mt-5 flex gap-7 bg-white drop-shadow-md p-5 rounded-lg">
            <img
                className="w-[270px] h-full object-cover object-center mb-2 rounded-lg"
                src={pic}
                alt={"ds"}
              />
              <div>
                <div className="title flex flex-col gap-1 mb-5">
                  <span className="font-semibold text-xl"> Coding in CICT office</span>
                  <small className="text-blue-500 font-medium tracking-wide">Task</small>
                </div>

                <div className="description text-gray-500 text-sm tracking-wide text-justify ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Non amet voluptate excepturi illum ipsam dolores aperiam earum, nisi corporis corrupti explicabo facere cumque ea magnam aut nam maxime rem suscipit!
                </div>

                <div className="mt-5 flex items-center gap-7">
                  <div className="flex items-center  gap-2 text-sm text-gray-500"><FcCalendar />  January 1, 2023</div>
                  <Link className="text-blue-500 text-sm font-medium tracking-wide">
                    View
                  </Link>
                </div>
              </div>
          </div>
        </div>
    </div>
  )
}

export default OrderedListStyle
